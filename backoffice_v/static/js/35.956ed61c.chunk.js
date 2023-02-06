(window["webpackJsonpfuse-react-app"] = window["webpackJsonpfuse-react-app"] || []).push([[35], {
    720: function (e, a, t) {
        "use strict";
        t.r(a);
        var r = t(21), n = t(0), l = t.n(n), c = t(31), i = t(198), o = t(4), s = t(98), u = t(550), f = t(488),
            m = t(533), d = t(567), p = t.n(d), b = t(57), E = t(8), v = t(199), g = t(576);

        function h(e, a) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                a && (r = r.filter(function (a) {
                    return Object.getOwnPropertyDescriptor(e, a).enumerable
                })), t.push.apply(t, r)
            }
            return t
        }

        function O(e) {
            for (var a = 1; a < arguments.length; a++) {
                var t = null != arguments[a] ? arguments[a] : {};
                a % 2 ? h(t, !0).forEach(function (a) {
                    Object(o.a)(e, a, t[a])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : h(t).forEach(function (a) {
                    Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(t, a))
                })
            }
            return e
        }

        var j = function (e) {
            var a = e.openDeleteAlertHandler, t = e.openDetailModalHandler, i = e.carrier_id, o = Object(E.b)(),
                d = Object(E.c)(function (e) {
                    return e.ShippingApp.state.entities
                }), h = Object(E.c)(function (e) {
                    return e.ShippingApp.state.page
                }), j = Object(E.c)(function (e) {
                    return e.ShippingApp.state.loading
                }), _ = l.a.useState(null), y = Object(r.a)(_, 2), x = y[0], w = y[1];
            return Object(n.useEffect)(function () {
                o(g.X(!0)), o(g.O(i, h))
            }, [i]), !d || j ? l.a.createElement("div", {className: "flex flex-1 items-center justify-center h-full mt-32"}, l.a.createElement(s.a, {
                color: "textSecondary",
                variant: "h5"
            }, "Cargando")) : x ? l.a.createElement(b.a, {to: x}) : l.a.createElement(c.a, {
                animation: "transition.fadeIn",
                delay: 300
            }, l.a.createElement(v.b, {
                className: "-striped -highlight h-full overflow-hidden pl-2",
                data: d,
                pages: h.last_page,
                pageSizeOptions: [h.per_page],
                manual: !0,
                columns: [{
                    Header: "M\xe9todo de env\xedo",
                    accessor: "carrier.name",
                    filterable: !1,
                    sortable: !1,
                    width: 200,
                    className: "justify-center"
                }, {Header: "Provincia", accessor: "state.name", filterable: !0}, {
                    Header: "Precio",
                    accessor: "price",
                    filterable: !1,
                    className: "justify-center",
                    width: 100
                }, {
                    id: "free_if_order_above", Header: "Gratis desde", accessor: "", Cell: function (e) {
                        return l.a.createElement(s.a, null, e.value.free_if_order_above ? e.value.free_if_order_above : "Sin Asignar")
                    }, className: "justify-center", filterable: !1, sortable: !1, width: 100
                }, {
                    id: "enabled_for_all_subitems",
                    Header: "Habilitado para Todas las Ciudades",
                    accessor: "",
                    Cell: function (e) {
                        return l.a.createElement(s.a, null, e.value.enabled_for_all_subitems ? "SI" : "NO")
                    },
                    className: "justify-center",
                    filterable: !1,
                    sortable: !1,
                    width: 300
                }, {
                    Header: "Habilitado", accessor: "", Cell: function (e) {
                        return l.a.createElement(s.a, null, e.value.enabled ? "SI" : "NO")
                    }, className: "justify-center", filterable: !1, sortable: !1, width: 80
                }, {
                    id: "open_addresses", Header: "", accessor: "", Cell: function (e) {
                        return l.a.createElement(u.a, {title: "Ciudades"}, l.a.createElement(f.a, {
                            size: "small",
                            "aria-label": "redirect",
                            onClick: function () {
                                w("/shipping/cities/" + e.original.carrier_id + "/" + e.original.id)
                            }
                        }, l.a.createElement(m.a, {color: "action", className: "text-20"}, "pin_drop")))
                    }, className: "justify-center", filterable: !1, sortable: !1, width: 60
                }, {
                    id: "edit_column", Header: "", accessor: "", Cell: function (e) {
                        return l.a.createElement(u.a, {title: "Editar"}, l.a.createElement(f.a, {
                            size: "small",
                            "aria-label": "Edit",
                            onClick: function () {
                                t(e.value)
                            }
                        }, l.a.createElement(m.a, {color: "action", className: "text-20"}, "edit")))
                    }, className: "justify-center", filterable: !1, sortable: !1, width: 60
                }, {
                    id: "remove_column", Header: "", accessor: "", Cell: function (e) {
                        return l.a.createElement(u.a, {title: "Eliminar"}, l.a.createElement(f.a, {
                            size: "small",
                            "aria-label": "Delete",
                            onClick: function () {
                                a(e.value)
                            }
                        }, l.a.createElement(p.a, {fontSize: "small"})))
                    }, className: "justify-center", filterable: !1, sortable: !1, width: 60
                }],
                defaultPageSize: 0 === d.length ? 5 : d.length,
                noDataText: "No hay items para mostrar",
                loading: j,
                onFetchData: function (e, a) {
                    var t = e.page + 1, r = O({}, h);
                    r.current_page = t, o(g.O(i, r))
                },
                onFilteredChange: function (e) {
                    var a = O({}, h);
                    a.filters = e, o(g.C(a))
                },
                onSortedChange: function (e) {
                    var a = O({}, h);
                    a.sort = e[0], o(g.C(a))
                }
            }))
        }, _ = t(595), y = t(552), x = t(579), w = t(580), C = t(583), N = t(581), S = t(555);
        var k = function (e) {
            var a = e.item, t = e.open, r = e.closeHandler, n = Object(E.b)();

            function c() {
                r()
            }

            return a ? l.a.createElement(y.a, {
                open: t,
                onClose: c,
                "aria-labelledby": "alert-dialog-title",
                "aria-describedby": "alert-dialog-description"
            }, l.a.createElement(x.a, {id: "alert-dialog-title"}, "Eliminar item"), l.a.createElement(w.a, null, l.a.createElement(C.a, {id: "alert-dialog-description"}, "Esta seguro de eliminar este item? La acci\xf3n no se puede deshacer y eliminar\xe1 todo el contenido asociado.")), l.a.createElement(N.a, null, l.a.createElement(S.a, {
                onClick: c,
                color: "primary"
            }, "Cancelar"), l.a.createElement(S.a, {
                onClick: function () {
                    n(g.Z(a.id)), r()
                }, color: "primary", autoFocus: !0
            }, "Si, Eliminar"))) : (r(), l.a.createElement("div", null))
        }, P = t(32), H = t(499), D = t(504), A = t(544), W = t(562), I = t(3), z = t(538);

        function F(e, a) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                a && (r = r.filter(function (a) {
                    return Object.getOwnPropertyDescriptor(e, a).enumerable
                })), t.push.apply(t, r)
            }
            return t
        }

        function G(e) {
            for (var a = 1; a < arguments.length; a++) {
                var t = null != arguments[a] ? arguments[a] : {};
                a % 2 ? F(t, !0).forEach(function (a) {
                    Object(o.a)(e, a, t[a])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : F(t).forEach(function (a) {
                    Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(t, a))
                })
            }
            return e
        }

        var L = function (e) {
            var a = e.carrier_id, t = e.item, c = e.open, i = e.closeHandler, u = Object(E.b)(),
                f = Object(E.c)(function (e) {
                    return e.ShippingApp.carrier.carrierInfo
                }), m = Object(E.c)(function (e) {
                    return e.ShippingApp.state.stateInfo
                }), d = Object(E.c)(function (e) {
                    return e.ShippingApp.state.stateInfoLoading
                }), p = Object(E.c)(function (e) {
                    return e.ShippingApp.state.countries
                }), b = Object(E.c)(function (e) {
                    return e.ShippingApp.state.country_states
                }), v = Object(P.a)(), h = Object(z.a)(v.breakpoints.down("sm")), O = l.a.useState(null),
                j = Object(r.a)(O, 2), _ = j[0], C = j[1], k = l.a.useState(""), F = Object(r.a)(k, 2), L = F[0],
                M = F[1], T = l.a.useState(""), J = Object(r.a)(T, 2), K = J[0], V = J[1];
            Object(n.useEffect)(function () {
                a && (u(g.G(a)), u(g.N(t.id)), u(g.K()))
            }, [a]), Object(n.useEffect)(function () {
                L && u(g.L(L))
            }, [L]), Object(n.useEffect)(function () {
                m && (C(m), M(m.state.country_id), V(m.state.id))
            }, [m]);
            var R = function (e) {
                var a = e.target, t = a.name, r = a.value;
                "checkbox" !== e.target.type && "radio" !== e.target.type || (r = 1 === _[t] ? 0 : 1), C(G({}, _, Object(o.a)({}, t, r)))
            };

            function X() {
                i()
            }

            return m && f && !d && _ ? l.a.createElement(y.a, {
                open: c,
                onClose: X,
                "aria-labelledby": "form-dialog-title",
                fullWidth: !0,
                fullScreen: h,
                maxWidth: "sm"
            }, l.a.createElement(x.a, {id: "form-dialog-title"}, "Editar una provincia de ", f.name), l.a.createElement(w.a, {className: "flex-col"}, l.a.createElement("div", {className: Object(I.a)("flex", "w-full")}, l.a.createElement("div", {className: "flex-col w-full"}, l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mb-3"}, l.a.createElement(H.a, {
                id: "country_id",
                className: "w-full",
                native: !0,
                value: L,
                onChange: function (e) {
                    M(e.target.value)
                }
            }, l.a.createElement("option", {
                value: "",
                disabled: !0
            }, "Seleccion\xe1 un pa\xeds"), p && p.map(function (e) {
                return l.a.createElement("option", {key: "country_" + e.id, value: e.id}, e.name)
            }))), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mt-10"}, l.a.createElement(H.a, {
                id: "carrier_id",
                className: "w-full",
                native: !0,
                value: K,
                onChange: function (e) {
                    V(e.target.value), C(G({}, _, Object(o.a)({}, "state_id", e.target.value)))
                }
            }, l.a.createElement("option", {
                value: "",
                disabled: !0
            }, "Seleccion\xe1 una provincia"), b && b.map(function (e) {
                return l.a.createElement("option", {key: "country_states_" + e.id, value: e.id}, e.name)
            }))), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mt-5 mb-3"}, l.a.createElement(D.a, {
                margin: "dense",
                id: "price",
                name: "price",
                label: "Precio",
                value: _ && _.price ? _.price : "",
                type: "text",
                fullWidth: !0,
                onChange: R
            })), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0  mb-3"}, l.a.createElement(D.a, {
                margin: "dense",
                id: "free_if_order_above",
                name: "free_if_order_above",
                label: "Gratis si la orden supera",
                value: _ && _.free_if_order_above ? _.free_if_order_above : "",
                type: "text",
                fullWidth: !0,
                onChange: R
            })), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mb-3"}, l.a.createElement(A.a, {
                control: l.a.createElement(W.a, {
                    onClick: function (e) {
                        e.stopPropagation()
                    }, name: "enabled_for_all_subitems", checked: !!_ && !!_.enabled_for_all_subitems, onChange: R
                }), label: "Habilitado para todas las ciudades", className: "w-full"
            })), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mb-3"}, l.a.createElement(A.a, {
                control: l.a.createElement(W.a, {
                    onClick: function (e) {
                        e.stopPropagation()
                    }, name: "enabled", checked: !!_ && !!_.enabled, onChange: R
                }), label: "Habilitado", className: "w-full"
            }))))), l.a.createElement(N.a, null, l.a.createElement(S.a, {
                onClick: X,
                color: "primary"
            }, "Cerrar"), l.a.createElement(S.a, {
                onClick: function () {
                    u(g.W(!0)), u(g.cb(_)), i()
                }, color: "primary"
            }, "Actualizar"))) : l.a.createElement(y.a, {
                open: c,
                onClose: X,
                "aria-labelledby": "form-dialog-title",
                fullWidth: !0
            }, l.a.createElement("div", {className: "flex flex-1 items-center justify-center h-full mt-32 mb-32"}, l.a.createElement(s.a, {
                color: "textSecondary",
                variant: "h5"
            }, "Cargando")))
        };

        function M(e, a) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                a && (r = r.filter(function (a) {
                    return Object.getOwnPropertyDescriptor(e, a).enumerable
                })), t.push.apply(t, r)
            }
            return t
        }

        function T(e) {
            for (var a = 1; a < arguments.length; a++) {
                var t = null != arguments[a] ? arguments[a] : {};
                a % 2 ? M(t, !0).forEach(function (a) {
                    Object(o.a)(e, a, t[a])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : M(t).forEach(function (a) {
                    Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(t, a))
                })
            }
            return e
        }

        var J = function (e) {
            var a = e.carrier_id, t = e.open, c = e.closeHandler, i = Object(E.b)(), u = Object(E.c)(function (e) {
                    return e.ShippingApp.carrier.carrierInfo
                }), f = Object(E.c)(function (e) {
                    return e.ShippingApp.state.stateCreateLoading
                }), m = Object(E.c)(function (e) {
                    return e.ShippingApp.state.countries
                }), d = Object(E.c)(function (e) {
                    return e.ShippingApp.state.country_states
                }), p = Object(P.a)(), b = Object(z.a)(p.breakpoints.down("sm")), v = l.a.useState({carrier_id: a}),
                h = Object(r.a)(v, 2), O = h[0], j = h[1], _ = l.a.useState(""), C = Object(r.a)(_, 2), k = C[0],
                F = C[1], G = l.a.useState(""), L = Object(r.a)(G, 2), M = L[0], J = L[1];
            Object(n.useEffect)(function () {
                a && (i(g.G(a)), i(g.K()))
            }, [a]), Object(n.useEffect)(function () {
                k && i(g.L(k))
            }, [k]);
            var K = function (e) {
                var a = e.target, t = a.name, r = a.value;
                "checkbox" !== e.target.type && "radio" !== e.target.type || (r = O && 1 === O[t] ? 0 : 1), j(T({}, O, Object(o.a)({}, t, r)))
            };

            function V() {
                c()
            }

            return !u || m && 0 === m.length || f ? l.a.createElement(y.a, {
                open: t,
                onClose: V,
                "aria-labelledby": "form-dialog-title",
                fullWidth: !0
            }, l.a.createElement("div", {className: "flex flex-1 items-center justify-center h-full mt-32 mb-32"}, l.a.createElement(s.a, {
                color: "textSecondary",
                variant: "h5"
            }, "Cargando"))) : l.a.createElement(y.a, {
                open: t,
                onClose: V,
                "aria-labelledby": "form-dialog-title",
                fullWidth: !0,
                fullScreen: b,
                maxWidth: "sm"
            }, l.a.createElement(x.a, {id: "form-dialog-title"}, "Agreg\xe1 una provincia a ", u.name), l.a.createElement(w.a, {className: "flex-col"}, l.a.createElement("div", {className: Object(I.a)("flex", "w-full")}, l.a.createElement("div", {className: "flex-col w-full"}, l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mb-3"}, l.a.createElement(H.a, {
                id: "country_id",
                className: "w-full",
                native: !0,
                value: k,
                onChange: function (e) {
                    F(e.target.value)
                }
            }, l.a.createElement("option", {
                value: "",
                disabled: !0
            }, "Seleccion\xe1 un pa\xeds"), m && m.map(function (e) {
                return l.a.createElement("option", {key: "country_" + e.id, value: e.id}, e.name)
            }))), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mt-10"}, l.a.createElement(H.a, {
                id: "carrier_id",
                className: "w-full",
                native: !0,
                value: M,
                onChange: function (e) {
                    J(e.target.value), j(T({}, O, Object(o.a)({}, "state_id", e.target.value)))
                }
            }, l.a.createElement("option", {
                value: "",
                disabled: !0
            }, "Seleccion\xe1 una provincia"), d && d.map(function (e) {
                return l.a.createElement("option", {key: "country_states_" + e.id, value: e.id}, e.name)
            }))), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mt-5 mb-3"}, l.a.createElement(D.a, {
                margin: "dense",
                id: "price",
                name: "price",
                label: "Precio",
                value: O && O.price ? O.price : "",
                type: "text",
                fullWidth: !0,
                onChange: K
            })), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mb-3"}, l.a.createElement(D.a, {
                margin: "dense",
                id: "free_if_order_above",
                name: "free_if_order_above",
                label: "Gratis si la orden supera",
                value: O && O.free_if_order_above ? O.free_if_order_above : "",
                type: "text",
                fullWidth: !0,
                onChange: K
            })), l.a.createElement("div", {className: "flex flex-row flex-1 flex-shrink-0 mb-3"}, l.a.createElement(A.a, {
                control: l.a.createElement(W.a, {
                    onClick: function (e) {
                        e.stopPropagation()
                    }, name: "enabled_for_all_subitems", checked: !!O && !!O.enabled_for_all_subitems, onChange: K
                }), label: "Habilitado para todas las ciudades", className: "w-full"
            }))))), l.a.createElement(N.a, null, l.a.createElement(S.a, {
                onClick: V,
                color: "primary"
            }, "Cerrar"), l.a.createElement(S.a, {
                onClick: function () {
                    i(g.V(!0)), i(g.F(O)), c()
                }, color: "primary"
            }, "Crear")))
        };
        a.default = Object(i.a)("ShippingApp", _.a)(function (e) {
            var a = Object(n.useRef)(null), t = Object(n.useState)(null), i = Object(r.a)(t, 2), o = i[0], s = i[1],
                u = Object(n.useState)(null), f = Object(r.a)(u, 2), d = f[0], p = f[1], E = Object(n.useState)(null),
                v = Object(r.a)(E, 2), g = v[0], h = v[1], O = l.a.useState(null), _ = Object(r.a)(O, 2), y = _[0],
                x = _[1], w = e.match.params.carrier_id;
            return y ? l.a.createElement(b.a, {to: y}) : l.a.createElement(l.a.Fragment, null, l.a.createElement(c.m, {
                classes: {
                    contentWrapper: "h-full",
                    content: "flex flex-col h-full",
                    header: "min-h-60 h-60",
                    toolbar: "hidden"
                },
                header: l.a.createElement("div", {className: "flex flex-1 items-center justify-between p-20"}, l.a.createElement("div", {className: "flex flex-col"}, l.a.createElement("h4", null, "Provincias")), l.a.createElement("div", null, l.a.createElement(S.a, {
                    className: "normal-case bg-blue-300 text-white mr-2",
                    variant: "contained",
                    onClick: function () {
                        x("/shipping/carriers")
                    }
                }, l.a.createElement(m.a, {className: "mr-4"}, "arrow_left"), "Volver"), l.a.createElement(S.a, {
                    className: "normal-case bg-green text-white",
                    variant: "contained",
                    onClick: function () {
                        return h(!0)
                    }
                }, l.a.createElement(m.a, {className: "mr-4"}, "add_circle_outline"), "Nueva"))),
                content: l.a.createElement(j, {
                    carrier_id: w, openDeleteAlertHandler: function (e) {
                        s(e)
                    }, openDetailModalHandler: function (e) {
                        p(e)
                    }
                }),
                contentToolbar: l.a.createElement("div", null, function () {
                    if (g) return l.a.createElement(J, {
                        carrier_id: w, open: !!g, closeHandler: function () {
                            h(null)
                        }
                    })
                }(), d ? l.a.createElement(L, {
                    carrier_id: w, item: d, open: !!d, closeHandler: function () {
                        p(null)
                    }
                }) : null, o ? l.a.createElement(k, {
                    item: o, open: !!o, closeHandler: function () {
                        s(null)
                    }
                }) : null),
                innerScroll: !0,
                sidebarInner: !0,
                ref: a
            }))
        })
    }
}]);