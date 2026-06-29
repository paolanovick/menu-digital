import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CLARITY_BY_SLUG = {
  tucomida: "xenjk82flp",
};

const loaded = new Set();

export default function ClarityBySlug() {
  const { pathname } = useLocation();

  useEffect(() => {
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
  }, [pathname]);

  return null;
}
