/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/quiz.ts":
/*!*********************!*\
  !*** ./src/quiz.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Quiz\": () => (/* binding */ Quiz)\n/* harmony export */ });\n/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ \"./src/random.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n// DOM \nvar question = document.getElementById('question');\nvar resChoices = document.getElementById('resChoices');\nvar questionNum = document.getElementById('question-num');\nvar questionMain = document.getElementById('question-main');\nfunction getQuiz(url) {\n    return __awaiter(this, void 0, void 0, function () {\n        var res, resQuiz;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4 /*yield*/, fetch(url)];\n                case 1:\n                    res = _a.sent();\n                    return [4 /*yield*/, res.json()];\n                case 2:\n                    resQuiz = _a.sent();\n                    return [2 /*return*/, resQuiz];\n            }\n        });\n    });\n}\n// const quiz:QuizData = await getQuiz(\"https://hiroshin67.com/api/quizApi.php\");\nvar Quiz = /** @class */ (function () {\n    function Quiz(url, quizLen) {\n        this.quizCnt = 0;\n        this.quizLen = quizLen;\n        this.quizNumArray = (0,_random__WEBPACK_IMPORTED_MODULE_0__.makeRandomNumArray)(1, 11, this.quizLen);\n        this.quizUrl = url;\n        this.isAnswer = false;\n    }\n    // クイズデータを取得\n    Quiz.prototype.getQuiz = function (url, num) {\n        return __awaiter(this, void 0, void 0, function () {\n            var res, resQuiz;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, fetch(url)];\n                    case 1:\n                        res = _a.sent();\n                        return [4 /*yield*/, res.json()];\n                    case 2:\n                        resQuiz = _a.sent();\n                        return [2 /*return*/, resQuiz];\n                }\n            });\n        });\n    };\n    Quiz.prototype.makeChoices = function (quiz) {\n        var _this = this;\n        Object.keys(quiz.choices).forEach(function (key) {\n            var choiceList = document.createElement(\"button\");\n            choiceList.innerText = quiz.choices[key];\n            resChoices.appendChild(choiceList);\n            choiceList.id = key;\n            choiceList.value = quiz.choices[key];\n            choiceList.addEventListener(\"click\", function () {\n                _this.isAnswer = true;\n            });\n        });\n    };\n    // クイズを表示する\n    Quiz.prototype.displayQuestion = function (quiz) {\n        //  クイズデータ取得\n        // const quiz:QuizData = await this.getQuiz(this.quizUrl, this.quizNumArray[this.quizCnt]);\n        //  クイズ表示\n        questionNum.innerText = \"Q.\" + this.quizCnt;\n        questionMain.innerText = quiz.question;\n    };\n    Quiz.prototype.displayMaruBatsu = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/];\n            });\n        });\n    };\n    return Quiz;\n}());\n\nvar quiz = new Quiz(\"https://hiroshin67.com/api/quizApi.php\", 10);\nquestion.innerHTML = \"Hello\";\n\n\n//# sourceURL=webpack://typescript/./src/quiz.ts?");

/***/ }),

/***/ "./src/random.ts":
/*!***********************!*\
  !*** ./src/random.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeRandomNum\": () => (/* binding */ makeRandomNum),\n/* harmony export */   \"makeRandomNumArray\": () => (/* binding */ makeRandomNumArray)\n/* harmony export */ });\nfunction makeRandomNum(maxNum) {\n    return Math.floor(Math.random() * maxNum);\n}\nfunction makeRandomNumArray(minNum, maxNum, generateLen) {\n    var numArray = [];\n    var randomArray = [];\n    var generatedRandomArray = [];\n    for (var i = minNum; i <= maxNum; i++) {\n        numArray.push(i);\n    }\n    for (var j = 0, len = numArray.length; j < numArray.length; j++, len--) {\n        var randomNumber = makeRandomNum(len);\n        randomArray.push(numArray[randomNumber]);\n        numArray[randomNumber] = numArray[len - 1];\n    }\n    for (var index = 0; index < generateLen; index++) {\n        generatedRandomArray.push(randomArray[index]);\n    }\n    return generatedRandomArray;\n}\n\n\n//# sourceURL=webpack://typescript/./src/random.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/quiz.ts");
/******/ 	
/******/ })()
;