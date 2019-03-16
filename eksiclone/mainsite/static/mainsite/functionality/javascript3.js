(function (n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
})(function (n) {
    var r, u;
    n.ui = n.ui || {};
    var f = n.ui.version = "1.12.0", i = 0, t = Array.prototype.slice;
    n.cleanData = function (t) {
        return function (i) {
            for (var r, u, f = 0; (u = i[f]) != null; f++) try {
                r = n._data(u, "events");
                r && r.remove && n(u).triggerHandler("remove")
            } catch (e) {
            }
            t(i)
        }
    }(n.cleanData);
    n.widget = function (t, i, r) {
        var f, u, o, h = {}, e = t.split(".")[0], s;
        return t = t.split(".")[1], s = e + "-" + t, r || (r = i, i = n.Widget), n.isArray(r) && (r = n.extend.apply(null, [{}].concat(r))), n.expr[":"][s.toLowerCase()] = function (t) {
            return !!n.data(t, s)
        }, n[e] = n[e] || {}, f = n[e][t], u = n[e][t] = function (n, t) {
            if (!this._createWidget) return new u(n, t);
            arguments.length && this._createWidget(n, t)
        }, n.extend(u, f, {
            version: r.version,
            _proto: n.extend({}, r),
            _childConstructors: []
        }), o = new i, o.options = n.widget.extend({}, o.options), n.each(r, function (t, r) {
            if (!n.isFunction(r)) {
                h[t] = r;
                return
            }
            h[t] = function () {
                function n() {
                    return i.prototype[t].apply(this, arguments)
                }

                function u(n) {
                    return i.prototype[t].apply(this, n)
                }

                return function () {
                    var i = this._super, f = this._superApply, t;
                    return this._super = n, this._superApply = u, t = r.apply(this, arguments), this._super = i, this._superApply = f, t
                }
            }()
        }), u.prototype = n.widget.extend(o, {widgetEventPrefix: f ? o.widgetEventPrefix || t : t}, h, {
            constructor: u,
            namespace: e,
            widgetName: t,
            widgetFullName: s
        }), f ? (n.each(f._childConstructors, function (t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, u, i._proto)
        }), delete f._childConstructors) : i._childConstructors.push(u), n.widget.bridge(t, u), u
    };
    n.widget.extend = function (i) {
        for (var e = t.call(arguments, 1), f = 0, o = e.length, r, u; f < o; f++) for (r in e[f]) u = e[f][r], e[f].hasOwnProperty(r) && u !== undefined && (i[r] = n.isPlainObject(u) ? n.isPlainObject(i[r]) ? n.widget.extend({}, i[r], u) : n.widget.extend({}, u) : u);
        return i
    };
    n.widget.bridge = function (i, r) {
        var u = r.prototype.widgetFullName || i;
        n.fn[i] = function (f) {
            var s = typeof f == "string", o = t.call(arguments, 1), e = this;
            return s ? this.each(function () {
                var t, r = n.data(this, u);
                return f === "instance" ? (e = r, !1) : r ? !n.isFunction(r[f]) || f.charAt(0) === "_" ? n.error("no such method '" + f + "' for " + i + " widget instance") : (t = r[f].apply(r, o), t !== r && t !== undefined ? (e = t && t.jquery ? e.pushStack(t.get()) : t, !1) : void 0) : n.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + f + "'")
            }) : (o.length && (f = n.widget.extend.apply(null, [f].concat(o))), this.each(function () {
                var t = n.data(this, u);
                t ? (t.option(f || {}), t._init && t._init()) : n.data(this, u, new r(f, this))
            })), e
        }
    };
    n.Widget = function () {
    };
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {classes: {}, disabled: !1, create: null},
        _createWidget: function (t, r) {
            r = n(r || this.defaultElement || this)[0];
            this.element = n(r);
            this.uuid = i++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            this.classesElementLookup = {};
            r !== this && (n.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (n) {
                    n.target === r && this.destroy()
                }
            }), this.document = n(r.style ? r.ownerDocument : r.document || r), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this._create();
            this.options.disabled && this._setOptionDisabled(this.options.disabled);
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: function () {
            return {}
        },
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function () {
            var t = this;
            this._destroy();
            n.each(this.classesElementLookup, function (n, i) {
                t._removeClass(i, n)
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace)
        },
        _destroy: n.noop,
        widget: function () {
            return this.element
        },
        option: function (t, i) {
            var e = t, r, u, f;
            if (arguments.length === 0) return n.widget.extend({}, this.options);
            if (typeof t == "string") if (e = {}, r = t.split("."), t = r.shift(), r.length) {
                for (u = e[t] = n.widget.extend({}, this.options[t]), f = 0; f < r.length - 1; f++) u[r[f]] = u[r[f]] || {}, u = u[r[f]];
                if (t = r.pop(), arguments.length === 1) return u[t] === undefined ? null : u[t];
                u[t] = i
            } else {
                if (arguments.length === 1) return this.options[t] === undefined ? null : this.options[t];
                e[t] = i
            }
            return this._setOptions(e), this
        },
        _setOptions: function (n) {
            for (var t in n) this._setOption(t, n[t]);
            return this
        },
        _setOption: function (n, t) {
            return n === "classes" && this._setOptionClasses(t), this.options[n] = t, n === "disabled" && this._setOptionDisabled(t), this
        },
        _setOptionClasses: function (t) {
            var i, u, r;
            for (i in t) (r = this.classesElementLookup[i], t[i] !== this.options.classes[i] && r && r.length) && (u = n(r.get()), this._removeClass(r, i), u.addClass(this._classes({
                element: u,
                keys: i,
                classes: t,
                add: !0
            })))
        },
        _setOptionDisabled: function (n) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!n);
            n && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function () {
            return this._setOptions({disabled: !1})
        },
        disable: function () {
            return this._setOptions({disabled: !0})
        },
        _classes: function (t) {
            function u(u, f) {
                for (var o, e = 0; e < u.length; e++) o = r.classesElementLookup[u[e]] || n(), o = t.add ? n(n.unique(o.get().concat(t.element.get()))) : n(o.not(t.element).get()), r.classesElementLookup[u[e]] = o, i.push(u[e]), f && t.classes[u[e]] && i.push(t.classes[u[e]])
            }

            var i = [], r = this;
            return t = n.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, t), t.keys && u(t.keys.match(/\S+/g) || [], !0), t.extra && u(t.extra.match(/\S+/g) || []), i.join(" ")
        },
        _removeClass: function (n, t, i) {
            return this._toggleClass(n, t, i, !1)
        },
        _addClass: function (n, t, i) {
            return this._toggleClass(n, t, i, !0)
        },
        _toggleClass: function (n, t, i, r) {
            r = typeof r == "boolean" ? r : i;
            var u = typeof n == "string" || n === null,
                f = {extra: u ? t : i, keys: u ? n : t, element: u ? this.element : n, add: r};
            return f.element.toggleClass(this._classes(f), r), this
        },
        _on: function (t, i, r) {
            var f, u = this;
            typeof t != "boolean" && (r = i, i = t, t = !1);
            r ? (i = f = n(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, f = this.widget());
            n.each(r, function (r, e) {
                function o() {
                    if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled")) return (typeof e == "string" ? u[e] : e).apply(u, arguments)
                }

                typeof e != "string" && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                var s = r.match(/^([\w:-]*)\s*(.*)$/), h = s[1] + u.eventNamespace, c = s[2];
                if (c) f.on(h, c, o); else i.on(h, o)
            })
        },
        _off: function (t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            t.off(i).off(i);
            this.bindings = n(this.bindings.not(t).get());
            this.focusable = n(this.focusable.not(t).get());
            this.hoverable = n(this.hoverable.not(t).get())
        },
        _delay: function (n, t) {
            function r() {
                return (typeof n == "string" ? i[n] : n).apply(i, arguments)
            }

            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function (t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function (t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-hover")
                }, mouseleave: function (t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function (t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function (t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-focus")
                }, focusout: function (t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function (t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent, f) for (u in f) u in i || (i[u] = f[u]);
            return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({show: "fadeIn", hide: "fadeOut"}, function (t, i) {
        n.Widget.prototype["_" + t] = function (r, u, f) {
            typeof u == "string" && (u = {effect: u});
            var o, e = u ? u === !0 || typeof u == "number" ? i : u.effect || i : t;
            u = u || {};
            typeof u == "number" && (u = {duration: u});
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function (i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    });
    r = n.widget, function () {
        function a(n, t, i) {
            return [parseFloat(n[0]) * (l.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (l.test(n[1]) ? i / 100 : 1)]
        }

        function r(t, i) {
            return parseInt(n.css(t, i), 10) || 0
        }

        function y(t) {
            var i = t[0];
            return i.nodeType === 9 ? {
                width: t.width(),
                height: t.height(),
                offset: {top: 0, left: 0}
            } : n.isWindow(i) ? {
                width: t.width(),
                height: t.height(),
                offset: {top: t.scrollTop(), left: t.scrollLeft()}
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {top: i.pageY, left: i.pageX}
            } : {width: t.outerWidth(), height: t.outerHeight(), offset: t.offset()}
        }

        var u, f, i = Math.max, t = Math.abs, e = Math.round, o = /left|center|right/, s = /top|center|bottom/,
            h = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, l = /%$/, v = n.fn.position;
        f = function () {
            var t = n("<div>").css("position", "absolute").appendTo("body").offset({top: 1.5, left: 1.5}),
                i = t.offset().top === 1.5;
            return t.remove(), f = function () {
                return i
            }, i
        };
        n.position = {
            scrollbarWidth: function () {
                if (u !== undefined) return u;
                var r, i,
                    t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                    f = t.children()[0];
                return n("body").append(t), r = f.offsetWidth, t.css("overflow", "scroll"), i = f.offsetWidth, r === i && (i = t[0].clientWidth), t.remove(), u = r - i
            }, getScrollInfo: function (t) {
                var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                    r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                    u = i === "scroll" || i === "auto" && t.width < t.element[0].scrollWidth,
                    f = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
                return {width: f ? n.position.scrollbarWidth() : 0, height: u ? n.position.scrollbarWidth() : 0}
            }, getWithinInfo: function (t) {
                var i = n(t || window), r = n.isWindow(i[0]), u = !!i[0] && i[0].nodeType === 9, f = !r && !u;
                return {
                    element: i,
                    isWindow: r,
                    isDocument: u,
                    offset: f ? n(t).offset() : {left: 0, top: 0},
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: i.outerWidth(),
                    height: i.outerHeight()
                }
            }
        };
        n.fn.position = function (u) {
            if (!u || !u.of) return v.apply(this, arguments);
            u = n.extend({}, u);
            var k, l, p, b, w, g, nt = n(u.of), it = n.position.getWithinInfo(u.within),
                rt = n.position.getScrollInfo(it), d = (u.collision || "flip").split(" "), tt = {};
            return g = y(nt), nt[0].preventDefault && (u.at = "left top"), l = g.width, p = g.height, b = g.offset, w = n.extend({}, b), n.each(["my", "at"], function () {
                var n = (u[this] || "").split(" "), t, i;
                n.length === 1 && (n = o.test(n[0]) ? n.concat(["center"]) : s.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
                n[0] = o.test(n[0]) ? n[0] : "center";
                n[1] = s.test(n[1]) ? n[1] : "center";
                t = h.exec(n[0]);
                i = h.exec(n[1]);
                tt[this] = [t ? t[0] : 0, i ? i[0] : 0];
                u[this] = [c.exec(n[0])[0], c.exec(n[1])[0]]
            }), d.length === 1 && (d[1] = d[0]), u.at[0] === "right" ? w.left += l : u.at[0] === "center" && (w.left += l / 2), u.at[1] === "bottom" ? w.top += p : u.at[1] === "center" && (w.top += p / 2), k = a(tt.at, l, p), w.left += k[0], w.top += k[1], this.each(function () {
                var y, g, s = n(this), h = s.outerWidth(), c = s.outerHeight(), ut = r(this, "marginLeft"),
                    ft = r(this, "marginTop"), et = h + ut + r(this, "marginRight") + rt.width,
                    ot = c + ft + r(this, "marginBottom") + rt.height, o = n.extend({}, w),
                    v = a(tt.my, s.outerWidth(), s.outerHeight());
                u.my[0] === "right" ? o.left -= h : u.my[0] === "center" && (o.left -= h / 2);
                u.my[1] === "bottom" ? o.top -= c : u.my[1] === "center" && (o.top -= c / 2);
                o.left += v[0];
                o.top += v[1];
                f() || (o.left = e(o.left), o.top = e(o.top));
                y = {marginLeft: ut, marginTop: ft};
                n.each(["left", "top"], function (t, i) {
                    n.ui.position[d[t]] && n.ui.position[d[t]][i](o, {
                        targetWidth: l,
                        targetHeight: p,
                        elemWidth: h,
                        elemHeight: c,
                        collisionPosition: y,
                        collisionWidth: et,
                        collisionHeight: ot,
                        offset: [k[0] + v[0], k[1] + v[1]],
                        my: u.my,
                        at: u.at,
                        within: it,
                        elem: s
                    })
                });
                u.using && (g = function (n) {
                    var r = b.left - o.left, a = r + l - h, f = b.top - o.top, v = f + p - c, e = {
                        target: {element: nt, left: b.left, top: b.top, width: l, height: p},
                        element: {element: s, left: o.left, top: o.top, width: h, height: c},
                        horizontal: a < 0 ? "left" : r > 0 ? "right" : "center",
                        vertical: v < 0 ? "top" : f > 0 ? "bottom" : "middle"
                    };
                    l < h && t(r + a) < l && (e.horizontal = "center");
                    p < c && t(f + v) < p && (e.vertical = "middle");
                    e.important = i(t(r), t(a)) > i(t(f), t(v)) ? "horizontal" : "vertical";
                    u.using.call(this, n, e)
                });
                s.offset(n.extend(o, {using: g}))
            })
        };
        n.ui.position = {
            fit: {
                left: function (n, t) {
                    var e = t.within, u = e.isWindow ? e.scrollLeft : e.offset.left, o = e.width,
                        s = n.left - t.collisionPosition.marginLeft, r = u - s, f = s + t.collisionWidth - o - u, h;
                    t.collisionWidth > o ? r > 0 && f <= 0 ? (h = n.left + r + t.collisionWidth - o - u, n.left += r - h) : n.left = f > 0 && r <= 0 ? u : r > f ? u + o - t.collisionWidth : u : r > 0 ? n.left += r : f > 0 ? n.left -= f : n.left = i(n.left - s, n.left)
                }, top: function (n, t) {
                    var o = t.within, u = o.isWindow ? o.scrollTop : o.offset.top, e = t.within.height,
                        s = n.top - t.collisionPosition.marginTop, r = u - s, f = s + t.collisionHeight - e - u, h;
                    t.collisionHeight > e ? r > 0 && f <= 0 ? (h = n.top + r + t.collisionHeight - e - u, n.top += r - h) : n.top = f > 0 && r <= 0 ? u : r > f ? u + e - t.collisionHeight : u : r > 0 ? n.top += r : f > 0 ? n.top -= f : n.top = i(n.top - s, n.top)
                }
            }, flip: {
                left: function (n, i) {
                    var r = i.within, y = r.offset.left + r.scrollLeft, c = r.width,
                        o = r.isWindow ? r.scrollLeft : r.offset.left, l = n.left - i.collisionPosition.marginLeft,
                        a = l - o, v = l + i.collisionWidth - c - o,
                        u = i.my[0] === "left" ? -i.elemWidth : i.my[0] === "right" ? i.elemWidth : 0,
                        f = i.at[0] === "left" ? i.targetWidth : i.at[0] === "right" ? -i.targetWidth : 0,
                        e = -2 * i.offset[0], s, h;
                    a < 0 ? (s = n.left + u + f + e + i.collisionWidth - c - y, (s < 0 || s < t(a)) && (n.left += u + f + e)) : v > 0 && (h = n.left - i.collisionPosition.marginLeft + u + f + e - o, (h > 0 || t(h) < v) && (n.left += u + f + e))
                }, top: function (n, i) {
                    var r = i.within, y = r.offset.top + r.scrollTop, c = r.height,
                        o = r.isWindow ? r.scrollTop : r.offset.top, l = n.top - i.collisionPosition.marginTop,
                        a = l - o, v = l + i.collisionHeight - c - o, p = i.my[1] === "top",
                        u = p ? -i.elemHeight : i.my[1] === "bottom" ? i.elemHeight : 0,
                        f = i.at[1] === "top" ? i.targetHeight : i.at[1] === "bottom" ? -i.targetHeight : 0,
                        e = -2 * i.offset[1], s, h;
                    a < 0 ? (h = n.top + u + f + e + i.collisionHeight - c - y, (h < 0 || h < t(a)) && (n.top += u + f + e)) : v > 0 && (s = n.top - i.collisionPosition.marginTop + u + f + e - o, (s > 0 || t(s) < v) && (n.top += u + f + e))
                }
            }, flipfit: {
                left: function () {
                    n.ui.position.flip.left.apply(this, arguments);
                    n.ui.position.fit.left.apply(this, arguments)
                }, top: function () {
                    n.ui.position.flip.top.apply(this, arguments);
                    n.ui.position.fit.top.apply(this, arguments)
                }
            }
        }
    }();
    var e = n.ui.position, o = n.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }, s = n.fn.extend({
        uniqueId: function () {
            var n = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++n)
                })
            }
        }(), removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
            })
        }
    }), h = n.ui.safeActiveElement = function (n) {
        var t;
        try {
            t = n.activeElement
        } catch (i) {
            t = n.body
        }
        return t || (t = n.body), t.nodeName || (t = n.body), t
    }, c = n.widget("ui.menu", {
        version: "1.12.0",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {submenu: "ui-icon-caret-1-e"},
            items: "> *",
            menus: "ul",
            position: {my: "left top", at: "right top"},
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().attr({role: this.options.role, tabIndex: 0});
            this._addClass("ui-menu", "ui-widget ui-widget-content");
            this._on({
                "mousedown .ui-menu-item": function (n) {
                    n.preventDefault()
                }, "click .ui-menu-item": function (t) {
                    var i = n(t.target), r = n(n.ui.safeActiveElement(this.document[0]));
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && r.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
                }, "mouseenter .ui-menu-item": function (t) {
                    if (!this.previousFilter) {
                        var r = n(t.target).closest(".ui-menu-item"), i = n(t.currentTarget);
                        r[0] === i[0] && (this._removeClass(i.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(t, i))
                    }
                }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (n, t) {
                    var i = this.active || this.element.find(this.options.items).eq(0);
                    t || this.focus(n, i)
                }, blur: function (t) {
                    this._delay(function () {
                        var i = !n.contains(this.element[0], n.ui.safeActiveElement(this.document[0]));
                        i && this.collapseAll(t)
                    })
                }, keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function (n) {
                    this._closeOnDocumentClick(n) && this.collapseAll(n);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function () {
            var t = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                i = t.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show();
            i.children().each(function () {
                var t = n(this);
                t.data("ui-menu-submenu-caret") && t.remove()
            })
        },
        _keydown: function (t) {
            var i, u, r, f, e = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    e = !1;
                    u = this.previousFilter || "";
                    r = String.fromCharCode(t.keyCode);
                    f = !1;
                    clearTimeout(this.filterTimer);
                    r === u ? f = !0 : r = u + r;
                    i = this._filterMenuItems(r);
                    i = f && i.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : i;
                    i.length || (r = String.fromCharCode(t.keyCode), i = this._filterMenuItems(r));
                    i.length ? (this.focus(t, i), this.previousFilter = r, this.filterTimer = this._delay(function () {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter
            }
            e && t.preventDefault()
        },
        _activate: function (n) {
            this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
        },
        refresh: function () {
            var u, t, f, i, e, r = this, s = this.options.icons.submenu, o = this.element.find(this.options.menus);
            this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length);
            f = o.filter(":not(.ui-menu)").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var t = n(this), i = t.prev(), u = n("<span>").data("ui-menu-submenu-caret", !0);
                r._addClass(u, "ui-menu-icon", "ui-icon " + s);
                i.attr("aria-haspopup", "true").prepend(u);
                t.attr("aria-labelledby", i.attr("id"))
            });
            this._addClass(f, "ui-menu", "ui-widget ui-widget-content ui-front");
            u = o.add(this.element);
            t = u.find(this.options.items);
            t.not(".ui-menu-item").each(function () {
                var t = n(this);
                r._isDivider(t) && r._addClass(t, "ui-menu-divider", "ui-widget-content")
            });
            i = t.not(".ui-menu-item, .ui-menu-divider");
            e = i.children().not(".ui-menu").uniqueId().attr({tabIndex: -1, role: this._itemRole()});
            this._addClass(i, "ui-menu-item")._addClass(e, "ui-menu-item-wrapper");
            t.filter(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {menu: "menuitem", listbox: "option"}[this.options.role]
        },
        _setOption: function (n, t) {
            if (n === "icons") {
                var i = this.element.find(".ui-menu-icon");
                this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, t.submenu)
            }
            this._super(n, t)
        },
        _setOptionDisabled: function (n) {
            this._super(n);
            this.element.attr("aria-disabled", String(n));
            this._toggleClass(null, "ui-state-disabled", !!n)
        },
        focus: function (n, t) {
            var i, r, u;
            this.blur(n, n && n.type === "focus");
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children(".ui-menu-item-wrapper");
            this._addClass(r, null, "ui-state-active");
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
            u = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper");
            this._addClass(u, null, "ui-state-active");
            n && n.type === "keydown" ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay);
            i = t.children(".ui-menu");
            i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, {item: t})
        },
        _scrollIntoView: function (t) {
            var e, o, i, r, u, f;
            this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.outerHeight(), i < 0 ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
        },
        blur: function (n, t) {
            (t || clearTimeout(this.timer), this.active) && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", n, {item: this.active}), this.active = null)
        },
        _startOpening: function (n) {
            (clearTimeout(this.timer), n.attr("aria-hidden") === "true") && (this.timer = this._delay(function () {
                this._close();
                this._open(n)
            }, this.delay))
        },
        _open: function (t) {
            var i = n.extend({of: this.active}, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function (t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this._removeClass(r.find(".ui-state-active"), null, "ui-state-active");
                this.activeMenu = r
            }, this.delay)
        },
        _close: function (n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
        },
        _closeOnDocumentClick: function (t) {
            return !n(t.target).closest(".ui-menu").length
        },
        _isDivider: function (n) {
            return !/[^\-\u2014\u2013\s]/.test(n.text())
        },
        collapse: function (n) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t))
        },
        expand: function (n) {
            var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            t && t.length && (this._open(t.parent()), this._delay(function () {
                this.focus(n, t)
            }))
        },
        next: function (n) {
            this._move("next", "first", n)
        },
        previous: function (n) {
            this._move("prev", "last", n)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (n, t, i) {
            var r;
            this.active && (r = n === "first" || n === "last" ? this.active[n === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
            r && r.length && this.active || (r = this.activeMenu.find(this.options.items)[t]());
            this.focus(i, r)
        },
        nextPage: function (t) {
            var i, r, u;
            if (!this.active) {
                this.next(t);
                return
            }
            this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return i = n(this), i.offset().top - r - u < 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
        },
        previousPage: function (t) {
            var i, r, u;
            if (!this.active) {
                this.next(t);
                return
            }
            this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return i = n(this), i.offset().top - r + u > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first()))
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = {item: this.active};
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i)
        },
        _filterMenuItems: function (t) {
            var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), r = new RegExp("^" + i, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                return r.test(n.trim(n(this).children(".ui-menu-item-wrapper").text()))
            })
        }
    });
    n.widget("ui.autocomplete", {
        version: "1.12.0",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var t, i, r, u = this.element[0].nodeName.toLowerCase(), f = u === "textarea", e = u === "input";
            this.isMultiLine = f || !e && this._isContentEditable(this.element);
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this._addClass("ui-autocomplete-input");
            this.element.attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function (u) {
                    if (this.element.prop("readOnly")) {
                        t = !0;
                        r = !0;
                        i = !0;
                        return
                    }
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                            this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(u), u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u)
                    }
                }, keypress: function (r) {
                    if (t) {
                        t = !1;
                        (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault();
                        return
                    }
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                        }
                    }
                }, input: function (n) {
                    if (r) {
                        r = !1;
                        n.preventDefault();
                        return
                    }
                    this._searchTimeout(n)
                }, focus: function () {
                    this.selectedItem = null;
                    this.previous = this._value()
                }, blur: function (n) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching);
                    this.close(n);
                    this._change(n)
                }
            });
            this._initSource();
            this.menu = n("<ul>").appendTo(this._appendTo()).menu({role: null}).hide().menu("instance");
            this._addClass(this.menu.element, "ui-autocomplete", "ui-front");
            this._on(this.menu.element, {
                mousedown: function (t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function () {
                        delete this.cancelBlur;
                        this.element[0] !== n.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
                    })
                }, menufocus: function (t, i) {
                    var r, u;
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) {
                        this.menu.blur();
                        this.document.one("mousemove", function () {
                            n(t.target).trigger(t.originalEvent)
                        });
                        return
                    }
                    u = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {item: u}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(u.value);
                    r = i.item.attr("aria-label") || u.value;
                    r && n.trim(r).length && (this.liveRegion.children().hide(), n("<div>").text(r).appendTo(this.liveRegion))
                }, menuselect: function (t, i) {
                    var r = i.item.data("ui-autocomplete-item"), u = this.previous;
                    this.element[0] !== n.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = u, this._delay(function () {
                        this.previous = u;
                        this.selectedItem = r
                    }));
                    !1 !== this._trigger("select", t, {item: r}) && this._value(r.value);
                    this.term = this._value();
                    this.close(t);
                    this.selectedItem = r
                }
            });
            this.liveRegion = n("<div>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body);
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching);
            this.element.removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function (n, t) {
            this._super(n, t);
            n === "source" && this._initSource();
            n === "appendTo" && this.menu.element.appendTo(this._appendTo());
            n === "disabled" && t && this.xhr && this.xhr.abort()
        },
        _isEventTargetInWidget: function (t) {
            var i = this.menu.element[0];
            return t.target === this.element[0] || t.target === i || n.contains(i, t.target)
        },
        _closeOnClickOutside: function (n) {
            this._isEventTargetInWidget(n) || this.close()
        },
        _appendTo: function () {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t
        },
        _initSource: function () {
            var i, r, t = this;
            n.isArray(this.options.source) ? (i = this.options.source, this.source = function (t, r) {
                r(n.ui.autocomplete.filter(i, t.term))
            }) : typeof this.options.source == "string" ? (r = this.options.source, this.source = function (i, u) {
                t.xhr && t.xhr.abort();
                t.xhr = n.ajax({
                    url: r, data: i, dataType: "json", success: function (n) {
                        u(n)
                    }, error: function () {
                        u([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function () {
                var t = this.term === this._value(), i = this.menu.element.is(":visible"),
                    r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
                t && (!t || i || r) || (this.selectedItem = null, this.search(null, n))
            }, this.options.delay)
        },
        search: function (n, t) {
            return (n = n != null ? n : this._value(), this.term = this._value(), n.length < this.options.minLength) ? this.close(t) : this._trigger("search", t) === !1 ? void 0 : this._search(n)
        },
        _search: function (n) {
            this.pending++;
            this._addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({term: n}, this._response())
        },
        _response: function () {
            var t = ++this.requestIndex;
            return n.proxy(function (n) {
                t === this.requestIndex && this.__response(n);
                this.pending--;
                this.pending || this._removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function (n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, {content: n});
            !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
        },
        close: function (n) {
            this.cancelSearch = !0;
            this._close(n)
        },
        _close: function (n) {
            this._off(this.document, "mousedown");
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
        },
        _change: function (n) {
            this.previous !== this._value() && this._trigger("change", n, {item: this.selectedItem})
        },
        _normalize: function (t) {
            return t.length && t[0].label && t[0].value ? t : n.map(t, function (t) {
                return typeof t == "string" ? {label: t, value: t} : n.extend({}, t, {
                    label: t.label || t.value,
                    value: t.value || t.label
                })
            })
        },
        _suggest: function (t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({of: this.element}, this.options.position));
            this.options.autoFocus && this.menu.next();
            this._on(this.document, {mousedown: "_closeOnClickOutside"})
        },
        _resizeMenu: function () {
            var n = this.menu.element;
            n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (t, i) {
            var r = this;
            n.each(i, function (n, i) {
                r._renderItemData(t, i)
            })
        },
        _renderItemData: function (n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function (t, i) {
            return n("<li>").append(n("<div>").text(i.label)).appendTo(t)
        },
        _move: function (n, t) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, t);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n)) {
                this.isMultiLine || this._value(this.term);
                this.menu.blur();
                return
            }
            this.menu[n](t)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
        },
        _isContentEditable: function (n) {
            if (!n.length) return !1;
            var t = n.prop("contentEditable");
            return t === "inherit" ? this._isContentEditable(n.parent()) : t === "true"
        }
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function (n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }, filter: function (t, i) {
            var r = new RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function (n) {
                return r.test(n.label || n.value || n)
            })
        }
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (n) {
                    return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        }, __response: function (t) {
            var i;
            (this._superApply(arguments), this.options.disabled || this.cancelSearch) || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), n("<div>").text(i).appendTo(this.liveRegion))
        }
    });
    u = n.ui.autocomplete
}), function (n) {
    function i(n, t) {
        for (var i = window, r = (n || "").split("."); i && r.length;) i = i[r.shift()];
        return typeof i == "function" ? i : (t.push(n), Function.constructor.apply(null, t))
    }

    function u(n) {
        return n === "GET" || n === "POST"
    }

    function o(n, t) {
        u(t) || n.setRequestHeader("X-HTTP-Method-Override", t)
    }

    function s(t, i, r) {
        var u;
        r.indexOf("application/x-javascript") === -1 && (u = (t.getAttribute("data-ajax-mode") || "").toUpperCase(), n(t.getAttribute("data-ajax-update")).each(function (t, r) {
            var f;
            switch (u) {
                case"BEFORE":
                    f = r.firstChild;
                    n("<div />").html(i).contents().each(function () {
                        r.insertBefore(this, f)
                    });
                    break;
                case"AFTER":
                    n("<div />").html(i).contents().each(function () {
                        r.appendChild(this)
                    });
                    break;
                case"REPLACE-WITH":
                    n(r).replaceWith(i);
                    break;
                default:
                    n(r).html(i)
            }
        }))
    }

    function f(t, r) {
        var e, h, f, c;
        (e = t.getAttribute("data-ajax-confirm"), !e || window.confirm(e)) && (h = n(t.getAttribute("data-ajax-loading")), c = parseInt(t.getAttribute("data-ajax-loading-duration"), 10) || 0, n.extend(r, {
            type: t.getAttribute("data-ajax-method") || undefined,
            url: t.getAttribute("data-ajax-url") || undefined,
            cache: !!t.getAttribute("data-ajax-cache"),
            beforeSend: function (n) {
                var r;
                return o(n, f), r = i(t.getAttribute("data-ajax-begin"), ["xhr"]).apply(t, arguments), r !== !1 && h.show(c), r
            },
            complete: function () {
                h.hide(c);
                i(t.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(t, arguments)
            },
            success: function (n, r, u) {
                s(t, n, u.getResponseHeader("Content-Type") || "text/html");
                i(t.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(t, arguments)
            },
            error: function () {
                i(t.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(t, arguments)
            }
        }), r.data.push({
            name: "X-Requested-With",
            value: "XMLHttpRequest"
        }), f = r.type.toUpperCase(), u(f) || (r.type = "POST", r.data.push({
            name: "X-HTTP-Method-Override",
            value: f
        })), n.ajax(r))
    }

    function h(t) {
        var i = n(t).data(e);
        return !i || !i.validate || i.validate()
    }

    var t = "unobtrusiveAjaxClick", r = "unobtrusiveAjaxClickTarget", e = "unobtrusiveValidation";
    n(document).on("click", "a[data-ajax=true]", function (n) {
        n.preventDefault();
        f(this, {url: this.href, type: "GET", data: []})
    });
    n(document).on("click", "form[data-ajax=true] input[type=image]", function (i) {
        var r = i.target.name, u = n(i.target), f = n(u.parents("form")[0]), e = u.offset();
        f.data(t, [{name: r + ".x", value: Math.round(i.pageX - e.left)}, {
            name: r + ".y",
            value: Math.round(i.pageY - e.top)
        }]);
        setTimeout(function () {
            f.removeData(t)
        }, 0)
    });
    n(document).on("click", "form[data-ajax=true] :submit", function (i) {
        var f = i.currentTarget.name, e = n(i.target), u = n(e.parents("form")[0]);
        u.data(t, f ? [{name: f, value: i.currentTarget.value}] : []);
        u.data(r, e);
        setTimeout(function () {
            u.removeData(t);
            u.removeData(r)
        }, 0)
    });
    n(document).on("submit", "form[data-ajax=true]", function (i) {
        var e = n(this).data(t) || [], u = n(this).data(r), o = u && u.hasClass("cancel");
        (i.preventDefault(), o || h(this)) && f(this, {
            url: this.action,
            type: this.method || "GET",
            data: e.concat(n(this).serializeArray())
        })
    })
}(jQuery), function (n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof module == "object" && module.exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function (n) {
    n.extend(n.fn, {
        validate: function (t) {
            if (!this.length) {
                t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
                return
            }
            var i = n.data(this[0], "validator");
            if (i) return i;
            if (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit) {
                this.on("click.validate", ":submit", function (t) {
                    i.settings.submitHandler && (i.submitButton = t.target);
                    n(this).hasClass("cancel") && (i.cancelSubmit = !0);
                    n(this).attr("formnovalidate") !== undefined && (i.cancelSubmit = !0)
                });
                this.on("submit.validate", function (t) {
                    function r() {
                        var u, r;
                        return i.settings.submitHandler ? (i.submitButton && (u = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), r = i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && u.remove(), r !== undefined) ? r : !1 : !0
                    }

                    return (i.settings.debug && t.preventDefault(), i.cancelSubmit) ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
                })
            }
            return i
        }, valid: function () {
            var t, i, r;
            return n(this[0]).is("form") ? t = this.validate().form() : (r = [], t = !0, i = n(this[0].form).validate(), this.each(function () {
                t = i.element(this) && t;
                t || (r = r.concat(i.errorList))
            }), i.errorList = r), t
        }, rules: function (t, i) {
            var r = this[0], e, s, f, u, o, h;
            if (r != null && r.form != null) {
                if (t) {
                    e = n.data(r.form, "validator").settings;
                    s = e.rules;
                    f = n.validator.staticRules(r);
                    switch (t) {
                        case"add":
                            n.extend(f, n.validator.normalizeRule(i));
                            delete f.messages;
                            s[r.name] = f;
                            i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                            break;
                        case"remove":
                            return i ? (h = {}, n.each(i.split(/\s/), function (t, i) {
                                h[i] = f[i];
                                delete f[i];
                                i === "required" && n(r).removeAttr("aria-required")
                            }), h) : (delete s[r.name], f)
                    }
                }
                return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (o = u.required, delete u.required, u = n.extend({required: o}, u), n(r).attr("aria-required", "true")), u.remote && (o = u.remote, delete u.remote, u = n.extend(u, {remote: o})), u
            }
        }
    });
    n.extend(n.expr[":"], {
        blank: function (t) {
            return !n.trim("" + n(t).val())
        }, filled: function (t) {
            var i = n(t).val();
            return i !== null && !!n.trim("" + i)
        }, unchecked: function (t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function (t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    };
    n.validator.format = function (t, i) {
        return arguments.length === 1 ? function () {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : i === undefined ? t : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function (n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function () {
                return i
            })
        }), t)
    };
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (n) {
                this.lastActive = n;
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(n)))
            },
            onfocusout: function (n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function (t, i) {
                (i.which !== 9 || this.elementValue(t) !== "") && n.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) === -1 && (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function (n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function (t, i, r) {
                t.type === "radio" ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function (t, i, r) {
                t.type === "radio" ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function (t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}."),
            step: n.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function i(t) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = n(this).closest("form")[0]);
                    var r = n.data(this.form, "validator"), u = "on" + t.type.replace(/^validate/, ""), i = r.settings;
                    i[u] && !n(this).is(i.ignore) && i[u].call(r, this, t)
                }

                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var r = this.groups = {}, t;
                n.each(this.settings.groups, function (t, i) {
                    typeof i == "string" && (i = i.split(/\s/));
                    n.each(i, function (n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function (i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", i).on("click.validate", "select, option, [type='radio'], [type='checkbox']", i);
                if (this.settings.invalidHandler) n(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                n(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }, form: function () {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function () {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            }, element: function (t) {
                var i = this.clean(t), r = this.validationTargetFor(i), u = this, f = !0, e, o;
                return r === undefined ? delete this.invalid[i.name] : (this.prepareElement(r), this.currentElements = n(r), o = this.groups[r.name], o && n.each(this.groups, function (n, t) {
                    t === o && n !== r.name && (i = u.validationTargetFor(u.clean(u.findByName(n))), i && i.name in u.invalid && (u.currentElements.push(i), f = u.check(i) && f))
                }), e = this.check(r) !== !1, f = f && e, this.invalid[r.name] = e ? !1 : !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n(t).attr("aria-invalid", !e)), f
            }, showErrors: function (t) {
                if (t) {
                    var i = this;
                    n.extend(this.errorMap, t);
                    this.errorList = n.map(this.errorMap, function (n, t) {
                        return {message: n, element: i.findByName(t)[0]}
                    });
                    this.successList = n.grep(this.successList, function (n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            }, resetElements: function (n) {
                var t;
                if (this.settings.unhighlight) for (t = 0; n[t]; t++) this.settings.unhighlight.call(this, n[t], this.settings.errorClass, ""), this.findByName(n[t].name).removeClass(this.settings.validClass); else n.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }, objectLength: function (n) {
                var t = 0;
                for (var i in n) n[i] && t++;
                return t
            }, hideErrors: function () {
                this.hideThese(this.toHide)
            }, hideThese: function (n) {
                n.not(this.containers).text("");
                this.addWrapper(n).hide()
            }, valid: function () {
                return this.size() === 0
            }, size: function () {
                return this.errorList.length
            }, focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {
                }
            }, findLastActive: function () {
                var t = this.lastActive;
                return t && n.grep(this.errorList, function (n) {
                    return n.element.name === t.name
                }).length === 1 && t
            }, elements: function () {
                var t = this, i = {};
                return n(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    var r = this.name || n(this).attr("name");
                    return (!r && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = n(this).closest("form")[0]), r in i || !t.objectLength(n(this).rules())) ? !1 : (i[r] = !0, !0)
                })
            }, clean: function (t) {
                return n(t)[0]
            }, errors: function () {
                var t = this.settings.errorClass.split(" ").join(".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            }, resetInternals: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([])
            }, reset: function () {
                this.resetInternals();
                this.currentElements = n([])
            }, prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            }, prepareElement: function (n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            }, elementValue: function (t) {
                var f = n(t), u = t.type, i, r;
                return u === "radio" || u === "checkbox" ? this.findByName(t.name).filter(":checked").val() : u === "number" && typeof t.validity != "undefined" ? t.validity.badInput ? "NaN" : f.val() : (i = t.hasAttribute("contenteditable") ? f.text() : f.val(), u === "file") ? i.substr(0, 12) === "C:\\fakepath\\" ? i.substr(12) : (r = i.lastIndexOf("/"), r >= 0) ? i.substr(r + 1) : (r = i.lastIndexOf("\\"), r >= 0) ? i.substr(r + 1) : i : typeof i == "string" ? i.replace(/\r/g, "") : i
            }, check: function (t) {
                t = this.validationTargetFor(this.clean(t));
                var i = n(t).rules(), h = n.map(i, function (n, t) {
                    return t
                }).length, s = !1, u = this.elementValue(t), f, e, r;
                if (typeof i.normalizer == "function") {
                    if (u = i.normalizer.call(t, u), typeof u != "string") throw new TypeError("The normalizer should return a string value.");
                    delete i.normalizer
                }
                for (e in i) {
                    r = {method: e, parameters: i[e]};
                    try {
                        if (f = n.validator.methods[e].call(this, u, t, r.parameters), f === "dependency-mismatch" && h === 1) {
                            s = !0;
                            continue
                        }
                        if (s = !1, f === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(t));
                            return
                        }
                        if (!f) return this.formatAndAdd(t, r), !1
                    } catch (o) {
                        this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", o);
                        o instanceof TypeError && (o.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.");
                        throw o;
                    }
                }
                if (!s) return this.objectLength(i) && this.successList.push(t), !0
            }, customDataMessage: function (t, i) {
                return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
            }, customMessage: function (n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            }, findDefined: function () {
                for (var n = 0; n < arguments.length; n++) if (arguments[n] !== undefined) return arguments[n];
                return undefined
            }, defaultMessage: function (t, i) {
                typeof i == "string" && (i = {method: i});
                var r = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || undefined, n.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "<\/strong>"),
                    u = /\$?\{(\d+)\}/g;
                return typeof r == "function" ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters)), r
            }, formatAndAdd: function (n, t) {
                var i = this.defaultMessage(n, t);
                this.errorList.push({message: i, element: n, method: t.method});
                this.errorMap[n.name] = i;
                this.submitted[n.name] = i
            }, addWrapper: function (n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            }, defaultShowErrors: function () {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight) for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function () {
                return n(this.errorList).map(function () {
                    return this.element
                })
            }, showLabel: function (t, i) {
                var u, s, e, o, r = this.errorsFor(t), h = this.idOrName(t), f = n(t).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(i || ""), u = r, this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, u, n(t)) : u.insertAfter(t), r.is("label") ? r.attr("for", h) : r.parents("label[for='" + this.escapeCssMeta(h) + "']").length === 0 && (e = r.attr("id"), f ? f.match(new RegExp("\\b" + this.escapeCssMeta(e) + "\\b")) || (f += " " + e) : f = e, n(t).attr("aria-describedby", f), s = this.groups[t.name], s && (o = this, n.each(o.groups, function (t, i) {
                    i === s && n("[name='" + o.escapeCssMeta(t) + "']", o.currentForm).attr("aria-describedby", r.attr("id"))
                }))));
                !i && this.settings.success && (r.text(""), typeof this.settings.success == "string" ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            }, errorsFor: function (t) {
                var r = this.escapeCssMeta(this.idOrName(t)), u = n(t).attr("aria-describedby"),
                    i = "label[for='" + r + "'], label[for='" + r + "'] *";
                return u && (i = i + ", #" + this.escapeCssMeta(u).replace(/\s+/g, ", #")), this.errors().filter(i)
            }, escapeCssMeta: function (n) {
                return n.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
            }, idOrName: function (n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            }, validationTargetFor: function (t) {
                return this.checkable(t) && (t = this.findByName(t.name)), n(t).not(this.settings.ignore)[0]
            }, checkable: function (n) {
                return /radio|checkbox/i.test(n.type)
            }, findByName: function (t) {
                return n(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            }, getLength: function (t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case"select":
                        return n("option:selected", i).length;
                    case"input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            }, depend: function (n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            }, dependTypes: {
                boolean: function (n) {
                    return n
                }, string: function (t, i) {
                    return !!n(t, i.form).length
                }, "function": function (n, t) {
                    return n(t)
                }
            }, optional: function (t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            }, startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, n(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
            }, stopRequest: function (t, i) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                n(t).removeClass(this.settings.pendingClass);
                i && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && this.pendingRequest === 0 && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (t, i) {
                return i = typeof i == "string" && i || "remote", n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {method: i})
                })
            }, destroy: function () {
                this.resetForm();
                n(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {required: !0},
            email: {email: !0},
            url: {url: !0},
            date: {date: !0},
            dateISO: {dateISO: !0},
            number: {number: !0},
            digits: {digits: !0},
            creditcard: {creditcard: !0}
        },
        addClassRules: function (t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function (t) {
            var i = {}, r = n(t).attr("class");
            return r && n.each(r.split(" "), function () {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function (n, t, i, r) {
            /min|max|step/.test(i) && (t === null || /number|range|text/.test(t)) && (r = Number(r), isNaN(r) && (r = undefined));
            r || r === 0 ? n[i] = r : t === i && t !== "range" && (n[i] = !0)
        },
        attributeRules: function (t) {
            var r = {}, f = n(t), e = t.getAttribute("type"), u, i;
            for (u in n.validator.methods) u === "required" ? (i = t.getAttribute(u), i === "" && (i = !0), i = !!i) : i = f.attr(u), this.normalizeAttributeRule(r, e, u, i);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function (t) {
            var r = {}, f = n(t), e = t.getAttribute("type"), i, u;
            for (i in n.validator.methods) u = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(r, e, i, u);
            return r
        },
        staticRules: function (t) {
            var i = {}, r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function (t, i) {
            return n.each(t, function (r, u) {
                if (u === !1) {
                    delete t[r];
                    return
                }
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case"string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case"function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = u.param !== undefined ? u.param : !0 : (n.data(i.form, "validator").resetElements(n(i)), delete t[r])
                }
            }), n.each(t, function (r, u) {
                t[r] = n.isFunction(u) && r !== "normalizer" ? u(i) : u
            }), n.each(["minlength", "maxlength"], function () {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function () {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : typeof t[this] == "string" && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), n.validator.autoCreateRanges && (t.min != null && t.max != null && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength != null && t.maxlength != null && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function (t) {
            if (typeof t == "string") {
                var i = {};
                n.each(t.split(/\s/), function () {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function (t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = r !== undefined ? r : n.validator.messages[t];
            i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function (t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if (i.nodeName.toLowerCase() === "select") {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            }, email: function (n, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
            }, url: function (n, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(n)
            }, date: function (n, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(n).toString())
            }, dateISO: function (n, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
            }, number: function (n, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            }, digits: function (n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            }, minlength: function (t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r
            }, maxlength: function (t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u <= r
            }, rangelength: function (t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r[0] && u <= r[1]
            }, min: function (n, t, i) {
                return this.optional(t) || n >= i
            }, max: function (n, t, i) {
                return this.optional(t) || n <= i
            }, range: function (n, t, i) {
                return this.optional(t) || n >= i[0] && n <= i[1]
            }, step: function (t, i, r) {
                var u = n(i).attr("type"), h = "Step attribute on input type " + u + " is not supported.",
                    c = new RegExp("\\b" + u + "\\b"), l = u && !c.test("text,number,range"), e = function (n) {
                        var t = ("" + n).match(/(?:\.(\d+))?$/);
                        return t ? t[1] ? t[1].length : 0 : 0
                    }, o = function (n) {
                        return Math.round(n * Math.pow(10, f))
                    }, s = !0, f;
                if (l) throw new Error(h);
                return f = e(r), (e(t) > f || o(t) % o(r) != 0) && (s = !1), this.optional(i) || s
            }, equalTo: function (t, i, r) {
                var u = n(r);
                if (this.settings.onfocusout && u.not(".validate-equalTo-blur").length) u.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                    n(i).valid()
                });
                return t === u.val()
            }, remote: function (t, i, r, u) {
                if (this.optional(i)) return "dependency-mismatch";
                u = typeof u == "string" && u || "remote";
                var e = this.previousValue(i, u), f, o, s;
                return (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), e.originalMessage = e.originalMessage || this.settings.messages[i.name][u], this.settings.messages[i.name][u] = e.message, r = typeof r == "string" && {url: r} || r, s = n.param(n.extend({data: t}, r.data)), e.old === s) ? e.valid : (e.old = s, f = this, this.startRequest(i), o = {}, o[i.name] = t, n.ajax(n.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: o,
                    context: f.currentForm,
                    success: function (n) {
                        var r = n === !0 || n === "true", o, s, h;
                        f.settings.messages[i.name][u] = e.originalMessage;
                        r ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(i), f.formSubmitted = h, f.successList.push(i), f.invalid[i.name] = !1, f.showErrors()) : (o = {}, s = n || f.defaultMessage(i, {
                            method: u,
                            parameters: t
                        }), o[i.name] = e.message = s, f.invalid[i.name] = !0, f.showErrors(o));
                        e.valid = r;
                        f.stopRequest(i, r)
                    }
                }, r)), "pending")
            }
        }
    });
    var t = {}, i;
    n.ajaxPrefilter ? n.ajaxPrefilter(function (n, i, r) {
        var u = n.port;
        n.mode === "abort" && (t[u] && t[u].abort(), t[u] = r)
    }) : (i = n.ajax, n.ajax = function (r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode, u = ("port" in r ? r : n.ajaxSettings).port;
        return f === "abort" ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
    })
}), function (n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message)
    }

    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }

    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }

    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }

    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n
    }

    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"), u = r.attr("data-valmsg-replace"),
            e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }

    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]"), r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function () {
            n("<li />").html(this.message).appendTo(r)
        }))
    }

    function a(t) {
        var i = t.data("unobtrusiveContainer"), r = i.attr("data-valmsg-replace"), u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty())
    }

    function v() {
        var t = n(this), i = "__jquery_unobtrusive_validation_form_reset";
        if (!t.data(i)) {
            t.data(i, !0);
            try {
                t.data("validator").resetForm()
            } finally {
                t.removeData(i)
            }
            t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }
    }

    function s(t) {
        var i = n(t), f = i.data(u), s = n.proxy(v, t), e = r.unobtrusive.options || {}, o = function (i, r) {
            var u = e[i];
            u && n.isFunction(u) && u.apply(t, r)
        };
        return f || (f = {
            options: {
                errorClass: e.errorClass || "input-validation-error",
                errorElement: e.errorElement || "span",
                errorPlacement: function () {
                    c.apply(t, arguments);
                    o("errorPlacement", arguments)
                },
                invalidHandler: function () {
                    l.apply(t, arguments);
                    o("invalidHandler", arguments)
                },
                messages: {},
                rules: {},
                success: function () {
                    a.apply(t, arguments);
                    o("success", arguments)
                }
            }, attachValidation: function () {
                i.off("reset." + u, s).on("reset." + u, s).validate(this.options)
            }, validate: function () {
                return i.validate(), i.valid()
            }
        }, i.data(u, f)), f
    }

    var r = n.validator, t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [], parseElement: function (t, i) {
            var u = n(t), f = u.parents("form")[0], r, e, o;
            f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function () {
                var i = "data-val-" + this.name, r = u.attr(i), s = {};
                r !== undefined && (i += "-", n.each(this.params, function () {
                    s[this] = u.attr(i + this)
                }), this.adapt({element: t, form: f, message: r, params: s, rules: e, messages: o}))
            }), n.extend(e, {__dummy__: !0}), i || r.attachValidation())
        }, parse: function (t) {
            var i = n(t), u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
            i.find("[data-val=true]").each(function () {
                r.unobtrusive.parseElement(this, !0)
            });
            u.each(function () {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    };
    t = r.unobtrusive.adapters;
    t.add = function (n, t, i) {
        return i || (i = t, t = []), this.push({name: n, params: t, adapt: i}), this
    };
    t.addBool = function (n, t) {
        return this.add(n, function (r) {
            i(r, t || n, !0)
        })
    };
    t.addMinMax = function (n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function (n) {
            var f = n.params.min, e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    };
    t.addSingleVal = function (n, t, r) {
        return this.add(n, [t || "val"], function (u) {
            i(u, r || n, u.params[t])
        })
    };
    r.addMethod("__dummy__", function () {
        return !0
    });
    r.addMethod("regex", function (n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length)
    });
    r.addMethod("nonalphamin", function (n, t, i) {
        var r;
        return i && (r = n.match(/\W/g), r = r && r.length >= i), r
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    t.add("equalto", ["other"], function (t) {
        var r = e(t.element.name), u = t.params.other, s = o(u, r),
            h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    });
    t.add("required", function (n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    });
    t.add("remote", ["url", "type", "additionalfields"], function (t) {
        var r = {url: t.params.url, type: t.params.type || "GET", data: {}}, u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function (i, e) {
            var s = o(e, u);
            r.data[s] = function () {
                var i = n(t.form).find(":input").filter("[name='" + f(s) + "']");
                return i.is(":checkbox") ? i.filter(":checked").val() || i.filter(":hidden").val() || "" : i.is(":radio") ? i.filter(":checked").val() || "" : i.val()
            }
        });
        i(t, "remote", r)
    });
    t.add("password", ["min", "nonalphamin", "regex"], function (n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex)
    });
    n(function () {
        r.unobtrusive.parse(document)
    })
}(jQuery), function () {
    var n = {
        getSelection: function () {
            var n = this.jquery ? this[0] : this;
            return ("selectionStart" in n && function () {
                var t = n.selectionEnd - n.selectionStart;
                return {
                    start: n.selectionStart,
                    end: n.selectionEnd,
                    length: t,
                    text: n.value.substr(n.selectionStart, t)
                }
            } || document.selection && function () {
                var t, i, r;
                return (n.focus(), t = document.selection.createRange(), t == null) ? {
                    start: 0,
                    end: n.value.length,
                    length: 0
                } : (i = n.createTextRange(), r = i.duplicate(), i.moveToBookmark(t.getBookmark()), r.setEndPoint("EndToStart", i), {
                    start: r.text.length,
                    end: r.text.length + t.text.length,
                    length: t.text.length,
                    text: t.text
                })
            } || function () {
                return {start: 0, end: n.value.length, length: 0}
            })()
        }, replaceSelection: function () {
            var n = this.jquery ? this[0] : this, t = arguments[0] || "";
            return ("selectionStart" in n && function () {
                return n.value = n.value.substr(0, n.selectionStart) + t + n.value.substr(n.selectionEnd, n.value.length), this
            } || document.selection && function () {
                return n.focus(), document.selection.createRange().text = t, this
            } || function () {
                return n.value += t, this
            })()
        }
    };
    jQuery.each(n, function (n) {
        jQuery.fn[n] = this
    })
}()