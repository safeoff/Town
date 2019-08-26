/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CanvasAnimation.ts":
/*!********************************!*\
  !*** ./src/CanvasAnimation.ts ***!
  \********************************/
/*! exports provided: CanvasAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasAnimation\", function() { return CanvasAnimation; });\n/* harmony import */ var _TownMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TownMap */ \"./src/TownMap.ts\");\n\r\n// 街情報を更新し、再描画する。\r\nvar CanvasAnimation = /** @class */ (function () {\r\n    function CanvasAnimation(canvas1, canvas2, canvas3) {\r\n        var _this = this;\r\n        this.canvas1 = canvas1;\r\n        this.canvas2 = canvas2;\r\n        this.canvas3 = canvas3;\r\n        this.a = 0;\r\n        this.ctx1 = this.canvas1.getContext('2d');\r\n        this.ctx2 = this.canvas2.getContext('2d');\r\n        this.ctx3 = this.canvas2.getContext('2d');\r\n        window.requestAnimationFrame(function () { return _this.draw(); });\r\n    }\r\n    // 画面の描画を行う。全体マップに人物の位置と主人公の経路を描画し、\r\n    // 町の情報、および拡大マップを表示する。\r\n    // 拡大マップの具体的な描画に関しては、TownMapを参照のこと。\r\n    CanvasAnimation.prototype.draw = function () {\r\n        var _this = this;\r\n        // 背景の消去\r\n        this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);\r\n        this.ctx2.clearRect(0, 0, this.canvas1.width, this.canvas1.height);\r\n        this.ctx3.clearRect(0, 0, this.canvas1.width, this.canvas1.height);\r\n        // 全体マップの描画\r\n        // 実際のマップの1/8の大きさなので、マップ上の座標を8で割れば\r\n        // 縮小マップにおける表示位置になる。\r\n        // 人物位置描画\r\n        // 主人公の先頭のノードを取得\r\n        // 主人公が目指すノードへの線を描画\r\n        // 主人公の探索経路を描画 while\r\n        // 次のノードが存在するなら線を描画\r\n        // ノードの描画\r\n        // 次のノードに移動\r\n        // 主人公の位置を描画\r\n        // 目的地を描画\r\n        // 表示エリアを表す矩形\r\n        // 街の情報表示\r\n        // 拡大マップの描画\r\n        this.ctx1.fillRect(this.a, 0, 10, 10);\r\n        this.ctx2.fillRect(this.a, 50, 10, 10);\r\n        this.ctx3.fillRect(this.a, 100, 10, 10);\r\n        var townmap = new _TownMap__WEBPACK_IMPORTED_MODULE_0__[\"TownMap\"]();\r\n        this.a = townmap.inca(this.a);\r\n        window.requestAnimationFrame(function () { return _this.draw(); });\r\n    };\r\n    return CanvasAnimation;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/CanvasAnimation.ts?");

/***/ }),

/***/ "./src/TownMap.ts":
/*!************************!*\
  !*** ./src/TownMap.ts ***!
  \************************/
/*! exports provided: TownMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TownMap\", function() { return TownMap; });\n// 町データ管理クラス。画像のロード、マップ画面の描画も担当する。\r\nvar TownMap = /** @class */ (function () {\r\n    // 画像の読み込み、拡大マップ表示用の裏画面の準備、人々の初期化を行う。\r\n    function TownMap() {\r\n    }\r\n    // 通路情報が描かれた縮小マップ画像を返します。\r\n    TownMap.prototype.getStreetImage = function () { };\r\n    // マップ表示用の裏画面を返します。この画面には人々が描画されています。\r\n    TownMap.prototype.getMapImage = function () { };\r\n    // マップを描画します。マップ画面は「背景」「人々」「前景」の3つのレイヤーで構成されます。\r\n    TownMap.prototype.drawMapImage = function () { };\r\n    // 時間を進め、町の人々を移動させます。移動後に人々はY座標でソートされます。\r\n    // また、主人公が中心に来るように、マップのスクロール座標も更新します。\r\n    TownMap.prototype.update = function () { };\r\n    // 主人公を返します。\r\n    TownMap.prototype.getMainPeople = function () { };\r\n    // 人々のリストを返します。\r\n    TownMap.prototype.getPeopleList = function () { };\r\n    // マップのスクロール座標を返します。\r\n    TownMap.prototype.getScreenPos = function () { };\r\n    // 現在のフレームカウントを返します。\r\n    TownMap.prototype.getCounter = function () { };\r\n    // テスト用\r\n    TownMap.prototype.inca = function (a) { return a + 1; };\r\n    TownMap.SOURCE_SIZE = 1;\r\n    TownMap.MAP_W = 1;\r\n    TownMap.MAP_H = 1;\r\n    return TownMap;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/TownMap.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CanvasAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasAnimation */ \"./src/CanvasAnimation.ts\");\n\r\n// Below is the way to call animation\r\nvar canvas1 = document.getElementById('canvas1');\r\nvar canvas2 = document.getElementById('canvas2');\r\nvar canvas3 = document.getElementById('canvas3');\r\nnew _CanvasAnimation__WEBPACK_IMPORTED_MODULE_0__[\"CanvasAnimation\"](canvas1, canvas2, canvas3);\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });