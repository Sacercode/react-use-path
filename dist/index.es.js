import { useState as h, useEffect as p } from "react";
const m = (i) => {
  const [f, s] = h([]);
  p(
    () => {
      i && typeof i == "function" && i(f);
    },
    [i, f]
  );
  const o = f.join("/");
  function g(t) {
    if (typeof t == "number" && t >= 0) {
      for (var e = [...f]; e.length - 1 > t && e.length > 0; )
        e.pop();
      s(e);
    } else if (f.length > 0) {
      const n = [...f];
      n.pop(), s(n);
    }
  }
  function u(t) {
    let e;
    [!1, !0, null, void 0].includes(t) ? e = [] : typeof t == "string" ? e = t === "" ? [] : t.split("/") : typeof t == "number" || typeof t == "bigint" || typeof t == "object" && !Array.isArray(t) ? e = [t] : e = t, s(e);
  }
  function c() {
    s([]);
  }
  function l(t) {
    if (typeof t == "string" && t.length) {
      let n;
      if (t.startsWith("/") ? (n = [], t = t.substring(1)) : n = [...f], arguments.length > 1)
        for (var e = 0; e < arguments.length; e++) {
          const r = arguments[e];
          n.push(r);
        }
      else typeof t == "string" && t.length > 0 && t.split("/").forEach(
        (r) => {
          r === ".." ? n.pop() : r !== "." && r !== "" && n.push(r);
        }
      );
      s(n);
    }
  }
  return {
    currentPath: f,
    currentPathString: o,
    setCurrentPath: u,
    goTo: l,
    goBack: g,
    goHome: c
  };
};
export {
  m as usePath
};
//# sourceMappingURL=index.es.js.map
