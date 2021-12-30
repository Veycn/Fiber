/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/CreateElement/index.js":
/*!******************************************!*\
  !*** ./src/react/CreateElement/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var childElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    // true false null 这些值在 react 中是不会渲染到 html 的
    if (child !== true && child !== false && child !== null) {
      if (child instanceof Object) {
        // 如果是一个对象， 则说明原来是一个 <span>aaa</span> 结构，babel已经转换为 vDOM了
        result.push(child);
      } else {
        // 如果是一个文本，需要转换为 vDOM 的结构
        result.push(createElement('text', {
          textContent: child
        }));
      }
    }

    return result;
  }, []);

  return {
    type: type,
    // 将父级元素传递过来的 children 合并到 props 上
    props: Object.assign({
      children: childElements
    }, props) // children: childElements

  };
}

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDOMElement)
/* harmony export */ });
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");

function createDOMElement(virtualDOM) {
  var newElement = null;

  if (virtualDOM.type === 'text') {
    // 文本节点，调用 createTextElement
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点，调用 createElement
    newElement = document.createElement(virtualDOM.type);
    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__["default"])(newElement, virtualDOM);
  }

  return newElement;
}

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "updateNodeElement": () => (/* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");



/***/ }),

/***/ "./src/react/DOM/updateNodeElement.js":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateNodeElement)
/* harmony export */ });
function updateNodeElement(newElement, virtualDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var newProps = virtualDOM.props || {};
  var oldProps = oldVirtualDOM.props || {};
  Object.keys(newProps).forEach(function (propName) {
    // 获取存储在 props 中的属性值
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // 判断是否是事件属性 onClick => click
      if (propName.slice(0, 2) === 'on') {
        // 拿到 事件名称 'click'
        var eventName = propName.toLowerCase().slice(2); // 给元素添加事件监听

        newElement.addEventListener(eventName, newPropsValue); // addEventListener 可以添加多个监听
        // 在此处如果更新元素的事件，要移除之前的事件处理函数

        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === 'value' || propName === 'checked') {
        // 如果属性名称是表单相关的 value 或这 checked
        // 通过 ele.value = xx 的方式设置
        newElement[propName] = newPropsValue;
      } else if (propName !== 'children') {
        /**
         * children 也在 props 属性中，children 会在上一层做处理，
         * 这里只对某个 native 元素做处理，添加事件、属性等
         */
        // 如果属性名是 className 则给元素设置 class
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue);
        } else {
          // 其他熟悉则通过 setAttribute 直接设置
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });
  /**
   * 如何判断属性被删除？
   * 这里有两个 virtualDOM，一个新的一个旧的
   * 被删除的属性，在 newProps 中没有，oldProps 中存在
   * 因此，两相对比可以直到某个属性是否被删除
   * - 如果被删除的属性是事件， removeEventListener 移除之
   * - 如果被删除的属性是'属性'，removeAttribute 移除之
   */
  // 处理属性被删除的情况

  Object.keys(oldProps).forEach(function (propName) {
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (!newPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === 'on') {
        // 如果是事件，移除对应的事件监听
        var eventName = propName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propName !== 'children') {
        // 这里一样要排除 children 的情况
        newElement.removeAttribute(propName);
      }
    }
  });
}

/***/ }),

/***/ "./src/react/Misc/Arrayed/index.js":
/*!*****************************************!*\
  !*** ./src/react/Misc/Arrayed/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (arg) {
  return Array.isArray(arg) ? arg : [arg];
});

/***/ }),

/***/ "./src/react/Misc/CreateStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");


var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createTaskQueue = function createTaskQueue() {
  var taskQueue = [];
  return {
    push: function push(item) {
      return taskQueue.push(item);
    },
    pop: function pop() {
      return taskQueue.shift();
    },
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTaskQueue);

/***/ }),

/***/ "./src/react/Misc/GetTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/GetTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getTag = function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTaskQueue": () => (/* reexport safe */ _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrayed": () => (/* reexport safe */ _Arrayed__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "createStateNode": () => (/* reexport safe */ _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "getTag": () => (/* reexport safe */ _GetTag__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrayed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrayed */ "./src/react/Misc/Arrayed/index.js");
/* harmony import */ var _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateStateNode */ "./src/react/Misc/CreateStateNode/index.js");
/* harmony import */ var _GetTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GetTag */ "./src/react/Misc/GetTag/index.js");





/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ "./src/react/CreateElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _CreateElement__WEBPACK_IMPORTED_MODULE_0__["default"],
  render: _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");

/**
 * 任务：为每一个节点构建 fiber 对象
 *
 */

var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();
var subTask = null;

var getFirstTask = function getFirstTask() {
  // 获取任务
  var task = taskQueue.pop(); // 返回最外层节点的 fiber 对象

  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  };
};
/**
 * fiber 子节点的构建原则
 * - 抵达左侧的叶子节点
 * - 首先判断这个节点有没有同级，有则构建同级，无则退回父级， 重复此步骤，直到回到根节点
 *
 */


var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children 可能是对象或者数组
   * 如果是对象，放入数组中返回
   */
  var arrayedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.arrayed)(children);
  var index = 0;
  var numberOfElements = arrayedChildren.length;
  var element = null;
  var newFiber = null;
  var prevFiber = null;

  while (index < numberOfElements) {
    element = arrayedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
      effects: [],
      effectTag: 'placement',
      stateNode: null,
      parent: fiber
    };
    newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber); // 在 fiber 中，只有第一个是父级的子节点，其他的子节点都应该是第一个子节点的兄弟节点

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;
    index++;
  }

  console.log(fiber);
};

var executeTask = function executeTask(fiber) {
  /**
   * 构建子级 fiber 对象
   */
  reconcileChildren(fiber, fiber.props.children);
  /**
   * 如果子级存在，返回子级
   * 将这个子级当作父级，构建这个父级下的子级
   */

  if (fiber.child) {
    return fiber.child;
  }

  var currentExecutingFiber = fiber;

  while (currentExecutingFiber.parent) {
    /**
     * 没有子节点则判断有无同级
     * 有同级则返回同级
     */
    if (currentExecutingFiber.sibling) {
      return currentExecutingFiber.sibling;
    } // 没有同级之后回退到当前节点的父节点


    currentExecutingFiber = currentExecutingFiber.parent;
  }
};

var workLoop = function workLoop(deadline) {
  /**
   * 任务不存在，则去队列中获取
   */
  if (!subTask) {
    subTask = getFirstTask();
  }
  /**
   * 有任务其浏览器有空闲时间
   * 调用 executeTask 执行
   */


  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
};

var performTask = function performTask(deadline) {
  // 执行任务
  workLoop(deadline); // 判断任务是否存在，队列里面是否还有未执行任务
  // 如果有则让浏览器继续在空闲事件执行

  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};

var render = function render(element, dom) {
  /**
   * 1、向任务队列中添加任务
   * 2、指定在浏览器空闲的时候执行
   *
   * 任务：通过 vdom 构建 fiber 对象
   */
  taskQueue.push({
    dom: dom,
    props: {
      children: element
    }
  });
  requestIdleCallback(performTask);
};

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");
/* harmony import */ var _react_reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react/reconciliation */ "./src/react/reconciliation/index.js");


var root = document.getElementById('root');
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React Fiber"));
(0,_react_reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)(jsx, root);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map