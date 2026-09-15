import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselDestacados({ platos = [], mostrarDetalles = true }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [failedVideos, setFailedVideos] = useState({});
  const [videoDurations, setVideoDurations] = useState({});
  const videos = useRef([]);
  const touchStart = useRef(null);
  const count = platos.length;
  const activeIndex = count ? index % count : 0;
  const activeVideo = platos[activeIndex]?.video;
  // Dejar terminar al menos una reproducción, incluso si el MP4 supera los 4 s.
  const slideDuration = Math.max(4000, (videoDurations[activeVideo] || 0) * 1000 + 250);

  const move = (direction) => setIndex((current) => (current + direction + count) % count);

  useEffect(() => {
    if (count < 2 || isPaused || hasFocus) return;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % count), slideDuration);
    return () => clearTimeout(timer);
  }, [count, isPaused, hasFocus, index, slideDuration]);

  useEffect(() => {
    videos.current.forEach((video, slideIndex) => {
      if (!video) return;
      if (slideIndex === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => { /* Conserva el poster si autoplay está bloqueado. */ });
      } else {
        video.pause();
      }
    });
  }, [activeIndex, platos]);

  if (!count) return null;

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Platos destacados"
      className={`relative mx-auto mb-12 min-w-0 ${mostrarDetalles ? "max-w-4xl" : "max-w-xl"}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsPaused(false);
      }}
      onPointerDownCapture={() => setHasFocus(false)}
      onFocusCapture={(event) => setHasFocus(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div
        className={`overflow-hidden rounded-2xl touch-pan-y ${mostrarDetalles ? "bg-cream" : ""}`}
        onTouchStart={(event) => {
          touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
          setIsPaused(true);
        }}
        onTouchEnd={(event) => {
          if (touchStart.current) {
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
          }
          touchStart.current = null;
          setIsPaused(false);
        }}
        onTouchCancel={() => { touchStart.current = null; setIsPaused(false); }}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none [perspective:1200px]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {platos.map((plato, slideIndex) => (
            <article
              key={plato._id}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${slideIndex + 1} de ${count}: ${plato.nombre}`}
              aria-hidden={slideIndex !== activeIndex}
              className={`w-full min-w-0 shrink-0 items-center transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:!transform-none ${mostrarDetalles ? "md:grid md:grid-cols-[55%_45%]" : ""}`}
              style={{ transform: slideIndex === activeIndex ? "rotateY(0deg) scale(1)" : `rotateY(${slideIndex < activeIndex ? -12 : 12}deg) scale(0.94)` }}
            >
              {/* Un mismo encuadre responsive para los tres videos de la portada. */}
              <div className={`w-full flex items-center justify-center overflow-hidden ${mostrarDetalles ? "aspect-[834/692]" : "aspect-[3/2]"}`}>
                {plato.video && !failedVideos[plato.video] ? (
                  <video
                    ref={(element) => { videos.current[slideIndex] = element; }}
                    src={plato.video}
                    poster={plato.poster || plato.imagen}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={`block w-full object-cover object-center ${mostrarDetalles ? "h-auto" : "h-full"}`}
                    onLoadedMetadata={(event) => {
                      const duration = event.currentTarget.duration;
                      if (Number.isFinite(duration)) {
                        setVideoDurations((durations) => ({ ...durations, [plato.video]: duration }));
                      }
                    }}
                    onLoadedData={(event) => {
                      if (slideIndex !== activeIndex) event.currentTarget.pause();
                    }}
                    onError={() => setFailedVideos((failed) => ({ ...failed, [plato.video]: true }))}
                  />
                ) : plato.imagen || plato.poster ? (
                  <img src={plato.imagen || plato.poster} alt={plato.nombre} className={`w-full h-full ${mostrarDetalles ? "object-contain" : "object-cover object-center"}`} />
                ) : (
                  <span role="img" aria-label={plato.nombre} className="text-6xl">🍽️</span>
                )}
              </div>
              {mostrarDetalles && <div className="px-12 py-6 md:px-10 break-words min-w-0">
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">{plato.nombre}</h3>
                {plato.descripcion && <p className="text-gray-600 mb-5">{plato.descripcion}</p>}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl font-semibold text-wine">${plato.precio.toLocaleString("es-AR")}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${plato.disponible ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                    {plato.disponible ? "Disponible" : "Agotado"}
                  </span>
                </div>
              </div>}
            </article>
          ))}
        </div>
      </div>
      {count > 1 && mostrarDetalles && (
        <>
          {mostrarDetalles && <>
          <button type="button" aria-label="Plato anterior" onClick={() => move(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-wine text-white p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <ChevronLeft size={24} />
          </button>
          <button type="button" aria-label="Plato siguiente" onClick={() => move(1)} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-wine text-white p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <ChevronRight size={24} />
          </button>
          </>}
          <div className="flex justify-center mt-3" aria-label="Elegir plato">
            {platos.map((plato, slideIndex) => (
              <button key={plato._id} type="button" aria-label={`Ver ${plato.nombre}`} aria-current={slideIndex === activeIndex ? "true" : undefined} onClick={() => setIndex(slideIndex)} className="p-4">
                <span className={`block h-2.5 rounded-full transition-all ${slideIndex === activeIndex ? "w-7 bg-wine" : "w-2.5 bg-gray-400"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
