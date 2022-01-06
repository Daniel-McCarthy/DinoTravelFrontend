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
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Test")));
    }
}
exports.HomePage = HomePage;


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
/******/ 			// no module.id needed
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