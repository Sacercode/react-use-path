import { useState as l } from "react";
const p = (n) => {
  const [r, u] = l([]);
  function s(t) {
    if (t && typeof t == "number") {
      for (var e = [...r]; e.length - 1 !== t; )
        e.pop();
      u(e), typeof n == "function" && n(e);
    } else if (r.length > 0) {
      const f = [...r];
      f.pop(), u(f), typeof n == "function" && n(f);
    }
  }
  function g(t) {
    u(t), typeof n == "function" && n(t);
  }
  function c() {
    u([]), typeof n == "function" && n([]);
  }
  function o(t) {
    if (typeof t == "string" && t.length) {
      let f;
      if (t.startsWith("/") ? (f = [], t = t.substring(1)) : f = [...r], arguments.length > 1)
        for (var e = 0; e < arguments.length; e++) {
          const i = arguments[e];
          f.push(i);
        }
      else typeof t == "string" && t.length > 0 && t.split("/").forEach(
        (i) => {
          i === ".." ? f.pop() : i !== "." && i !== "" && f.push(i);
        }
      );
      u(f), typeof n == "function" && n(f);
    }
  }
  return {
    currentPath: r,
    setCurrentPath: g,
    goTo: o,
    goBack: s,
    goHome: c
  };
};
export {
  p as usePath
};
//# sourceMappingURL=index.es.js.map
