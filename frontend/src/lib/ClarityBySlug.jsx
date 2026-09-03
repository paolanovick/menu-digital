import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ANALYTICS_CONSENT_GRANTED_EVENT, hasAnalyticsConsent, setAnalyticsCollectionEnabled } from "./analytics";

const CLARITY_BY_SLUG = {
  tucomida: "xenjk82flp",
};

const loaded = new Set();
const isPrivatePath = (pathname) => /^\/(admin|mozo|superadmin)(\/|$)/.test(pathname)
  || /^\/[^/]+\/admin(\/|$)/.test(pathname);

export default function ClarityBySlug() {
  const { pathname } = useLocation();
  const [consentVersion, setConsentVersion] = useState(0);

  useEffect(() => {
    const handleConsent = () => setConsentVersion((current) => current + 1);
    window.addEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, handleConsent);
    return () => window.removeEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (isPrivatePath(pathname) || !hasAnalyticsConsent()) {
      setAnalyticsCollectionEnabled(false);
      return;
    }
    setAnalyticsCollectionEnabled(true);
    const slug = pathname.split("/").filter(Boolean)[0];
    const projectId = CLARITY_BY_SLUG[slug];
    if (!projectId || loaded.has(projectId)) return;
    loaded.add(projectId);

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", projectId);
    setAnalyticsCollectionEnabled(true);
  }, [pathname, consentVersion]);

  return null;
}
