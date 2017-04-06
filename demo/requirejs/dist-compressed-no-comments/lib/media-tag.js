!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.mediaTag = factory() : root.mediaTag = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 64);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _debug = __webpack_require__(2), _debug2 = _interopRequireDefault(_debug), _filterManager = __webpack_require__(3), _filterManager2 = _interopRequireDefault(_filterManager), _pluginManager = __webpack_require__(4), _pluginManager2 = _interopRequireDefault(_pluginManager), debug = new _debug2.default("MT:Engine"), Engine = function() {
            function Engine() {
                _classCallCheck(this, Engine);
            }
            return _createClass(Engine, null, [ {
                key: "startup",
                value: function(mediaObject) {
                    var id = mediaObject.getId();
                    Engine.chains[id] = Engine.matchingFilters(mediaObject), Engine.chains[id].length > 0 ? Engine.filter(mediaObject) : Engine.plugin(mediaObject);
                }
            }, {
                key: "matchingFilters",
                value: function(mediaObject) {
                    return _filterManager2.default.filters().filter(function(filter) {
                        return filter.typeCheck(mediaObject);
                    });
                }
            }, {
                key: "filter",
                value: function filter(mediaObject) {
                    var id = mediaObject.getId(), length = Engine.chains[id].length, filter = Engine.chains[id][length - 1];
                    filter && filter.startup(mediaObject);
                }
            }, {
                key: "plugin",
                value: function plugin(mediaObject) {
                    var plugin = Engine.findPlugin(mediaObject);
                    plugin && plugin.startup(mediaObject);
                }
            }, {
                key: "findFilter",
                value: function(mediaObject) {
                    var filterIdentifier = _filterManager2.default.findType(mediaObject);
                    if (filterIdentifier) return _filterManager2.default.getFilter(filterIdentifier);
                }
            }, {
                key: "findPlugin",
                value: function(mediaObject) {
                    var pluginIdentifier = _pluginManager2.default.findType(mediaObject);
                    if (pluginIdentifier) return _pluginManager2.default.getPlugin(pluginIdentifier);
                }
            }, {
                key: "chain",
                value: function(mediaObject) {
                    if (!Engine.isCoherent(mediaObject)) throw new Error("Incohenrent filter chain");
                    var id = mediaObject.getId();
                    Engine.chains[id].pop(), Engine.chains[id].length > 0 ? Engine.filter(mediaObject) : Engine.plugin(mediaObject);
                }
            }, {
                key: "isCoherent",
                value: function(mediaObject) {
                    return Engine.filterChainRuleCallback(mediaObject);
                }
            } ]), Engine;
        }();
        Engine.chains = {}, Engine.uid = function(i) {
            return function() {
                return i++;
            };
        }(0), Engine.filterChainRuleCallback = function(mediaObject) {
            var id = mediaObject.getId(), beforeLength = Engine.chains[id].length, afterLength = Engine.matchingFilters(mediaObject).length, differences = afterLength - beforeLength, filter = Engine.chains[id][beforeLength - 1];
            return 0 === differences && "default" === filter.identifier ? (debug("Default filter applied"), 
            !0) : differences === -1 || differences < -1 && (debug("The plugin " + filter.identifier + " have alterate too hightly the mediaObject"), 
            !0);
        }, exports.default = Engine;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var Errors = {
            PluginExists: function(_Error) {
                function PluginExists(objPlugin) {
                    return _classCallCheck(this, PluginExists), _possibleConstructorReturn(this, (PluginExists.__proto__ || Object.getPrototypeOf(PluginExists)).call(this, 'Plugin with same "' + objPlugin.identifier + '" identifier found.'));
                }
                return _inherits(PluginExists, _Error), PluginExists;
            }(Error),
            TypeNotFound: function(_Error2) {
                function TypeNotFound() {
                    return _classCallCheck(this, TypeNotFound), _possibleConstructorReturn(this, (TypeNotFound.__proto__ || Object.getPrototypeOf(TypeNotFound)).call(this, "Media Tag could not find the content type of an instance.}."));
                }
                return _inherits(TypeNotFound, _Error2), TypeNotFound;
            }(Error),
            FilterExists: function(_Error3) {
                function FilterExists(filter) {
                    return _classCallCheck(this, FilterExists), _possibleConstructorReturn(this, (FilterExists.__proto__ || Object.getPrototypeOf(FilterExists)).call(this, 'Filter with same "' + filter.identifier + ' identifier found."'));
                }
                return _inherits(FilterExists, _Error3), FilterExists;
            }(Error),
            FetchFail: function(_Error4) {
                function FetchFail(response) {
                    return _classCallCheck(this, FetchFail), _possibleConstructorReturn(this, (FetchFail.__proto__ || Object.getPrototypeOf(FetchFail)).call(this, 'Could not fetch "' + response.url + '", received "' + response.status + ": " + response.statusText + '".'));
                }
                return _inherits(FetchFail, _Error4), FetchFail;
            }(Error),
            InvalidCryptoKey: function(_Error5) {
                function InvalidCryptoKey() {
                    return _classCallCheck(this, InvalidCryptoKey), _possibleConstructorReturn(this, (InvalidCryptoKey.__proto__ || Object.getPrototypeOf(InvalidCryptoKey)).call(this, "Invalid cryptographic key."));
                }
                return _inherits(InvalidCryptoKey, _Error5), InvalidCryptoKey;
            }(Error),
            InvalidCryptoLib: function(_Error6) {
                function InvalidCryptoLib() {
                    return _classCallCheck(this, InvalidCryptoLib), _possibleConstructorReturn(this, (InvalidCryptoLib.__proto__ || Object.getPrototypeOf(InvalidCryptoLib)).call(this, "Invalid cryptographic algorithm name."));
                }
                return _inherits(InvalidCryptoLib, _Error6), InvalidCryptoLib;
            }(Error),
            FailedCrypto: function(_Error7) {
                function FailedCrypto(err) {
                    return _classCallCheck(this, FailedCrypto), _possibleConstructorReturn(this, (FailedCrypto.__proto__ || Object.getPrototypeOf(FailedCrypto)).call(this, "Failed to decrypt file" + (err && err.message ? " " + err.message : "") + "."));
                }
                return _inherits(FailedCrypto, _Error7), FailedCrypto;
            }(Error)
        };
        exports.default = Errors;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(process) {
            function useColors() {
                return !("undefined" == typeof window || !window || void 0 === window.process || "renderer" !== window.process.type) || ("undefined" != typeof document && document && "WebkitAppearance" in document.documentElement.style || "undefined" != typeof window && window && window.console && (console.firebug || console.exception && console.table) || "undefined" != typeof navigator && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
            }
            function formatArgs(args) {
                var useColors = this.useColors;
                if (args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff), 
                useColors) {
                    var c = "color: " + this.color;
                    args.splice(1, 0, c, "color: inherit");
                    var index = 0, lastC = 0;
                    args[0].replace(/%[a-zA-Z%]/g, function(match) {
                        "%%" !== match && (index++, "%c" === match && (lastC = index));
                    }), args.splice(lastC, 0, c);
                }
            }
            function log() {
                return "object" === ("undefined" == typeof console ? "undefined" : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
            }
            function save(namespaces) {
                try {
                    null == namespaces ? exports.storage.removeItem("debug") : exports.storage.debug = namespaces;
                } catch (e) {}
            }
            function load() {
                try {
                    return exports.storage.debug;
                } catch (e) {}
                if (void 0 !== process && "env" in process) return process.env.DEBUG;
            }
            function localstorage() {
                try {
                    return window.localStorage;
                } catch (e) {}
            }
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports = module.exports = __webpack_require__(7), exports.log = log, exports.formatArgs = formatArgs, 
            exports.save = save, exports.load = load, exports.useColors = useColors, exports.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : localstorage(), 
            exports.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ], 
            exports.formatters.j = function(v) {
                try {
                    return JSON.stringify(v);
                } catch (err) {
                    return "[UnexpectedJSONParseError]: " + err.message;
                }
            }, exports.enable(load());
        }).call(exports, __webpack_require__(9));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _errors = __webpack_require__(1), _errors2 = _interopRequireDefault(_errors), FilterManager = function() {
            function FilterManager() {
                _classCallCheck(this, FilterManager);
            }
            return _createClass(FilterManager, null, [ {
                key: "identifiers",
                value: function() {
                    return Object.keys(FilterManager.filtersMap);
                }
            }, {
                key: "filters",
                value: function() {
                    return Object.keys(FilterManager.filtersMap).map(function(key) {
                        return FilterManager.filtersMap[key];
                    });
                }
            }, {
                key: "isRegistered",
                value: function(filter) {
                    return filter.identifier in FilterManager.filtersMap;
                }
            }, {
                key: "register",
                value: function(filter) {
                    if (filter) {
                        if (FilterManager.isRegistered(filter)) throw new _errors2.default.FilterExists(filter);
                        FilterManager.filtersMap[filter.identifier] = filter;
                    }
                }
            }, {
                key: "getFilter",
                value: function(name) {
                    return FilterManager.filters().find(function(filter) {
                        return filter.identifier === name;
                    });
                }
            }, {
                key: "findType",
                value: function(mediaObject) {
                    var type = void 0;
                    return FilterManager.filters().some(function(filter) {
                        return !!filter.typeCheck(mediaObject) && (type = filter.identifier, !0);
                    }), type;
                }
            } ]), FilterManager;
        }();
        FilterManager.filtersMap = {}, exports.default = FilterManager;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _errors = __webpack_require__(1), _errors2 = _interopRequireDefault(_errors), PluginManager = function() {
            function PluginManager() {
                _classCallCheck(this, PluginManager);
            }
            return _createClass(PluginManager, null, [ {
                key: "identifiers",
                value: function() {
                    return Object.keys(PluginManager.pluginsMap);
                }
            }, {
                key: "plugins",
                value: function() {
                    return Object.keys(PluginManager.pluginsMap).map(function(key) {
                        return PluginManager.pluginsMap[key];
                    });
                }
            }, {
                key: "isRegistered",
                value: function(plugin) {
                    return plugin.identifier in PluginManager.pluginsMap;
                }
            }, {
                key: "register",
                value: function(plugin) {
                    if (plugin) {
                        if (PluginManager.isRegistered(plugin)) throw new _errors2.default.PluginExists(plugin);
                        PluginManager.pluginsMap[plugin.identifier] = plugin;
                    }
                }
            }, {
                key: "getPlugin",
                value: function(name) {
                    return PluginManager.plugins().find(function(plugin) {
                        return plugin.identifier === name;
                    });
                }
            }, {
                key: "findType",
                value: function(mediaObject) {
                    var type = void 0;
                    return PluginManager.plugins().some(function(plugin) {
                        return !!plugin.typeCheck(mediaObject) && (type = plugin.identifier, !0);
                    }), type;
                }
            } ]), PluginManager;
        }();
        PluginManager.pluginsMap = {}, exports.default = PluginManager;
    }, , , function(module, exports, __webpack_require__) {
        "use strict";
        function selectColor(namespace) {
            var i, hash = 0;
            for (i in namespace) hash = (hash << 5) - hash + namespace.charCodeAt(i), hash |= 0;
            return exports.colors[Math.abs(hash) % exports.colors.length];
        }
        function createDebug(namespace) {
            function debug() {
                if (debug.enabled) {
                    var self = debug, curr = +new Date(), ms = curr - (prevTime || curr);
                    self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr;
                    for (var args = new Array(arguments.length), i = 0; i < args.length; i++) args[i] = arguments[i];
                    args[0] = exports.coerce(args[0]), "string" != typeof args[0] && args.unshift("%O");
                    var index = 0;
                    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
                        if ("%%" === match) return match;
                        index++;
                        var formatter = exports.formatters[format];
                        if ("function" == typeof formatter) {
                            var val = args[index];
                            match = formatter.call(self, val), args.splice(index, 1), index--;
                        }
                        return match;
                    }), exports.formatArgs.call(self, args);
                    (debug.log || exports.log || console.log.bind(console)).apply(self, args);
                }
            }
            return debug.namespace = namespace, debug.enabled = exports.enabled(namespace), 
            debug.useColors = exports.useColors(), debug.color = selectColor(namespace), "function" == typeof exports.init && exports.init(debug), 
            debug;
        }
        function enable(namespaces) {
            exports.save(namespaces), exports.names = [], exports.skips = [];
            for (var split = (namespaces || "").split(/[\s,]+/), len = split.length, i = 0; i < len; i++) split[i] && (namespaces = split[i].replace(/\*/g, ".*?"), 
            "-" === namespaces[0] ? exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$")) : exports.names.push(new RegExp("^" + namespaces + "$")));
        }
        function disable() {
            exports.enable("");
        }
        function enabled(name) {
            var i, len;
            for (i = 0, len = exports.skips.length; i < len; i++) if (exports.skips[i].test(name)) return !1;
            for (i = 0, len = exports.names.length; i < len; i++) if (exports.names[i].test(name)) return !0;
            return !1;
        }
        function coerce(val) {
            return val instanceof Error ? val.stack || val.message : val;
        }
        exports = module.exports = createDebug.debug = createDebug.default = createDebug, 
        exports.coerce = coerce, exports.disable = disable, exports.enable = enable, exports.enabled = enabled, 
        exports.humanize = __webpack_require__(8), exports.names = [], exports.skips = [], 
        exports.formatters = {};
        var prevTime;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function parse(str) {
            if (str = String(str), !(str.length > 1e4)) {
                var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
                if (match) {
                    var n = parseFloat(match[1]);
                    switch ((match[2] || "ms").toLowerCase()) {
                      case "years":
                      case "year":
                      case "yrs":
                      case "yr":
                      case "y":
                        return n * y;

                      case "days":
                      case "day":
                      case "d":
                        return n * d;

                      case "hours":
                      case "hour":
                      case "hrs":
                      case "hr":
                      case "h":
                        return n * h;

                      case "minutes":
                      case "minute":
                      case "mins":
                      case "min":
                      case "m":
                        return n * m;

                      case "seconds":
                      case "second":
                      case "secs":
                      case "sec":
                      case "s":
                        return n * s;

                      case "milliseconds":
                      case "millisecond":
                      case "msecs":
                      case "msec":
                      case "ms":
                        return n;

                      default:
                        return;
                    }
                }
            }
        }
        function fmtShort(ms) {
            return ms >= d ? Math.round(ms / d) + "d" : ms >= h ? Math.round(ms / h) + "h" : ms >= m ? Math.round(ms / m) + "m" : ms >= s ? Math.round(ms / s) + "s" : ms + "ms";
        }
        function fmtLong(ms) {
            return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
        }
        function plural(ms, n, name) {
            if (!(ms < n)) return ms < 1.5 * n ? Math.floor(ms / n) + " " + name : Math.ceil(ms / n) + " " + name + "s";
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, s = 1e3, m = 60 * s, h = 60 * m, d = 24 * h, y = 365.25 * d;
        module.exports = function(val, options) {
            options = options || {};
            var type = void 0 === val ? "undefined" : _typeof(val);
            if ("string" === type && val.length > 0) return parse(val);
            if ("number" === type && isNaN(val) === !1) return options.long ? fmtLong(val) : fmtShort(val);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
        process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _debug = __webpack_require__(2), _debug2 = _interopRequireDefault(_debug), _engine = __webpack_require__(0), _engine2 = _interopRequireDefault(_engine), _parser = __webpack_require__(12), _parser2 = _interopRequireDefault(_parser), debug = (0, 
        _debug2.default)("MT:MediaObject"), MediaObject = function() {
            function MediaObject(options, rootElement) {
                _classCallCheck(this, MediaObject), debug("Creating media object."), this.__uid = _engine2.default.uid(), 
                this.__info = options, this.hookedFns = {
                    hasChildNodes: rootElement.hasChildNodes.bind(rootElement),
                    removeChild: rootElement.removeChild.bind(rootElement),
                    getLastChild: function() {
                        return rootElement.lastChild;
                    },
                    appendChild: rootElement.appendChild.bind(rootElement)
                }, this.setProperties(_parser2.default.parse(this)), _engine2.default.startup(this), 
                debug("Starting media");
            }
            return _createClass(MediaObject, [ {
                key: "setProperties",
                value: function(properties) {
                    for (var key in properties) {
                        if (this[key]) throw new Error("The property " + key + " already exists in this MediaObject !");
                        this[key] = properties[key];
                    }
                }
            }, {
                key: "getId",
                value: function() {
                    return this.__uid;
                }
            }, {
                key: "getAttribute",
                value: function(attrName) {
                    return this.__info[attrName];
                }
            }, {
                key: "getAllDataAttrKeys",
                value: function() {
                    return Object.keys(this.__info).filter(function(field) {
                        return field.startsWith("data-attr");
                    });
                }
            }, {
                key: "getExtension",
                value: function() {
                    return this.extension;
                }
            }, {
                key: "getMimeType",
                value: function() {
                    return this.mime;
                }
            }, {
                key: "hasAttribute",
                value: function(attributeName) {
                    return attributeName in this.__info;
                }
            }, {
                key: "getType",
                value: function() {
                    return this.type;
                }
            }, {
                key: "clearContents",
                value: function() {
                    for (;this.hookedFns.hasChildNodes(); ) this.hookedFns.removeChild(this.hookedFns.getLastChild());
                    debug("All media contents cleared.");
                }
            }, {
                key: "replaceContents",
                value: function(nodes) {
                    var _this = this;
                    this.clearContents(), nodes.forEach(function(node) {
                        return _this.hookedFns.appendChild(node);
                    }), debug("Media contents replaced.");
                }
            }, {
                key: "utilsSetAllDataAttributes",
                value: function(element) {
                    var _this2 = this;
                    debug("Setting data attributes."), this.getAllDataAttrKeys().forEach(function(dataAttr) {
                        return element.setAttribute(dataAttr.substr(10), _this2.getAttribute(dataAttr));
                    });
                }
            }, {
                key: "utilsPassAllDataAttributes",
                value: function(element) {
                    var _this3 = this;
                    debug("Passing data attributes."), this.getAllDataAttrKeys().forEach(function(dataAttr) {
                        return element.setAttribute(dataAttr, _this3.getAttribute(dataAttr));
                    });
                }
            }, {
                key: "setAttribute",
                value: function(name, value) {
                    this.__info[name] = value;
                }
            }, {
                key: "removeAttribute",
                value: function(name) {
                    delete this.__info[name];
                }
            } ]), MediaObject;
        }();
        exports.default = MediaObject;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function getAttributesObject(element) {
            var attrsObj = {};
            if (element.hasAttributes()) for (var attrs = element.attributes, i = attrs.length - 1; i >= 0; i--) attrsObj[attrs[i].name] = attrs[i].value;
            return attrsObj;
        }
        function MediaTag(node) {
            return node.mediaObject ? node.mediaObject : (node.mediaObject = new _mediaObject2.default(getAttributesObject(node), node), 
            node.mediaObject);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _mediaObject = __webpack_require__(10), _mediaObject2 = _interopRequireDefault(_mediaObject), _filterManager = __webpack_require__(3), _filterManager2 = _interopRequireDefault(_filterManager), _pluginManager = __webpack_require__(4), _pluginManager2 = _interopRequireDefault(_pluginManager);
        MediaTag.registerFilter = _filterManager2.default.register, MediaTag.registerPlugin = _pluginManager2.default.register, 
        exports.default = MediaTag;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), Parser = function() {
            function Parser() {
                _classCallCheck(this, Parser);
            }
            return _createClass(Parser, null, [ {
                key: "extension",
                value: function(mediaObject) {
                    return mediaObject.getAttribute("data-type").split("/")[1];
                }
            }, {
                key: "type",
                value: function(mediaObject) {
                    return mediaObject.getAttribute("data-type").split("/")[0];
                }
            }, {
                key: "mime",
                value: function(mediaObject) {
                    return mediaObject.getAttribute("data-type");
                }
            }, {
                key: "protocol",
                value: function(mediaObject) {
                    var array = mediaObject.getAttribute("src").split("://");
                    return array.length > 1 ? array[0] : window.location.protocol;
                }
            }, {
                key: "hostname",
                value: function(mediaObject) {
                    var array = mediaObject.getAttribute("src").split("://");
                    return array.length > 1 ? array[1].split("/")[0] : window.location.hostname;
                }
            }, {
                key: "source",
                value: function(mediaObject) {
                    return mediaObject.getAttribute("src");
                }
            }, {
                key: "parse",
                value: function(mediaObject) {
                    return {
                        protocol: Parser.protocol(mediaObject),
                        hostname: Parser.hostname(mediaObject),
                        src: Parser.source(mediaObject),
                        type: Parser.type(mediaObject),
                        extension: Parser.extension(mediaObject),
                        mime: Parser.mime(mediaObject)
                    };
                }
            } ]), Parser;
        }();
        exports.default = Parser;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _errors = __webpack_require__(1), _errors2 = _interopRequireDefault(_errors), _engine = __webpack_require__(0), _engine2 = _interopRequireDefault(_engine), Crypto = function() {
            function Crypto() {
                _classCallCheck(this, Crypto);
            }
            return _createClass(Crypto, null, [ {
                key: "slice",
                value: function(u8) {
                    return Array.prototype.slice.call(u8);
                }
            }, {
                key: "getRandomKeyStr",
                value: function() {
                    var Nacl = Crypto.Nacl, rdm = Nacl.randomBytes(18);
                    return Nacl.util.encodeBase64(rdm);
                }
            }, {
                key: "getKeyFromStr",
                value: function(str) {
                    var Nacl = Crypto.Nacl;
                    return Nacl.hash(Nacl.util.decodeBase64(str)).subarray(32, 64);
                }
            }, {
                key: "encrypt",
                value: function(u8, key) {
                    var array = u8, nonce = Crypto.Nacl.randomBytes(24), packed = Crypto.Nacl.secretbox(array, nonce, key);
                    if (packed) return new Uint8Array(Crypto.slice(nonce).concat(Crypto.slice(packed)));
                    throw new Error();
                }
            }, {
                key: "decrypt",
                value: function(u8, key) {
                    if (u8.length < 24) throw new Error();
                    var slice = Crypto.slice, Nacl = Crypto.Nacl, nonce = new Uint8Array(slice(u8).slice(0, 24)), packed = new Uint8Array(slice(u8).slice(24)), unpacked = Nacl.secretbox.open(packed, nonce, key);
                    if (unpacked) return unpacked;
                    throw new Error("Decrypted file in undefined");
                }
            } ]), Crypto;
        }();
        Crypto.Nacl = window.nacl;
        var DataManager = function() {
            function DataManager() {
                _classCallCheck(this, DataManager);
            }
            return _createClass(DataManager, null, [ {
                key: "getArrayBuffer",
                value: function(url) {
                    return fetch(url).then(function(response) {
                        if (response.ok) return response.arrayBuffer();
                        throw new _errors2.default.FetchFails();
                    }).then(function(arrayBuffer) {
                        return arrayBuffer;
                    });
                }
            }, {
                key: "createUrl",
                value: function(arrayBuffer) {
                    return window.URL.createObjectURL(arrayBuffer);
                }
            }, {
                key: "getBlobUrl",
                value: function(data, mtype) {
                    return window.URL.createObjectURL(new Blob([ data ], {
                        type: mtype
                    }));
                }
            }, {
                key: "getDataUrl",
                value: function(data, mtype) {
                    return "data:" + mtype + ";base64," + Crypto.Nacl.util.encodeBase64(data);
                }
            } ]), DataManager;
        }(), CryptoFilter = {
            identifier: "crypto",
            typeCheck: function(mediaObject) {
                return mediaObject.hasAttribute("src") && mediaObject.hasAttribute("data-type") && mediaObject.hasAttribute("data-crypto-key");
            },
            startup: function(mediaObject) {
                var src = mediaObject.getAttribute("src"), strKey = mediaObject.getAttribute("data-crypto-key"), cryptoKey = Crypto.getKeyFromStr(strKey), xhr = new XMLHttpRequest();
                xhr.open("GET", src, !0), xhr.responseType = "arraybuffer", xhr.onload = function() {
                    var arrayBuffer = xhr.response;
                    if (arrayBuffer) {
                        var u8 = new Uint8Array(arrayBuffer), binStr = Crypto.decrypt(u8, cryptoKey), url = DataManager.getDataUrl(binStr, mediaObject.getMimeType());
                        mediaObject.setAttribute("src", url), mediaObject.removeAttribute("data-crypto-key"), 
                        _engine2.default.chain(mediaObject);
                    }
                }, xhr.send(null);
            }
        };
        exports.default = CryptoFilter;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var ImagePlugin = {
            identifier: "image",
            typeCheck: function(mediaObject) {
                var regexExtensions = new RegExp("^png|jpg|jpeg|gif$"), regexMimes = new RegExp("^image/(png|svg+xml|jpeg|gif)$");
                return mediaObject.hasAttribute("src") && "image" === mediaObject.getType() && null !== regexExtensions.exec(mediaObject.getExtension()) && null !== regexMimes.exec(mediaObject.getMimeType());
            },
            startup: function(mediaObject) {
                var element = document.createElement("img");
                element.setAttribute("src", mediaObject.getAttribute("src")), mediaObject.utilsSetAllDataAttributes(element), 
                mediaObject.replaceContents([ element ]);
            }
        };
        exports.default = ImagePlugin;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var MediaTag = __webpack_require__(11).default, ImagePlugin = __webpack_require__(14).default;
        MediaTag.registerPlugin(ImagePlugin);
        var VideoPlugin = __webpack_require__(23).default;
        MediaTag.registerPlugin(VideoPlugin);
        var AudioPlugin = __webpack_require__(20).default;
        MediaTag.registerPlugin(AudioPlugin);
        var DashPlugin = __webpack_require__(21).default;
        MediaTag.registerPlugin(DashPlugin);
        var PdfPlugin = __webpack_require__(22).default;
        MediaTag.registerPlugin(PdfPlugin);
        var DefaultFilter = __webpack_require__(19).default;
        MediaTag.registerFilter(DefaultFilter);
        var CryptoFilter = __webpack_require__(13).default;
        MediaTag.registerFilter(CryptoFilter);
        var ClearKeyFilter = __webpack_require__(18).default;
        MediaTag.registerFilter(ClearKeyFilter), module.exports = MediaTag;
    }, , , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _engine = __webpack_require__(0), _engine2 = _interopRequireDefault(_engine), ClearKeyFilter = {
            identifier: "clear-key",
            typeCheck: function(mediaObject) {
                return mediaObject.hasAttribute("data-clear-key");
            },
            startup: function(mediaObject) {
                var clearKey = mediaObject.getAttribute("data-clear-key"), id = clearKey.substring(0, 32), key = clearKey.substring(33, 65);
                mediaObject.setAttribute("id", id), mediaObject.setAttribute("key", key), mediaObject.removeAttribute("data-clear-key"), 
                _engine2.default.chain(mediaObject);
            }
        };
        exports.default = ClearKeyFilter;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _engine = __webpack_require__(0), _engine2 = _interopRequireDefault(_engine), DefaultFilter = {
            identifier: "default",
            typeCheck: function(mediaObject) {
                var result = mediaObject.hasAttribute("src") && mediaObject.hasAttribute("data-type");
                if (result) return result;
                throw new Error('Malformatted media-tag, it must have an attribute "src" and "data-type"');
            },
            startup: function(mediaObject) {
                _engine2.default.chain(mediaObject);
            }
        };
        exports.default = DefaultFilter;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var AudioPlugin = {
            identifier: "audio",
            typeCheck: function(mediaObject) {
                var regexExtensions = new RegExp("^mp3|ogg|webm|wav$"), regexMimes = new RegExp("^audio/(mp3|ogg|webm|wav)$");
                return mediaObject.hasAttribute("src") && "audio" === mediaObject.getType() && null !== regexExtensions.exec(mediaObject.getExtension()) && null !== regexMimes.exec(mediaObject.getMimeType());
            },
            startup: function(mediaObject) {
                var element = document.createElement("audio");
                element.setAttribute("src", mediaObject.getAttribute("src")), mediaObject.utilsSetAllDataAttributes(element), 
                mediaObject.replaceContents([ element ]);
            }
        };
        exports.default = AudioPlugin;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var DashPlugin = {
            identifier: "dash",
            typeCheck: function(mediaObject) {
                var regexExtensions = new RegExp("^dash[+]xml$"), regexMimes = new RegExp("^application/dash[+]xml$");
                return mediaObject.hasAttribute("src") && "application" === mediaObject.getType() && null !== regexExtensions.exec(mediaObject.getExtension()) && null !== regexMimes.exec(mediaObject.getMimeType());
            },
            startup: function(mediaObject) {
                var video = document.createElement("video"), player = new shaka.Player(video), id = mediaObject.getAttribute("id"), key = mediaObject.getAttribute("key");
                if (id && key) {
                    var clearKeyStringObject = '{"' + id + '": "' + key + '"}', clearKey = JSON.parse(clearKeyStringObject);
                    player.configure({
                        drm: {
                            clearKeys: clearKey
                        }
                    });
                }
                mediaObject.utilsSetAllDataAttributes(video), mediaObject.replaceContents([ video ]), 
                player.load(mediaObject.getAttribute("src")).then(function() {});
            }
        };
        exports.default = DashPlugin;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var PdfPlugin = {
            identifier: "pdf",
            typeCheck: function(mediaObject) {
                var regexExtensions = new RegExp("^pdf$"), regexMimes = new RegExp("^application/pdf$");
                return mediaObject.hasAttribute("src") && "application" === mediaObject.getType() && null !== regexExtensions.exec(mediaObject.getExtension()) && null !== regexMimes.exec(mediaObject.getMimeType());
            },
            startup: function(mediaObject) {
                var url = mediaObject.getAttribute("src"), canvas = document.createElement("canvas");
                mediaObject.utilsSetAllDataAttributes(canvas), mediaObject.replaceContents([ canvas ]), 
                PDFJS.disableWorker = !0, PDFJS.getDocument(url).promise.then(function(pdf) {
                    function render(page) {
                        var scale = 1, viewport = page.getViewport(scale), context = canvas.getContext("2d");
                        canvas.height = viewport.height, canvas.width = viewport.width;
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext).then(function() {});
                    }
                    function update(mouseEvent) {
                        mouseEvent || console.log("no event"), 0 === mouseEvent.buttons ? pageNumber === pdf.numPages ? pageNumber = 1 : pageNumber++ : 4 === mouseEvent.buttons && (1 === pageNumber ? pageNumber = pdf.numPages : pageNumber--);
                    }
                    var pageNumber = 1;
                    pdf.getPage(pageNumber).then(function(page) {
                        render(page);
                    }), canvas.onclick = function(event) {
                        update(event), pdf.getPage(pageNumber).then(function(page) {
                            render(page);
                        });
                    };
                }, function(reason) {
                    console.error(reason);
                });
            }
        };
        exports.default = PdfPlugin;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var VideoPlugin = {
            identifier: "video",
            typeCheck: function(mediaObject) {
                var regexExtensions = new RegExp("^mp4|ogg|webm$"), regexMimes = new RegExp("^video/(mp4|ogg|webm)$");
                return mediaObject.hasAttribute("src") && "video" === mediaObject.getType() && null !== regexExtensions.exec(mediaObject.getExtension()) && null !== regexMimes.exec(mediaObject.getMimeType());
            },
            startup: function(mediaObject) {
                var element = document.createElement("video");
                element.setAttribute("src", mediaObject.getAttribute("src")), mediaObject.utilsSetAllDataAttributes(element), 
                mediaObject.replaceContents([ element ]);
            }
        };
        exports.default = VideoPlugin;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(15);
    } ]);
});