/*globals React, Turbolinks*/
'use strict';

// Unobtrusive scripting adapter for React

;(function(define){
  define(function(require,exports,module){
    var React = require('react');

    // create the  namespace
    var ReactRailsUJS = {
      CLASS_NAME_ATTR: 'data-react-class',
      PROPS_ATTR: 'data-react-props',
      RAILS_ENV_DEVELOPMENT: true, //<%= Rails.env == "development" %>,
      // helper method for the mount and unmount methods to find the
      // `data-react-class` DOM elements
      findDOMNodes: function() {
        // we will use fully qualified paths as we do not bind the callbacks
        var selector = '[' + ReactRailsUJS.CLASS_NAME_ATTR + ']';

        return document.querySelectorAll(selector);
      },

      mountComponents: function() {
        var nodes = ReactRailsUJS.findDOMNodes();

        for (var i = 0; i < nodes.length; ++i) {
          var node = nodes[i];
          var className = node.getAttribute(ReactRailsUJS.CLASS_NAME_ATTR);

          // Assume className is simple and can be found at top-level (window).
          // Fallback to eval to handle cases like 'My.React.ComponentName'.
          var constructor = require('./components/' + className.toLowerCase());
          var propsJson = node.getAttribute(ReactRailsUJS.PROPS_ATTR);
          var props = propsJson && JSON.parse(propsJson);

          React.render(React.createElement(constructor, props), node);
        }
      },

      unmountComponents: function() {
        var nodes = ReactRailsUJS.findDOMNodes();

        for (var i = 0; i < nodes.length; ++i) {
          var node = nodes[i];

          React.unmountComponentAtNode(node);
          // now remove the `data-react-class` wrapper as well
          node.parentElement && node.parentElement.removeChild(node);
        }
      }
    };

    // functions not exposed publicly
    function handleTurbolinksEvents () {
      var handleEvent;
      var unmountEvent;

      if (document.addEventListener) {
        handleEvent = function(eventName, callback) {
          document.addEventListener(eventName, callback);
        };
      }

      if (Turbolinks.EVENTS) {
        unmountEvent = Turbolinks.EVENTS.BEFORE_UNLOAD;
      } else {
        unmountEvent = 'page:receive';
        Turbolinks.pagesCached(0);

        if (ReactRailsUJS.RAILS_ENV_DEVELOPMENT) {
          console.warn('The Turbolinks cache has been disabled (Turbolinks >= 2.4.0 is recommended). See https://github.com/reactjs/react-rails/issues/87 for more information.');
        }
      }
      handleEvent('page:change', ReactRailsUJS.mountComponents);
      handleEvent(unmountEvent, ReactRailsUJS.unmountComponents);
    }

    function handleNativeEvents() {
      document.addEventListener('DOMContentLoaded', ReactRailsUJS.mountComponents);
      window.addEventListener('unload', ReactRailsUJS.unmountComponents);
    }

    if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
      handleTurbolinksEvents();
    } else {
      handleNativeEvents();
    }

    module.exports = ReactRailsUJS;
  });
})('function' === typeof define && define.amd? define : (
  function(moduleName, window){
    return 'object' === typeof module? function(c){
      c(require,exports,module);
    } : function(define){
      var _module = {exports:{}};

      define(function(moduleName){ return window[moduleName]; }, _module.exports, _module);
      window[moduleName] = _module.exports;
    };
  }
)('react_ujs', this)); // jshint ignore:line
