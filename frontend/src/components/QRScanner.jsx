// components/QRScanner.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { X, Camera, QrCode } from "lucide-react";
import jsQR from "jsqr";

export default function QRScanner({ onClose, onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [permission, setPermission] = useState(null);
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(true);
  const animationRef = useRef();

  const stopCamera = useCallback(() => {
    setScanning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (onClose) onClose();
  }, [stream, onClose]);

  // Función para escanear QR del video - envuelta en useCallback
  const scanQRCode = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        setScanning(false);
        // Vibrar si el dispositivo lo soporta
        if (navigator.vibrate) navigator.vibrate(200);

        // Llamar al callback con el dato escaneado
        if (onScan) {
          onScan(code.data);
        }

        // Cerrar después de escanear
        setTimeout(() => {
          stopCamera();
        }, 500);

        return;
      }
    }

    // Continuar escaneando si todavía está activo
    if (scanning) {
      animationRef.current = requestAnimationFrame(scanQRCode);
    }
  }, [scanning, onScan, stopCamera]);

  // useEffect para la cámara
  useEffect(() => {
    let isMounted = true;
    let currentStream = null;

    const initCamera = async () => {
      try {
        setPermission("requesting");

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Tu navegador no soporta el acceso a la cámara");
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });

        if (isMounted) {
          currentStream = mediaStream;
          setStream(mediaStream);
          setPermission("granted");

          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;

            // Iniciar escaneo cuando el video esté listo
            videoRef.current.onloadeddata = () => {
              if (scanning) {
                animationRef.current = requestAnimationFrame(scanQRCode);
              }
            };
          }
        }
      } catch (err) {
        console.error("Error de cámara:", err);
        if (isMounted) {
          setPermission("denied");

          if (err.name === "NotAllowedError") {
            setError(
              "Permiso denegado. Hacé click en el candado 🔒 en la barra del navegador y permití el acceso a la cámara.",
            );
          } else if (err.name === "NotFoundError") {
            setError("No se encontró ninguna cámara en tu dispositivo.");
          } else {
            setError("No se pudo acceder a la cámara.");
          }
        }
      }
    };

    initCamera();

    // Cleanup function
    return () => {
      isMounted = false;
      setScanning(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [scanQRCode]); // ✅ Ahora incluimos scanQRCode como dependencia

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Canvas oculto para procesamiento */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {permission === "requesting" && (
          <div className="text-white text-center">
            <Camera className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p>Solicitando acceso a la cámara...</p>
          </div>
        )}

        {permission === "denied" && (
          <div className="text-white text-center max-w-md px-6">
            <div className="bg-wine/20 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <X className="w-10 h-10 text-wine-light" />
            </div>
            <p className="text-lg mb-4">Acceso a la cámara denegado</p>
            <p className="text-gray-400 text-sm mb-6">{error}</p>
            <button
              onClick={stopCamera}
              className="px-6 py-3 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}

        {permission === "granted" && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Frame guía para QR */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 border-2 border-wine/80 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"></div>

                {/* Esquinas decorativas */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-wine-light rounded-tl-2xl"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-wine-light rounded-tr-2xl"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-wine-light rounded-bl-2xl"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-wine-light rounded-br-2xl"></div>
              </div>
            </div>

            {/* Efecto de escaneo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-0.5 bg-wine-light/50 animate-scan"></div>

            {/* Texto instructivo */}
            <div className="absolute bottom-24 left-0 right-0 text-center">
              <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <QrCode className="w-5 h-5 text-wine-light" />
                <p className="text-white font-medium">
                  Centrá el código QR en el recuadro
                </p>
              </div>
            </div>

            {/* Botón de cerrar */}
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-wine/80 transition-colors group"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
