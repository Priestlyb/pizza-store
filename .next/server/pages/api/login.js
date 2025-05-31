"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "(api)/./pages/api/login.js":
/*!****************************!*\
  !*** ./pages/api/login.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n\nconst handler = (req, res)=>{\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            message: `Method ${req.method} Not Allowed`\n        });\n    }\n    const { username , password  } = req.body;\n    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {\n        // Set secure HTTP-only cookie\n        res.setHeader(\"Set-Cookie\", cookie__WEBPACK_IMPORTED_MODULE_0___default().serialize(\"token\", process.env.TOKEN, {\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            sameSite: \"strict\",\n            maxAge: 60 * 60,\n            path: \"/\"\n        }));\n        return res.status(200).json({\n            message: \"Login successful\"\n        });\n    }\n    return res.status(401).json({\n        message: \"Invalid credentials\"\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbG9naW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJCO0FBRTNCLEtBQUssQ0FBQ0MsT0FBTyxJQUFJQyxHQUFHLEVBQUVDLEdBQUcsR0FBSyxDQUFDO0lBQzdCLEVBQUUsRUFBRUQsR0FBRyxDQUFDRSxNQUFNLEtBQUssQ0FBTSxPQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDRCxHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO1lBQUNDLE9BQU8sR0FBRyxPQUFPLEVBQUVMLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLFlBQVk7UUFBRSxDQUFDO0lBQzdFLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBQyxDQUFDSSxRQUFRLEdBQUVDLFFBQVEsRUFBQyxDQUFDLEdBQUdQLEdBQUcsQ0FBQ1EsSUFBSTtJQUV2QyxFQUFFLEVBQ0FGLFFBQVEsS0FBS0csT0FBTyxDQUFDQyxHQUFHLENBQUNDLGNBQWMsSUFDdkNKLFFBQVEsS0FBS0UsT0FBTyxDQUFDQyxHQUFHLENBQUNFLGNBQWMsRUFDdkMsQ0FBQztRQUNELEVBQThCO1FBQzlCWCxHQUFHLENBQUNZLFNBQVMsQ0FDWCxDQUFZLGFBQ1pmLHVEQUFnQixDQUFDLENBQU8sUUFBRVcsT0FBTyxDQUFDQyxHQUFHLENBQUNLLEtBQUssRUFBRSxDQUFDO1lBQzVDQyxRQUFRLEVBQUUsSUFBSTtZQUNkQyxNQUFNLEVBbEJkLENBQWEsaUJBa0I0QixDQUFZO1lBQzdDQyxRQUFRLEVBQUUsQ0FBUTtZQUNsQkMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQ2ZDLElBQUksRUFBRSxDQUFHO1FBQ1gsQ0FBQztRQUVILE1BQU0sQ0FBQ25CLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7WUFBQ0MsT0FBTyxFQUFFLENBQWtCO1FBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsTUFBTSxDQUFDSixHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO1FBQUNDLE9BQU8sRUFBRSxDQUFxQjtJQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELGlFQUFlTixPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wLXN0b3JlLy4vcGFnZXMvYXBpL2xvZ2luLmpzP2FlODgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvb2tpZSBmcm9tIFwiY29va2llXCI7XG5cbmNvbnN0IGhhbmRsZXIgPSAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgbWVzc2FnZTogYE1ldGhvZCAke3JlcS5tZXRob2R9IE5vdCBBbGxvd2VkYCB9KTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcblxuICBpZiAoXG4gICAgdXNlcm5hbWUgPT09IHByb2Nlc3MuZW52LkFETUlOX1VTRVJOQU1FICYmXG4gICAgcGFzc3dvcmQgPT09IHByb2Nlc3MuZW52LkFETUlOX1BBU1NXT1JEXG4gICkge1xuICAgIC8vIFNldCBzZWN1cmUgSFRUUC1vbmx5IGNvb2tpZVxuICAgIHJlcy5zZXRIZWFkZXIoXG4gICAgICBcIlNldC1Db29raWVcIixcbiAgICAgIGNvb2tpZS5zZXJpYWxpemUoXCJ0b2tlblwiLCBwcm9jZXNzLmVudi5UT0tFTiwge1xuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICAgIHNhbWVTaXRlOiBcInN0cmljdFwiLFxuICAgICAgICBtYXhBZ2U6IDYwICogNjAsIC8vIDEgaG91clxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBcIkxvZ2luIHN1Y2Nlc3NmdWxcIiB9KTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBjcmVkZW50aWFsc1wiIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjtcbiJdLCJuYW1lcyI6WyJjb29raWUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiYm9keSIsInByb2Nlc3MiLCJlbnYiLCJBRE1JTl9VU0VSTkFNRSIsIkFETUlOX1BBU1NXT1JEIiwic2V0SGVhZGVyIiwic2VyaWFsaXplIiwiVE9LRU4iLCJodHRwT25seSIsInNlY3VyZSIsInNhbWVTaXRlIiwibWF4QWdlIiwicGF0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/login.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/login.js"));
module.exports = __webpack_exports__;

})();