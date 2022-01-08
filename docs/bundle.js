/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HomePage.tsx":
/*!**************************!*\
  !*** ./src/HomePage.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HomePage = void 0;
const React = __webpack_require__(/*! react */ "react");
const FlightClass_1 = __webpack_require__(/*! ./enums/FlightClass */ "./src/enums/FlightClass.ts");
const FlightType_1 = __webpack_require__(/*! ./enums/FlightType */ "./src/enums/FlightType.ts");
__webpack_require__(/*! ./styles/HomePage.css */ "./src/styles/HomePage.css");
__webpack_require__(/*! ./styles/theme.css */ "./src/styles/theme.css");
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.selectRoundTrip = () => {
            this.setState({
                flightType: FlightType_1.FlightType.RoundTrip
            });
        };
        this.selectOneWay = () => {
            this.setState({
                flightType: FlightType_1.FlightType.OneWay
            });
        };
        this.toggleMultiCityFlight = () => {
            this.setState({
                isMultiCity: !this.state.isMultiCity
            });
        };
        this.state = {
            flightType: FlightType_1.FlightType.RoundTrip,
            flightClass: FlightClass_1.FlightClass.EconomyClass,
            numTravelers: 1,
            numAdultTravelers: 0,
            numChildTravelers: 0,
            isMultiCity: true
        };
    }
    render() {
        const isRoundTripSelected = this.state.flightType === FlightType_1.FlightType.RoundTrip;
        const roundTripButtonClass = isRoundTripSelected ? 'selected' : '';
        const oneWayButtonClass = !isRoundTripSelected ? 'selected' : '';
        const multiCityButtonClass = this.state.isMultiCity ? 'selected' : '';
        return (React.createElement("div", null,
            React.createElement("header", null,
                React.createElement("div", { className: "banner" },
                    React.createElement("img", { className: "logo", alt: "Dino Travel Logo", src: "../assets/dino_travel_logo.png" }),
                    React.createElement("div", { className: "slogan" },
                        React.createElement("h3", null, "Travel More"))),
                React.createElement("nav", null,
                    React.createElement("button", { className: "nontoggle" }, "support"),
                    React.createElement("button", { className: "nontoggle" }, "about us"),
                    React.createElement("button", { className: "nontoggle" }, "trips"))),
            React.createElement("section", null,
                React.createElement("div", { id: "filterRow" },
                    React.createElement("h1", null, "Search Flights"),
                    React.createElement("div", { className: "flightTypeFilters" },
                        React.createElement("button", { className: roundTripButtonClass, onClick: this.selectRoundTrip }, "Round Trip"),
                        React.createElement("button", { className: oneWayButtonClass, onClick: this.selectOneWay }, "One-Way"),
                        React.createElement("button", { className: multiCityButtonClass, onClick: this.toggleMultiCityFlight }, "Multi-City")),
                    React.createElement("div", { className: "filterDropdowns" },
                        React.createElement("div", { className: "travelersInput" },
                            React.createElement("h3", null, "Number of Adult Travelers:"),
                            React.createElement("input", { type: "number", placeholder: "0", step: 1, max: 10, min: 0 })),
                        React.createElement("div", { className: "travelersInput" },
                            React.createElement("h3", null, "Number of Child Travelers:"),
                            React.createElement("input", { type: "number", placeholder: "0", step: 1, max: 10, min: 0 })),
                        React.createElement("select", null,
                            React.createElement("option", { disabled: true, selected: true }, "Class"),
                            Object.values(FlightClass_1.FlightClass).map(flightClass => (React.createElement("option", null, flightClass)))))),
                React.createElement("div", { id: "userInputRow" },
                    React.createElement("div", { id: "destinationInputs" },
                        React.createElement("input", { className: "leavingInput", placeholder: "Leaving From" }),
                        React.createElement("input", { placeholder: "Going To" })),
                    React.createElement("div", { className: "dateInputContainer" },
                        React.createElement("h3", null, "Departing"),
                        React.createElement("input", { className: "datePicker", type: "date" })),
                    React.createElement("div", { className: "dateInputContainer" },
                        React.createElement("h3", null, "Returning"),
                        React.createElement("input", { className: "datePicker", type: "date" }))),
                React.createElement("button", { className: "nontoggle", id: "submitButton" }, "Submit"))));
    }
}
exports.HomePage = HomePage;


/***/ }),

/***/ "./src/enums/FlightClass.ts":
/*!**********************************!*\
  !*** ./src/enums/FlightClass.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlightClass = void 0;
var FlightClass;
(function (FlightClass) {
    FlightClass["FirstClass"] = "First Class";
    FlightClass["EconomyClass"] = "Economy Class";
    FlightClass["BusinessClass"] = "Business Class";
})(FlightClass = exports.FlightClass || (exports.FlightClass = {}));


/***/ }),

/***/ "./src/enums/FlightType.ts":
/*!*********************************!*\
  !*** ./src/enums/FlightType.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlightType = void 0;
var FlightType;
(function (FlightType) {
    FlightType["OneWay"] = "One Way";
    FlightType["RoundTrip"] = "Round Trip";
})(FlightType = exports.FlightType || (exports.FlightType = {}));


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/HomePage.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/HomePage.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n    font-family: sans-serif;\r\n}\r\n\r\nheader {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n\r\n    margin-bottom: 40px;\r\n}\r\n\r\nheader nav button {\r\n    margin-right: 15px;\r\n}\r\n\r\n.logo {\r\n    width: 170px;\r\n    height: 150px;\r\n    margin-left: 20px;\r\n\r\n    display: inline-block;\r\n    margin-right: 10px;\r\n}\r\n\r\n.slogan {\r\n    display: inline-block;\r\n    align-items: center;\r\n}\r\n\r\nnav {\r\n    display: inline-block;\r\n}\r\n\r\nsection {\r\n    width: 80%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n/*\r\n * Filters Styling\r\n */\r\n\r\n#filterRow {\r\n    display: block;\r\n}\r\n\r\n.flightTypeFilters button {\r\n    width: 112px;\r\n    height: 40px;\r\n    margin-right: 10px;\r\n    font-size: 18px;\r\n}\r\n\r\n.flightTypeFilters {\r\n    display: inline-block;\r\n}\r\n\r\n.filterDropdowns {\r\n    display: inline-block;\r\n    margin-left: 60px;\r\n}\r\n\r\n.filterDropdowns select {\r\n    margin-right: 35px;\r\n}\r\n\r\n#filterRow input {\r\n    height: 35px;\r\n    width: 200px;\r\n}\r\n\r\n#filterRow h3 {\r\n    font-size: 14px;\r\n}\r\n\r\n.travelersInput {\r\n    display: inline-block;\r\n    margin-right: 20px;\r\n}\r\n\r\nsection h1 {\r\n    font-size: 36px;\r\n}\r\n\r\n/*\r\n * User Input Stylings\r\n */\r\n\r\n#destinationInputs {\r\n    display: inline-block;\r\n}\r\n\r\n#userInputRow {\r\n    margin-top: 30px;\r\n}\r\n\r\n#userInputRow input {\r\n    width: 220px;\r\n    border-radius: 3px;\r\n    margin-right: 10px;\r\n}\r\n\r\n#userInputRow .datePicker {\r\n    width: 120px;\r\n}\r\n\r\n#submitButton {\r\n    width: 150px;\r\n}\r\n\r\n.dateInputContainer {\r\n    display: inline-block;\r\n    width: 120px;\r\n    margin-right: 30px;\r\n}\r\n\r\n#userInputRow input {\r\n    margin-right: 40px;\r\n    height: 50px;\r\n}\r\n\r\n#submitButton {\r\n    margin-top: 50px;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/HomePage.css"],"names":[],"mappings":"AAAA;IACI,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;;IAEnB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,iBAAiB;;IAEjB,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,UAAU;IACV,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;;EAEE;;AAEF;IACI,cAAc;AAClB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,YAAY;AAChB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,eAAe;AACnB;;AAEA;;EAEE;;AAEF;IACI,qBAAqB;AACzB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["body {\r\n    font-family: sans-serif;\r\n}\r\n\r\nheader {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n\r\n    margin-bottom: 40px;\r\n}\r\n\r\nheader nav button {\r\n    margin-right: 15px;\r\n}\r\n\r\n.logo {\r\n    width: 170px;\r\n    height: 150px;\r\n    margin-left: 20px;\r\n\r\n    display: inline-block;\r\n    margin-right: 10px;\r\n}\r\n\r\n.slogan {\r\n    display: inline-block;\r\n    align-items: center;\r\n}\r\n\r\nnav {\r\n    display: inline-block;\r\n}\r\n\r\nsection {\r\n    width: 80%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n/*\r\n * Filters Styling\r\n */\r\n\r\n#filterRow {\r\n    display: block;\r\n}\r\n\r\n.flightTypeFilters button {\r\n    width: 112px;\r\n    height: 40px;\r\n    margin-right: 10px;\r\n    font-size: 18px;\r\n}\r\n\r\n.flightTypeFilters {\r\n    display: inline-block;\r\n}\r\n\r\n.filterDropdowns {\r\n    display: inline-block;\r\n    margin-left: 60px;\r\n}\r\n\r\n.filterDropdowns select {\r\n    margin-right: 35px;\r\n}\r\n\r\n#filterRow input {\r\n    height: 35px;\r\n    width: 200px;\r\n}\r\n\r\n#filterRow h3 {\r\n    font-size: 14px;\r\n}\r\n\r\n.travelersInput {\r\n    display: inline-block;\r\n    margin-right: 20px;\r\n}\r\n\r\nsection h1 {\r\n    font-size: 36px;\r\n}\r\n\r\n/*\r\n * User Input Stylings\r\n */\r\n\r\n#destinationInputs {\r\n    display: inline-block;\r\n}\r\n\r\n#userInputRow {\r\n    margin-top: 30px;\r\n}\r\n\r\n#userInputRow input {\r\n    width: 220px;\r\n    border-radius: 3px;\r\n    margin-right: 10px;\r\n}\r\n\r\n#userInputRow .datePicker {\r\n    width: 120px;\r\n}\r\n\r\n#submitButton {\r\n    width: 150px;\r\n}\r\n\r\n.dateInputContainer {\r\n    display: inline-block;\r\n    width: 120px;\r\n    margin-right: 30px;\r\n}\r\n\r\n#userInputRow input {\r\n    margin-right: 40px;\r\n    height: 50px;\r\n}\r\n\r\n#submitButton {\r\n    margin-top: 50px;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/theme.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/theme.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "button {\r\n    background-color: rgb(124, 124, 124);\r\n    color: white;\r\n    height: 50px;\r\n    width: 150px;\r\n    font-size: large;\r\n    border-radius: 7px;\r\n}\r\n\r\n.selected, .nontoggle {\r\n    background-color: rgb(59, 77, 145);\r\n}\r\n\r\nselect {\r\n    height: 40px;\r\n    width: 150px;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/theme.css"],"names":[],"mappings":"AAAA;IACI,oCAAoC;IACpC,YAAY;IACZ,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,YAAY;IACZ,YAAY;AAChB","sourcesContent":["button {\r\n    background-color: rgb(124, 124, 124);\r\n    color: white;\r\n    height: 50px;\r\n    width: 150px;\r\n    font-size: large;\r\n    border-radius: 7px;\r\n}\r\n\r\n.selected, .nontoggle {\r\n    background-color: rgb(59, 77, 145);\r\n}\r\n\r\nselect {\r\n    height: 40px;\r\n    width: 150px;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/styles/HomePage.css":
/*!*********************************!*\
  !*** ./src/styles/HomePage.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_HomePage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./HomePage.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/HomePage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_HomePage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_HomePage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_HomePage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_HomePage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/theme.css":
/*!******************************!*\
  !*** ./src/styles/theme.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_theme_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./theme.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/theme.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_theme_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_theme_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_theme_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_theme_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = ReactDOM;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const HomePage_1 = __webpack_require__(/*! ./HomePage */ "./src/HomePage.tsx");
ReactDOM.render(React.createElement(HomePage_1.HomePage, null), document.getElementById("DinoTravelEntryPoint"));

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map