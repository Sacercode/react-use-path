'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var usePath = function usePath(onMove) {
  var _useState = react.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      currentPath = _useState2[0],
      setCurrentPath = _useState2[1];

  function goBack() {
    if (currentPath.length > 0) {
      var tmp = _toConsumableArray(currentPath);

      tmp.pop();
      setCurrentPath(tmp);
    }
  }

  function customSetCurrentPath(value) {
    setCurrentPath(value);

    if (onMove != undefined) {
      onMove(value);
    }
  }

  function goHome() {
    setCurrentPath([]);
  }

  function goTo(path) {
    if (typeof path === "string" && path.length) {
      var newCurrentPath = _toConsumableArray(currentPath);

      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          var argument = arguments[i];
          newCurrentPath.push(argument);
        }
      } else if (typeof path == "string") {
        path.split("/").forEach(function (ressource) {
          if (ressource === "..") {
            newCurrentPath.pop();
          } else if (ressource !== ".") {
            newCurrentPath.push(ressource);
          }
        });
      }

      setCurrentPath(newCurrentPath);
    }
  }

  return {
    currentPath: currentPath,
    setCurrentPath: customSetCurrentPath,
    goTo: goTo,
    goBack: goBack,
    goHome: goHome
  };
};

exports.usePath = usePath;
//# sourceMappingURL=index.js.map
