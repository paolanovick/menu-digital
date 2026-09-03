export const ANALYTICS_CONSENT_STORAGE_KEY = "elmenu_analytics_consent_v2";
export const ANALYTICS_CONSENT_GRANTED_EVENT = "elmenu:analytics-consent-granted";
const GOOGLE_ANALYTICS_ID = "G-3CDC6M6EZN";
const SITE_NAME = "El Menú";
const SCRIPT_ID = "elmenu-google-analytics";
const INITIALIZED_KEY = "__elmenuGoogleAnalyticsInitialized";
const LAST_PAGE_KEY = "__elmenuLastAnalyticsPage";
const GA_DISABLE_KEY = `ga-disable-${GOOGLE_ANALYTICS_ID}`;
let sessionConsentDecision = null;
const canUseBrowserApis = () => typeof window !== "undefined" && typeof document !== "undefined";
export function getAnalyticsConsent() { if (!canUseBrowserApis()) return null; try { return localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY); } catch { return sessionConsentDecision; } }
export function setAnalyticsConsent(decision) { sessionConsentDecision = decision; try { localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, decision); } catch { /* La preferencia se conserva durante esta visita. */ } }
export const hasAnalyticsConsent = () => getAnalyticsConsent() === "accepted";
export function setAnalyticsCollectionEnabled(enabled) { if (!canUseBrowserApis()) return; window[GA_DISABLE_KEY] = !enabled; if (!window.clarity) return; window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: enabled ? "granted" : "denied" }); if (!enabled) window.clarity("consent", false); }
export function trackPageView(pagePath) {
  if (!hasAnalyticsConsent() || !window[INITIALIZED_KEY] || typeof window.gtag !== "function") return false;
  const path = (pagePath || location.pathname).split("?")[0];
  if (window[LAST_PAGE_KEY] === path) return false;
  window.gtag("event", "page_view", { page_location: `${location.origin}${path}`, page_path: path, page_title: `${SITE_NAME} | ${document.title}`, content_group: SITE_NAME });
  window[LAST_PAGE_KEY] = path;
  return true;
}
export function loadGoogleAnalytics() {
  if (!hasAnalyticsConsent()) return false;
  setAnalyticsCollectionEnabled(true);
  if (window[INITIALIZED_KEY]) return true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script"); script.id = SCRIPT_ID; script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`; document.head.appendChild(script);
  }
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, content_group: SITE_NAME });
  window[INITIALIZED_KEY] = true; trackPageView(); return true;
}
