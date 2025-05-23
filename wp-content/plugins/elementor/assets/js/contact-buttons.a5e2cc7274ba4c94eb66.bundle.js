/*! elementor - v3.25.0 - 13-11-2024 */
(self["webpackChunkelementor"] = self["webpackChunkelementor"] || []).push([["contact-buttons"],{

/***/ "../modules/floating-buttons/assets/js/floating-buttons/frontend/handlers/contact-buttons.js":
/*!***************************************************************************************************!*\
  !*** ../modules/floating-buttons/assets/js/floating-buttons/frontend/handlers/contact-buttons.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _base = _interopRequireDefault(__webpack_require__(/*! elementor-frontend/handlers/base */ "../assets/dev/js/frontend/handlers/base.js"));
var _clickTracking = _interopRequireDefault(__webpack_require__(/*! ../../../shared/frontend/handlers/click-tracking */ "../modules/floating-buttons/assets/js/shared/frontend/handlers/click-tracking.js"));
class ContactButtonsHandler extends _base.default {
  getDefaultSettings() {
    return {
      selectors: {
        main: '.e-contact-buttons',
        content: '.e-contact-buttons__content',
        contentWrapper: '.e-contact-buttons__content-wrapper',
        chatButton: '.e-contact-buttons__chat-button',
        closeButton: '.e-contact-buttons__close-button',
        messageBubbleTime: '.e-contact-buttons__message-bubble-time'
      },
      constants: {
        entranceAnimation: 'style_chat_box_entrance_animation',
        exitAnimation: 'style_chat_box_exit_animation',
        chatButtonAnimation: 'style_chat_button_animation',
        animated: 'animated',
        animatedWrapper: 'animated-wrapper',
        visible: 'visible',
        reverse: 'reverse',
        hidden: 'hidden',
        hasAnimations: 'has-animations',
        hasEntranceAnimation: 'has-entrance-animation',
        none: 'none'
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      main: this.$element[0].querySelector(selectors.main),
      content: this.$element[0].querySelector(selectors.content),
      contentWrapper: this.$element[0].querySelector(selectors.contentWrapper),
      chatButton: this.$element[0].querySelector(selectors.chatButton),
      closeButton: this.$element[0].querySelector(selectors.closeButton),
      messageBubbleTime: this.$element[0].querySelector(selectors.messageBubbleTime)
    };
  }
  getResponsiveSetting(controlName) {
    const currentDevice = elementorFrontend.getCurrentDeviceMode();
    return elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(), controlName, '', currentDevice);
  }
  bindEvents() {
    if (this.elements.closeButton) {
      this.elements.closeButton.addEventListener('click', this.closeChatBox.bind(this));
    }
    if (this.elements.chatButton) {
      this.elements.chatButton.addEventListener('click', this.onChatButtonClick.bind(this));
      this.elements.chatButton.addEventListener('animationend', this.removeChatButtonAnimationClasses.bind(this));
    }
    if (this.elements.content) {
      this.elements.content.addEventListener('animationend', this.removeAnimationClasses.bind(this));
    }
    if (this.elements.contentWrapper) {
      window.addEventListener('keyup', this.onDocumentKeyup.bind(this));
    }
  }
  contentWrapperIsHidden(hide) {
    if (!this.elements.contentWrapper) {
      return false;
    }
    const {
      hidden
    } = this.getSettings('constants');

    // Set current state
    if (true === hide) {
      this.elements.contentWrapper.classList.add(hidden);
      this.elements.contentWrapper.setAttribute('aria-hidden', 'true');
      return;
    }
    if (false === hide) {
      this.elements.contentWrapper.classList.remove(hidden);
      this.elements.contentWrapper.setAttribute('aria-hidden', 'false');
      return;
    }

    // Get current state
    return this.elements.contentWrapper.classList.contains(hidden);
  }
  onDocumentKeyup(event) {
    // Bail if not ESC key
    if (event.keyCode !== 27 || !this.elements.main) {
      return;
    }

    /* eslint-disable @wordpress/no-global-active-element */
    if (!this.contentWrapperIsHidden() && this.elements.main.contains(document.activeElement)) {
      this.closeChatBox();
    }
    /* eslint-enable @wordpress/no-global-active-element */
  }

  removeAnimationClasses() {
    if (!this.elements.content) {
      return;
    }
    const {
      reverse,
      entranceAnimation,
      exitAnimation,
      animated,
      visible
    } = this.getSettings('constants');
    const isExitAnimation = this.elements.content.classList.contains(reverse),
      openAnimationClass = this.getResponsiveSetting(entranceAnimation),
      exitAnimationClass = this.getResponsiveSetting(exitAnimation);
    if (isExitAnimation) {
      this.elements.content.classList.remove(animated);
      this.elements.content.classList.remove(reverse);
      if (exitAnimationClass) {
        this.elements.content.classList.remove(exitAnimationClass);
      }
      this.elements.content.classList.remove(visible);
    } else {
      this.elements.content.classList.remove(animated);
      if (openAnimationClass) {
        this.elements.content.classList.remove(openAnimationClass);
      }
      this.elements.content.classList.add(visible);
    }
  }
  chatBoxEntranceAnimation() {
    const {
      entranceAnimation,
      animated,
      animatedWrapper,
      none
    } = this.getSettings('constants');
    const entranceAnimationControl = this.getResponsiveSetting(entranceAnimation);
    if (!entranceAnimationControl || none === entranceAnimationControl) {
      return;
    }
    if (this.elements.content) {
      this.elements.content.classList.add(animated);
      this.elements.content.classList.add(entranceAnimationControl);
    }
    if (this.elements.contentWrapper) {
      this.elements.contentWrapper.classList.remove(animatedWrapper);
    }
  }
  chatBoxExitAnimation() {
    const {
      reverse,
      exitAnimation,
      animated,
      animatedWrapper,
      none
    } = this.getSettings('constants');
    const exitAnimationControl = this.getResponsiveSetting(exitAnimation);
    if (!exitAnimationControl || none === exitAnimationControl) {
      return;
    }
    if (this.elements.content) {
      this.elements.content.classList.add(animated);
      this.elements.content.classList.add(reverse);
      this.elements.content.classList.add(exitAnimationControl);
    }
    if (this.elements.contentWrapper) {
      this.elements.contentWrapper.classList.add(animatedWrapper);
    }
  }
  openChatBox() {
    const {
      hasAnimations,
      visible
    } = this.getSettings('constants');
    if (this.elements.main && this.elements.main.classList.contains(hasAnimations)) {
      this.chatBoxEntranceAnimation();
    } else if (this.elements.content) {
      this.elements.content.classList.add(visible);
    }
    if (this.elements.contentWrapper) {
      this.contentWrapperIsHidden(false);
      if (!elementorFrontend.isEditMode()) {
        this.elements.contentWrapper.setAttribute('tabindex', '0');
        this.elements.contentWrapper.focus({
          focusVisible: true
        });
      }
    }
    if (this.elements.chatButton) {
      this.elements.chatButton.setAttribute('aria-expanded', 'true');
    }
    if (this.elements.closeButton) {
      this.elements.closeButton.setAttribute('aria-expanded', 'true');
    }
  }
  closeChatBox() {
    const {
      hasAnimations,
      visible
    } = this.getSettings('constants');
    if (this.elements.main && this.elements.main.classList.contains(hasAnimations)) {
      this.chatBoxExitAnimation();
    } else if (this.elements.content) {
      this.elements.content.classList.remove(visible);
    }
    if (this.elements.contentWrapper) {
      this.contentWrapperIsHidden(true);
    }
    if (this.elements.chatButton) {
      this.elements.chatButton.setAttribute('aria-expanded', 'false');
      this.elements.chatButton.focus({
        focusVisible: true
      });
    }
    if (this.elements.closeButton) {
      this.elements.closeButton.setAttribute('aria-expanded', 'false');
    }
  }
  onChatButtonClick() {
    if (this.elements.contentWrapper && this.contentWrapperIsHidden()) {
      this.openChatBox();
    } else {
      this.closeChatBox();
    }
  }
  initMessageBubbleTime() {
    if (!this.elements.messageBubbleTime) {
      return;
    }
    const messageBubbleTimeFormat = this.elements.messageBubbleTime.dataset.timeFormat;
    const is12hFormat = '12h' === messageBubbleTimeFormat;
    this.elements.messageBubbleTime.innerHTML = new Intl.DateTimeFormat('default', {
      hour12: is12hFormat,
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date());
  }
  removeChatButtonAnimationClasses() {
    if (!this.elements.chatButton) {
      return;
    }
    const {
      chatButtonAnimation,
      visible
    } = this.getSettings('constants');
    this.elements.chatButton.classList.remove(chatButtonAnimation);
    this.elements.chatButton.classList.add(visible);
  }
  initChatButtonEntranceAnimation() {
    const {
      none,
      chatButtonAnimation
    } = this.getSettings('constants');
    const entranceAnimationControl = this.getResponsiveSetting(chatButtonAnimation);
    if (!entranceAnimationControl || none === entranceAnimationControl) {
      return;
    }
    this.elements.chatButton.classList.add(entranceAnimationControl);
  }
  initDefaultState() {
    // Manage accessibility
    if (this.elements.contentWrapper) {
      const isHidden = this.contentWrapperIsHidden();
      if (this.elements.chatButton) {
        this.elements.chatButton.setAttribute('aria-expanded', !isHidden);
      }
      if (this.elements.closeButton) {
        this.elements.closeButton.setAttribute('aria-expanded', !isHidden);
      }
    }
    if (elementorFrontend.isEditMode() && 'floating-buttons' === elementor?.config?.document?.type) {
      this.openChatBox();
    }
  }
  setupInnerContainer() {
    this.elements.main.closest('.e-con-inner').classList.add('e-con-inner--floating-buttons');
  }
  onInit() {
    const {
      hasEntranceAnimation
    } = this.getSettings('constants');
    super.onInit(...arguments);
    this.clickTrackingHandler = new _clickTracking.default({
      $element: this.$element
    });
    if (this.elements.messageBubbleTime) {
      this.initMessageBubbleTime();
    }
    this.initDefaultState();
    if (this.elements.chatButton) {
      if (this.elements.chatButton.classList.contains(hasEntranceAnimation)) {
        this.initChatButtonEntranceAnimation();
      }
    }
    this.setupInnerContainer();
  }
}
exports["default"] = ContactButtonsHandler;

/***/ }),

/***/ "../modules/floating-buttons/assets/js/shared/frontend/handlers/click-tracking.js":
/*!****************************************************************************************!*\
  !*** ../modules/floating-buttons/assets/js/shared/frontend/handlers/click-tracking.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _base = _interopRequireDefault(__webpack_require__(/*! elementor-frontend/handlers/base */ "../assets/dev/js/frontend/handlers/base.js"));
class ClickTrackingHandler extends _base.default {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "clicks", []);
  }
  getDefaultSettings() {
    return {
      selectors: {
        contentWrapper: '.e-contact-buttons__content-wrapper',
        contactButtonCore: '.e-contact-buttons__send-button',
        contentWrapperFloatingBars: '.e-floating-bars',
        floatingBarCTAButton: '.e-floating-bars__cta-button',
        elementorWrapper: '[data-elementor-type="floating-buttons"]'
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      contentWrapper: this.$element[0].querySelector(selectors.contentWrapper),
      contentWrapperFloatingBars: this.$element[0].querySelector(selectors.contentWrapperFloatingBars)
    };
  }
  bindEvents() {
    if (this.elements.contentWrapper) {
      this.elements.contentWrapper.addEventListener('click', this.onChatButtonTrackClick.bind(this));
    }
    if (this.elements.contentWrapperFloatingBars) {
      this.elements.contentWrapperFloatingBars.addEventListener('click', this.onChatButtonTrackClick.bind(this));
    }
    window.addEventListener('beforeunload', () => {
      if (this.clicks.length > 0) {
        this.sendClicks();
      }
    });
  }
  onChatButtonTrackClick(event) {
    const targetElement = event.target || event.srcElement;
    const selectors = this.getSettings('selectors');
    if (targetElement.matches(selectors.contactButtonCore) || targetElement.closest(selectors.contactButtonCore) || targetElement.matches(selectors.floatingBarCTAButton) || targetElement.closest(selectors.floatingBarCTAButton)) {
      this.getDocumentIdAndTrack(targetElement, selectors);
    }
  }
  getDocumentIdAndTrack(targetElement, selectors) {
    const documentId = targetElement.closest(selectors.elementorWrapper).dataset.elementorId;
    this.trackClick(documentId);
  }
  trackClick(documentId) {
    if (!documentId) {
      return;
    }
    this.clicks.push(documentId);
    if (this.clicks.length >= 10) {
      this.sendClicks();
    }
  }
  sendClicks() {
    const formData = new FormData();
    formData.append('action', 'elementor_send_clicks');
    formData.append('_nonce', elementorFrontendConfig?.nonces?.floatingButtonsClickTracking);
    this.clicks.forEach(documentId => formData.append('clicks[]', documentId));
    fetch(elementorFrontendConfig?.urls?.ajaxurl, {
      method: 'POST',
      body: formData
    }).then(() => {
      this.clicks = [];
    });
  }
}
exports["default"] = ClickTrackingHandler;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/defineProperty.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "../node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!*************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!***************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "../node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/typeof.js":
/*!********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/typeof.js ***!
  \********************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

}]);
//# sourceMappingURL=contact-buttons.a5e2cc7274ba4c94eb66.bundle.js.map