(window["webpackJsonpfuse-react-app"] = window["webpackJsonpfuse-react-app"] || []).push([[6], {
    10: function (e, t, a) {
        "use strict";
        var n = a(252), r = a.n(n).a.runInContext();
        r.mixin({
            setIn: function (e, t, a) {
                return r.setWith(r.clone(e), t, a, r.clone)
            }
        }), t.a = r
    }, 109: function (e, t, a) {
        "use strict";
        var n = {
            50: "#ECECEE",
            100: "#C5C6CB",
            200: "#9EA1A9",
            300: "#7D818C",
            400: "#5C616F",
            500: "#3C4252",
            600: "#353A48",
            700: "#2D323E",
            800: "#262933",
            900: "#1E2129",
            A100: "#C5C6CB",
            A200: "#9EA1A9",
            A400: "#5C616F",
            A700: "#2D323E"
        };
        a.d(t, "a", function () {
            return n
        })
    }, 117: function (e, t, a) {
        "use strict";
        var n = {
            layout: {
                title: "Layout",
                defaults: {
                    mode: "fullwidth",
                    scroll: "content",
                    navbar: {display: !0, folded: !1, position: "left"},
                    toolbar: {display: !0, style: "fixed", position: "below"},
                    footer: {display: !1, style: "static", position: "below"},
                    leftSidePanel: {display: !0},
                    rightSidePanel: {display: !0}
                },
                form: {
                    mode: {
                        title: "Mode",
                        type: "radio",
                        options: [{name: "Boxed", value: "boxed"}, {name: "Full Width", value: "fullwidth"}]
                    },
                    scroll: {
                        title: "Scrollable Area",
                        type: "radio",
                        options: [{name: "Body", value: "body"}, {name: "Content", value: "content"}]
                    },
                    navbar: {
                        type: "group",
                        title: "Navbar",
                        children: {
                            display: {title: "Display", type: "switch"},
                            folded: {title: "Folded", type: "switch"},
                            position: {
                                title: "Position",
                                type: "radio",
                                options: [{name: "Left", value: "left"}, {name: "Right", value: "right"}]
                            }
                        }
                    },
                    toolbar: {
                        type: "group",
                        title: "Toolbar",
                        children: {
                            display: {title: "Display", type: "switch"},
                            style: {
                                title: "Style",
                                type: "radio",
                                options: [{name: "Fixed", value: "fixed"}, {name: "Static", value: "static"}]
                            },
                            position: {
                                title: "Position",
                                type: "radio",
                                options: [{name: "Above", value: "above"}, {name: "Below", value: "below"}]
                            }
                        }
                    },
                    footer: {
                        type: "group",
                        title: "Footer",
                        children: {
                            display: {title: "Display", type: "switch"},
                            style: {
                                title: "Style",
                                type: "radio",
                                options: [{name: "Fixed", value: "fixed"}, {name: "Static", value: "static"}]
                            },
                            position: {
                                title: "Position",
                                type: "radio",
                                options: [{name: "Above", value: "above"}, {name: "Below", value: "below"}]
                            }
                        }
                    }
                }
            }
        };
        t.a = n
    }, 134: function (e, t, a) {
        "use strict";
        var n = a(4), r = a(12), o = a(19), i = a(18), l = a(102), c = a(10);

        function s(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function u(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? s(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : s(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var d = function () {
            function e() {
                Object(o.a)(this, e), this.events = {}
            }

            return Object(i.a)(e, [{
                key: "_getEventListByName", value: function (e) {
                    return "undefined" === typeof this.events[e] && (this.events[e] = new Set), this.events[e]
                }
            }, {
                key: "on", value: function (e, t) {
                    this._getEventListByName(e).add(t)
                }
            }, {
                key: "once", value: function (e, t) {
                    var a = this;
                    this.on(e, function n() {
                        a.removeListener(e, n);
                        for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
                        t.apply(a, o)
                    })
                }
            }, {
                key: "emit", value: function (e) {
                    for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) a[n - 1] = arguments[n];
                    this._getEventListByName(e).forEach(function (e) {
                        e.apply(this, a)
                    }.bind(this))
                }
            }, {
                key: "removeListener", value: function (e, t) {
                    this._getEventListByName(e).delete(t)
                }
            }]), e
        }(), m = function () {
            function e() {
                Object(o.a)(this, e)
            }

            return Object(i.a)(e, null, [{
                key: "filterArrayByString", value: function (e, t) {
                    var a = this;
                    return "" === t ? e : (t = t.toLowerCase(), e.filter(function (e) {
                        return a.searchInObj(e, t)
                    }))
                }
            }, {
                key: "searchInObj", value: function (e, t) {
                    for (var a in e) if (e.hasOwnProperty(a)) {
                        var n = e[a];
                        if ("string" === typeof n) {
                            if (this.searchInString(n, t)) return !0
                        } else if (Array.isArray(n) && this.searchInArray(n, t)) return !0;
                        if ("object" === typeof n && this.searchInObj(n, t)) return !0
                    }
                }
            }, {
                key: "searchInArray", value: function (e, t) {
                    var a = !0, n = !1, r = void 0;
                    try {
                        for (var o, i = e[Symbol.iterator](); !(a = (o = i.next()).done); a = !0) {
                            var l = o.value;
                            if ("string" === typeof l && this.searchInString(l, t)) return !0;
                            if ("object" === typeof l && this.searchInObj(l, t)) return !0
                        }
                    } catch (c) {
                        n = !0, r = c
                    } finally {
                        try {
                            a || null == i.return || i.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                }
            }, {
                key: "searchInString", value: function (e, t) {
                    return e.toLowerCase().includes(t)
                }
            }, {
                key: "generateGUID", value: function () {
                    function e() {
                        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                    }

                    return e() + e()
                }
            }, {
                key: "toggleInArray", value: function (e, t) {
                    -1 === t.indexOf(e) ? t.push(e) : t.splice(t.indexOf(e), 1)
                }
            }, {
                key: "handleize", value: function (e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/\W+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                }
            }, {
                key: "setRoutes", value: function (e, t) {
                    var a = Object(r.a)(e.routes);
                    return (e.settings || e.auth) && (a = a.map(function (a) {
                        var n = e.auth ? Object(r.a)(e.auth) : t || null;
                        return n = a.auth ? [].concat(Object(r.a)(n), Object(r.a)(a.auth)) : n, u({}, a, {
                            settings: u({}, e.settings, {}, a.settings),
                            auth: n
                        })
                    })), Object(r.a)(a)
                }
            }, {
                key: "generateRoutesFromConfigs", value: function (e, t) {
                    var a = this, n = [];
                    return e.forEach(function (e) {
                        n = [].concat(Object(r.a)(n), Object(r.a)(a.setRoutes(e, t)))
                    }), n
                }
            }, {
                key: "findById", value: function (e, t) {
                    if (e.id === t) return e;
                    var a, n;
                    for (n in e) if (e.hasOwnProperty(n) && "object" === typeof e[n] && (a = this.findById(e[n], t))) return a;
                    return a
                }
            }, {
                key: "getFlatNavigation", value: function (e, t) {
                    t = t || [];
                    var a = !0, n = !1, r = void 0;
                    try {
                        for (var o, i = e[Symbol.iterator](); !(a = (o = i.next()).done); a = !0) {
                            var l = o.value;
                            "subheader" !== l.type && ("item" !== l.type ? "collapse" !== l.type && "group" !== l.type || l.children && this.getFlatNavigation(l.children, t) : t.push({
                                id: l.id,
                                title: l.title,
                                type: l.type,
                                icon: l.icon || !1,
                                url: l.url,
                                auth: l.auth || null
                            }))
                        }
                    } catch (c) {
                        n = !0, r = c
                    } finally {
                        try {
                            a || null == i.return || i.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                    return t
                }
            }, {
                key: "randomMatColor", value: function (e) {
                    e = e || "400";
                    var t = ["red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange"],
                        a = t[Math.floor(Math.random() * t.length)];
                    return l[a][e]
                }
            }, {
                key: "difference", value: function (e, t) {
                    return function e(t, a) {
                        return c.a.transform(t, function (t, n, r) {
                            c.a.isEqual(n, a[r]) || (t[r] = c.a.isObject(n) && c.a.isObject(a[r]) ? e(n, a[r]) : n)
                        })
                    }(e, t)
                }
            }, {
                key: "updateNavItem", value: function (e, t, a) {
                    var n = this;
                    return e.map(function (e) {
                        return e.id === t ? c.a.merge({}, e, a) : e.children ? c.a.merge({}, e, {children: n.updateNavItem(e.children, t, a)}) : c.a.merge({}, e)
                    })
                }
            }, {
                key: "removeNavItem", value: function (e, t) {
                    var a = this;
                    return e.map(function (e) {
                        return e.id === t ? null : e.children ? c.a.merge({}, c.a.omit(e, ["children"]), {children: a.removeNavItem(e.children, t)}) : c.a.merge({}, e)
                    }).filter(function (e) {
                        return e
                    })
                }
            }, {
                key: "prependNavItem", value: function (e, t, a) {
                    var n = this;
                    return a ? e.map(function (e) {
                        return e.id === a && e.children ? {
                            _item: e,
                            children: [t].concat(Object(r.a)(e.children))
                        } : e.children ? c.a.merge({}, e, {children: n.prependNavItem(e.children, t, a)}) : c.a.merge({}, e)
                    }) : [t].concat(Object(r.a)(e))
                }
            }, {
                key: "appendNavItem", value: function (e, t, a) {
                    var n = this;
                    return a ? e.map(function (e) {
                        return e.id === a && e.children ? {
                            _item: e,
                            children: [].concat(Object(r.a)(e.children), [t])
                        } : e.children ? c.a.merge({}, e, {children: n.appendNavItem(e.children, t, a)}) : c.a.merge({}, e)
                    }) : [].concat(Object(r.a)(e), [t])
                }
            }, {
                key: "hasPermission", value: function (e, t) {
                    return null === e || void 0 === e || (0 === e.length ? !t || 0 === t.length : t && Array.isArray(t) ? e.some(function (e) {
                        return t.indexOf(e) >= 0
                    }) : e.includes(t))
                }
            }]), e
        }();
        m.EventEmitter = d, t.a = m
    }, 144: function (e, t, a) {
        "use strict";
        var n = a(51);
        t.a = n.a()
    }, 15: function (e, t, a) {
        "use strict";
        var n = a(30);
        a.d(t, "a", function () {
            return n.r
        }), a.d(t, "b", function () {
            return n.s
        }), a.d(t, "c", function () {
            return n.t
        }), a.d(t, "d", function () {
            return n.u
        }), a.d(t, "e", function () {
            return n.v
        }), a.d(t, "f", function () {
            return n.w
        }), a.d(t, "g", function () {
            return n.x
        }), a.d(t, "h", function () {
            return n.y
        }), a.d(t, "i", function () {
            return n.A
        }), a.d(t, "j", function () {
            return n.B
        })
    }, 150: function (e, t, a) {
        "use strict";
        var n = a(21), r = a(12), o = a(4), i = a(119), l = a(30), c = a(117), s = {
            layout: {style: "layout", config: {}},
            customScrollbars: !0,
            theme: {main: "default", navbar: "mainThemeLight", toolbar: "mainThemeLight"}
        }, u = a(85), d = a(83), m = a(109), p = {
            default: {
                palette: {
                    type: "light",
                    primary: m.a,
                    secondary: {light: u.a[400], main: u.a[600], dark: u.a[700]},
                    error: d.a
                }, status: {danger: "orange"}
            },
            defaultDark: {
                palette: {
                    type: "dark",
                    primary: m.a,
                    secondary: {light: u.a[400], main: u.a[600], dark: u.a[700]},
                    error: d.a
                }, status: {danger: "orange"}
            }
        }, f = a(10), h = a(62);

        function b(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function g(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? b(a, !0).forEach(function (t) {
                    Object(o.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : b(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        a.d(t, "b", function () {
            return w
        });
        var v = function () {
            var e = s.layout && s.layout.style ? s.layout.style : "layout1", t = {style: e, config: c.a[e].defaults};
            return f.a.merge({}, h.a, {layout: t}, s, Object(h.e)())
        }(), y = function () {
            var e = 0 !== Object.keys(p).length ? p : h.c;
            return g({}, Object.assign.apply(Object, [{}].concat(Object(r.a)(Object.entries(e).map(function (e) {
                var t = Object(n.a)(e, 2), a = t[0], r = t[1], l = f.a.merge({}, h.b, r, h.g);
                return Object(o.a)({}, a, Object(i.a)(f.a.merge({}, l, {mixins: Object(h.d)(l)})))
            })))), {}, Object(h.f)(e[v.theme.main]))
        }(), O = g({initial: v, defaults: f.a.merge({}, v), current: f.a.merge({}, v), themes: y}, j(y, v));
        t.a = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case l.n:
                    var a = w(e.defaults, t.value),
                        n = a.theme.main !== e.current.theme.main ? g({}, e.themes, {}, E(a.theme.main)) : e.themes;
                    return g({}, e, {current: a, themes: n}, j(n, a));
                case l.l:
                    return f.a.merge({}, O);
                case l.k:
                    var r = w(e.defaults, t.value),
                        o = r.theme.main !== e.defaults.theme.main ? g({}, e.themes, {}, E(r.theme.main)) : e.themes;
                    return g({}, e, {defaults: f.a.merge({}, r), current: f.a.merge({}, r), themes: o}, j(o, r));
                case l.i:
                    var i = g({}, e.themes, {}, E(e.defaults.theme.main));
                    return g({}, e, {
                        defaults: f.a.merge({}, e.defaults),
                        current: f.a.merge({}, e.defaults),
                        themes: i
                    }, j(i, e.defaults));
                default:
                    return e
            }
        };

        function E(e) {
            var t = 0 !== Object.keys(p).length ? p : h.c;
            return Object(h.f)(t[e])
        }

        function j(e, t) {
            return g({
                mainTheme: e[t.theme.main],
                navbarTheme: e[t.theme.navbar],
                toolbarTheme: e[t.theme.toolbar],
                footerTheme: e[t.theme.footer]
            }, E(t.theme.main))
        }

        function w(e, t) {
            return f.a.merge({}, e, t && t.layout && t.layout.style ? {layout: {config: c.a[t.layout.style].defaults}} : {}, t)
        }
    }, 152: function (e, t, a) {
        "use strict";
        var n = a(4), r = a(93);

        function o(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function i(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? o(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : o(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var l = {state: !1, data: null}, c = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case r.a:
                    return i({}, e, {data: t.payload});
                case r.b:
                    return i({}, e, {state: !e.state});
                default:
                    return e
            }
        };
        t.a = c
    }, 198: function (e, t, a) {
        "use strict";
        var n = a(19), r = a(18), o = a(22), i = a(23), l = a(24), c = a(0), s = a.n(c), u = a(65);
        t.a = function (e, t) {
            return function (a) {
                return function (c) {
                    function d(a) {
                        var r;
                        return Object(n.a)(this, d), r = Object(o.a)(this, Object(i.a)(d).call(this, a)), Object(u.b)(e, t), r
                    }

                    return Object(l.a)(d, c), Object(r.a)(d, [{
                        key: "render", value: function () {
                            return s.a.createElement(a, this.props)
                        }
                    }]), d
                }(s.a.PureComponent)
            }
        }
    }, 26: function (e, t, a) {
        "use strict";
        t.a = {admin: ["admin"], onlyGuest: ["guest"]}
    }, 295: function (e, t, a) {
        e.exports = a(483)
    }, 30: function (e, t, a) {
        "use strict";
        a(31);
        var n = "[NAVIGATION] GET NAVIGATION", r = "[NAVIGATION] SET NAVIGATION", o = "[NAVIGATION] RESET NAVIGATION";
        var i = "[SETTINGS] SET SETTINGS", l = "[SETTINGS] SET DEFAULT SETTINGS", c = "[SETTINGS] SET INITIAL SETTINGS",
            s = "[SETTINGS] RESET DEFAULT SETTINGS";

        function u(e) {
            return {type: i, value: e}
        }

        function d(e) {
            return {type: l, value: e}
        }

        function m() {
            return {type: c}
        }

        function p(e) {
            return {type: s, value: e}
        }

        var f = "[NAVBAR] OPEN FOLDED", h = "[NAVBAR] CLOSE FOLDED", b = "[NAVBAR] TOGGLE FOLDED",
            g = "[NAVBAR] TOGGLE MOBILE", v = "[NAVBAR] OPEN MOBILE", y = "[NAVBAR] CLOSE MOBILE";

        function O() {
            return {type: f}
        }

        function E() {
            return {type: h}
        }

        function j() {
            return {type: g}
        }

        function w() {
            return {type: y}
        }

        var x = "[MESSAGE] CLOSE", k = "[MESSAGE] SHOW";

        function N() {
            return {type: x}
        }

        function S(e) {
            return {type: k, options: e}
        }

        var P = "[DIALOG] OPEN", C = "[DIALOG] CLOSE";

        function I() {
            return {type: C}
        }

        a.d(t, "d", function () {
            return n
        }), a.d(t, "m", function () {
            return r
        }), a.d(t, "j", function () {
            return o
        }), a.d(t, "n", function () {
            return i
        }), a.d(t, "k", function () {
            return l
        }), a.d(t, "l", function () {
            return c
        }), a.d(t, "i", function () {
            return s
        }), a.d(t, "A", function () {
            return u
        }), a.d(t, "y", function () {
            return d
        }), a.d(t, "z", function () {
            return m
        }), a.d(t, "x", function () {
            return p
        }), a.d(t, "g", function () {
            return f
        }), a.d(t, "b", function () {
            return h
        }), a.d(t, "p", function () {
            return b
        }), a.d(t, "q", function () {
            return g
        }), a.d(t, "h", function () {
            return v
        }), a.d(t, "c", function () {
            return y
        }), a.d(t, "v", function () {
            return O
        }), a.d(t, "t", function () {
            return E
        }), a.d(t, "w", function () {
            return j
        }), a.d(t, "u", function () {
            return w
        }), a.d(t, "e", function () {
            return x
        }), a.d(t, "o", function () {
            return k
        }), a.d(t, "s", function () {
            return N
        }), a.d(t, "B", function () {
            return S
        }), a.d(t, "f", function () {
            return P
        }), a.d(t, "a", function () {
            return C
        }), a.d(t, "r", function () {
            return I
        })
    }, 31: function (e, t, a) {
        "use strict";
        var n = a(4), r = a(0), o = a.n(r), i = a(559), l = a(3), c = a(21), s = a(560), u = a(539), d = a(537),
            m = a(8);
        var p = function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.mainThemeDark
            }), a = e.classes;
            return o.a.createElement(We, {enable: e.innerScroll}, e.header && o.a.createElement(d.a, {theme: t}, o.a.createElement("div", {className: Object(l.a)(a.sidebarHeader, e.variant, e.sidebarInner && a.sidebarHeaderInnerSidebar)}, e.header)), e.content && o.a.createElement("div", {className: a.sidebarContent}, e.content))
        };
        var f = o.a.forwardRef(function (e, t) {
            var a = Object(r.useState)(!1), n = Object(c.a)(a, 2), i = n[0], d = n[1], m = e.classes;
            Object(r.useImperativeHandle)(t, function () {
                return {toggleSidebar: f}
            });
            var f = function () {
                d(!i)
            };
            return o.a.createElement(o.a.Fragment, null, o.a.createElement(s.a, {lgUp: "permanent" === e.variant}, o.a.createElement(u.a, {
                variant: "temporary",
                anchor: e.position,
                open: i,
                onClose: function (e) {
                    return f()
                },
                classes: {
                    root: Object(l.a)(m.sidebarWrapper, e.variant),
                    paper: Object(l.a)(m.sidebar, e.variant, "left" === e.position ? m.leftSidebar : m.rightSidebar)
                },
                ModalProps: {keepMounted: !0},
                container: e.rootRef.current,
                BackdropProps: {classes: {root: m.backdrop}},
                style: {position: "absolute"},
                onClick: function (e) {
                    return f()
                }
            }, o.a.createElement(p, e))), "permanent" === e.variant && o.a.createElement(s.a, {mdDown: !0}, o.a.createElement(u.a, {
                variant: "permanent",
                className: Object(l.a)(m.sidebarWrapper, e.variant),
                open: i,
                classes: {paper: Object(l.a)(m.sidebar, e.variant, "left" === e.position ? m.leftSidebar : m.rightSidebar)}
            }, o.a.createElement(p, e))))
        });
        var h = function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.mainThemeDark
            });
            return o.a.createElement("div", {className: e.classes.header}, e.header && o.a.createElement(d.a, {theme: t}, e.header))
        }, b = Object(i.a)(function (e) {
            return {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                    position: "relative",
                    flex: "1 0 auto",
                    height: "auto",
                    backgroundColor: e.palette.background.default
                },
                innerScroll: {flex: "1 1 auto", height: "100%"},
                wrapper: {
                    display: "flex",
                    flexDirection: "row",
                    flex: "1 1 auto",
                    zIndex: 2,
                    maxWidth: "100%",
                    minWidth: 0,
                    height: "100%",
                    backgroundColor: e.palette.background.default
                },
                header: {
                    height: 60,
                    minHeight: 60,
                    display: "flex",
                    background: "linear-gradient(to right, " + e.palette.primary.dark + " 0%, " + e.palette.primary.main + " 100%)",
                    color: e.palette.primary.contrastText,
                    backgroundSize: "cover",
                    backgroundColor: e.palette.primary.dark
                },
                topBg: {position: "absolute", left: 0, right: 0, top: 0, height: 60, pointerEvents: "none"},
                contentWrapper: {
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 auto",
                    overflow: "auto",
                    "-webkit-overflow-scrolling": "touch",
                    zIndex: 9999
                },
                toolbar: {height: 60, minHeight: 60, display: "flex", alignItems: "center"},
                content: {flex: "1 0 auto"},
                sidebarWrapper: {
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    position: "absolute",
                    "&.permanent": Object(n.a)({}, e.breakpoints.up("lg"), {position: "relative"})
                },
                sidebar: {
                    position: "absolute",
                    "&.permanent": Object(n.a)({}, e.breakpoints.up("lg"), {
                        backgroundColor: e.palette.background.default,
                        color: e.palette.text.primary,
                        position: "relative"
                    }),
                    width: 240,
                    height: "100%"
                },
                leftSidebar: Object(n.a)({}, e.breakpoints.up("lg"), {
                    borderRight: "1px solid " + e.palette.divider,
                    borderLeft: 0
                }),
                rightSidebar: Object(n.a)({}, e.breakpoints.up("lg"), {
                    borderLeft: "1px solid " + e.palette.divider,
                    borderRight: 0
                }),
                sidebarHeader: {
                    height: 60,
                    minHeight: 60,
                    backgroundColor: e.palette.primary.dark,
                    color: e.palette.primary.contrastText
                },
                sidebarHeaderInnerSidebar: {
                    backgroundColor: "transparent",
                    color: "inherit",
                    height: "auto",
                    minHeight: "auto"
                },
                sidebarContent: {},
                backdrop: {position: "absolute"}
            }
        }), g = o.a.forwardRef(function (e, t) {
            var a = Object(r.useRef)(null), n = Object(r.useRef)(null), i = Object(r.useRef)(null), c = b(e);
            return o.a.useImperativeHandle(t, function () {
                return {
                    rootRef: i, toggleLeftSidebar: function () {
                        a.current.toggleSidebar()
                    }, toggleRightSidebar: function () {
                        n.current.toggleSidebar()
                    }
                }
            }), o.a.createElement("div", {
                className: Object(l.a)(c.root, e.innerScroll && c.innerScroll),
                ref: i
            }, o.a.createElement("div", {className: Object(l.a)(c.header, c.topBg)}), o.a.createElement("div", {className: "flex flex-auto flex-col container z-10 h-full"}, e.header && e.sidebarInner && o.a.createElement(h, {
                header: e.header,
                classes: c
            }), o.a.createElement("div", {className: c.wrapper}, (e.leftSidebarHeader || e.leftSidebarContent) && o.a.createElement(f, {
                position: "left",
                header: e.leftSidebarHeader,
                content: e.leftSidebarContent,
                variant: e.leftSidebarVariant || "permanent",
                innerScroll: e.innerScroll,
                sidebarInner: e.sidebarInner,
                classes: c,
                ref: a,
                rootRef: i
            }), o.a.createElement(We, {
                className: c.contentWrapper,
                enable: e.innerScroll && !e.sidebarInner
            }, e.header && !e.sidebarInner && o.a.createElement(h, {
                header: e.header,
                classes: c
            }), e.contentToolbar && o.a.createElement("div", {className: c.toolbar}, e.contentToolbar), e.content && o.a.createElement("div", {className: c.content}, e.content)), (e.rightSidebarHeader || e.rightSidebarContent) && o.a.createElement(f, {
                position: "right",
                header: e.rightSidebarHeader,
                content: e.rightSidebarContent,
                variant: e.rightSidebarVariant || "permanent",
                innerScroll: e.innerScroll,
                sidebarInner: e.sidebarInner,
                classes: c,
                ref: n,
                rootRef: i
            }))))
        });
        g.defaultProps = {};
        var v = o.a.memo(g);
        var y = function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.mainThemeDark
            }), a = e.classes;
            return o.a.createElement(o.a.Fragment, null, e.header && o.a.createElement(d.a, {theme: t}, o.a.createElement("div", {className: Object(l.a)(a.sidebarHeader, e.variant)}, e.header)), e.content && o.a.createElement(We, {
                className: a.sidebarContent,
                enable: e.innerScroll
            }, e.content))
        };
        var O = o.a.forwardRef(function (e, t) {
            var a = Object(r.useState)(!1), n = Object(c.a)(a, 2), i = n[0], d = n[1], m = e.classes;
            Object(r.useImperativeHandle)(t, function () {
                return {toggleSidebar: p}
            });
            var p = function () {
                d(!i)
            };
            return o.a.createElement(o.a.Fragment, null, o.a.createElement(s.a, {lgUp: "permanent" === e.variant}, o.a.createElement(u.a, {
                variant: "temporary",
                anchor: e.position,
                open: i,
                onClose: function (e) {
                    return p()
                },
                classes: {
                    root: Object(l.a)(m.sidebarWrapper, e.variant),
                    paper: Object(l.a)(m.sidebar, e.variant, "left" === e.position ? m.leftSidebar : m.rightSidebar)
                },
                ModalProps: {keepMounted: !0},
                container: e.rootRef.current,
                BackdropProps: {classes: {root: m.backdrop}},
                style: {position: "absolute"},
                onClick: function (e) {
                    return p()
                }
            }, o.a.createElement(y, e))), "permanent" === e.variant && o.a.createElement(s.a, {mdDown: !0}, o.a.createElement(u.a, {
                variant: "permanent",
                className: Object(l.a)(m.sidebarWrapper, e.variant),
                open: i,
                classes: {paper: Object(l.a)(m.sidebar, e.variant, "left" === e.position ? m.leftSidebar : m.rightSidebar)}
            }, o.a.createElement(y, e))))
        });
        var E = function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.mainThemeDark
            });
            return o.a.createElement("div", {className: e.classes.header}, e.header && o.a.createElement(d.a, {theme: t}, e.header))
        }, j = Object(i.a)(function (e) {
            return {
                root: {
                    display: "flex",
                    flexDirection: "row",
                    minHeight: "100%",
                    position: "relative",
                    flex: "1 0 auto",
                    height: "auto",
                    backgroundColor: e.palette.background.default
                },
                innerScroll: {flex: "1 1 auto", height: "100%"},
                topBg: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 60,
                    background: "linear-gradient(to right, " + e.palette.primary.dark + " 0%, " + e.palette.primary.main + " 100%)",
                    backgroundSize: "cover",
                    pointerEvents: "none"
                },
                contentWrapper: Object(n.a)({
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 3.2rem",
                    flex: "1 1 100%",
                    zIndex: 2,
                    maxWidth: "100%",
                    minWidth: 0,
                    minHeight: 0
                }, e.breakpoints.down("xs"), {padding: "0 1.6rem"}),
                header: {height: 0, minHeight: 0, maxHeight: 0, display: "flex", color: e.palette.primary.contrastText},
                headerSidebarToggleButton: {color: e.palette.primary.contrastText},
                contentCard: {
                    display: "flex",
                    flex: "1 1 100%",
                    flexDirection: "column",
                    backgroundColor: e.palette.background.paper,
                    boxShadow: e.shadows[1],
                    minHeight: 0,
                    borderRadius: "8px 8px 0 0"
                },
                toolbar: {
                    height: 60,
                    minHeight: 60,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid " + e.palette.divider
                },
                content: {flex: "1 1 auto", height: "100%", overflow: "auto", "-webkit-overflow-scrolling": "touch"},
                sidebarWrapper: {
                    position: "absolute",
                    backgroundColor: "transparent",
                    zIndex: 5,
                    overflow: "hidden",
                    "&.permanent": Object(n.a)({}, e.breakpoints.up("lg"), {zIndex: 1, position: "relative"})
                },
                sidebar: {
                    position: "absolute",
                    "&.permanent": Object(n.a)({}, e.breakpoints.up("lg"), {
                        backgroundColor: "transparent",
                        position: "relative",
                        border: "none",
                        overflow: "hidden"
                    }),
                    width: 240,
                    height: "100%"
                },
                leftSidebar: {},
                rightSidebar: {},
                sidebarHeader: {
                    height: 60,
                    minHeight: 60,
                    color: e.palette.primary.contrastText,
                    backgroundColor: e.palette.primary.dark,
                    "&.permanent": Object(n.a)({}, e.breakpoints.up("lg"), {backgroundColor: "transparent"})
                },
                sidebarContent: Object(n.a)({
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    backgroundColor: e.palette.background.default,
                    color: e.palette.text.primary
                }, e.breakpoints.up("lg"), {overflow: "auto", "-webkit-overflow-scrolling": "touch"}),
                backdrop: {position: "absolute"}
            }
        }), w = o.a.forwardRef(function (e, t) {
            var a = Object(r.useRef)(null), n = Object(r.useRef)(null), i = Object(r.useRef)(null), c = j(e),
                s = e.rightSidebarHeader || e.rightSidebarContent, u = e.leftSidebarHeader || e.leftSidebarContent;
            return o.a.useImperativeHandle(t, function () {
                return {
                    rootRef: i, toggleLeftSidebar: function () {
                        a.current.toggleSidebar()
                    }, toggleRightSidebar: function () {
                        n.current.toggleSidebar()
                    }
                }
            }), o.a.createElement("div", {
                className: Object(l.a)(c.root, e.innerScroll && c.innerScroll),
                ref: i
            }, o.a.createElement("div", {className: c.topBg}), o.a.createElement("div", {className: "flex container w-full"}, u && o.a.createElement(O, {
                position: "left",
                header: e.leftSidebarHeader,
                content: e.leftSidebarContent,
                variant: e.leftSidebarVariant || "permanent",
                innerScroll: e.innerScroll,
                classes: c,
                ref: a,
                rootRef: i
            }), o.a.createElement("div", {className: Object(l.a)(c.contentWrapper, u && (void 0 === e.leftSidebarVariant || "permanent" === e.leftSidebarVariant) && "lg:pl-0", s && (void 0 === e.rightSidebarVariant || "permanent" === e.rightSidebarVariant) && "lg:pr-0")}, o.a.createElement(E, {
                header: e.header,
                classes: c
            }), o.a.createElement("div", {className: Object(l.a)(c.contentCard, e.innerScroll && "inner-scroll")}, e.contentToolbar && o.a.createElement("div", {className: c.toolbar}, e.contentToolbar), e.content && o.a.createElement(We, {
                className: c.content,
                enable: e.innerScroll,
                scrollToTopOnRouteChange: e.innerScroll
            }, e.content))), s && o.a.createElement(O, {
                position: "right",
                header: e.rightSidebarHeader,
                content: e.rightSidebarContent,
                variant: e.rightSidebarVariant || "permanent",
                innerScroll: e.innerScroll,
                classes: c,
                ref: n,
                rootRef: i
            })))
        });
        w.defaultProps = {};
        o.a.memo(w);
        var x = a(535), k = a(490), N = a(540), S = a(10);
        o.a.memo(function () {
            return o.a.createElement("div", null, o.a.createElement(x.a, {dense: !0}, (e = o.a.createElement(k.a, {button: !0}, o.a.createElement(N.a, {primary: "Single-line item"})), Object(S.a)(30).times(function (t) {
                return o.a.cloneElement(e, {key: t})
            }))));
            var e
        });
        o.a.memo(function () {
            return o.a.createElement("div", null, o.a.createElement("img", {
                src: "assets/images/demo-content/morain-lake.jpg",
                alt: "beach",
                style: {maxWidth: "640px", width: "100%"}
            }), o.a.createElement("h1", {className: "py-16"}, "Early Sunrise"), o.a.createElement("h4", {className: "pb-12"}, "Demo Content"), o.a.createElement("p", null, "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections."), o.a.createElement("blockquote", null, o.a.createElement("p", null, "The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. \"What's happened to me? \" he thought. It wasn't a dream."), o.a.createElement("footer", null, "John Doe")), o.a.createElement("p", null, "His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame."), o.a.createElement("p", null, "It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad."), o.a.createElement("p", null, '"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn\'t get into that position. However hard he threw himself onto his right, he always rolled back to where he was.'), o.a.createElement("p", null, 'He must have tried it a hundred times, shut his eyes so that he wouldn\'t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I\'ve chosen!'), o.a.createElement("p", null, "Travelling day in and day out. Doing business like this takes much more effort than doing your own business at home, and on top of that there's the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them."), o.a.createElement("p", null, "\"He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn't know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position."), o.a.createElement("p", null, '"Getting up early all the time", he thought, "it makes you stupid. You\'ve got to get enough sleep. Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I\'d get kicked out on the spot. But who knows, maybe that would be the best thing for me...'), "  ", o.a.createElement("p", null, "His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame."), o.a.createElement("p", null, "It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad."), o.a.createElement("p", null, '"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn\'t get into that position. However hard he threw himself onto his right, he always rolled back to where he was.'), o.a.createElement("p", null, 'He must have tried it a hundred times, shut his eyes so that he wouldn\'t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I\'ve chosen!'), o.a.createElement("p", null, "Travelling day in and day out. Doing business like this takes much more effort than doing your own business at home, and on top of that there's the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them."), o.a.createElement("p", null, "\"He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn't know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position."), o.a.createElement("p", null, '"Getting up early all the time", he thought, "it makes you stupid. You\'ve got to get enough sleep. Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I\'d get kicked out on the spot. But who knows, maybe that would be the best thing for me...'))
        });
        var P = a(543), C = a(2), I = a.n(C), T = a(542), D = a(57), R = a(533), L = a(488), A = a(541), F = a(15),
            _ = Object(i.a)(function (e) {
                return {
                    root: {
                        padding: "0 7px",
                        fontSize: 11,
                        fontWeight: 600,
                        height: 20,
                        minWidth: 20,
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText
                    }
                }
            });

        function z(e) {
            var t = _(e), a = e.className, n = e.badge;
            return o.a.createElement("div", {
                className: Object(l.a)(t.root, a, "item-badge"),
                style: {backgroundColor: n.bg, color: n.fg}
            }, n.title)
        }

        z.defaultProps = {};
        var M = o.a.memo(z), W = Object(i.a)(function (e) {
            return {
                item: {
                    height: 40,
                    width: "calc(100% - 16px)",
                    borderRadius: "0 20px 20px 0",
                    paddingRight: 12,
                    "&.active": {
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText + "!important",
                        pointerEvents: "none",
                        transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
                        "& .list-item-text-primary": {color: "inherit"},
                        "& .list-item-icon": {color: "inherit"}
                    },
                    "&.square, &.active.square": {width: "100%", borderRadius: "0"},
                    "& .list-item-icon": {},
                    "& .list-item-text": {},
                    color: e.palette.text.primary,
                    cursor: "pointer",
                    textDecoration: "none!important"
                }
            }
        });

        function B(e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), n = W(e), r = e.item, i = e.nestedLevel, c = e.active, s = 40 + 16 * i,
                u = i > 0 ? "pl-" + (s > 80 ? 80 : s) : "pl-24";
            return Ua.a.hasPermission(r.auth, a) ? o.a.createElement(k.a, {
                button: !0,
                component: An,
                to: r.url,
                activeClassName: "active",
                className: Object(l.a)(n.item, u, "list-item", c),
                onClick: function (e) {
                    return t(F.d())
                },
                exact: r.exact
            }, r.icon && o.a.createElement(R.a, {
                className: "list-item-icon text-16 flex-shrink-0 mr-16",
                color: "action"
            }, r.icon), o.a.createElement(N.a, {
                className: "list-item-text",
                primary: r.title,
                classes: {primary: "text-14 list-item-text-primary"}
            }), r.badge && o.a.createElement(M, {badge: r.badge})) : null
        }

        B.defaultProps = {};
        var H = Object(D.g)(o.a.memo(B)), G = Object(i.a)(function (e) {
            return {
                item: {
                    height: 40,
                    width: "calc(100% - 16px)",
                    borderRadius: "0 20px 20px 0",
                    paddingRight: 12,
                    "&.active": {
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText + "!important",
                        pointerEvents: "none",
                        transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
                        "& .list-item-text-primary": {color: "inherit"},
                        "& .list-item-icon": {color: "inherit"}
                    },
                    "&.square, &.active.square": {width: "100%", borderRadius: "0"},
                    "& .list-item-icon": {},
                    "& .list-item-text": {},
                    color: e.palette.text.primary,
                    textDecoration: "none!important"
                }
            }
        });

        function V(e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), n = G(e), r = e.item, i = e.nestedLevel, c = e.active, s = 40 + 16 * i,
                u = i > 0 ? "pl-" + (s > 80 ? 80 : s) : "pl-24";
            return Ua.a.hasPermission(r.auth, a) ? o.a.createElement(k.a, {
                button: !0,
                component: "a",
                href: r.url,
                target: r.target ? r.target : "_blank",
                className: Object(l.a)(n.item, u, "list-item", c),
                onClick: function (e) {
                    return t(F.d())
                },
                role: "button"
            }, r.icon && o.a.createElement(R.a, {
                className: "list-item-icon text-16 flex-shrink-0 mr-16",
                color: "action"
            }, r.icon), o.a.createElement(N.a, {
                className: "list-item-text",
                primary: r.title,
                classes: {primary: "text-14 list-item-text-primary"}
            }), r.badge && o.a.createElement(M, {badge: r.badge})) : null
        }

        V.defaultProps = {};
        var q = Object(D.g)(o.a.memo(V)), U = Object(i.a)(function (e) {
            return {
                root: {padding: 0, "&.open": {backgroundColor: "rgba(0,0,0,.08)"}},
                item: {
                    height: 40,
                    width: "calc(100% - 16px)",
                    borderRadius: "0 20px 20px 0",
                    paddingRight: 12,
                    color: e.palette.text.primary,
                    "&.square": {width: "100%", borderRadius: "0"}
                }
            }
        });

        function $(e, t) {
            return e && function e(t, a) {
                if (!t.children) return !1;
                for (var n = 0; n < t.children.length; n++) {
                    if (t.children[n].children && e(t.children[n], a)) return !0;
                    if (t.children[n].url === a || a.includes(t.children[n].url)) return !0
                }
                return !1
            }(t, e.pathname)
        }

        function Y(e) {
            var t = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), a = U(e), n = Object(r.useState)(function () {
                    return $(e.location, e.item)
                }), i = Object(c.a)(n, 2), s = i[0], u = i[1], d = e.item, p = e.nestedLevel, f = e.active, h = 40 + 16 * p,
                b = p > 0 ? "pl-" + (h > 80 ? 80 : h) : "pl-24";
            return Object(r.useEffect)(function () {
                $(e.location, e.item) && u(!0)
            }, [e.location, e.item]), Ua.a.hasPermission(d.auth, t) ? o.a.createElement("ul", {className: Object(l.a)(a.root, s && "open")}, o.a.createElement(k.a, {
                button: !0,
                className: Object(l.a)(a.item, b, "list-item", f),
                onClick: function () {
                    u(!s)
                }
            }, d.icon && o.a.createElement(R.a, {
                color: "action",
                className: "text-16 flex-shrink-0 mr-16"
            }, d.icon), o.a.createElement(N.a, {
                className: "list-item-text",
                primary: d.title,
                classes: {primary: "text-14"}
            }), d.badge && o.a.createElement(M, {
                className: "mr-4",
                badge: d.badge
            }), o.a.createElement(L.a, {
                disableRipple: !0,
                className: "w-16 h-16 p-0"
            }, o.a.createElement(R.a, {
                className: "text-16 arrow-icon",
                color: "inherit"
            }, s ? "expand_less" : "expand_more"))), d.children && o.a.createElement(A.a, {
                in: s,
                className: "collapse-children"
            }, d.children.map(function (e) {
                return o.a.createElement(o.a.Fragment, {key: e.id}, "group" === e.type && o.a.createElement(ee, {
                    item: e,
                    nestedLevel: p + 1,
                    active: f
                }), "collapse" === e.type && o.a.createElement(X, {
                    item: e,
                    nestedLevel: p + 1,
                    active: f
                }), "item" === e.type && o.a.createElement(H, {
                    item: e,
                    nestedLevel: p + 1,
                    active: f
                }), "link" === e.type && o.a.createElement(q, {item: e, nestedLevel: p + 1, active: f}))
            }))) : null
        }

        Y.defaultProps = {};
        var X = Object(D.g)(o.a.memo(Y)), Q = X, J = Object(i.a)({
            item: {
                height: 40,
                width: "calc(100% - 16px)",
                borderRadius: "0 20px 20px 0",
                paddingRight: 12
            }
        });

        function K(e) {
            var t = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), a = J(e), n = e.item, r = e.nestedLevel, i = e.active, c = 40 + 16 * r,
                s = r > 0 ? "pl-" + (c > 80 ? 80 : c) : "pl-24";
            return Ua.a.hasPermission(n.auth, t) ? o.a.createElement(o.a.Fragment, null, o.a.createElement(T.a, {
                disableSticky: !0,
                className: Object(l.a)(a.item, s, "list-subheader flex items-center")
            }, o.a.createElement("span", {className: "list-subheader-text uppercase text-12"}, n.title)), n.children && o.a.createElement(o.a.Fragment, null, n.children.map(function (e) {
                return o.a.createElement(o.a.Fragment, {key: e.id}, "group" === e.type && o.a.createElement(Z, {
                    item: e,
                    nestedLevel: r,
                    active: i
                }), "collapse" === e.type && o.a.createElement(Q, {
                    item: e,
                    nestedLevel: r,
                    active: i
                }), "item" === e.type && o.a.createElement(H, {
                    item: e,
                    nestedLevel: r,
                    active: i
                }), "link" === e.type && o.a.createElement(q, {item: e, nestedLevel: r, active: i}))
            }))) : null
        }

        K.defaultProps = {};
        var Z = Object(D.g)(o.a.memo(K)), ee = Z, te = a(196), ae = a(110), ne = a(82), re = a(86), oe = a(16),
            ie = Object(i.a)(function (e) {
                return {
                    root: {
                        minHeight: 48,
                        "&.active": {
                            backgroundColor: e.palette.secondary.main,
                            color: e.palette.secondary.contrastText + "!important",
                            pointerEvents: "none",
                            "& .list-item-text-primary": {color: "inherit"},
                            "& .list-item-icon": {color: "inherit"}
                        },
                        "& .list-item-icon": {},
                        "& .list-item-text": {padding: "0 0 0 16px"},
                        color: e.palette.text.primary,
                        textDecoration: "none!important",
                        "&.dense": {
                            padding: "8px 12px 8px 12px",
                            minHeight: 40,
                            "& .list-item-text": {padding: "0 0 0 8px"}
                        }
                    }
                }
            });

        function le(e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.auth.user.role
            }), n = ie(e), r = e.item, i = e.dense;
            return Ua.a.hasPermission(r.auth, a) ? o.a.createElement(k.a, {
                button: !0,
                component: An,
                to: r.url,
                activeClassName: "active",
                className: Object(l.a)("list-item", n.root, i && "dense"),
                onClick: function (e) {
                    return t(F.d())
                },
                exact: r.exact
            }, r.icon && o.a.createElement(R.a, {
                className: "list-item-icon text-16 flex-shrink-0",
                color: "action"
            }, r.icon), o.a.createElement(N.a, {
                className: "list-item-text",
                primary: r.title,
                classes: {primary: "text-14 list-item-text-primary"}
            }), r.badge && o.a.createElement(M, {className: "ml-8", badge: r.badge})) : null
        }

        le.defaultProps = {};
        var ce = Object(D.g)(o.a.memo(le)), se = Object(i.a)(function (e) {
            return {
                root: {
                    minHeight: 48,
                    "&.active": {
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText + "!important",
                        pointerEvents: "none",
                        "& .list-item-text-primary": {color: "inherit"},
                        "& .list-item-icon": {color: "inherit"}
                    },
                    "& .list-item-icon": {},
                    "& .list-item-text": {padding: "0 0 0 16px"},
                    color: e.palette.text.primary,
                    textDecoration: "none!important",
                    "&.dense": {
                        padding: "8px 12px 8px 12px",
                        minHeight: 40,
                        "& .list-item-text": {padding: "0 0 0 8px"}
                    }
                }
            }
        });

        function ue(e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.auth.user.role
            }), n = se(e), r = e.item, i = e.dense;
            return Ua.a.hasPermission(r.auth, a) ? o.a.createElement(k.a, {
                button: !0,
                component: "a",
                href: r.url,
                target: r.target ? r.target : "_blank",
                className: Object(l.a)("list-item", n.root, i && "dense"),
                onClick: function (e) {
                    return t(F.d())
                }
            }, r.icon && o.a.createElement(R.a, {
                className: "list-item-icon text-16 flex-shrink-0",
                color: "action"
            }, r.icon), o.a.createElement(N.a, {
                className: "list-item-text",
                primary: r.title,
                classes: {primary: "text-14 list-item-text-primary"}
            }), r.badge && o.a.createElement(M, {className: "ml-8", badge: r.badge})) : null
        }

        ue.defaultProps = {};
        var de = Object(D.g)(o.a.memo(ue));

        function me(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function pe(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? me(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : me(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var fe = Object(i.a)(function (e) {
            return {
                root: {"& .list-item-text": {padding: "0 0 0 16px"}},
                button: {
                    color: e.palette.text.primary,
                    minHeight: 48,
                    "&.active, &.active:hover, &.active:focus": {
                        backgroundColor: e.palette.secondary.main + "!important",
                        color: e.palette.secondary.contrastText + "!important",
                        "& .list-item-text-primary": {color: "inherit"},
                        "& .list-item-icon": {color: "inherit"}
                    },
                    "&.open": {backgroundColor: "rgba(0,0,0,.08)"},
                    "&.dense": {
                        padding: "8px 12px 8px 12px",
                        minHeight: 40,
                        "& .list-item-text": {padding: "0 0 0 8px"}
                    }
                },
                popper: {zIndex: 999},
                popperClose: {pointerEvents: "none"}
            }
        });

        function he(e) {
            var t = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), a = fe(e), i = Object(r.useState)(!1), s = Object(c.a)(i, 2), u = s[0], d = s[1], p = e.item,
                f = e.nestedLevel, h = e.dense, b = Object(ne.a)(function (e) {
                    d(e)
                }, 150);
            if (!Ua.a.hasPermission(p.auth, t)) return null;

            function g(e, t) {
                if (!e.children) return !1;
                for (var a = 0; a < e.children.length; a++) {
                    if (e.children[a].children && g(e.children[a], t)) return !0;
                    if (e.children[a].url === t || t.includes(e.children[a].url)) return !0
                }
                return !1
            }

            return o.a.createElement("ul", {className: Object(l.a)(a.root, "relative pl-0")}, o.a.createElement(re.a, null, o.a.createElement(re.c, null, function (t) {
                var n = t.ref;
                return o.a.createElement("div", {ref: n}, o.a.createElement(k.a, {
                    button: !0,
                    className: Object(l.a)("list-item", a.button, u && "open", h && "dense", g(p, e.location.pathname) && "active"),
                    onMouseEnter: function () {
                        return b(!0)
                    },
                    onMouseLeave: function () {
                        return b(!1)
                    },
                    "aria-owns": u ? "menu-list-grow" : null,
                    "aria-haspopup": "true"
                }, p.icon && o.a.createElement(R.a, {
                    color: "action",
                    className: "list-item-icon text-16 flex-shrink-0"
                }, p.icon), o.a.createElement(N.a, {
                    className: "list-item-text",
                    primary: p.title,
                    classes: {primary: "text-14"}
                }), p.badge && o.a.createElement(M, {
                    className: "ml-8 mr-4",
                    badge: p.badge
                }), o.a.createElement(L.a, {
                    disableRipple: !0,
                    className: "w-16 h-16 ml-4 p-0"
                }, o.a.createElement(R.a, {className: "text-16 arrow-icon"}, "keyboard_arrow_right"))))
            }), oe.createPortal(o.a.createElement(re.b, {
                placement: "right",
                eventsEnabled: u,
                positionFixed: !0
            }, function (e) {
                var t = e.ref, r = e.style, i = e.placement;
                e.arrowProps;
                return u && o.a.createElement("div", {
                    ref: t,
                    style: pe({}, r, {zIndex: 999 + f + 1}),
                    "data-placement": i,
                    className: Object(l.a)(a.popper, Object(n.a)({}, a.popperClose, !u))
                }, o.a.createElement(te.a, {
                    in: u,
                    id: "menu-list-grow",
                    style: {transformOrigin: "0 0 0"}
                }, o.a.createElement(ae.a, {
                    onMouseEnter: function () {
                        return b(!0)
                    }, onMouseLeave: function () {
                        return b(!1)
                    }
                }, p.children && o.a.createElement("ul", {className: Object(l.a)(a.children, "pl-0")}, p.children.map(function (e) {
                    return o.a.createElement(o.a.Fragment, {key: e.id}, "group" === e.type && o.a.createElement(we, {
                        item: e,
                        nestedLevel: f + 1,
                        dense: h
                    }), "collapse" === e.type && o.a.createElement(be, {
                        item: e,
                        nestedLevel: f + 1,
                        dense: h
                    }), "item" === e.type && o.a.createElement(ce, {
                        item: e,
                        nestedLevel: f + 1,
                        dense: h
                    }), "link" === e.type && o.a.createElement(de, {item: e, nestedLevel: f + 1, dense: h}))
                })))))
            }), document.querySelector("#root"))))
        }

        he.defaultProps = {};
        var be = Object(D.g)(o.a.memo(he)), ge = be;

        function ve(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function ye(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ve(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : ve(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var Oe = Object(i.a)(function (e) {
            return {
                root: {
                    color: e.palette.text.primary,
                    "&.active, &.active:hover, &.active:focus": {
                        backgroundColor: e.palette.secondary.main + "!important",
                        color: e.palette.secondary.contrastText + "!important",
                        "& .list-item-text-primary": {color: "inherit"},
                        "& .list-item-icon": {color: "inherit"}
                    },
                    "& .list-item-text": {padding: "0 0 0 16px"},
                    "&.level-0": {height: 48, borderRadius: 4, "&:hover": {background: "transparent"}},
                    "&.dense": {
                        padding: "8px 12px 8px 12px",
                        minHeight: 40,
                        "&.level-0": {height: 44},
                        "& .list-item-text": {padding: "0 0 0 8px"}
                    }
                }, children: {}, popper: {zIndex: 999}, popperClose: {pointerEvents: "none"}
            }
        });

        function Ee(e) {
            var t = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), a = Oe(e), i = Object(r.useState)(!1), s = Object(c.a)(i, 2), u = s[0], d = s[1], p = e.item,
                f = e.nestedLevel, h = e.dense, b = Object(ne.a)(function (e) {
                    d(e)
                }, 150);
            if (!Ua.a.hasPermission(p.auth, t)) return null;

            function g(e, t) {
                if (!e.children) return !1;
                for (var a = 0; a < e.children.length; a++) {
                    if (e.children[a].children && g(e.children[a], t)) return !0;
                    if (e.children[a].url === t || t.includes(e.children[a].url)) return !0
                }
                return !1
            }

            return o.a.createElement(re.a, null, o.a.createElement(re.c, null, function (t) {
                var n = t.ref;
                return o.a.createElement("div", {ref: n}, o.a.createElement(k.a, {
                    button: !0,
                    className: Object(l.a)("list-item ", a.root, "relative", "level-" + f, h && "dense", g(p, e.location.pathname) && "active"),
                    onMouseEnter: function () {
                        return b(!0)
                    },
                    onMouseLeave: function () {
                        return b(!1)
                    },
                    "aria-owns": u ? "menu-list-grow" : null,
                    "aria-haspopup": "true"
                }, p.icon && o.a.createElement(R.a, {
                    color: "action",
                    className: "list-item-icon text-16 flex-shrink-0"
                }, p.icon), o.a.createElement(N.a, {
                    className: "list-item-text",
                    primary: p.title,
                    classes: {primary: "text-14"}
                }), f > 0 && o.a.createElement(L.a, {
                    disableRipple: !0,
                    className: "w-16 h-16 ml-4 p-0"
                }, o.a.createElement(R.a, {className: "text-16 arrow-icon"}, "keyboard_arrow_right"))))
            }), oe.createPortal(o.a.createElement(re.b, {
                placement: 0 === f ? "bottom-start" : "right",
                eventsEnabled: u,
                positionFixed: !0
            }, function (e) {
                var t = e.ref, r = e.style, i = e.placement;
                e.arrowProps;
                return u && o.a.createElement("div", {
                    ref: t,
                    style: ye({}, r, {zIndex: 999 + f}),
                    "data-placement": i,
                    className: Object(l.a)(a.popper, Object(n.a)({}, a.popperClose, !u))
                }, o.a.createElement(te.a, {
                    in: u,
                    id: "menu-list-grow",
                    style: {transformOrigin: "0 0 0"}
                }, o.a.createElement(ae.a, {
                    onMouseEnter: function () {
                        return b(!0)
                    }, onMouseLeave: function () {
                        return b(!1)
                    }
                }, p.children && o.a.createElement("ul", {className: Object(l.a)(a.children, "pl-0")}, p.children.map(function (e) {
                    return o.a.createElement(o.a.Fragment, {key: e.id}, "group" === e.type && o.a.createElement(je, {
                        item: e,
                        nestedLevel: f,
                        dense: h
                    }), "collapse" === e.type && o.a.createElement(ge, {
                        item: e,
                        nestedLevel: f,
                        dense: h
                    }), "item" === e.type && o.a.createElement(ce, {
                        item: e,
                        nestedLevel: f,
                        dense: h
                    }), "link" === e.type && o.a.createElement(de, {item: e, nestedLevel: f, dense: h}))
                })))))
            }), document.querySelector("#root")))
        }

        Ee.defaultProps = {};
        var je = Object(D.g)(o.a.memo(Ee)), we = je;

        function xe(e) {
            var t = e.navigation, a = e.layout, n = e.active, r = e.dense, i = e.className,
                c = o.a.createElement(x.a, {className: Object(l.a)("navigation whitespace-no-wrap", i)}, t.map(function (e) {
                    return o.a.createElement(o.a.Fragment, {key: e.id}, "group" === e.type && o.a.createElement(ee, {
                        item: e,
                        nestedLevel: 0,
                        active: n,
                        dense: r
                    }), "collapse" === e.type && o.a.createElement(Q, {
                        item: e,
                        nestedLevel: 0,
                        active: n,
                        dense: r
                    }), "item" === e.type && o.a.createElement(H, {
                        item: e,
                        nestedLevel: 0,
                        active: n,
                        dense: r
                    }), "link" === e.type && o.a.createElement(q, {
                        item: e,
                        nestedLevel: 0,
                        active: n,
                        dense: r
                    }), "divider" === e.type && o.a.createElement(P.a, {className: "my-16"}))
                })),
                s = o.a.createElement(x.a, {className: Object(l.a)("navigation whitespace-no-wrap flex p-0", i)}, t.map(function (e) {
                    return o.a.createElement(o.a.Fragment, {key: e.id}, "group" === e.type && o.a.createElement(we, {
                        item: e,
                        nestedLevel: 0,
                        dense: r
                    }), "collapse" === e.type && o.a.createElement(ge, {
                        item: e,
                        nestedLevel: 0,
                        dense: r
                    }), "item" === e.type && o.a.createElement(ce, {
                        item: e,
                        nestedLevel: 0,
                        dense: r
                    }), "link" === e.type && o.a.createElement(de, {
                        item: e,
                        nestedLevel: 0,
                        dense: r
                    }), "divider" === e.type && o.a.createElement(P.a, {className: "my-16"}))
                }));
            if (!(t.length > 0)) return null;
            switch (a) {
                case"horizontal":
                    return s;
                case"vertical":
                default:
                    return c
            }
        }

        xe.propTypes = {navigation: I.a.array.isRequired}, xe.defaultProps = {layout: "vertical"};
        var ke = o.a.memo(xe), Ne = a(260), Se = (a(378), a(261)), Pe = a.n(Se), Ce = a(6), Ie = a(19), Te = a(18),
            De = a(22), Re = a(23), Le = a(24), Ae = function (e) {
                var t = function (t) {
                    function a() {
                        return Object(Ie.a)(this, a), Object(De.a)(this, Object(Re.a)(a).apply(this, arguments))
                    }

                    return Object(Le.a)(a, t), Object(Te.a)(a, [{
                        key: "render", value: function () {
                            var t = this.props, a = t.forwardRef, n = Object(Ce.a)(t, ["forwardRef"]);
                            return o.a.createElement(e, Object.assign({}, n, {ref: a}))
                        }
                    }]), a
                }(o.a.Component), a = Object(D.g)(t, {withRef: !0});
                return o.a.forwardRef(function (e, t) {
                    return o.a.createElement(a, Object.assign({}, e, {forwardRef: t}))
                })
            }, Fe = new Pe.a(window.navigator.userAgent).mobile(), _e = {
                "ps-scroll-y": "onScrollY",
                "ps-scroll-x": "onScrollX",
                "ps-scroll-up": "onScrollUp",
                "ps-scroll-down": "onScrollDown",
                "ps-scroll-left": "onScrollLeft",
                "ps-scroll-right": "onScrollRight",
                "ps-y-reach-start": "onYReachStart",
                "ps-y-reach-end": "onYReachEnd",
                "ps-x-reach-start": "onXReachStart",
                "ps-x-reach-end": "onXReachEnd"
            };
        Object.freeze(_e);
        var ze = Object(i.a)(function (e) {
            return {root: {}}
        }), Me = o.a.forwardRef(function (e, t) {
            t = t || Object(r.createRef)();
            var a = Object(r.useRef)(null), n = Object(r.useRef)(new Map), i = ze(), c = e.customScrollbars,
                s = Object(r.useCallback)(function () {
                    Object.keys(_e).forEach(function (a) {
                        var r = e[_e[a]];
                        if (r) {
                            var o = function () {
                                return r(t.current)
                            };
                            n.current.set(a, o), t.current.addEventListener(a, o, !1)
                        }
                    })
                }, [t]), u = Object(r.useCallback)(function () {
                    n.current.forEach(function (e, a) {
                        t.current && t.current.removeEventListener(a, e, !1)
                    }), n.current.clear()
                }, [t]), d = Object(r.useCallback)(function () {
                    u(), a.current && (a.current.destroy(), a.current = null)
                }, [u]), m = Object(r.useCallback)(function () {
                    Fe || !t || a.current || (a.current = new Ne.a(t.current, e.option), s())
                }, [s, e.option, t]);
            Object(r.useEffect)(function () {
                a.current && a.current.update()
            }), Object(r.useEffect)(function () {
                c ? m() : d()
            }, [m, c, d]);
            var p = Object(r.useCallback)(function () {
                t && t.current && (t.current.scrollTop = 0)
            }, [t]);
            return Object(r.useEffect)(function () {
                e.scrollToTopOnChildChange && p()
            }, [p, e.children, e.scrollToTopOnChildChange]), Object(r.useEffect)(function () {
                return e.history.listen(function () {
                    e.scrollToTopOnRouteChange && p()
                })
            }, [p, e.history, e.scrollToTopOnRouteChange]), Object(r.useEffect)(function () {
                return function () {
                    d()
                }
            }, [d]), o.a.createElement("div", {
                id: e.id,
                className: Object(l.a)(i.root, e.className),
                style: e.customScrollbars && (e.enable, 1) && !Fe ? {position: "relative", overflow: "hidden"} : {},
                ref: t
            }, e.children)
        });
        Me.defaultProps = {
            className: "",
            enable: !0,
            scrollToTopOnChildChange: !1,
            scrollToTopOnRouteChange: !1,
            option: {wheelPropagation: !0},
            ref: void 0,
            onScrollY: void 0,
            onScrollX: void 0,
            onScrollUp: void 0,
            onScrollDown: void 0,
            onScrollLeft: void 0,
            onScrollRight: void 0,
            onYReachStart: void 0,
            onYReachEnd: void 0,
            onXReachStart: void 0,
            onXReachEnd: void 0
        };
        var We = Object(m.a)(function (e) {
            return {customScrollbars: e.fuse.settings.current.customScrollbars}
        }, null, null, {forwardRef: !0})(Ae(Me)), Be = a(92), He = a(81), Ge = function (e) {
            function t(e, a) {
                var n;
                Object(Ie.a)(this, t), n = Object(De.a)(this, Object(Re.a)(t).call(this, e));
                var r = a.routes;
                return n.state = {accessGranted: !0, routes: r}, n
            }

            return Object(Le.a)(t, e), Object(Te.a)(t, [{
                key: "componentDidMount", value: function () {
                    this.state.accessGranted || this.redirectRoute()
                }
            }, {
                key: "componentDidUpdate", value: function () {
                    this.state.accessGranted || this.redirectRoute()
                }
            }, {
                key: "shouldComponentUpdate", value: function (e, t) {
                    return t.accessGranted !== this.state.accessGranted
                }
            }, {
                key: "redirectRoute", value: function () {
                    var e = this.props, t = e.location, a = e.userRole, n = e.history, r = t.pathname, o = t.state,
                        i = o && o.redirectUrl ? o.redirectUrl : "/";
                    a && 0 !== a.length && "guest" !== a ? n.push({pathname: i}) : n.push({
                        pathname: "/login",
                        state: {redirectUrl: r}
                    })
                }
            }, {
                key: "render", value: function () {
                    return this.state.accessGranted ? o.a.createElement(o.a.Fragment, null, this.props.children) : null
                }
            }], [{
                key: "getDerivedStateFromProps", value: function (e, t) {
                    var a = e.location, n = e.userRole, r = a.pathname, o = Object(Be.a)(t.routes, r)[0];
                    return {accessGranted: !o || Ua.a.hasPermission(o.route.auth, n)}
                }
            }]), t
        }(r.Component);
        Ge.contextType = He.a;
        var Ve = Object(D.g)(Object(m.a)(function (e) {
            return {userRole: e.auth.user.role}
        })(Ge));
        var qe = o.a.memo(function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.mainTheme
            });
            return o.a.createElement(d.a, {theme: t}, e.children)
        }), Ue = a(7), $e = a(42), Ye = a(150), Xe = function (e) {
            function t(e, a) {
                var n;
                Object(Ie.a)(this, t), n = Object(De.a)(this, Object(Re.a)(t).call(this, e));
                var r = a.routes;
                return n.state = {awaitRender: !1, routes: r}, n
            }

            return Object(Le.a)(t, e), Object(Te.a)(t, [{
                key: "render", value: function () {
                    var e = this.props, t = e.settings, a = e.classes, n = Rn[t.layout.style];
                    return this.state.awaitRender ? null : o.a.createElement(n, Object.assign({classes: {root: a.root}}, this.props))
                }
            }], [{
                key: "getDerivedStateFromProps", value: function (e, t) {
                    var a = e.location.pathname, n = Object(Be.a)(t.routes, a)[0], r = e.settings;
                    if (t.pathname !== a) if (n && n.route.settings) {
                        var o = n.route.settings;
                        r = Object(Ye.b)(e.defaultSettings, o), S.a.isEqual(e.settings, r) || e.setSettings(r)
                    } else S.a.isEqual(e.settings, e.defaultSettings) || (r = S.a.merge({}, e.defaultSettings), e.resetSettings());
                    return {awaitRender: !S.a.isEqual(e.settings, r), pathname: a}
                }
            }]), t
        }(r.Component);
        Xe.contextType = He.a;
        var Qe = Object(Ue.a)(function (e) {
                return {
                    root: {
                        backgroundColor: e.palette.background.default,
                        color: e.palette.text.primary,
                        '& code:not([class*="language-"])': {
                            color: e.palette.secondary.dark,
                            backgroundColor: "#F5F5F5",
                            padding: "2px 3px",
                            borderRadius: 2,
                            lineHeight: 1.7
                        },
                        "& table.simple tbody tr td": {borderColor: e.palette.divider},
                        "& table.simple thead tr th": {borderColor: e.palette.divider},
                        "& a:not([role=button])": {
                            color: e.palette.secondary.main,
                            textDecoration: "none",
                            "&:hover": {textDecoration: "underline"}
                        },
                        '& [class^="border-"]': {borderColor: e.palette.divider},
                        '& [class*="border-"]': {borderColor: e.palette.divider}
                    }
                }
            }, {withTheme: !0})(Object(D.g)(Object(m.a)(function (e) {
                var t = e.fuse;
                return {defaultSettings: t.settings.defaults, settings: t.settings.current}
            }, function (e) {
                return Object($e.c)({setSettings: F.i, resetSettings: F.g}, e)
            })(o.a.memo(Xe)))), Je = a(499), Ke = a(536), Ze = a(484), et = a(494), tt = a(563), at = a(544), nt = a(561),
            rt = a(545), ot = a(98), it = a(34), lt = Object(i.a)(function (e) {
                return {
                    root: {},
                    formControl: {margin: "6px 0", width: "100%", "&:last-child": {marginBottom: 0}},
                    group: {},
                    formGroupTitle: {
                        position: "absolute",
                        top: -10,
                        left: 8,
                        fontWeight: 600,
                        padding: "0 4px",
                        backgroundColor: e.palette.background.paper
                    },
                    formGroup: {
                        position: "relative",
                        border: "1px solid " + e.palette.divider,
                        borderRadius: 2,
                        padding: "12px 12px 0 12px",
                        margin: "24px 0 16px 0",
                        "&:first-of-type": {marginTop: 16}
                    }
                }
            });
        o.a.memo(function (e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.auth.user
            }), n = Object(m.c)(function (e) {
                return e.fuse.settings.themes
            }), r = Object(m.c)(function (e) {
                return e.fuse.settings.current
            }), i = lt(e);

            function s(e) {
                var n = S.a.set(S.a.merge({}, r), e.target.name, "checkbox" === e.target.type ? e.target.checked : e.target.value);
                "layout.style" === e.target.name && e.target.value !== r.layout.style && (n.layout.config = {}), "guest" === a.role ? t(F.h(n)) : t(it.p(n))
            }

            function u(e) {
                var t = e.value, a = e.name, r = e.handleChange;
                return o.a.createElement(Je.a, {
                    className: "w-full",
                    value: t,
                    onChange: r,
                    name: a
                }, Object.entries(n).map(function (e) {
                    var t = Object(c.a)(e, 2), a = t[0], n = t[1];
                    return o.a.createElement(Ke.a, {
                        key: a,
                        value: a,
                        className: "m-8 mt-0 rounded-lg",
                        style: {
                            backgroundColor: n.palette.background.default,
                            color: n.palette.text.primary,
                            border: "1px solid " + n.palette.divider
                        }
                    }, S.a.startCase(a), o.a.createElement("div", {
                        className: "flex w-full h-8 block absolute bottom-0 left-0 right-0",
                        style: {borderTop: "1px solid " + n.palette.divider}
                    }, o.a.createElement("div", {
                        className: "w-1/4 h-8",
                        style: {backgroundColor: n.palette.primary.main}
                    }), o.a.createElement("div", {
                        className: "w-1/4 h-8",
                        style: {backgroundColor: n.palette.secondary.main}
                    }), o.a.createElement("div", {
                        className: "w-1/4 h-8",
                        style: {backgroundColor: n.palette.error.main}
                    }), o.a.createElement("div", {
                        className: "w-1/4 h-8",
                        style: {backgroundColor: n.palette.background.paper}
                    })))
                }))
            }

            var d = function e(t, a) {
                return Object.entries(t).map(function (t) {
                    var n = Object(c.a)(t, 2), l = n[0], u = n[1], d = a ? a + "." + l : l;
                    switch (u.type) {
                        case"radio":
                            return o.a.createElement(Ze.a, {
                                key: d,
                                component: "fieldset",
                                className: i.formControl
                            }, o.a.createElement(et.a, {
                                component: "legend",
                                className: "text-14"
                            }, u.title), o.a.createElement(tt.a, {
                                "aria-label": u.title,
                                name: "layout.config.".concat(d),
                                className: i.group,
                                value: S.a.get(r.layout.config, d),
                                onChange: s,
                                row: u.options.length < 4
                            }, u.options.map(function (e) {
                                return o.a.createElement(at.a, {
                                    key: e.value,
                                    value: e.value,
                                    control: o.a.createElement(nt.a, null),
                                    label: e.name
                                })
                            })));
                        case"switch":
                            return o.a.createElement(Ze.a, {
                                key: d,
                                component: "fieldset",
                                className: i.formControl
                            }, o.a.createElement(at.a, {
                                classes: {},
                                control: o.a.createElement(rt.a, {
                                    name: "layout.config.".concat(d),
                                    checked: S.a.get(r.layout.config, d),
                                    onChange: s,
                                    "aria-label": u.title
                                }),
                                label: o.a.createElement(et.a, {component: "legend", className: "text-14"}, u.title)
                            }));
                        case"group":
                            return o.a.createElement("div", {
                                key: d,
                                className: i.formGroup
                            }, o.a.createElement(ot.a, {
                                className: i.formGroupTitle,
                                color: "textSecondary"
                            }, u.title), e(u.children, l));
                        default:
                            return ""
                    }
                })
            };
            return o.a.createElement("div", {className: i.root}, o.a.createElement("div", {className: i.formGroup}, o.a.createElement(ot.a, {
                className: i.formGroupTitle,
                color: "textSecondary"
            }, "Layout"), o.a.createElement(function () {
                return o.a.createElement(Ze.a, {
                    component: "fieldset",
                    className: i.formControl
                }, o.a.createElement(et.a, {
                    component: "legend",
                    className: "text-14"
                }, "Style"), o.a.createElement(tt.a, {
                    "aria-label": "Layout Style",
                    name: "layout.style",
                    className: i.group,
                    value: r.layout.style,
                    onChange: s
                }, Object.entries(Ln.a).map(function (e) {
                    var t = Object(c.a)(e, 2), a = t[0], n = t[1];
                    return o.a.createElement(at.a, {
                        key: a,
                        value: a,
                        control: o.a.createElement(nt.a, null),
                        label: n.title
                    })
                })))
            }, null), o.a.createElement(function () {
                var e = Ln.a[r.layout.style].form;
                return d(e)
            }, null), o.a.createElement(ot.a, {
                className: "my-16 text-12 italic",
                color: "textSecondary"
            }, "*Not all option combinations are available")), o.a.createElement("div", {className: Object(l.a)(i.formGroup, "pb-16")}, o.a.createElement(ot.a, {
                className: i.formGroupTitle,
                color: "textSecondary"
            }, "Theme"), o.a.createElement(Ze.a, {
                component: "fieldset",
                className: i.formControl
            }, o.a.createElement(et.a, {
                component: "legend",
                className: "text-14"
            }, "Main"), o.a.createElement(u, {
                value: r.theme.main,
                name: "theme.main",
                handleChange: s
            })), o.a.createElement(Ze.a, {
                component: "fieldset",
                className: i.formControl
            }, o.a.createElement(et.a, {
                component: "legend",
                className: "text-14"
            }, "Navbar"), o.a.createElement(u, {
                value: r.theme.navbar,
                name: "theme.navbar",
                handleChange: s
            })), o.a.createElement(Ze.a, {
                component: "fieldset",
                className: i.formControl
            }, o.a.createElement(et.a, {
                component: "legend",
                className: "text-14"
            }, "Toolbar"), o.a.createElement(u, {
                value: r.theme.toolbar,
                name: "theme.toolbar",
                handleChange: s
            })), o.a.createElement(Ze.a, {
                component: "fieldset",
                className: i.formControl
            }, o.a.createElement(et.a, {
                component: "legend",
                className: "text-14"
            }, "Footer"), o.a.createElement(u, {
                value: r.theme.footer,
                name: "theme.footer",
                handleChange: s
            }))), o.a.createElement(Ze.a, {
                component: "fieldset",
                className: i.formControl
            }, o.a.createElement(et.a, {
                component: "legend",
                className: "text-14"
            }, "Custom Scrollbars"), o.a.createElement(rt.a, {
                checked: r.customScrollbars,
                onChange: s,
                "aria-label": "Custom Scrollbars",
                name: "customScrollbars"
            })))
        });
        var ct = a(96), st = a.n(ct);

        function ut(e) {
            var t = e.onComplete, a = Object(r.useState)(st.a.isMoment(e.endDate) ? e.endDate : st()(e.endDate)),
                n = Object(c.a)(a, 1)[0], i = Object(r.useState)({days: "", hours: "", minutes: "", seconds: ""}),
                s = Object(c.a)(i, 2), u = s[0], d = s[1], m = Object(r.useRef)(),
                p = Object(r.useCallback)(function () {
                    window.clearInterval(m.current), t && t()
                }, [t]), f = Object(r.useCallback)(function () {
                    var e = st()(), t = n.diff(e, "seconds");
                    if (t < 0) p(); else {
                        var a = st.a.duration(t, "seconds");
                        d({days: a.asDays().toFixed(0), hours: a.hours(), minutes: a.minutes(), seconds: a.seconds()})
                    }
                }, [p, n]);
            return Object(r.useEffect)(function () {
                return m.current = setInterval(f, 1e3), function () {
                    clearInterval(m.current)
                }
            }, [f]), o.a.createElement("div", {className: Object(l.a)("flex items-center", e.className)}, o.a.createElement("div", {className: "flex flex-col items-center justify-center px-12"}, o.a.createElement(ot.a, {
                variant: "h4",
                className: "mb-4"
            }, u.days), o.a.createElement(ot.a, {
                variant: "caption",
                color: "textSecondary"
            }, "days")), o.a.createElement("div", {className: "flex flex-col items-center justify-center px-12"}, o.a.createElement(ot.a, {
                variant: "h4",
                className: "mb-4"
            }, u.hours), o.a.createElement(ot.a, {
                variant: "caption",
                color: "textSecondary"
            }, "hours")), o.a.createElement("div", {className: "flex flex-col items-center justify-center px-12"}, o.a.createElement(ot.a, {
                variant: "h4",
                className: "mb-4"
            }, u.minutes), o.a.createElement(ot.a, {
                variant: "caption",
                color: "textSecondary"
            }, "minutes")), o.a.createElement("div", {className: "flex flex-col items-center justify-center px-12"}, o.a.createElement(ot.a, {
                variant: "h4",
                className: "mb-4"
            }, u.seconds), o.a.createElement(ot.a, {variant: "caption", color: "textSecondary"}, "seconds")))
        }

        ut.defaultProps = {endDate: st()().add(15, "days")};
        o.a.memo(ut);
        var dt = a(189);
        a(398), a(399), a(400), a(401), a(402), a(403), a(404), a(405), a(406), a(407), a(408), a(409), a(410), a(411), a(412), a(413), a(414);

        function mt(e) {
            var t = Object(r.useRef)(null), a = Object(r.useRef)(function () {
                var t = e.children.split("\n");
                t[0].trim() || t.shift();
                t[t.length - 1].trim() || t.pop();
                var a = t[0].search(/\S|$/), n = "";
                return t.forEach(function (e, r) {
                    n += e.substr(a, e.length), r !== t.length - 1 && (n += "\n")
                }), n
            }());
            Object(r.useEffect)(function () {
                dt.highlightElement(t.current, e.async)
            }, [e.async]);
            var n = e.className, i = e.component;
            return o.a.createElement(i, {ref: t, className: n}, a.current)
        }

        mt.defaultProps = {component: "code"};
        var pt = o.a.memo(mt), ft = a(546), ht = a(547), bt = a(558), gt = a(548), vt = a(12), yt = a(39), Ot = a(146),
            Et = a.n(Ot), jt = a(264), wt = a.n(jt), xt = a(485), kt = a(273), Nt = a(531);

        function St(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function Pt(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? St(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : St(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var Ct = Object(xt.a)({productionPrefix: "iframe-"}), It = function (e) {
            function t() {
                var e, a;
                Object(Ie.a)(this, t);
                for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                return (a = Object(De.a)(this, (e = Object(Re.a)(t)).call.apply(e, [this].concat(r)))).state = {ready: !1}, a.handleRef = function (e) {
                    a.contentDocument = e ? e.node.contentDocument : null
                }, a.onContentDidMount = function () {
                    a.setState({
                        ready: !0,
                        jss: Object(yt.b)(Pt({}, Object(kt.a)(), {
                            plugins: [].concat(Object(vt.a)(Object(kt.a)().plugins), [Et()()]),
                            insertionPoint: a.contentDocument.querySelector("#jss-demo-insertion-point")
                        })),
                        sheetsManager: new Map,
                        container: a.contentDocument.body
                    })
                }, a.onContentDidUpdate = function () {
                    a.contentDocument.body.dir = a.props.theme.direction
                }, a.renderHead = function () {
                    return o.a.createElement(o.a.Fragment, null, o.a.createElement("style", {dangerouslySetInnerHTML: {__html: "\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}), o.a.createElement("noscript", {id: "jss-demo-insertion-point"}))
                }, a
            }

            return Object(Le.a)(t, e), Object(Te.a)(t, [{
                key: "render", value: function () {
                    var e = this.props, t = e.children, a = e.classes, n = e.theme;
                    return o.a.createElement(wt.a, {
                        head: this.renderHead(),
                        ref: this.handleRef,
                        className: a.root,
                        contentDidMount: this.onContentDidMount,
                        contentDidUpdate: this.onContentDidUpdate
                    }, this.state.ready ? o.a.createElement(Nt.b, {
                        jss: this.state.jss,
                        generateClassName: Ct,
                        sheetsManager: this.state.sheetsManager
                    }, o.a.createElement(d.a, {theme: n}, o.a.cloneElement(t, {container: this.state.container}))) : null)
                }
            }]), t
        }(o.a.Component), Tt = Object(Ue.a)(function (e) {
            return {
                root: {
                    backgroundColor: e.palette.background.default,
                    flexGrow: 1,
                    height: 400,
                    border: "none",
                    boxShadow: e.shadows[1]
                }
            }
        }, {withTheme: !0})(It);

        function Dt(e) {
            var t = Object(r.useState)(e.currentTabIndex), a = Object(c.a)(t, 2), n = a[0], i = a[1], l = e.component,
                s = e.raw, u = e.iframe, d = e.className;
            return o.a.createElement(ft.a, {className: d}, o.a.createElement(ht.a, {
                position: "static",
                color: "default",
                elevation: 0
            }, o.a.createElement(bt.a, {
                classes: {root: "border-b-1", flexContainer: "justify-end"},
                value: n,
                onChange: function (e, t) {
                    i(t)
                }
            }, l && o.a.createElement(gt.a, {
                classes: {root: "min-w-64"},
                icon: o.a.createElement(R.a, null, "remove_red_eye")
            }), s && o.a.createElement(gt.a, {
                classes: {root: "min-w-64"},
                icon: o.a.createElement(R.a, null, "code")
            }))), o.a.createElement("div", {className: "flex justify-center"}, o.a.createElement("div", {className: 0 === n ? "flex flex-1" : "hidden"}, l && (u ? o.a.createElement(Tt, null, o.a.createElement(l, null)) : o.a.createElement("div", {className: "p-24 flex flex-1 justify-center"}, o.a.createElement(l, null)))), o.a.createElement("div", {className: 1 === n ? "flex flex-1" : "hidden"}, s && o.a.createElement("div", {className: "flex flex-1"}, o.a.createElement(pt, {
                component: "pre",
                className: "language-javascript w-full"
            }, s)))))
        }

        Dt.defaultProps = {currentTabIndex: 0};
        var Rt = a(549), Lt = a(550), At = a(270), Ft = a(487), _t = a(234), zt = a(27), Mt = Object(i.a)({
            root: {"&.horizontal": {}, "&.vertical": {flexDirection: "column"}},
            item: {textDecoration: "none!important", color: "inherit"},
            addIcon: {color: _t.a[600]}
        });

        function Wt(e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                    return e.auth.user.shortcuts
                }), n = Object(m.c)(function (e) {
                    return e.fuse.navigation
                }), i = Mt(e), s = Object(r.useRef)(null), u = Object(r.useState)(null), d = Object(c.a)(u, 2), p = d[0],
                f = d[1], h = Object(r.useState)(""), b = Object(c.a)(h, 2), g = b[0], v = b[1],
                y = Object(r.useState)(null), O = Object(c.a)(y, 2), E = O[0], j = O[1], w = Object(r.useState)(null),
                x = Object(c.a)(w, 2), k = x[0], S = x[1], C = a ? a.map(function (e) {
                    return Ua.a.findById(n, e)
                }) : [];

            function I(e) {
                var n = Object(vt.a)(a);
                n = n.includes(e) ? n.filter(function (t) {
                    return e !== t
                }) : [].concat(Object(vt.a)(n), [e]), t(it.q(n))
            }

            function T(e) {
                var t = e.item, n = e.onToggle;
                return o.a.createElement(zt.a, {
                    to: t.url,
                    className: i.item
                }, o.a.createElement(Ke.a, {key: t.id}, o.a.createElement(Rt.a, {className: "min-w-40"}, t.icon ? o.a.createElement(R.a, null, t.icon) : o.a.createElement("span", {className: "text-20 font-bold uppercase text-center"}, t.title[0])), o.a.createElement(N.a, {
                    className: "pl-0",
                    primary: t.title
                }), o.a.createElement(L.a, {
                    onClick: function (e) {
                        e.preventDefault(), e.stopPropagation(), n(t.id)
                    }
                }, o.a.createElement(R.a, {color: "action"}, a.includes(t.id) ? "star" : "star_border"))))
            }

            return Object(r.useEffect)(function () {
                S(Ua.a.getFlatNavigation(n))
            }, [e.location, n]), o.a.createElement("div", {className: Object(l.a)(i.root, e.variant, "flex flex-1", "vertical" === e.variant && "flex-grow-0 flex-shrink", e.className)}, o.a.createElement(Na, {
                enter: {animation: "transition.expandIn"},
                className: Object(l.a)("flex flex-1", "vertical" === e.variant && "flex-col")
            }, C.map(function (t) {
                return t && o.a.createElement(zt.a, {
                    to: t.url,
                    key: t.id,
                    className: i.item
                }, o.a.createElement(Lt.a, {
                    title: t.title,
                    placement: "horizontal" === e.variant ? "bottom" : "left"
                }, o.a.createElement(L.a, {className: "w-40 h-40 p-0"}, t.icon ? o.a.createElement(R.a, null, t.icon) : o.a.createElement("span", {className: "text-20 font-bold uppercase"}, t.title[0]))))
            }), o.a.createElement(Lt.a, {
                title: "Click to add/remove shortcut",
                placement: "horizontal" === e.variant ? "bottom" : "left"
            }, o.a.createElement(L.a, {
                className: "w-40 h-40 p-0",
                "aria-owns": p ? "add-menu" : null,
                "aria-haspopup": "true",
                onClick: function (e) {
                    f(e.currentTarget)
                }
            }, o.a.createElement(R.a, {className: i.addIcon}, "star")))), o.a.createElement(At.a, {
                id: "add-menu",
                anchorEl: p,
                open: Boolean(p),
                onClose: function () {
                    f(null)
                },
                classes: {paper: "mt-48"},
                onEntered: function () {
                    s.current.focus()
                },
                onExited: function () {
                    v("")
                }
            }, o.a.createElement("div", {className: "p-16 pt-8"}, o.a.createElement(Ft.a, {
                inputRef: s,
                value: g,
                onChange: function (e) {
                    var t = e.target.value;
                    v(t), 0 !== t.length && k ? j(k.filter(function (e) {
                        return e.title.toLowerCase().includes(t.toLowerCase())
                    })) : j(null)
                },
                placeholder: "Search for an app or page",
                className: "",
                fullWidth: !0,
                inputProps: {"aria-label": "Search"}
            })), o.a.createElement(P.a, null), 0 !== g.length && E && E.map(function (e) {
                return o.a.createElement(T, {
                    key: e.id, item: e, onToggle: function () {
                        return I(e.id)
                    }
                })
            }), 0 !== g.length && 0 === E.length && o.a.createElement(ot.a, {
                color: "textSecondary",
                className: "p-16 pb-8"
            }, "No results.."), 0 === g.length && C.map(function (e) {
                return e && o.a.createElement(T, {
                    key: e.id, item: e, onToggle: function () {
                        return I(e.id)
                    }
                })
            })))
        }

        Wt.defaultProps = {variant: "horizontal"};
        var Bt = o.a.memo(Wt), Ht = a(504), Gt = a(495), Vt = a(497), qt = a(193), Ut = a.n(qt), $t = a(265),
            Yt = a.n($t), Xt = a(266), Qt = a.n(Xt), Jt = a(194), Kt = a.n(Jt);

        function Zt(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function ea(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Zt(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Zt(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        function ta(e) {
            var t = e.variant, a = e.classes, n = e.inputRef, r = void 0 === n ? function () {
            } : n, i = e.ref, c = Object(Ce.a)(e, ["variant", "classes", "inputRef", "ref"]);
            return o.a.createElement("div", {className: "w-full relative"}, "basic" === t ? o.a.createElement(o.a.Fragment, null, o.a.createElement(Ht.a, Object.assign({
                fullWidth: !0,
                InputProps: {
                    inputRef: function (e) {
                        i(e), r(e)
                    }, classes: {input: Object(l.a)(a.input, "py-0 px-16 h-48 pr-48"), notchedOutline: "rounded-8"}
                },
                variant: "outlined"
            }, c)), o.a.createElement(R.a, {
                className: "absolute top-0 right-0 h-48 w-48 p-12 pointer-events-none",
                color: "action"
            }, "search")) : o.a.createElement(Ht.a, Object.assign({
                fullWidth: !0,
                InputProps: {
                    disableUnderline: !0, inputRef: function (e) {
                        i(e), r(e)
                    }, classes: {input: Object(l.a)(a.input, "py-0 px-16 h-64")}
                },
                variant: "standard"
            }, c)))
        }

        function aa(e, t) {
            var a = t.query, n = t.isHighlighted, r = Ut()(e.title, a), i = Yt()(e.title, r);
            return o.a.createElement(Ke.a, {
                selected: n,
                component: "div"
            }, o.a.createElement(Rt.a, {className: "min-w-40"}, e.icon ? o.a.createElement(R.a, null, e.icon) : o.a.createElement("span", {className: "text-20 w-24 font-bold uppercase text-center"}, e.title[0])), o.a.createElement(N.a, {
                className: "pl-0",
                primary: i.map(function (e, t) {
                    return e.highlight ? o.a.createElement("span", {
                        key: String(t),
                        style: {fontWeight: 600}
                    }, e.text) : o.a.createElement("strong", {key: String(t), style: {fontWeight: 300}}, e.text)
                })
            }))
        }

        function na(e) {
            return e.title
        }

        var ra = Object(i.a)(function (e) {
            return {
                root: {},
                container: {position: "relative"},
                suggestionsContainerOpen: {position: "absolute", zIndex: 1, marginTop: e.spacing(), left: 0, right: 0},
                suggestion: {display: "block"},
                suggestionsList: {margin: 0, padding: 0, listStyleType: "none"},
                input: {
                    transition: e.transitions.create(["background-color"], {
                        easing: e.transitions.easing.easeInOut,
                        duration: e.transitions.duration.short
                    }), "&:focus": {backgroundColor: e.palette.background.paper}
                }
            }
        }), oa = {searchText: "", search: !1, navigation: null, suggestions: [], noSuggestions: !1};

        function ia(e, t) {
            switch (t.type) {
                case"open":
                    return ea({}, e, {opened: !0});
                case"close":
                    return ea({}, e, {opened: !1, searchText: ""});
                case"setSearchText":
                    return ea({}, e, {searchText: t.value});
                case"setNavigation":
                    return ea({}, e, {navigation: t.value});
                case"updateSuggestions":
                    var a = function (e, t) {
                        var a = Qt()(e.trim()).toLowerCase(), n = a.length, r = 0;
                        return 0 === n ? [] : t.filter(function (e) {
                            var t = r < 10 && Ut()(e.title, a).length > 0;
                            return t && (r += 1), t
                        })
                    }(t.value, e.navigation);
                    return ea({}, e, {suggestions: a, noSuggestions: !("" === t.value.trim()) && 0 === a.length});
                case"clearSuggestions":
                    return ea({}, e, {suggestions: [], noSuggestions: !1});
                case"decrement":
                    return {count: e.count - 1};
                default:
                    throw new Error
            }
        }

        function la(e) {
            var t = Object(m.c)(function (e) {
                    return e.auth.user.role
                }), a = Object(m.c)(function (e) {
                    return e.fuse.navigation
                }), n = Object(r.useReducer)(ia, oa), i = Object(c.a)(n, 2), s = i[0], u = i[1], d = ra(e),
                p = Object(r.useRef)(null), f = Object(r.useRef)(null);

            function h() {
                u({type: "open"}), document.addEventListener("keydown", g, !1)
            }

            function b() {
                u({type: "close"}), document.removeEventListener("keydown", g, !1)
            }

            function g(e) {
                27 === e.keyCode && b()
            }

            function v(e) {
                u({type: "setSearchText", value: e.target.value})
            }

            Object(r.useEffect)(function () {
                u({
                    type: "setNavigation", value: Ua.a.getFlatNavigation(a).filter(function (e) {
                        return function (e) {
                            return Ua.a.hasPermission(e.auth, t)
                        }(e)
                    })
                })
            }, [t, a]);
            var y = {
                renderInputComponent: ta,
                highlightFirstSuggestion: !0,
                suggestions: s.suggestions,
                onSuggestionsFetchRequested: function (e) {
                    var t = e.value;
                    u({type: "updateSuggestions", value: t})
                },
                onSuggestionsClearRequested: function () {
                    u({type: "clearSuggestions"})
                },
                onSuggestionSelected: function (t, a) {
                    var n = a.suggestion;
                    t.preventDefault(), t.stopPropagation(), n.url && (e.history.push(n.url), b())
                },
                getSuggestionValue: na,
                renderSuggestion: aa
            };
            switch (e.variant) {
                case"basic":
                    return o.a.createElement("div", {
                        className: Object(l.a)("flex items-center w-full", e.className),
                        ref: f
                    }, o.a.createElement(Kt.a, Object.assign({}, y, {
                        inputProps: {
                            variant: e.variant,
                            classes: d,
                            placeholder: "Search",
                            value: s.searchText,
                            onChange: v,
                            onFocus: h,
                            InputLabelProps: {shrink: !0},
                            autoFocus: !1
                        },
                        theme: {
                            container: "flex flex-1 w-full",
                            suggestionsList: d.suggestionsList,
                            suggestion: d.suggestion
                        },
                        renderSuggestionsContainer: function (e) {
                            return o.a.createElement(Gt.a, {
                                anchorEl: f.current,
                                open: Boolean(e.children) || s.noSuggestions,
                                popperOptions: {positionFixed: !0},
                                className: "z-9999"
                            }, o.a.createElement("div", {ref: p}, o.a.createElement(ae.a, Object.assign({
                                elevation: 1,
                                square: !0
                            }, e.containerProps, {style: {width: f.current ? f.current.clientWidth : null}}), e.children, s.noSuggestions && o.a.createElement(ot.a, {className: "px-16 py-12"}, "No results.."))))
                        }
                    })));
                case"full":
                    return o.a.createElement("div", {className: Object(l.a)(d.root, "flex", e.className)}, o.a.createElement(Lt.a, {
                        title: "Click to search",
                        placement: "bottom"
                    }, o.a.createElement("div", {onClick: h}, e.trigger)), s.opened && o.a.createElement(Vt.a, {
                        onClickAway: function (e) {
                            return (!p.current || !p.current.contains(e.target)) && b()
                        }
                    }, o.a.createElement(ae.a, {
                        className: "absolute left-0 right-0 h-full z-9999",
                        square: !0
                    }, o.a.createElement("div", {
                        className: "flex items-center w-full",
                        ref: f
                    }, o.a.createElement(Kt.a, Object.assign({}, y, {
                        inputProps: {
                            classes: d,
                            placeholder: "Search",
                            value: s.searchText,
                            onChange: v,
                            InputLabelProps: {shrink: !0},
                            autoFocus: !0
                        },
                        theme: {
                            container: "flex flex-1 w-full",
                            suggestionsList: d.suggestionsList,
                            suggestion: d.suggestion
                        },
                        renderSuggestionsContainer: function (e) {
                            return o.a.createElement(Gt.a, {
                                anchorEl: f.current,
                                open: Boolean(e.children) || s.noSuggestions,
                                popperOptions: {positionFixed: !0},
                                className: "z-9999"
                            }, o.a.createElement("div", {ref: p}, o.a.createElement(ae.a, Object.assign({
                                elevation: 1,
                                square: !0
                            }, e.containerProps, {style: {width: f.current ? f.current.clientWidth : null}}), e.children, s.noSuggestions && o.a.createElement(ot.a, {className: "px-16 py-12"}, "No results.."))))
                        }
                    })), o.a.createElement(L.a, {
                        onClick: b,
                        className: "mx-8"
                    }, o.a.createElement(R.a, null, "close"))))));
                default:
                    return null
            }
        }

        la.defaultProps = {
            trigger: o.a.createElement(L.a, {className: "w-64 h-64"}, o.a.createElement(R.a, null, "search")),
            variant: "full"
        };
        var ca = Object(D.g)(o.a.memo(la)), sa = a(551), ua = a(498), da = a(233), ma = a(232),
            pa = Object(i.a)(function (e) {
                return {
                    root: {},
                    success: {backgroundColor: da.a[600], color: "#FFFFFF"},
                    error: {
                        backgroundColor: e.palette.error.dark,
                        color: e.palette.getContrastText(e.palette.error.dark)
                    },
                    info: {backgroundColor: ma.a[600], color: "#FFFFFF"},
                    warning: {backgroundColor: _t.a[600], color: "#FFFFFF"}
                }
            }), fa = {success: "check_circle", warning: "warning", error: "error_outline", info: "info"};
        var ha = o.a.memo(function (e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.fuse.message.state
            }), n = Object(m.c)(function (e) {
                return e.fuse.message.options
            }), r = pa();
            return o.a.createElement(sa.a, Object.assign({}, n, {
                open: a,
                onClose: function () {
                    return t(F.b())
                },
                classes: {root: r.root},
                ContentProps: {variant: "body2", headlineMapping: {body1: "div", body2: "div"}}
            }), o.a.createElement(ua.a, {
                className: Object(l.a)(r[n.variant]),
                message: o.a.createElement("div", {className: "flex items-center"}, fa[n.variant] && o.a.createElement(R.a, {
                    className: "mr-8",
                    color: "inherit"
                }, fa[n.variant]), n.message),
                action: [o.a.createElement(L.a, {
                    key: "close",
                    "aria-label": "Close",
                    color: "inherit",
                    onClick: function () {
                        return t(F.b())
                    }
                }, o.a.createElement(R.a, null, "close"))]
            }))
        }), ba = a(552);
        var ga = function (e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.fuse.dialog.state
            }), n = Object(m.c)(function (e) {
                return e.fuse.dialog.options
            });
            return o.a.createElement(ba.a, Object.assign({
                open: a, onClose: function (e) {
                    return t(F.a())
                }, "aria-labelledby": "fuse-dialog-title"
            }, n))
        }, va = a(147);
        a(244);

        function ya(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function Oa(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ya(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : ya(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var Ea = o.a.forwardRef(function (e, t) {
            var a = o.a.cloneElement(e.children, {style: Oa({}, e.children.style, {visibility: "hidden"})});
            return o.a.createElement(va.VelocityComponent, Object.assign({ref: t}, e, {children: a}))
        });
        Ea.defaultProps = {
            animation: "transition.fadeIn",
            runOnMount: !0,
            targetQuerySelector: null,
            interruptBehavior: "stop",
            visibility: "visible",
            duration: 300,
            delay: 50,
            easing: [.4, 0, .2, 1],
            display: null,
            setRef: void 0
        };
        var ja = o.a.memo(Ea), wa = {
            animation: "transition.fadeIn",
            stagger: 50,
            duration: 200,
            display: null,
            visibility: "visible",
            delay: 0
        }, xa = {stagger: 50, duration: 200, display: null, visibility: "visible", delay: 0};

        function ka(e) {
            var t = S.a.merge({}, {enter: wa, leave: xa}, e);
            return o.a.createElement(va.VelocityTransitionGroup, Object.assign({}, t, {children: e.children}))
        }

        ka.defaultProps = {
            enter: wa,
            leave: xa,
            easing: [.4, 0, .2, 1],
            runOnMount: !0,
            enterHideStyle: {visibility: "visible"},
            enterShowStyle: {visibility: "hidden"}
        };
        var Na = o.a.memo(ka);
        var Sa = o.a.memo(function () {
            return o.a.createElement("div", {id: "fuse-splash-screen"}, o.a.createElement("div", {className: "center"}, o.a.createElement("div", {className: "logo"}, o.a.createElement("img", {
                width: "128",
                src: "assets/images/logos/icon.png",
                alt: "logo"
            })), o.a.createElement("div", {className: "spinner-wrapper"}, o.a.createElement("div", {className: "spinner"}, o.a.createElement("div", {className: "inner"}, o.a.createElement("div", {className: "gap"}), o.a.createElement("div", {className: "left"}, o.a.createElement("div", {className: "half-circle"})), o.a.createElement("div", {className: "right"}, o.a.createElement("div", {className: "half-circle"})))))))
        }), Pa = a(564), Ca = a(268), Ia = a(267), Ta = a(269);

        function Da(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function Ra(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Da(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Da(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var La = Object(i.a)(function (e) {
            return {
                root: {
                    "& .fuse-chip-select__input": {color: e.palette.text.primary},
                    "&.standard": {"& $placeholder": {}, "& $valueContainer": {paddingTop: 4}},
                    "&.filled": {
                        "& $placeholder": {left: 12},
                        "& $valueContainer": {paddingTop: 24, paddingLeft: 12},
                        "& $chip": {border: "1px solid rgba(0, 0, 0, 0.12)"}
                    },
                    "&.outlined": {"& $placeholder": {left: 12}, "& $valueContainer": {paddingLeft: 12, paddingTop: 12}}
                },
                input: {display: "flex", padding: 0, height: "auto"},
                valueContainer: {
                    display: "flex",
                    flexWrap: "wrap",
                    flex: 1,
                    alignItems: "center",
                    paddingBottom: 4,
                    paddingTop: 12,
                    minHeight: 40
                },
                chip: {margin: "4px 4px 4px 0"},
                chipFocused: {backgroundColor: Object(Ca.emphasize)("light" === e.palette.type ? e.palette.grey[300] : e.palette.grey[700], .08)},
                noOptionsMessage: {padding: "".concat(e.spacing(), "px ").concat(e.spacing(2), "px")},
                singleValue: {fontSize: 16},
                placeholder: {position: "absolute", left: 0, fontSize: 16, margin: 0},
                paper: {position: "absolute", zIndex: 2, marginTop: e.spacing(), left: 0, right: 0},
                divider: {height: e.spacing(2)}
            }
        });

        function Aa(e) {
            var t = e.inputRef, a = Object(Ce.a)(e, ["inputRef"]);
            return o.a.createElement("div", Object.assign({ref: t}, a))
        }

        var Fa = {
            Control: function (e) {
                var t = La();
                return o.a.createElement(Ht.a, Object.assign({
                    fullWidth: !0,
                    className: Object(l.a)(t.root, e.selectProps.textFieldProps.variant),
                    required: e.selectProps.required,
                    InputProps: {
                        inputComponent: Aa,
                        inputProps: Ra({className: t.input, inputRef: e.innerRef, children: e.children}, e.innerProps)
                    }
                }, e.selectProps.textFieldProps))
            }, Menu: function (e) {
                var t = La();
                return o.a.createElement(ae.a, Object.assign({
                    square: !0,
                    className: t.paper
                }, e.innerProps), e.children)
            }, MultiValue: function (e) {
                var t = La();
                return o.a.createElement(Pa.a, {
                    tabIndex: -1,
                    label: e.children,
                    className: Object(l.a)(t.chip, Object(n.a)({}, t.chipFocused, e.isFocused), e.data.class),
                    onDelete: function (t) {
                        e.removeProps.onClick(), e.removeProps.onMouseDown(t)
                    }
                })
            }, NoOptionsMessage: function (e) {
                var t = La();
                return o.a.createElement(ot.a, Object.assign({
                    color: "textSecondary",
                    className: t.noOptionsMessage
                }, e.innerProps), e.children)
            }, Option: function (e) {
                return o.a.createElement(Ke.a, Object.assign({
                    buttonRef: e.innerRef,
                    selected: e.isFocused,
                    component: "div",
                    style: {fontWeight: e.isSelected ? 600 : 400}
                }, e.innerProps), e.children)
            }, Placeholder: function (e) {
                var t = La();
                return o.a.createElement(ot.a, Object.assign({
                    color: "textSecondary",
                    className: t.placeholder
                }, e.innerProps), e.children)
            }, SingleValue: function (e) {
                var t = La();
                return o.a.createElement(ot.a, Object.assign({className: t.singleValue}, e.innerProps), e.children)
            }, ValueContainer: function (e) {
                var t = La();
                return o.a.createElement("div", {className: t.valueContainer}, e.children)
            }
        };
        var _a = o.a.memo(function (e) {
            return "fixed" === e.variant ? o.a.createElement(Ta.a, Object.assign({classNamePrefix: "fuse-chip-select"}, e, {components: Fa})) : o.a.createElement(Ia.a, Object.assign({classNamePrefix: "fuse-chip-select"}, e, {components: Fa}))
        });

        function za(e) {
            return o.a.createElement(o.a.Suspense, {fallback: o.a.createElement(Ha, e.loadingProps)}, e.children)
        }

        za.defaultProps = {loadingProps: {delay: 0}};
        var Ma = za, Wa = a(553);

        function Ba(e) {
            var t = Object(r.useState)(!e.delay), a = Object(c.a)(t, 2), n = a[0], i = a[1];
            return Object(ne.c)(function () {
                i(!0)
            }, e.delay), n ? o.a.createElement("div", {className: "flex flex-1 flex-col items-center justify-center"}, o.a.createElement(ot.a, {
                className: "text-20 mb-16",
                color: "textSecondary"
            }, "Loading..."), o.a.createElement(Wa.a, {className: "w-xs", color: "secondary"})) : null
        }

        Ba.defaultProps = {delay: !1};
        var Ha = Ba, Ga = a(554), Va = Object(i.a)(function (e) {
            var t;
            return {
                paper: {display: "flex", width: 56},
                root: {
                    transition: e.transitions.create(["transform", "width", "min-width"], {
                        easing: e.transitions.easing.sharp,
                        duration: e.transitions.duration.shorter
                    }),
                    paddingBottom: 64,
                    position: "relative",
                    zIndex: 999,
                    "&.left": {
                        "& $buttonWrapper": {left: 0, right: "auto"},
                        "& $buttonIcon": {transform: "rotate(0deg)"}
                    },
                    "&.right": {
                        "& $buttonWrapper": {right: 0, left: "auto"},
                        "& $buttonIcon": {transform: "rotate(-180deg)"}
                    },
                    "&.closed": (t = {}, Object(n.a)(t, e.breakpoints.up("lg"), {width: 0}), Object(n.a)(t, "&.left", {
                        "& $buttonWrapper": {justifyContent: "start"},
                        "& $button": {borderBottomLeftRadius: 0, borderTopLeftRadius: 0, paddingLeft: 4},
                        "& $buttonIcon": {transform: "rotate(-180deg)"}
                    }), Object(n.a)(t, "&.right", {
                        "& $buttonWrapper": {justifyContent: "flex-end"},
                        "& $button": {borderBottomRightRadius: 0, borderTopRightRadius: 0, paddingRight: 4},
                        "& $buttonIcon": {transform: "rotate(0deg)"}
                    }), Object(n.a)(t, "& $buttonWrapper", {width: "auto"}), Object(n.a)(t, "& $button", {
                        backgroundColor: e.palette.background.paper,
                        borderRadius: 38,
                        transition: e.transitions.create(["background-color", "border-radius", "width", "min-width", "padding"], {
                            easing: e.transitions.easing.easeInOut,
                            duration: e.transitions.duration.shorter
                        }),
                        width: 24,
                        "&:hover": {width: 52, paddingLeft: 8, paddingRight: 8}
                    }), Object(n.a)(t, "& $content", {opacity: 0}), t)
                },
                content: {
                    overflow: "hidden",
                    opacity: 1,
                    transition: e.transitions.create(["opacity"], {
                        easing: e.transitions.easing.easeInOut,
                        duration: e.transitions.duration.short
                    })
                },
                buttonWrapper: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 0",
                    width: "100%",
                    minWidth: 56
                },
                button: {padding: 8, width: 40, height: 40},
                buttonIcon: {
                    transition: e.transitions.create(["transform"], {
                        easing: e.transitions.easing.easeInOut,
                        duration: e.transitions.duration.short
                    })
                },
                mobileButton: {
                    height: 40,
                    position: "absolute",
                    zIndex: 99,
                    bottom: 12,
                    width: 24,
                    borderRadius: 38,
                    padding: 8,
                    backgroundColor: e.palette.background.paper,
                    transition: e.transitions.create(["background-color", "border-radius", "width", "min-width", "padding"], {
                        easing: e.transitions.easing.easeInOut,
                        duration: e.transitions.duration.shorter
                    }),
                    "&:hover": {width: 52, paddingLeft: 8, paddingRight: 8},
                    "&.left": {borderBottomLeftRadius: 0, borderTopLeftRadius: 0, paddingLeft: 4, left: 0},
                    "&.right": {
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0,
                        paddingRight: 4,
                        right: 0,
                        "& $buttonIcon": {transform: "rotate(-180deg)"}
                    }
                }
            }
        });

        function qa(e) {
            var t = Va(e), a = Object(r.useState)(e.opened), n = Object(c.a)(a, 2), i = n[0], d = n[1],
                m = Object(r.useState)(!1), p = Object(c.a)(m, 2), f = p[0], h = p[1];

            function b() {
                h(!f)
            }

            return o.a.createElement(o.a.Fragment, null, o.a.createElement(s.a, {mdDown: !0}, o.a.createElement(ae.a, {
                className: Object(l.a)(t.root, t.paper, e.className, i ? "opened" : "closed", e.position),
                elevation: 3,
                square: !0
            }, o.a.createElement(We, {className: Object(l.a)("content", t.content)}, e.children), o.a.createElement("div", {className: t.buttonWrapper}, o.a.createElement(Lt.a, {
                title: "Toggle side panel",
                placement: (e.position, "right")
            }, o.a.createElement(L.a, {
                className: t.button, onClick: function () {
                    d(!i)
                }, disableRipple: !0
            }, o.a.createElement(R.a, {className: t.buttonIcon}, "keyboard_arrow_left")))))), o.a.createElement(s.a, {lgUp: !0}, o.a.createElement(u.a, {
                classes: {paper: Object(l.a)(t.paper, e.className)},
                anchor: e.position,
                open: f,
                onClose: b
            }, o.a.createElement(We, {className: Object(l.a)("content", t.content)}, e.children)), o.a.createElement(Lt.a, {
                title: "Hide side panel",
                placement: (e.position, "right")
            }, o.a.createElement(Ga.a, {
                className: Object(l.a)(t.mobileButton, e.position),
                onClick: b,
                disableRipple: !0
            }, o.a.createElement(R.a, {className: t.buttonIcon, color: "action"}, "keyboard_arrow_right")))))
        }

        qa.defaultProps = {position: "left", opened: !0};
        o.a.memo(qa);
        var Ua = a(134), $a = (a(62), a(61));
        var Ya = o.a.memo(Object($a.withFormsy)(function (e) {
            var t = S.a.pick(e, ["autoComplete", "autoFocus", "children", "className", "defaultValue", "disabled", "FormHelperTextProps", "fullWidth", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "rowsMax", "select", "SelectProps", "type", "variant"]),
                a = e.getErrorMessage(), n = e.getValue() || "";
            return o.a.createElement(Ht.a, Object.assign({}, t, {
                onChange: function (t) {
                    e.setValue(t.currentTarget.value), e.onChange && e.onChange(t)
                }, value: n, error: Boolean(a), helperText: a
            }))
        })), Xa = a(562), Qa = a(491);
        o.a.memo(Object($a.withFormsy)(function (e) {
            var t = S.a.pick(e, ["checkedIcon", "classes", "color", "disabled", "disableRipple", "icon", "id", "indeterminate", "indeterminateIcon", "inputProps", "inputRef", "onChange", "variant"]),
                a = e.getErrorMessage(), n = e.getValue();
            return o.a.createElement(Ze.a, {
                error: Boolean(a),
                className: e.className
            }, o.a.createElement(at.a, {
                control: o.a.createElement(Xa.a, Object.assign({}, t, {
                    type: "checkbox",
                    checked: n,
                    onChange: function (t) {
                        e.setValue(t.target.checked), e.onChange && e.onChange(t)
                    }
                })), label: e.label
            }), Boolean(a) && o.a.createElement(Qa.a, null, a))
        }));
        o.a.memo(Object($a.withFormsy)(function (e) {
            var t = S.a.pick(e, ["children", "name", "onBlur", "onChange", "onKeyDown", "variant"]),
                a = e.getErrorMessage(), n = e.getValue();
            return o.a.createElement(Ze.a, {
                error: Boolean(a),
                className: e.className
            }, o.a.createElement(Ze.a, {
                component: "fieldset",
                required: e.required,
                error: Boolean(a)
            }, e.label && o.a.createElement(et.a, {component: "legend"}, e.label), o.a.createElement(tt.a, Object.assign({}, t, {
                value: n,
                onChange: function (t, a) {
                    e.setValue(a), e.onChange && e.onChange(t)
                }
            })), Boolean(a) && o.a.createElement(Qa.a, null, a)))
        }));
        var Ja = a(500), Ka = a(493), Za = a(496);
        o.a.memo(Object($a.withFormsy)(function (e) {
            var t = S.a.pick(e, ["autoWidth", "children", "classes", "displayEmpty", "input", "inputProps", "MenuProps", "multiple", "native", "onChange", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "value", "variant"]),
                a = e.getErrorMessage(), n = e.getValue();
            return o.a.createElement(Ze.a, {
                error: Boolean(a),
                className: e.className,
                variant: t.variant
            }, e.label && o.a.createElement(Za.a, {htmlFor: e.name}, e.label), o.a.createElement(Je.a, Object.assign({}, t, {
                value: n,
                onChange: function (t) {
                    e.setValue(t.target.value), e.onChange && e.onChange(t)
                },
                input: function () {
                    switch (t.variant) {
                        case"outlined":
                            return o.a.createElement(Ja.a, {labelWidth: 8 * e.label.length, id: e.name});
                        case"filled":
                            return o.a.createElement(Ka.a, {id: e.name});
                        default:
                            return o.a.createElement(Ft.a, {id: e.name})
                    }
                }()
            })), Boolean(a) && o.a.createElement(Qa.a, null, a))
        }));
        o.a.memo(Object($a.withFormsy)(function (e) {
            var t = S.a.pick(e, ["children", "classes", "className", "defaultValue", "disabled", "fullWidth", "id", "label", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "textFieldProps", "variant", "isMulti", "options", "errorMessage"]),
                a = e.getErrorMessage(), n = e.getValue();
            return o.a.createElement(Ze.a, {
                error: Boolean(a),
                className: Object(l.a)(e.className, e.showRequired() ? "required" : e.showError() ? "error" : null),
                variant: t.variant
            }, e.label && o.a.createElement(Za.a, {htmlFor: e.name}, e.label), o.a.createElement(_a, Object.assign({}, t, {
                value: n,
                onChange: function (t, a) {
                    e.multiple ? e.setValue(a.map(function (e) {
                        return e.value
                    })) : e.setValue(t)
                }
            })), Boolean(a) && o.a.createElement(Qa.a, null, a))
        }));
        var en = a(556);

        function tn(e) {
            var t = Object(m.b)();
            return o.a.createElement(L.a, {
                className: e.className, onClick: function (e) {
                    return t(F.f())
                }, color: "inherit", disableRipple: !0
            }, e.children)
        }

        tn.defaultProps = {children: o.a.createElement(R.a, null, "menu")};
        var an = tn, nn = a(93);

        function rn(e) {
            var t = Object(m.b)();
            return o.a.createElement(L.a, {
                className: "w-64 h-64", onClick: function (e) {
                    return t(nn.c())
                }
            }, e.children)
        }

        rn.defaultProps = {children: o.a.createElement(R.a, null, "format_list_bulleted")};
        var on = rn, ln = a(555), cn = a(534);
        var sn = function (e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.auth.user
            }), n = Object(r.useState)(null), i = Object(c.a)(n, 2), l = i[0], s = i[1], u = function () {
                s(null)
            };
            return o.a.createElement(o.a.Fragment, null, o.a.createElement(ln.a, {
                className: "h-64",
                onClick: function (e) {
                    s(e.currentTarget)
                }
            }, o.a.createElement("div", {className: "hidden md:flex flex-col ml-12 items-start"}, o.a.createElement(ot.a, {
                component: "span",
                className: "normal-case font-600 flex"
            }, a.name), o.a.createElement(ot.a, {
                className: "text-11 capitalize",
                color: "textSecondary"
            }, a.social_number ? a.social_number.toString() : "")), o.a.createElement(R.a, {
                className: "text-16 ml-12 hidden sm:flex",
                variant: "action"
            }, "keyboard_arrow_down")), o.a.createElement(cn.a, {
                open: Boolean(l),
                anchorEl: l,
                onClose: u,
                anchorOrigin: {vertical: "bottom", horizontal: "center"},
                transformOrigin: {vertical: "top", horizontal: "center"},
                classes: {paper: "py-8"}
            }, a.role && 0 !== a.role.length ? o.a.createElement(o.a.Fragment, null, o.a.createElement(Ke.a, {
                component: zt.a,
                to: "/profile",
                onClick: u
            }, o.a.createElement(Rt.a, {className: "min-w-40"}, o.a.createElement(R.a, null, "account_circle")), o.a.createElement(N.a, {
                className: "pl-0",
                primary: "Mi cuenta"
            })), o.a.createElement(Ke.a, {
                onClick: function () {
                    t(it.h()), u()
                }
            }, o.a.createElement(Rt.a, {className: "min-w-40"}, o.a.createElement(R.a, null, "exit_to_app")), o.a.createElement(N.a, {
                className: "pl-0",
                primary: "Cerrar sesi\xf3n"
            }))) : o.a.createElement(o.a.Fragment, null, o.a.createElement(Ke.a, {
                component: zt.a,
                to: "/login"
            }, o.a.createElement(Rt.a, {className: "min-w-40"}, o.a.createElement(R.a, null, "lock")), o.a.createElement(N.a, {
                className: "pl-0",
                primary: "Login"
            })), o.a.createElement(Ke.a, {
                component: zt.a,
                to: "/register"
            }, o.a.createElement(Rt.a, {className: "min-w-40"}, o.a.createElement(R.a, null, "person_add")), o.a.createElement(N.a, {
                className: "pl-0",
                primary: "Register"
            })))))
        }, un = Object(i.a)(function (e) {
            return {separator: {width: 1, height: 64, backgroundColor: e.palette.divider}}
        });
        var dn = function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.current.layout.config
            }), a = Object(m.c)(function (e) {
                return e.fuse.settings.toolbarTheme
            }), n = un(e);
            return o.a.createElement(d.a, {theme: a}, o.a.createElement(ht.a, {
                id: "fuse-toolbar",
                className: "flex relative z-10",
                color: "default"
            }, o.a.createElement(en.a, {className: "p-0"}, t.navbar.display && "left" === t.navbar.position && o.a.createElement(s.a, {lgUp: !0}, o.a.createElement(an, {className: "w-64 h-64 p-0"}), o.a.createElement("div", {className: n.separator})), o.a.createElement("div", {className: "flex flex-1"}, o.a.createElement(s.a, {mdDown: !0}, o.a.createElement(Bt, {className: "px-16"}))), o.a.createElement("div", {className: "flex"}, o.a.createElement(sn, null), o.a.createElement("div", {className: n.separator}), o.a.createElement(ca, null), o.a.createElement(s.a, {lgUp: !0}, o.a.createElement("div", {className: n.separator})), o.a.createElement("div", {className: n.separator}), o.a.createElement(on, null)), t.navbar.display && "right" === t.navbar.position && o.a.createElement(s.a, {lgUp: !0}, o.a.createElement(an, null)))))
        };
        var mn = function (e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.settings.footerTheme
            });
            return o.a.createElement(d.a, {theme: t}, o.a.createElement(ht.a, {
                id: "fuse-footer",
                className: "relative z-10",
                color: "default"
            }, o.a.createElement(en.a, {className: "px-16 py-0 flex items-center"}, o.a.createElement(ot.a, null, "GoldenPack"))))
        };
        var pn = function () {
            return o.a.createElement(o.a.Fragment, null)
        }, fn = a(198), hn = a(152), bn = Object(i.a)(function (e) {
            return {root: {width: 280}}
        });
        var gn = Object(fn.a)("quickPanel", hn.a)(function (e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.quickPanel.state
            }), n = bn();
            return o.a.createElement(u.a, {
                classes: {paper: n.root}, open: a, anchor: "right", onClose: function (e) {
                    return t(nn.c())
                }
            }, o.a.createElement(We, null, o.a.createElement(ot.a, null, "Quick Panel")))
        });
        var vn = function (e) {
            return o.a.createElement(o.a.Fragment, null, o.a.createElement(gn, null))
        }, yn = Object(i.a)(function (e) {
            return {
                root: {
                    "&.user": {
                        "& .username, & .email": {
                            transition: e.transitions.create("opacity", {
                                duration: e.transitions.duration.shortest,
                                easing: e.transitions.easing.easeInOut
                            })
                        }
                    }
                }
            }
        });
        var On = function (e) {
            var t = Object(m.c)(function (e) {
                return e.auth.user
            }), a = yn();
            return o.a.createElement(ht.a, {
                position: "static",
                color: "primary",
                elevation: 0,
                classes: {root: a.root},
                className: "user relative flex flex-col items-center justify-center pt-8 pb-32 mb-32 z-0"
            }, o.a.createElement(ot.a, {
                className: "username text-16 whitespace-no-wrap",
                color: "inherit"
            }, t.name), o.a.createElement(ot.a, {
                className: "email text-13 mt-8 opacity-50 whitespace-no-wrap",
                color: "inherit"
            }, t.email))
        }, En = a(40), jn = Object(i.a)(function (e) {
            return {
                root: {
                    "& .logo-icon": {
                        width: 32,
                        height: 32,
                        transition: e.transitions.create(["width", "height"], {
                            duration: e.transitions.duration.shortest,
                            easing: e.transitions.easing.easeInOut
                        })
                    },
                    "& .react-badge, & .logo-text": {
                        transition: e.transitions.create("opacity", {
                            duration: e.transitions.duration.shortest,
                            easing: e.transitions.easing.easeInOut
                        })
                    }
                }, reactBadge: {backgroundColor: "rgba(0,0,0,0.6)", color: "#61DAFB"}
            }
        });
        var wn = function () {
            var e = jn();
            return o.a.createElement("div", {className: Object(l.a)(e.root, "flex items-center")}, o.a.createElement("img", {
                className: "logo-icon",
                src: En.a.navLogo,
                alt: "logo"
            }), o.a.createElement(ot.a, {
                className: "text-14 ml-12 font-light logo-text text-white",
                color: "initial"
            }, En.a.name), o.a.createElement("div", {className: Object(l.a)(e.reactBadge, "react-badge flex items-center ml-12 mr-8 py-4 px-8 rounded")}, o.a.createElement("span", {className: "react-text text-10"}, "V ", En.a.version)))
        };

        function xn(e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.fuse.settings.current
            });
            return o.a.createElement(L.a, {
                className: e.className, onClick: function () {
                    t(F.h(S.a.set({}, "layout.config.navbar.folded", !a.layout.config.navbar.folded)))
                }, color: "inherit"
            }, e.children)
        }

        xn.defaultProps = {children: o.a.createElement(R.a, null, "menu")};
        var kn = xn;

        function Nn(e) {
            var t = Object(m.c)(function (e) {
                return e.fuse.navigation
            });
            return o.a.createElement(ke, {
                className: Object(l.a)("navigation", e.className),
                navigation: t,
                layout: e.layout,
                dense: e.dense
            })
        }

        Nn.defaultProps = {layout: "vertical"};
        var Sn = Nn, Pn = Object(i.a)({
            content: {
                overflowX: "hidden",
                overflowY: "auto",
                "-webkit-overflow-scrolling": "touch",
                background: "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 40px, 100% 10px",
                backgroundAttachment: "local, scroll"
            }
        });
        var Cn = function (e) {
            var t = Pn();
            return o.a.createElement("div", {className: Object(l.a)("flex flex-col overflow-hidden h-full", e.className)}, o.a.createElement(ht.a, {
                color: "primary",
                position: "static",
                elevation: 0,
                className: "flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12"
            }, o.a.createElement("div", {className: "flex flex-1 pr-8"}, o.a.createElement(wn, null)), o.a.createElement(s.a, {mdDown: !0}, o.a.createElement(kn, {className: "w-40 h-40 p-0"})), o.a.createElement(s.a, {lgUp: !0}, o.a.createElement(an, {className: "w-40 h-40 p-0"}, o.a.createElement(R.a, null, "arrow_back")))), o.a.createElement(We, {className: Object(l.a)(t.content)}, o.a.createElement(On, null), o.a.createElement(Sn, {layout: "vertical"})))
        }, In = Object(i.a)(function (e) {
            return {
                wrapper: Object(n.a)({
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 4
                }, e.breakpoints.up("lg"), {width: 280, minWidth: 280}),
                wrapperFolded: Object(n.a)({}, e.breakpoints.up("lg"), {width: 64, minWidth: 64}),
                navbar: {
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                    flex: "1 1 auto",
                    width: 280,
                    minWidth: 280,
                    height: "100%",
                    zIndex: 4,
                    transition: e.transitions.create(["width", "min-width"], {
                        easing: e.transitions.easing.sharp,
                        duration: e.transitions.duration.shorter
                    }),
                    boxShadow: e.shadows[3]
                },
                left: {left: 0},
                right: {right: 0},
                folded: {position: "absolute", width: 64, minWidth: 64, top: 0, bottom: 0},
                foldedAndOpened: {width: 280, minWidth: 280},
                navbarContent: {flex: "1 1 auto"},
                foldedAndClosed: {
                    "& $navbarContent": {
                        "& .logo-icon": {width: 32, height: 32},
                        "& .logo-text": {opacity: 0},
                        "& .react-badge": {opacity: 0},
                        "& .list-item-text, & .arrow-icon, & .item-badge": {opacity: 0},
                        "& .list-subheader .list-subheader-text": {opacity: 0},
                        "& .list-subheader:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            minWidth: 16,
                            borderTop: "2px solid",
                            opacity: .2
                        },
                        "& .collapse-children": {display: "none"},
                        "& .user": {
                            "& .username, & .email": {opacity: 0},
                            "& .avatar": {width: 40, height: 40, top: 32, padding: 0}
                        },
                        "& .list-item.active": {
                            marginLeft: 12,
                            width: 40,
                            padding: 12,
                            borderRadius: 20,
                            "&.square": {borderRadius: 0, marginLeft: 0, paddingLeft: 24, width: "100%"}
                        }
                    }
                }
            }
        });
        var Tn = function (e) {
            var t = Object(m.b)(), a = Object(m.c)(function (e) {
                return e.fuse.settings.current.layout.config
            }), n = Object(m.c)(function (e) {
                return e.fuse.settings.navbarTheme
            }), r = Object(m.c)(function (e) {
                return e.fuse.navbar
            }), i = In(), c = a.navbar.folded, p = c && !r.foldedOpen, f = c && r.foldedOpen;
            return o.a.createElement(d.a, {theme: n}, o.a.createElement("div", {
                id: "fuse-navbar",
                className: Object(l.a)(i.wrapper, c && i.wrapperFolded)
            }, o.a.createElement(s.a, {mdDown: !0}, o.a.createElement("div", {
                className: Object(l.a)(i.navbar, i[a.navbar.position], c && i.folded, f && i.foldedAndOpened, p && i.foldedAndClosed),
                onMouseEnter: function () {
                    return p && t(F.e())
                },
                onMouseLeave: function () {
                    return f && t(F.c())
                },
                style: {backgroundColor: n.palette.background.default}
            }, o.a.createElement(Cn, {className: i.navbarContent}))), o.a.createElement(s.a, {lgUp: !0}, o.a.createElement(u.a, {
                anchor: a.navbar.position,
                variant: "temporary",
                open: r.mobileOpen,
                classes: {paper: i.navbar},
                onClose: function () {
                    return t(F.d())
                },
                ModalProps: {keepMounted: !0}
            }, o.a.createElement(Cn, {className: i.navbarContent})))))
        }, Dn = Object(i.a)(function (e) {
            return {
                root: {
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    backgroundColor: e.palette.background.default,
                    color: e.palette.text.primary,
                    "&.boxed": {maxWidth: 1280, margin: "0 auto", boxShadow: e.shadows[3]},
                    "&.scroll-body": {
                        "& $wrapper": {height: "auto", flex: "0 0 auto", overflow: "auto"},
                        "& $contentWrapper": {},
                        "& $content": {}
                    },
                    "&.scroll-content": {"& $wrapper": {}, "& $contentWrapper": {}, "& $content": {}},
                    "& .navigation": {
                        "& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon": {
                            transition: e.transitions.create("opacity", {
                                duration: e.transitions.duration.shortest,
                                easing: e.transitions.easing.easeInOut
                            })
                        }
                    }
                },
                wrapper: {display: "flex", position: "relative", width: "100%", height: "100%", flex: "1 1 auto"},
                contentWrapper: {
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 3,
                    overflow: "hidden",
                    flex: "1 1 auto"
                },
                content: {
                    position: "relative",
                    display: "flex",
                    overflow: "auto",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    width: "100%",
                    "-webkit-overflow-scrolling": "touch",
                    zIndex: 2
                }
            }
        });
        var Rn = {
            layout: function (e) {
                var t = Object(m.c)(function (e) {
                    return e.fuse.settings.current.layout.config
                }), a = Object(r.useContext)(He.a), n = Dn(e), i = a.routes;
                switch (t.scroll) {
                    case"body":
                        return o.a.createElement("div", {
                            id: "fuse-layout",
                            className: Object(l.a)(n.root, t.mode, "scroll-" + t.scroll)
                        }, t.leftSidePanel.display && o.a.createElement(pn, null), o.a.createElement("div", {className: "flex flex-1 flex-col overflow-hidden relative"}, t.toolbar.display && "fixed" === t.toolbar.style && "above" === t.toolbar.position && o.a.createElement(dn, null), o.a.createElement(We, {
                            className: "overflow-auto",
                            scrollToTopOnRouteChange: !0
                        }, t.toolbar.display && "fixed" !== t.toolbar.style && "above" === t.toolbar.position && o.a.createElement(dn, null), o.a.createElement("div", {className: n.wrapper}, t.navbar.display && "left" === t.navbar.position && o.a.createElement(Tn, null), o.a.createElement("div", {className: n.contentWrapper}, t.toolbar.display && "below" === t.toolbar.position && o.a.createElement(dn, null), o.a.createElement("div", {className: n.content}, o.a.createElement(ga, null), o.a.createElement(Ma, null, Object(Be.b)(i)), e.children), t.footer.display && "below" === t.footer.position && o.a.createElement(mn, null)), t.navbar.display && "right" === t.navbar.position && o.a.createElement(Tn, null)), t.footer.display && "fixed" !== t.footer.style && "above" === t.footer.position && o.a.createElement(mn, null)), t.footer.display && "fixed" === t.footer.style && "above" === t.footer.position && o.a.createElement(mn, null)), t.rightSidePanel.display && o.a.createElement(vn, null), o.a.createElement(ha, null));
                    case"content":
                    default:
                        return o.a.createElement("div", {
                            id: "fuse-layout",
                            className: Object(l.a)(n.root, t.mode, "scroll-" + t.scroll)
                        }, t.leftSidePanel.display && o.a.createElement(pn, null), o.a.createElement("div", {className: "flex flex-1 flex-col overflow-hidden relative"}, t.toolbar.display && "above" === t.toolbar.position && o.a.createElement(dn, null), o.a.createElement("div", {className: n.wrapper}, t.navbar.display && "left" === t.navbar.position && o.a.createElement(Tn, null), o.a.createElement("div", {className: n.contentWrapper}, t.toolbar.display && "below" === t.toolbar.position && "fixed" === t.toolbar.style && o.a.createElement(dn, null), o.a.createElement(We, {
                            className: n.content,
                            scrollToTopOnRouteChange: !0
                        }, t.toolbar.display && "below" === t.toolbar.position && "fixed" !== t.toolbar.style && o.a.createElement(dn, null), o.a.createElement(ga, null), o.a.createElement(Ma, null, Object(Be.b)(i)), e.children, t.footer.display && "below" === t.footer.position && "fixed" !== t.footer.style && o.a.createElement(mn, null)), t.footer.display && "below" === t.footer.position && "fixed" === t.footer.style && o.a.createElement(mn, null)), t.navbar.display && "right" === t.navbar.position && o.a.createElement(Tn, null)), t.footer.display && "above" === t.footer.position && o.a.createElement(mn, null)), t.rightSidePanel.display && o.a.createElement(vn, null), o.a.createElement(ha, null))
                }
            }
        }, Ln = a(117), An = o.a.forwardRef(function (e, t) {
            return o.a.createElement(zt.b, Object.assign({innerRef: t}, e))
        });
        a.d(t, "m", function () {
            return v
        }), a.d(t, "l", function () {
            return ke
        }), a.d(t, "n", function () {
            return We
        }), a.d(t, "c", function () {
            return Ve
        }), a.d(t, "s", function () {
            return qe
        }), a.d(t, "g", function () {
            return Qe
        }), a.d(t, "f", function () {
            return pt
        }), a.d(t, "p", function () {
            return Bt
        }), a.d(t, "o", function () {
            return ca
        }), a.d(t, "k", function () {
            return ha
        }), a.d(t, "e", function () {
            return ga
        }), a.d(t, "a", function () {
            return ja
        }), a.d(t, "b", function () {
            return Na
        }), a.d(t, "q", function () {
            return Sa
        }), a.d(t, "d", function () {
            return _a
        }), a.d(t, "r", function () {
            return Ma
        }), a.d(t, "j", function () {
            return Ha
        }), a.d(t, "t", function () {
            return Ua.a
        }), a.d(t, "v", function () {
            return Ya
        }), a.d(t, "i", function () {
            return Rn
        }), a.d(t, "h", function () {
            return Ln.a
        }), a.d(t, "u", function () {
            return An
        })
    }, 34: function (e, t, a) {
        "use strict";
        var n = a(55), r = a(4), o = a(144), i = a(38), l = a.n(i), c = a(30), s = a(10), u = a(65), d = a(15),
            m = a(40);

        function p(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function f(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? p(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : p(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var h = "[USER] SET DATA", b = "[USER] REMOVE DATA", g = "[USER] LOGGED OUT";

        function v(e) {
            return function (t) {
                t(Object(c.y)(e.settings)), t({type: h, payload: e})
            }
        }

        function y(e) {
            return function (t, a) {
                var n = a().auth.user, r = s.a.merge({}, n, {data: {settings: e}});
                return P(r), t(v(r))
            }
        }

        function O(e) {
            return function (t, a) {
                var n = a().auth.user, r = f({}, n, {data: f({}, n, {shortcuts: e})});
                return P(r), t(v(r))
            }
        }

        function E() {
            return function (e, t) {
                var a = t().auth.user;
                if (!a.role || 0 === a.role.length) return null;
                o.a.push({pathname: "/"}), n.a.logout(), e(Object(c.z)()), e({type: g})
            }
        }

        function j(e) {
            return function (t) {
                l.a.post("".concat(m.b.url, "/api/retail/auth/profile/email"), {email: e}).then(function (e) {
                    200 === e.data.code ? (t(v(e.data.result)), t(d.j({
                        message: e.data.message,
                        variant: "success"
                    }))) : t(d.j({message: e.data.message, variant: "error"}))
                })
            }
        }

        function w(e, t, a) {
            return function (n) {
                l.a.post("".concat(m.b.url, "/api/retail/auth/profile/password"), {
                    old_password: e,
                    password: t,
                    password_confirmation: a
                }).then(function (e) {
                    200 === e.data.code ? n(d.j({
                        message: e.data.message,
                        variant: "success"
                    })) : n(d.j({message: e.data.message, variant: "error"}))
                })
            }
        }

        function x(e) {
            return function (t) {
                l.a.post("".concat(m.b.url, "/api/retail/auth/profile/name"), {name: e}).then(function (e) {
                    200 === e.data.code ? (t(v(e.data.result)), t(d.j({
                        message: e.data.message,
                        variant: "success"
                    }))) : t(d.j({message: e.data.message, variant: "error"}))
                })
            }
        }

        function k(e) {
            return function (t) {
                l.a.post("".concat(m.b.url, "/api/retail/auth/profile/phone"), {phone: e}).then(function (e) {
                    200 === e.data.code ? (t(v(e.data.result)), t(d.j({
                        message: e.data.message,
                        variant: "success"
                    }))) : t(d.j({message: e.data.message, variant: "error"}))
                })
            }
        }

        function N(e) {
            return function (t) {
                l.a.post("".concat(m.b.url, "/api/retail/auth/profile/website"), {website: e}).then(function (e) {
                    200 === e.data.code ? (t(v(e.data.result)), t(d.j({
                        message: e.data.message,
                        variant: "success"
                    }))) : t(d.j({message: e.data.message, variant: "error"}))
                })
            }
        }

        function S(e, t, a, n, r) {
            return function (o) {
                l.a.post("".concat(m.b.url, "/api/retail/auth/profile/address"), {
                    state: e,
                    city: t,
                    street_name: a,
                    street_number: n,
                    zip_code: r
                }).then(function (e) {
                    200 === e.data.code ? (o(v(e.data.result)), o(d.j({
                        message: e.data.message,
                        variant: "success"
                    }))) : o(d.j({message: e.data.message, variant: "error"}))
                })
            }
        }

        function P(e) {
            n.a.updateUserData(e).then(function (e) {
                u.a.dispatch(v(e.data.result)), 200 === e.data.code ? u.a.dispatch(d.j({
                    message: "Tu informaci\xf3n se guard\xf3 correctamente",
                    variant: "success"
                })) : u.a.dispatch(d.j({message: e.data.message, variant: "error"}))
            }).catch(function (e) {
                u.a.dispatch(d.j({message: e.message, variant: "error"}))
            })
        }

        var C = "LOGIN_ERROR", I = "LOGIN_SUCCESS";

        function T(e) {
            var t = e.email, a = e.password;
            return function (e) {
                return n.a.signInWithEmailAndPassword(t, a).then(function (t) {
                    return e(v(t)), e({type: I})
                }).catch(function (t) {
                    return e({type: C, payload: t})
                })
            }
        }

        var D = "REGISTER_ERROR", R = "REGISTER_SUCCESS";
        a.d(t, "a", function () {
            return C
        }), a.d(t, "b", function () {
            return I
        }), a.d(t, "j", function () {
            return T
        }), a.d(t, "c", function () {
            return D
        }), a.d(t, "d", function () {
            return R
        }), a.d(t, "f", function () {
            return h
        }), a.d(t, "e", function () {
            return b
        }), a.d(t, "g", function () {
            return g
        }), a.d(t, "i", function () {
            return v
        }), a.d(t, "p", function () {
            return y
        }), a.d(t, "q", function () {
            return O
        }), a.d(t, "h", function () {
            return E
        }), a.d(t, "l", function () {
            return j
        }), a.d(t, "n", function () {
            return w
        }), a.d(t, "m", function () {
            return x
        }), a.d(t, "o", function () {
            return k
        }), a.d(t, "r", function () {
            return N
        }), a.d(t, "k", function () {
            return S
        })
    }, 374: function (e, t, a) {
    }, 40: function (e, t, a) {
        "use strict";
        a.d(t, "b", function () {
            return n
        }), a.d(t, "a", function () {
            return r
        });
        var n = {url: "https://api.goldenpack.com.ar"},
            r = {version: "1.0.0", name: "GoldenPack", navLogo: "assets/images/logos/icon.png"}
    }, 483: function (e, t, a) {
        "use strict";
        a.r(t);
        a(296);
        var n = a(4), r = a(19), o = a(18), i = a(22), l = a(23), c = a(24), s = (a(297), a(0)), u = a.n(s), d = a(484),
            m = a(487), p = a(532), f = a(488), h = a(533), b = a(270), g = a(536), v = a(491), y = a(199), O = a(10);

        function E(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function j(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? E(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : E(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var w = [{value: "contains", title: "Contiene"}, {
            value: "starts-with",
            title: "Comienza con"
        }, {value: "ends-with", title: "Termina con"}, {value: "matches", title: "Coincide"}, {
            value: "greater-than",
            title: "Mayor que"
        }, {value: "less-than", title: "Menor que"}], x = function (e) {
            function t() {
                var e, a;
                Object(r.a)(this, t);
                for (var n = arguments.length, o = new Array(n), c = 0; c < n; c++) o[c] = arguments[c];
                return (a = Object(i.a)(this, (e = Object(l.a)(t)).call.apply(e, [this].concat(o)))).state = {
                    filterType: "contains",
                    filterValue: "",
                    filterMenuEl: null
                }, a.changeFilterType = function (e) {
                    var t = j({}, a.state, {filterType: e});
                    a.setState(t), a.props.onChange(t), a.handleFilterMenuClose()
                }, a.changeFilterValue = function (e) {
                    var t = j({}, a.state, {filterValue: e.target.value});
                    a.setState(t), a.props.onChange(t)
                }, a.handleFilterMenuClick = function (e) {
                    a.setState({filterMenuEl: e.currentTarget})
                }, a.handleFilterMenuClose = function () {
                    a.setState({filterMenuEl: null})
                }, a
            }

            return Object(c.a)(t, e), Object(o.a)(t, [{
                key: "render", value: function () {
                    var e = this, t = this.state.filterMenuEl;
                    return u.a.createElement("div", {className: "filter flex flex-col"}, u.a.createElement(d.a, {className: ""}, u.a.createElement(m.a, {
                        type: "text",
                        onChange: this.changeFilterValue,
                        value: this.state.filterValue,
                        className: "w-full",
                        inputProps: {placeholder: "Filtrar"},
                        endAdornment: u.a.createElement(p.a, {position: "end"}, u.a.createElement(f.a, {
                            "aria-owns": t ? "filter-menu" : null,
                            "aria-haspopup": "true",
                            onClick: this.handleFilterMenuClick
                        }, u.a.createElement(h.a, {
                            color: "action",
                            className: "text-20"
                        }, "filter_list")), u.a.createElement(b.a, {
                            id: "filter-menu",
                            anchorEl: t,
                            open: Boolean(t),
                            onClose: this.handleFilterMenuClose
                        }, w.map(function (t) {
                            return u.a.createElement(g.a, {
                                key: t.value, onClick: function () {
                                    return e.changeFilterType(t.value)
                                }
                            }, t.title)
                        })))
                    }), u.a.createElement(v.a, null, O.a.find(w, {value: this.state.filterType}).title)))
                }
            }]), t
        }(s.Component);
        Object.assign(y.a, {
            PreviousComponent: function (e) {
                return u.a.createElement(f.a, e, u.a.createElement(h.a, null, "chevron_left"))
            },
            NextComponent: function (e) {
                return u.a.createElement(f.a, e, u.a.createElement(h.a, null, "chevron_right"))
            },
            FilterComponent: function (e) {
                return u.a.createElement(x, e)
            },
            defaultFilterMethod: function (e, t) {
                var a = t[e.pivotId || e.id].toLowerCase();
                if (!a) return !0;
                var n = e.value.filterValue.toLowerCase() || "";
                switch (e.value.filterType) {
                    case"contains":
                        return a.indexOf(n) > -1;
                    case"starts-with":
                        return a.startsWith(n);
                    case"ends-with":
                        return a.endsWith(n);
                    case"matches":
                        return a === n;
                    case"greater-than":
                        return a > n;
                    case"less-than":
                        return a < n;
                    default:
                        return !0
                }
            },
            previousText: "Anterior",
            nextText: "Siguiente",
            loadingText: "Cargando...",
            noDataText: "",
            pageText: "P\xe1gina",
            ofText: "de",
            rowsText: "filas",
            defaultPageSize: 50
        });
        var k = a(190);
        k.a.pluginService.register({
            afterDatasetsDraw: function (e, t) {
                if (e.options.plugins.xLabelsOnTop && (!e.options.plugins.xLabelsOnTop || !1 !== e.options.plugins.xLabelsOnTop.active)) {
                    var a = e.ctx;
                    e.data.datasets.forEach(function (t, n) {
                        var r = e.getDatasetMeta(n);
                        r.hidden || r.data.forEach(function (e, n) {
                            a.fillStyle = "rgba(255, 255, 255, 0.7)";
                            a.font = k.a.helpers.fontString(13, "normal", "Muli, Roboto, Helvetica Neue, Arial, sans-serif");
                            var r = t.data[n].toString() + "k";
                            a.textAlign = "center", a.textBaseline = "middle";
                            var o = e.tooltipPosition();
                            a.fillText(r, o.x, 24), a.save(), a.beginPath(), a.setLineDash([5, 3]), a.moveTo(o.x, 39), a.lineTo(o.x, o.y - 15), a.strokeStyle = "rgba(255,255,255,0.54)", a.stroke(), a.restore()
                        })
                    })
                }
            }
        });
        a(374);
        var N = a(16), S = a.n(N);
        Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
        var P = a(12), C = a(31), I = a(133), T = a(57), D = a(146), R = a.n(D), L = a(144), A = a(26), F = a(8),
            _ = a(34), z = a(42), M = a(15), W = a(55), B = function (e) {
                function t() {
                    var e, a;
                    Object(r.a)(this, t);
                    for (var n = arguments.length, o = new Array(n), c = 0; c < n; c++) o[c] = arguments[c];
                    return (a = Object(i.a)(this, (e = Object(l.a)(t)).call.apply(e, [this].concat(o)))).state = {waitAuthCheck: !0}, a.authCheck = function () {
                        return new Promise(function (e) {
                            return W.a.on("onAutoLogin", function () {
                                W.a.getProfile().then(function (t) {
                                    a.props.setUserData(t), e()
                                }).catch(function (t) {
                                    a.props.showMessage({message: t}), e()
                                })
                            }), W.a.on("onAutoLogout", function (t) {
                                t && a.props.showMessage({message: t}), a.props.logout(), e()
                            }), W.a.on("onNoAccessToken", function () {
                                e()
                            }), W.a.init(), Promise.resolve()
                        })
                    }, a
                }

                return Object(c.a)(t, e), Object(o.a)(t, [{
                    key: "componentDidMount", value: function () {
                        var e = this;
                        return Promise.all([this.authCheck()]).then(function () {
                            e.setState({waitAuthCheck: !1})
                        })
                    }
                }, {
                    key: "render", value: function () {
                        return this.state.waitAuthCheck ? u.a.createElement(C.q, null) : u.a.createElement(u.a.Fragment, {children: this.props.children})
                    }
                }]), t
            }(s.Component);
        var H = Object(F.a)(null, function (e) {
                return Object(z.c)({logout: _.h, setUserData: _.i, showMessage: M.j, hideMessage: M.b}, e)
            })(B), G = a(65), V = a(81), q = a(546), U = a(557), $ = a(555), Y = a(559), X = a(61), Q = a.n(X), J = a(3),
            K = (a(478), a(40)), Z = Object(Y.a)(function (e) {
                return {
                    root: {
                        backgroundImage: 'url("../../assets/images/backgrounds/background-01.jpg")',
                        backgroundColor: e.palette.primary.light,
                        backgroundSize: "cover",
                        color: e.palette.primary.contrastText
                    },
                    wrapperBox: {backdropColor: "red", display: "block", width: "100%", height: "auto", marginTop: 12},
                    wrapper: {position: "relative", paddingTop: "56.25%"},
                    player: {position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}
                }
            });
        var ee = function () {
            var e = Z(), t = Object(F.b)(), a = Object(F.c)(function (e) {
                return e.auth.login
            }), n = Object(s.useRef)(null);
            return Object(s.useEffect)(function () {
                a.error && t(M.j({message: a.error, variant: "error"}))
            }), u.a.createElement("div", {className: Object(J.a)(e.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}, u.a.createElement("div", {className: "flex flex-col items-center justify-center w-full"}, u.a.createElement(C.a, {animation: "transition.expandIn"}, u.a.createElement(q.a, {className: "w-full max-w-512"}, u.a.createElement(U.a, {className: "flex flex-col items-center justify-center p-32"}, u.a.createElement("img", {
                className: "w-128 mt-32 ml-32 mr-32 mb-24",
                src: "assets/images/logos/logo-dark.png",
                alt: "logo"
            }), u.a.createElement(Q.a, {
                onSubmit: function (e) {
                    t(_.j(e))
                }, ref: n, className: "flex flex-col justify-center w-full"
            }, u.a.createElement(C.v, {
                className: "mb-16",
                label: "Email",
                autoFocus: !0,
                type: "email",
                name: "email",
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(C.v, {
                className: "mb-16",
                label: "Password",
                type: "password",
                name: "password",
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement($.a, {
                variant: "contained",
                color: "secondary",
                className: "w-224 mx-auto mt-16 mb-16",
                "aria-label": "LOG IN",
                type: "submit"
            }, "Ingres\xe1"), u.a.createElement("div", {className: "flex items-center justify-center"}, u.a.createElement("a", {
                href: K.b.url + "/password/reset",
                rel: "noopener noreferrer",
                className: "font-medium mb-16",
                target: "_blank"
            }, "Olvidaste tu clave?"))))))))
        }, te = {
            settings: {
                layout: {
                    config: {
                        navbar: {display: !1},
                        toolbar: {display: !1},
                        footer: {display: !1},
                        leftSidePanel: {display: !1},
                        rightSidePanel: {display: !1}
                    }
                }
            }, auth: A.a.onlyGuest, routes: [{path: "/login", component: ee}]
        }, ae = a(98), ne = a(504), re = a(543), oe = a(82), ie = a(27), le = Object(Y.a)(function (e) {
            return {
                root: {
                    backgroundImage: 'url("../../assets/images/backgrounds/background-01.jpg")',
                    backgroundColor: e.palette.primary.light,
                    backgroundSize: "cover",
                    color: e.palette.primary.contrastText
                }
            }
        });
        var ce = function () {
            var e = le(), t = Object(oe.b)({name: "", email: "", password: "", passwordConfirm: ""}), a = t.form,
                n = t.handleChange, r = t.resetForm;
            return u.a.createElement("div", {className: Object(J.a)(e.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}, u.a.createElement("div", {className: "flex flex-col items-center justify-center w-full"}, u.a.createElement(C.a, {animation: "transition.expandIn"}, u.a.createElement(q.a, {className: "w-full max-w-512"}, u.a.createElement(U.a, {className: "flex flex-col items-center justify-center p-32"}, u.a.createElement("img", {
                className: "w-128 mt-32 ml-32 mr-32",
                src: "assets/images/logos/goldenpack-b-c.svg",
                alt: "logo"
            }), u.a.createElement(ae.a, {
                variant: "body1",
                className: "mt-16 mb-32 text-center"
            }, "CRE\xc1 TU CUENTA DE BUSCAPARTES"), u.a.createElement("form", {
                name: "registerForm",
                noValidate: !0,
                className: "flex flex-col justify-center w-full",
                onSubmit: function (e) {
                    e.preventDefault(), r()
                }
            }, u.a.createElement(ne.a, {
                className: "mb-16",
                label: "Nombre de la Casa de repuestos",
                autoFocus: !0,
                type: "name",
                name: "name",
                value: a.name,
                onChange: n,
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ne.a, {
                className: "mb-16",
                label: "CUIT (Solo n\xfameros)",
                type: "number",
                name: "social_number",
                value: a.email,
                onChange: n,
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ne.a, {
                className: "mb-16",
                label: "Tel\xe9fono *",
                type: "text",
                name: "phone",
                value: a.email,
                onChange: n,
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ne.a, {
                className: "mb-16",
                label: "Email",
                type: "email",
                name: "email",
                value: a.email,
                onChange: n,
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ne.a, {
                className: "mb-16",
                label: "Clave",
                type: "new-password",
                name: "password",
                value: a.password,
                onChange: n,
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ne.a, {
                className: "mb-16",
                label: "Clave (Confirmaci\xf3n)",
                type: "new-password",
                name: "password_confirmation",
                value: a.passwordConfirm,
                onChange: n,
                variant: "outlined",
                required: !0,
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ae.a, {className: "text-xs mt-8 mb-16 text-blue"}, "Si fue atendido por un vendedor, ingres\xe9 su cod\xedgo"), u.a.createElement(ne.a, {
                className: "mb-16",
                label: "C\xf3digo de Vendedor ( Opcional )",
                type: "text",
                name: "seller_code",
                value: a.passwordConfirm,
                onChange: n,
                variant: "outlined",
                fullWidth: !0,
                InputLabelProps: {shrink: !0}
            }), u.a.createElement(ae.a, {
                variant: "caption",
                className: "text-13 mt-16"
            }, "Al crear una cuenta, se aceptan los t\xe9rminos, condiciones y pol\xedticas de privacidad."), u.a.createElement($.a, {
                variant: "contained",
                color: "secondary",
                className: "w-224 mx-auto mt-16",
                "aria-label": "Register",
                type: "submit"
            }, "Cre\xe1 tu cuenta")), u.a.createElement("div", {className: "my-24 flex items-center justify-center"}, u.a.createElement(re.a, {className: "w-32"}), u.a.createElement("span", {className: "mx-8 font-bold text-center"}, "SI YA TENES UNA CUENTA DE BUSCAPARTES"), u.a.createElement(re.a, {className: "w-32"})), u.a.createElement("div", {className: "flex items-center justify-center"}, u.a.createElement(ie.a, {to: "/login"}, u.a.createElement($.a, {
                variant: "contained",
                color: "primary",
                className: "w-224 mx-auto mb-16",
                "aria-label": "LOG IN"
            }, "INGRES\xc1 DESDE AC\xc1"))))))))
        }, se = [te, {
            settings: {
                layout: {
                    config: {
                        navbar: {display: !1},
                        toolbar: {display: !1},
                        footer: {display: !1},
                        leftSidePanel: {display: !1},
                        rightSidePanel: {display: !1}
                    }
                }
            }, auth: A.a.onlyGuest, routes: [{path: "/auth/register", component: ce}]
        }, {
            auth: A.a.admin, routes: [{
                path: "/auth/logout", component: function () {
                    return G.a.dispatch(Object(_.h)()), "Logging out.."
                }
            }]
        }, {
            settings: {layout: {config: {}}}, routes: [{
                path: "/profile", component: u.a.lazy(function () {
                    return a.e(16).then(a.bind(null, 711))
                })
            }]
        }];
        var ue = [{
                settings: {
                    layout: {
                        config: {
                            navbar: {display: !1},
                            toolbar: {display: !1},
                            footer: {display: !1},
                            leftSidePanel: {display: !1},
                            rightSidePanel: {display: !1}
                        }
                    }
                }, routes: [{
                    path: "/errors/error-404", component: function () {
                        return u.a.createElement("div", {className: "flex flex-col flex-1 items-center justify-center p-16"}, u.a.createElement("div", {className: "max-w-512 text-center"}, u.a.createElement(C.a, {
                            animation: "transition.expandIn",
                            delay: 100
                        }, u.a.createElement(ae.a, {
                            variant: "h1",
                            color: "inherit",
                            className: "font-medium mb-16"
                        }, "404")), u.a.createElement(C.a, {delay: 300}, u.a.createElement(ae.a, {
                            variant: "h5",
                            color: "textSecondary",
                            className: "mb-24"
                        }, "La p\xe1gina que buscas no existe")), u.a.createElement(C.a, {delay: 600}, u.a.createElement(ie.a, {
                            className: "font-medium text-24",
                            to: "/"
                        }, "Volver al inicio"))))
                    }
                }]
            }, {
                settings: {
                    layout: {
                        config: {
                            navbar: {display: !1},
                            toolbar: {display: !1},
                            footer: {display: !1},
                            leftSidePanel: {display: !1},
                            rightSidePanel: {display: !1}
                        }
                    }
                }, routes: [{
                    path: "/errors/error-500", component: function () {
                        return u.a.createElement("div", {className: "flex flex-col flex-1 items-center justify-center p-16"}, u.a.createElement("div", {className: "max-w-512 text-center"}, u.a.createElement(C.a, {
                            animation: "transition.expandIn",
                            delay: 100
                        }, u.a.createElement(ae.a, {
                            variant: "h1",
                            color: "inherit",
                            className: "font-medium mb-16"
                        }, "500")), u.a.createElement(C.a, {delay: 400}, u.a.createElement(ae.a, {
                            variant: "subtitle1",
                            color: "textSecondary",
                            className: "mb-48"
                        }, "Parece que tenemos un problema interno. Volv\xe9 a intentarlo en unos minutos."))))
                    }
                }]
            }], de = [{
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/location/countries", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(2), a.e(26)]).then(a.bind(null, 713))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/location/states/:country_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(2), a.e(27)]).then(a.bind(null, 714))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/location/cities/:country_id/:state_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(2), a.e(25)]).then(a.bind(null, 715))
                    })
                }]
            }], me = [{
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/payment/methods", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(3), a.e(29)]).then(a.bind(null, 716))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/payment/states/:payment_method_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(3), a.e(30)]).then(a.bind(null, 717))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/payment/cities/:payment_method_id/:payment_method_state_id",
                    exact: !0,
                    component: u.a.lazy(function () {
                        return Promise.all([a.e(3), a.e(28)]).then(a.bind(null, 718))
                    })
                }]
            }], pe = [{
                settings: {layout: {config: {}}}, routes: [{
                    path: "/counties", component: u.a.lazy(function () {
                        return a.e(20).then(a.bind(null, 736))
                    })
                }]
            }, {
                settings: {layout: {config: {}}}, routes: [{
                    path: "/sales/:status", component: u.a.lazy(function () {
                        return a.e(10).then(a.bind(null, 734))
                    })
                }, {
                    path: "/sales", component: function () {
                        return u.a.createElement(T.a, {to: "/sales/pending"})
                    }
                }]
            }], fe = [{
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/shipping/carriers", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(5), a.e(33)]).then(a.bind(null, 719))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/shipping/states/:carrier_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(5), a.e(35)]).then(a.bind(null, 720))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/shipping/cities/:carrier_id/:carrier_state_id",
                    exact: !0,
                    component: u.a.lazy(function () {
                        return Promise.all([a.e(5), a.e(34)]).then(a.bind(null, 721))
                    })
                }]
            }], he = [{
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/service-provider/providers", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(4), a.e(24)]).then(a.bind(null, 722))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/service-provider/addresses/:provider_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(4), a.e(31)]).then(a.bind(null, 723))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/service-provider/users/:provider_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(4), a.e(32)]).then(a.bind(null, 729))
                    })
                }]
            }], be = {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/categories", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(1), a.e(0), a.e(17)]).then(a.bind(null, 724))
                    })
                }]
            }, ge = {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/packs", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(1), a.e(0), a.e(18)]).then(a.bind(null, 725))
                    })
                }]
            }, ve = {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/products", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(9), a.e(0), a.e(22)]).then(a.bind(null, 726))
                    })
                }]
            }, ye = {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/packs/products/:pack_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(0), a.e(11)]).then(a.bind(null, 730))
                    })
                }]
            }, Oe = {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/products/addresses/:product_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(0), a.e(12)]).then(a.bind(null, 731))
                    })
                }]
            }, Ee = {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/products/pictures/:product_id", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(0), a.e(13)]).then(a.bind(null, 732))
                    })
                }]
            }, je = [be, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/catalog/discounts", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(1), a.e(0), a.e(19)]).then(a.bind(null, 727))
                    })
                }]
            }, ge, ve, Oe, ye, Ee], we = [{
                settings: {layout: {config: {}}}, routes: [{
                    path: "/card/edit", component: u.a.lazy(function () {
                        return a.e(15).then(a.bind(null, 735))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/card/histories", exact: !0, component: u.a.lazy(function () {
                        return Promise.all([a.e(1), a.e(0), a.e(21)]).then(a.bind(null, 728))
                    })
                }]
            }, {
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/card/payment/history/:status", exact: !0, component: u.a.lazy(function () {
                        return a.e(14).then(a.bind(null, 733))
                    })
                }]
            }], xe = [{
                settings: {layout: {config: {}}},
                routes: [{
                    path: "/clients", exact: !0, component: u.a.lazy(function () {
                        return a.e(23).then(a.bind(null, 712))
                    })
                }]
            }],
            ke = [].concat(Object(P.a)(se), Object(P.a)(ue), Object(P.a)(de), Object(P.a)(me), Object(P.a)(fe), Object(P.a)(he), Object(P.a)(je), Object(P.a)(pe), Object(P.a)(we), Object(P.a)(xe)),
            Ne = [].concat(Object(P.a)(C.t.generateRoutesFromConfigs(ke, A.a.admin)), [{
                path: "/",
                exact: !0,
                component: function () {
                    return u.a.createElement(T.a, {to: "/profile"})
                }
            }, {
                component: function () {
                    return u.a.createElement(T.a, {to: "/errors/error-404"})
                }
            }]), Se = a(39), Pe = a(273), Ce = a(485), Ie = a(531);

        function Te(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        var De = Object(Se.b)(function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Te(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Te(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }({}, Object(Pe.a)(), {
            plugins: [].concat(Object(P.a)(Object(Pe.a)().plugins), [R()()]),
            insertionPoint: document.getElementById("jss-insertion-point")
        })), Re = Object(Ce.a)(), Le = function () {
            return u.a.createElement(V.a.Provider, {value: {routes: Ne}}, u.a.createElement(Ie.b, {
                jss: De,
                generateClassName: Re
            }, u.a.createElement(I.a, {store: G.a}, u.a.createElement(H, null, u.a.createElement(T.c, {history: L.a}, u.a.createElement(C.c, null, u.a.createElement(C.s, null, u.a.createElement(C.g, null))))))))
        };
        S.a.render(u.a.createElement(Le, null), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then(function (e) {
            e.unregister()
        })
    }, 55: function (e, t, a) {
        "use strict";
        var n = a(19), r = a(18), o = a(22), i = a(23), l = a(24), c = a(38), s = a.n(c), u = a(134), d = a(40),
            m = new (function (e) {
                function t() {
                    var e, a;
                    Object(n.a)(this, t);
                    for (var r = arguments.length, l = new Array(r), c = 0; c < r; c++) l[c] = arguments[c];
                    return (a = Object(o.a)(this, (e = Object(i.a)(t)).call.apply(e, [this].concat(l)))).setInterceptors = function () {
                        s.a.interceptors.response.use(function (e) {
                            return e
                        }, function (e) {
                            return new Promise(function (t, n) {
                                throw e && e.response && 403 === e.response.status && e.config && !e.config.__isRetryRequest && (a.emit("onAutoLogout", "Invalid access_token"), a.setSession(null)), e
                            })
                        })
                    }, a.handleAuthentication = function () {
                        var e = a.getAccessToken();
                        e ? a.isAuthTokenValid(e) ? (a.setSession(e), a.emit("onAutoLogin", !0)) : (a.setSession(null), a.emit("onAutoLogout", "access_token expired")) : a.emit("onNoAccessToken")
                    }, a.createUser = function (e) {
                        return new Promise(function (t, n) {
                            s.a.post("/api/auth/register", e).then(function (e) {
                                e.data.user ? (a.setSession(e.data.access_token), t(e.data.user)) : n(e.data.error)
                            })
                        })
                    }, a.signInWithEmailAndPassword = function (e, t) {
                        return new Promise(function (n, r) {
                            s.a.post("".concat(d.b.url, "/api/backend/auth/login"), {
                                email: e,
                                password: t,
                                player_id: a.getPlayerId()
                            }).then(function (e) {
                                200 === e.data.code ? (a.setSession(e.data.result.access_token), a.setUserId(e.data.result.user.id), n(e.data.result.user)) : r(e.data.message)
                            })
                        })
                    }, a.getProfile = function () {
                        return new Promise(function (e, t) {
                            s.a.get("".concat(d.b.url, "/api/backend/auth/profile"), {
                                headers: {
                                    "Cache-Control": "no-cache",
                                    Authorization: "Bearer " + a.getAccessToken()
                                }
                            }).then(function (n) {
                                200 === n.data.code ? (a.setUserId(n.data.result.id), e(n.data.result)) : (a.logout(), t(n.data.message))
                            }).catch(function (e) {
                                a.logout(), t("No fue posible validar tu acceso, intent\xe1 nuevamente")
                            })
                        })
                    }, a.updateUserData = function (e) {
                        return s.a.post("/api/auth/user/update", {user: e})
                    }, a.logout = function () {
                        return new Promise(function (e, t) {
                            s.a.get("".concat(d.b.url, "/api/backend/auth/logout")).then(function (e) {
                                a.setSession(null), a.setPlayerId(null), a.setUserId(null)
                            })
                        })
                    }, a.isAuthTokenValid = function (e) {
                        return e
                    }, a.setSession = function (e) {
                        e ? (localStorage.setItem("auth_access_token", e), s.a.defaults.headers.common.Authorization = "Bearer " + e) : (localStorage.removeItem("auth_access_token"), delete s.a.defaults.headers.common.Authorization)
                    }, a.setPlayerId = function (e) {
                        e ? localStorage.setItem("player_id", e) : localStorage.removeItem("player_id")
                    }, a.setUserId = function (e) {
                        e ? localStorage.setItem("user_id", e) : localStorage.removeItem("user_id")
                    }, a.getAccessToken = function () {
                        return localStorage.getItem("auth_access_token")
                    }, a.getPlayerId = function () {
                        return window.localStorage.getItem("player_id")
                    }, a.getUserId = function () {
                        return window.localStorage.getItem("user_id")
                    }, a
                }

                return Object(l.a)(t, e), Object(r.a)(t, [{
                    key: "init", value: function () {
                        this.setInterceptors(), this.handleAuthentication()
                    }
                }]), t
            }(u.a.EventEmitter));
        t.a = m
    }, 62: function (e, t, a) {
        "use strict";
        a.d(t, "a", function () {
            return p
        }), a.d(t, "e", function () {
            return f
        }), a.d(t, "b", function () {
            return h
        }), a.d(t, "g", function () {
            return b
        }), a.d(t, "c", function () {
            return g
        }), a.d(t, "d", function () {
            return v
        }), a.d(t, "f", function () {
            return y
        });
        var n = a(4), r = a(119), o = a(85), i = a(83), l = a(109), c = a(10), s = a(262), u = a.n(s);

        function d(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function m(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? d(a, !0).forEach(function (t) {
                    Object(n.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var p = {
            customScrollbars: !0,
            theme: {main: "default", navbar: "mainThemeDark", toolbar: "mainThemeLight", footer: "mainThemeDark"}
        };

        function f() {
            var e = u.a.parse(window.location.search, {ignoreQueryPrefix: !0});
            return e && e.defaultSettings ? JSON.parse(e.defaultSettings) : {}
        }

        var h = {
            typography: {
                fontFamily: ["Muli", "Roboto", '"Helvetica"', "Arial", "sans-serif"].join(","),
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 600,
                useNextVariants: !0,
                suppressDeprecationWarnings: !0
            }
        }, b = {typography: {htmlFontSize: 10, body1: {fontSize: "1.4rem"}, body2: {fontSize: "1.4rem"}}}, g = {
            default: {
                palette: {
                    type: "light",
                    primary: l.a,
                    secondary: {light: o.a[400], main: o.a[600], dark: o.a[700]},
                    error: i.a
                }, status: {danger: "orange"}
            },
            defaultDark: {
                palette: {
                    type: "dark",
                    primary: l.a,
                    secondary: {light: o.a[400], main: o.a[600], dark: o.a[700]},
                    error: i.a
                }, status: {danger: "orange"}
            }
        };

        function v(e) {
            var t = Object(r.a)(e);
            return {
                border: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    return {borderWidth: e, borderStyle: "solid", borderColor: t.palette.divider}
                }, borderLeft: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    return {borderLeftWidth: e, borderStyle: "solid", borderColor: t.palette.divider}
                }, borderRight: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    return {borderRightWidth: e, borderStyle: "solid", borderColor: t.palette.divider}
                }, borderTop: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    return {borderTopWidth: e, borderStyle: "solid", borderColor: t.palette.divider}
                }, borderBottom: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    return {borderBottomWidth: e, borderStyle: "solid", borderColor: t.palette.divider}
                }
            }
        }

        function y(e) {
            return {
                mainThemeDark: Object(r.a)(c.a.merge({}, h, e, m({palette: {type: "dark"}}, b))),
                mainThemeLight: Object(r.a)(c.a.merge({}, h, e, m({palette: {type: "light"}}, b)))
            }
        }
    }, 65: function (e, t, a) {
        "use strict";
        var n = a(42), r = a(4), o = a(12), i = a(30), l = a(26), c = [{
            id: "provider-group",
            title: "Prestadores de Servicios",
            type: "group",
            icon: "apps",
            auth: l.a.admin,
            children: [{
                id: "providers",
                title: "Prestadores",
                type: "item",
                icon: "group",
                url: "/service-provider/providers",
                auth: l.a.admin
            }]
        }, {
            id: "catalog-group",
            title: "Cat\xe1logo",
            type: "group",
            icon: "apps",
            auth: l.a.admin,
            children: [{
                id: "discounts",
                title: "Descuentos",
                type: "item",
                icon: "money_off",
                url: "/catalog/discounts",
                auth: l.a.admin
            }, {
                id: "packs",
                title: "Packs",
                type: "item",
                icon: "collections_bookmark",
                url: "/catalog/packs",
                auth: l.a.admin
            }, {
                id: "products",
                title: "Productos",
                type: "item",
                icon: "fastfood",
                url: "/catalog/products",
                auth: l.a.admin
            }, {
                id: "categories",
                title: "Categor\xedas",
                type: "item",
                icon: "category",
                url: "/catalog/categories",
                auth: l.a.admin
            }]
        }, {
            id: "settings-group",
            title: "Configuraci\xf3n",
            type: "group",
            icon: "apps",
            auth: l.a.admin,
            children: [{
                id: "countries",
                title: "Paises",
                type: "item",
                icon: "map",
                url: "/location/countries",
                auth: l.a.admin
            }, {
                id: "payment-methods",
                title: "M\xe9todos de Pago",
                type: "item",
                icon: "attach_money",
                url: "/payment/methods",
                auth: l.a.admin
            }, {
                id: "carriers",
                title: "Curriers",
                type: "item",
                icon: "local_shipping",
                url: "/shipping/carriers",
                auth: l.a.admin
            }]
        }, {
            id: "clients-group",
            title: "Clientes",
            type: "group",
            icon: "user",
            auth: l.a.admin,
            children: [{
                id: "-client-group",
                title: "Ver Clientes",
                type: "item",
                icon: "account_circle",
                url: "/clients",
                auth: l.a.admin
            }]
        }, {
            id: "states-group",
            title: "Pedidos",
            type: "group",
            icon: "user",
            auth: l.a.admin,
            children: [{
                id: "sales",
                title: "Pedidos",
                type: "collapse",
                icon: "shopping_cart",
                url: "/states",
                auth: l.a.admin,
                children: [{
                    id: "states-pending",
                    title: "Pendientes",
                    type: "item",
                    url: "/sales/pending",
                    auth: l.a.admin
                }, {
                    id: "states-confirmed",
                    title: "Confirmados",
                    type: "item",
                    url: "/sales/confirmed",
                    auth: l.a.admin
                }, {
                    id: "states-dismissed",
                    title: "Rechazados",
                    type: "item",
                    url: "/sales/dismissed",
                    auth: l.a.admin
                }]
            }]
        }, {
            id: "card-group",
            title: "Tarjetas",
            type: "group",
            icon: "credit_card",
            auth: l.a.admin,
            children: [{
                id: "payment-history",
                title: "Historial de Pagos",
                type: "collapse",
                icon: "monetization_on",
                url: "/card/payment/history",
                auth: l.a.admin,
                children: [{
                    id: "payment-history-pending",
                    title: "Pendientes",
                    type: "item",
                    url: "/card/payment/history/pending",
                    auth: l.a.admin
                }, {
                    id: "payment-history-confirmed",
                    title: "Confirmados",
                    type: "item",
                    url: "/card/payment/history/confirmed",
                    auth: l.a.admin
                }, {
                    id: "payment-history-dismissed",
                    title: "Rechazados",
                    type: "item",
                    url: "/card/payment/history/dismissed",
                    auth: l.a.admin
                }]
            }, {
                id: "card-history",
                title: "Historial de tarjetas",
                type: "collapse",
                icon: "credit_card",
                url: "/card/history",
                auth: l.a.admin,
                children: [{
                    id: "card-history-modify",
                    title: "Editar Tarjeta",
                    type: "item",
                    url: "/card/edit",
                    auth: l.a.admin
                }, {
                    id: "card-history-list",
                    title: "Ver Historial",
                    type: "item",
                    url: "/card/histories",
                    auth: l.a.admin
                }]
            }]
        }, {
            id: "profile-group",
            title: "Perfil",
            type: "group",
            icon: "user",
            auth: l.a.admin,
            children: [{
                id: "account-group",
                title: "Mi Cuenta",
                type: "item",
                icon: "account_circle",
                url: "/profile",
                auth: l.a.admin
            }]
        }], s = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case i.d:
                    return Object(o.a)(e);
                case i.m:
                    return Object(o.a)(t.navigation);
                case i.j:
                    return Object(o.a)(c);
                default:
                    return e
            }
        }, u = a(150);

        function d(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function m(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? d(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : d(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var p = {foldedOpen: !1, mobileOpen: !1}, f = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case i.p:
                    return m({}, e, {foldedOpen: !e.foldedOpen});
                case i.g:
                    return m({}, e, {foldedOpen: !0});
                case i.b:
                    return m({}, e, {foldedOpen: !1});
                case i.q:
                    return m({}, e, {mobileOpen: !e.mobileOpen});
                case i.h:
                    return m({}, e, {mobileOpen: !0});
                case i.c:
                    return m({}, e, {mobileOpen: !1});
                default:
                    return e
            }
        };

        function h(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function b(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? h(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : h(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var g = {
            state: null,
            options: {
                anchorOrigin: {vertical: "top", horizontal: "center"},
                autoHideDuration: 6e3,
                message: "Hi",
                variant: null
            }
        }, v = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : g,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case i.o:
                    return {state: !0, options: b({}, g.options, {}, t.options)};
                case i.e:
                    return b({}, e, {state: null});
                default:
                    return e
            }
        };

        function y(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function O(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? y(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : y(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var E = {state: !1, options: {children: "Hi"}}, j = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : E,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case i.f:
                    return O({}, e, {state: !0, options: O({}, e.options, {}, t.options)});
                case i.a:
                    return O({}, e, {state: !1});
                default:
                    return e
            }
        }, w = {}, x = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : w,
                t = arguments.length > 1 ? arguments[1] : void 0;
            return t.type, e
        }, k = Object(n.d)({navigation: s, settings: u.a, navbar: f, message: v, dialog: j, routes: x}), N = a(34);

        function S(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function P(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? S(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : S(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var C = {
            id: 0,
            name: "Cargando...",
            social_number: null,
            email: null,
            created_at: null,
            valid_membership_until: null,
            logoUrl: "assets/images/spinner/giphy.gif",
            information: {segments: []},
            segments: [],
            state: null,
            city: null,
            street_name: null,
            street_number: null,
            zip_code: null,
            latitude: null,
            longitude: null,
            phone: null,
            website: null,
            role: "guest",
            from: "init",
            settings: {},
            shortcuts: []
        }, I = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : C,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case N.f:
                    return P({}, C, {}, t.payload);
                case N.e:
                    return P({}, C);
                case N.g:
                    return C;
                default:
                    return e
            }
        };

        function T(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function D(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? T(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : T(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var R = {success: !1, error: null}, L = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : R,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case N.b:
                    return D({}, R, {success: !0});
                case N.a:
                    return {success: !1, error: t.payload};
                default:
                    return e
            }
        };

        function A(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        function F(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? A(a, !0).forEach(function (t) {
                    Object(r.a)(e, t, a[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : A(a).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }

        var _ = {success: !1, error: {username: null, password: null}}, z = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
                t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
                case N.d:
                    return F({}, _, {success: !0});
                case N.c:
                    return {success: !1, error: t.payload};
                default:
                    return e
            }
        }, M = Object(n.d)({user: I, login: L, register: z}), W = a(152);

        function B(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        var H = function (e) {
            return Object(n.d)(function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var a = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? B(a, !0).forEach(function (t) {
                        Object(r.a)(e, t, a[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : B(a).forEach(function (t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                    })
                }
                return e
            }({auth: M, fuse: k, quickPanel: W.a}, e))
        }, G = a(263);
        a.d(t, "b", function () {
            return U
        }), n.a.REPLACE = "@@redux/INIT";
        var V = (0, n.e)(Object(n.b)(G.a)), q = Object(n.f)(H(), V);
        q.asyncReducers = {};
        var U = function (e, t) {
            if (!q.asyncReducers[e]) return q.asyncReducers[e] = t, q.replaceReducer(H(q.asyncReducers)), q
        };
        t.a = q
    }, 81: function (e, t, a) {
        "use strict";
        var n = a(0), r = a.n(n).a.createContext({});
        t.a = r
    }, 82: function (e, t, a) {
        "use strict";
        var n = a(4), r = a(21), o = a(0), i = a(10);

        function l(e, t) {
            var a = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })), a.push.apply(a, n)
            }
            return a
        }

        var c = function (e, t) {
            var a = Object(o.useState)(e), c = Object(r.a)(a, 2), s = c[0], u = c[1],
                d = Object(o.useCallback)(function (e) {
                    e.persist(), u(function (t) {
                        return i.a.setIn(function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var a = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? l(a, !0).forEach(function (t) {
                                    Object(n.a)(e, t, a[t])
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : l(a).forEach(function (t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                                })
                            }
                            return e
                        }({}, t), e.target.name, "checkbox" === e.target.type ? e.target.checked : e.target.value)
                    })
                }, []), m = Object(o.useCallback)(function () {
                    i.a.isEqual(e, s) || u(e)
                }, [s, e]), p = Object(o.useCallback)(function (e, t) {
                    u(function (a) {
                        return i.a.setIn(a, e, t)
                    })
                }, []), f = Object(o.useCallback)(function (e) {
                    e && e.preventDefault(), t && t()
                }, [t]);
            return {form: s, handleChange: d, handleSubmit: f, resetForm: m, setForm: u, setInForm: p}
        };
        var s = function (e, t, a) {
            return Object(o.useRef)(i.a.debounce(e, t, a)).current
        };
        var u = function (e, t) {
            var a = Object(o.useRef)(e);
            Object(o.useEffect)(function () {
                a.current = e
            }, [e]), Object(o.useEffect)(function () {
                if (t && e && "function" === typeof e) {
                    var n = setTimeout(a.current, t || 0);
                    return function () {
                        n && clearTimeout(n)
                    }
                }
            }, [e, t])
        };
        a.d(t, "b", function () {
            return c
        }), a.d(t, "a", function () {
            return s
        }), a.d(t, "c", function () {
            return u
        })
    }, 93: function (e, t, a) {
        "use strict";
        a(38);
        var n = "[QUICK PANEL] TOGGLE QUICK PANEL", r = "[QUICK PANEL] GET DATA";

        function o() {
            return {type: n}
        }

        a.d(t, "b", function () {
            return n
        }), a.d(t, "a", function () {
            return r
        }), a.d(t, "c", function () {
            return o
        })
    }
}, [[295, 7, 8]]]);