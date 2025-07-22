import { useState as p } from "react";
const h = (e) => {
  const [i, s] = p([]), o = i.join("/");
  function u(t) {
    if (typeof t == "number" && t >= 0) {
      for (var n = [...i]; n.length - 1 > t && n.length > 0; )
        n.pop();
      s(n), typeof e == "function" && e(n);
    } else if (i.length > 0) {
      const f = [...i];
      f.pop(), s(f), typeof e == "function" && e(f);
    }
  }
  function g(t) {
    let n;
    [!1, !0, null, void 0].includes(t) ? n = [] : typeof t == "string" ? n = t === "" ? [] : t.split("/") : typeof t == "number" || typeof t == "bigint" || typeof t == "object" && !Array.isArray(t) ? n = [t] : n = t, s(n), typeof e == "function" && e(n);
  }
  function c() {
    s([]), typeof e == "function" && e([]);
  }
  function l(t) {
    if (typeof t == "string" && t.length) {
      let f;
      if (t.startsWith("/") ? (f = [], t = t.substring(1)) : f = [...i], arguments.length > 1)
        for (var n = 0; n < arguments.length; n++) {
          const r = arguments[n];
          f.push(r);
        }
      else typeof t == "string" && t.length > 0 && t.split("/").forEach(
        (r) => {
          r === ".." ? f.pop() : r !== "." && r !== "" && f.push(r);
        }
      );
      s(f), typeof e == "function" && e(f);
    }
  }
  return {
    currentPath: i,
    currentPathString: o,
    setCurrentPath: g,
    goTo: l,
    goBack: u,
    goHome: c
  };
};
export {
  h as usePath
};
//# sourceMappingURL=index.es.js.map
