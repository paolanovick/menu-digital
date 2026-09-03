import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ANALYTICS_CONSENT_GRANTED_EVENT, getAnalyticsConsent, loadGoogleAnalytics, setAnalyticsCollectionEnabled, setAnalyticsConsent, trackPageView } from "../lib/analytics";

const isPrivatePath = (pathname) => /^\/(admin|mozo|superadmin)(\/|$)/.test(pathname)
  || /^\/[^/]+\/admin(\/|$)/.test(pathname);

function useDialogFocusTrap(active) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!active || !dialogRef.current) return undefined;
    const dialog = dialogRef.current;
    const getFocusable = () => Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const focusable = getFocusable(); if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onFocusIn = (event) => { if (!dialog.contains(event.target)) getFocusable()[0]?.focus(); };
    document.addEventListener("keydown", onKeyDown); document.addEventListener("focusin", onFocusIn);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("focusin", onFocusIn); };
  }, [active]);
  return dialogRef;
}

export default function CookieBanner() {
  const { pathname, search } = useLocation();
  const privateArea = isPrivatePath(pathname);
  const [visible, setVisible] = useState(() => {
    const saved = getAnalyticsConsent();
    return saved !== "accepted" && saved !== "rejected";
  });
  const dialogRef = useDialogFocusTrap(visible && !privateArea);
  useEffect(() => {
    const enabled = !privateArea && getAnalyticsConsent() === "accepted";
    setAnalyticsCollectionEnabled(enabled);
    if (enabled) loadGoogleAnalytics();
  }, [privateArea]);
  useEffect(() => { if (!privateArea) trackPageView(`${pathname}${search}`); }, [privateArea, pathname, search]);
  useEffect(() => {
    if (!visible || privateArea) return undefined;
    const previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [visible, privateArea]);
  const accept = () => {
    setAnalyticsConsent("accepted");
    loadGoogleAnalytics();
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_GRANTED_EVENT));
    setVisible(false);
  };
  const reject = () => { setAnalyticsConsent("rejected"); setAnalyticsCollectionEnabled(false); setVisible(false); };
  if (!visible || privateArea) return null;
  return (
    <div className="fixed inset-0 z-[2147483647] min-h-screen min-h-[100dvh] bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center">
      <section ref={dialogRef} style={{ width: "min(100%, 36rem)", boxSizing: "border-box", maxHeight: "calc(100dvh - 2rem)", overflowY: "auto" }} role="dialog" aria-modal="true" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description" className="rounded-3xl border border-white/20 bg-slate-900 p-6 sm:p-8 text-white shadow-2xl">
        <div aria-hidden="true" className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-orange-400/15 text-2xl">🍪</div>
        <h2 id="analytics-consent-title" className="mb-3 text-2xl font-bold">Elegí cómo querés navegar</h2>
        <p id="analytics-consent-description" className="text-sm sm:text-base leading-relaxed text-white/75">Las cookies esenciales permiten que el menú funcione. Si aceptás estadísticas, Google Analytics y Microsoft Clarity nos ayudan a conocer las visitas y mejorar la experiencia. No reciben los datos de tus pedidos.</p>
        <p className="mt-3 text-xs sm:text-sm text-white/55">Podés entrar aunque no aceptes estadísticas. Sin elegir una opción no se puede continuar. <a className="text-white underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacidad de Google</a></p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button autoFocus onClick={reject} className="flex-1 rounded-xl border border-white/35 px-4 py-3 text-sm font-semibold hover:bg-white/10 transition">Continuar solo con esenciales</button>
          <button onClick={accept} className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold hover:bg-orange-400 transition">Aceptar estadísticas</button>
        </div>
      </section>
    </div>
  );
}
