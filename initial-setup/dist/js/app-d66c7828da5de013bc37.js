webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Df3M");


/***/ }),

/***/ "Df3M":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by steve.gibbings on 26/05/2017.
 */

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const view = 'one of many';

  __webpack_require__("E5bK")(`./${view}`).then(module => {
    module.deafult.init();
  });
});

/***/ }),

/***/ "E5bK":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./view-1": [
		"HD2c",
		2
	],
	"./view-1.js": [
		"HD2c",
		2
	],
	"./view-2": [
		"rprj",
		1
	],
	"./view-2.js": [
		"rprj",
		1
	],
	"./view-3": [
		"m6l3",
		0
	],
	"./view-3.js": [
		"m6l3",
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "E5bK";

/***/ })

},[0]);