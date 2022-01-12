/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/Component/index.js":
/*!**************************************!*\
  !*** ./src/react/Component/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reconciliation */ "./src/react/reconciliation/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(partialState) {
      (0,_reconciliation__WEBPACK_IMPORTED_MODULE_0__.scheduleUpdate)(this, partialState);
    }
  }]);

  return Component;
}();



/***/ }),

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
  /**
   * 增加文本处理能力
   * 当文本被替换的时候，不只是替换文本
   * 可能文本的容器从原来的 p 标签修改为了 span 或者 div 或者其他
   * 此时如果调用 replaceChild 去替换 text 会导致意料之外的异常
   */

  if (virtualDOM.type === 'text') {
    if (newProps.textContent !== oldProps.textContent) {
      // 如果新节点的父级的类型 与 旧节点的父级的类型 不一致
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));
      } else {
        // 父级类型一直才能直接 replace
        virtualDOM.parent.stateNode.replaceChild(document.createTextNode(newProps.textContent), oldVirtualDOM.stateNode);
      }
    }

    return;
  }

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
   * 因此，两相对比可以知道某个属性是否被删除
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

/***/ "./src/react/Misc/CreateReactInstance/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Misc/CreateReactInstance/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createReactInstance = function createReactInstance(fiber) {
  var instance = null;

  if (fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props);
  } else {
    instance = fiber.type;
  }

  return instance;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createReactInstance);

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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/react/Misc/index.js");



var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  } else {
    return (0,_index__WEBPACK_IMPORTED_MODULE_1__.createReactInstance)(fiber);
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

/***/ "./src/react/Misc/GetRoot/index.js":
/*!*****************************************!*\
  !*** ./src/react/Misc/GetRoot/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getRoot = function getRoot(instance) {
  var fiber = instance.__fiber;

  while (fiber.parent) {
    fiber = fiber.parent;
  }

  return fiber;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRoot);

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
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/react/Component/index.js");


var getTag = function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  } else if (Object.getPrototypeOf(vdom.type) === _Component__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    return 'class_component';
  } else {
    return 'function_component';
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
/* harmony export */   "getTag": () => (/* reexport safe */ _GetTag__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "createReactInstance": () => (/* reexport safe */ _CreateReactInstance__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "getRoot": () => (/* reexport safe */ _GetRoot__WEBPACK_IMPORTED_MODULE_5__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrayed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrayed */ "./src/react/Misc/Arrayed/index.js");
/* harmony import */ var _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateStateNode */ "./src/react/Misc/CreateStateNode/index.js");
/* harmony import */ var _GetTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GetTag */ "./src/react/Misc/GetTag/index.js");
/* harmony import */ var _CreateReactInstance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CreateReactInstance */ "./src/react/Misc/CreateReactInstance/index.js");
/* harmony import */ var _GetRoot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GetRoot */ "./src/react/Misc/GetRoot/index.js");







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
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "./src/react/Component/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _CreateElement__WEBPACK_IMPORTED_MODULE_0__["default"],
  render: _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render,
  Component: _Component__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "scheduleUpdate": () => (/* binding */ scheduleUpdate)
/* harmony export */ });
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM */ "./src/react/DOM/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * 阶段一的任务：为每一个节点构建 fiber 对象
 * 阶段二的任务：将所有的 fiber 对象构建完成之后加入最外层fiber的effects数组中
 */

var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();
var subTask = null;
var pendingCommit = null;

var commitAllWork = function commitAllWork(fiber) {
  /**
   * 所有的节点变化都被收集到了 effects 中
   * 各个节点的层级被抹平了
   * 但是因为 fiber 元素中存储了 parent、sibling这些信息
   * 所以即使层级被抹平了，也不会影响到节点的更新、删除、修改
   */
  fiber.effects.forEach(function (child) {
    if (child.tag === 'class_component') {
      // 将类组件的 fiber 备份到实例身上，后续类组件状态更新使用
      child.stateNode.__fiber = child;
    }

    if (child.effectTag === 'delete') {
      child.parent.stateNode.removeChild(child.stateNode);
    } else if (child.effectTag === 'update') {
      if (child.type === child.alternate.type) {
        // 节点类型相同
        (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.updateNodeElement)(child.stateNode, child, child.alternate);
      } else {
        // 节点类型不同, 用新的节点去替换掉原来的旧节点
        child.parent.stateNode.replaceChild(child.stateNode, child.alternate.stateNode);
      }
    } else if (child.effectTag === 'placement') {
      var _fiber = child;
      var parentFiber = child.parent;
      /**
       * 如果当前child 是类组件的最外层节点，假设是A
       * 它不能被挂载到 <A/> 上，应该被挂载到 A 的父级 html 标签(host_component)
       * 如果多个组件嵌套，那就一直往上找
       */

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (_fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(child.stateNode);
      }
    }
  });
  /**
   * 备份旧的 fiber
   */

  fiber.stateNode.__rootFiberContainer = fiber;
  console.log(fiber);
};

var getFirstTask = function getFirstTask() {
  // 获取任务
  var task = taskQueue.pop();

  if (task.from === 'class_component') {
    // task.instance.__fiber
    var root = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getRoot)(task.instance);
    console.log(root);
    task.instance.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: 'host_root',
      effects: [],
      child: null,
      alternate: root
    };
  } // 返回最外层节点的 fiber 对象


  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
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
  var newFiber = null;
  var prevFiber = null;
  var element = null;
  var alternate = null;
  /**
   * element 和 alternate 一一对应新旧节点
   * 如果 fiber 存在 alternate，说明这个 fiber 有备份
   */

  if (fiber.alternate && fiber.alternate.child) {
    // fiber 的 child 是第一个子节点
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements || alternate) {
    element = arrayedChildren[index];

    if (!element && alternate) {
      alternate.effectTag = 'delete';
      fiber.effects.push(alternate);
    } else if (element && alternate) {
      // 更新
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
        effects: [],
        effectTag: 'update',
        stateNode: null,
        parent: fiber,
        alternate: alternate
      };

      if (element.type === alternate.type) {
        // 更新的节点与之前的类型相同
        // 将 alternate.stateNode
        newFiber.stateNode = alternate.stateNode;
      } else {
        // 更新的节点与之前的类型不同，重新创建一个节点
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // 初次渲染
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
        effects: [],
        effectTag: 'placement',
        stateNode: null,
        parent: fiber
      };
      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);
    } // 在 fiber 中，只有第一个是父级的子节点，其他的子节点都应该是第一个子节点的兄弟节点


    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevFiber.sibling = newFiber;
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;
    index++;
  }
};

var executeTask = function executeTask(fiber) {
  /**
   * 构建子级 fiber 对象
   */
  if (fiber.tag === 'class_component') {
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = _objectSpread(_objectSpread({}, fiber.stateNode.state), fiber.state.__fiber.partialState);
    }

    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }
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
     * 从左侧的最后一个父节点开始
     * 把所有子节点的 fiber 对对象收集到这个父节点的 effects 数组中
     * 直到退回根节点，这个根节点的 effects 数组中会有所有的 fiber
     */
    currentExecutingFiber.parent.effects = currentExecutingFiber.parent.effects.concat(currentExecutingFiber.effects.concat([currentExecutingFiber]));
    /**
     * 没有子节点则判断有无同级
     * 有同级则返回同级
     */

    if (currentExecutingFiber.sibling) {
      return currentExecutingFiber.sibling;
    } // 没有同级之后回退到当前节点的父节点


    currentExecutingFiber = currentExecutingFiber.parent;
  }

  pendingCommit = currentExecutingFiber;
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

  if (pendingCommit) {
    commitAllWork(pendingCommit);
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
var scheduleUpdate = function scheduleUpdate(instance, partialState) {
  taskQueue.push({
    from: 'class_component',
    instance: instance,
    partialState: partialState
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
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./react/Component */ "./src/react/Component/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var root = document.getElementById('root');
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
  style: "color: red"
}, "\u2665")));
var jsx2 = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Fiber 111"))); // render(jsx, root)

var Greeting = /*#__PURE__*/function (_Component) {
  _inherits(Greeting, _Component);

  var _super = _createSuper(Greeting);

  function Greeting(props) {
    var _this;

    _classCallCheck(this, Greeting);

    _this = _super.call(this, props);
    _this.state = {
      name: 'zs'
    };
    return _this;
  }

  _createClass(Greeting, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, this.props.title, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, " ", this.state.name), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.setState({
            name: 'ls'
          });
        }
      }, "\u70B9\u6211\u4FEE\u6539\u72B6\u6001"));
    }
  }]);

  return Greeting;
}(_react_Component__WEBPACK_IMPORTED_MODULE_2__["default"]);

(0,_react_reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)( /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(Greeting, {
  title: "\u5965\u529B\u7ED9"
}), root);

function FunctionComponent(props) {
  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, props.title, ", FunctionComponent");
} // render(<FunctionComponent title="Hello"/>, root)
// render(jsx, root)
// setTimeout(() => {
//     render(jsx2, root)
// }, 2000)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map