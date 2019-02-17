var site_name = window.location.href.split("/")[0] + "//" + window.location.href.split("/")[2] + "/";

window.project = window.project || {}, function (n, t) {
    function u(t, i, r) {
        n.validator.addMethod(t, function (n, t) {
            return this.optional(t) || i.test(n)
        }, n.validator.format(r))
    }

    var i = t.project, o = t.navigator, r = o.platform;
    n.extend(i, n("#eksi").data());
    i.isTouchDevice || (e = document.documentElement.getAttribute("class") || "", document.documentElement.setAttribute("class", e + " no-touch"));
    n(document).ready(function () {
        n(".lazy").recliner({attrib: "data-src", throttle: 100, threshold: 350, live: !1});
        var r = ".single-select-toggle", t = "active";
        n("body").on("click", ".btn-group .btn", function (i) {
            i.preventDefault();
            var u = n(i.target), f = u.closest(r), e = f.find("input[type='hidden']"), o = u.data("value");
            e.val(o);
            f.find("button").removeClass(t);
            u.addClass(t)
        });
    })
}(jQuery, window), function (n) {
    function o(t, i, r) {
        var e = t.offset(), h = i + n(document).scrollLeft(), c = r + n(document).scrollTop(), o = e.left, s = e.top,
            u = o + t.outerWidth() - h, f = s + t.outerHeight() - c;
        u > 0 && o - u > 0 && t.css("left", t.position().left - u);
        f > 0 && s - f > 0 && t.css("top", t.position().top - f)
    }

    function f(r) {
        if (r && r.target) {
            var f = n(r.target);
            if (f.hasClass(i) || f.parents(u).length > 0 || f.is("a.ui-corner-all")) return
        }
        n(u).removeClass(t)
    }

    var t = "open", i = "toggles", r = "toggles-menu", u = "." + r, e = {
        keepInViewPort: !1, open: function () {
        }
    };
    n.fn.toggles = function (u, s) {
        return this.each(function () {
            var h = n(this);
            s = n.extend({}, e, s);
            h.hasClass(i) && console.error("toggles called multiple times for: %o", h);
            u.addClass(r);
            h.addClass(i).on("click", function () {
                var i = u.hasClass(t), r = n(window).width(), e = n(window).height();
                return f(), i || (u.toggleClass(t), s.keepInViewPort && o(u, r, e), s.open(h, u)), !1
            })
        })
    };
    project.toggles = {
        toggle: function (n) {
            n.toggleClass(t)
        }, close: function (n) {
            n.removeClass(t)
        }
    };
    n(document).on(project.documentClickEvent, f)
}(jQuery), function (n, t, i) {
    function r(r, u) {
        function e(i, u, f) {
            var e, s, h, o;
            if (r.focus(), e = r.getSelection().text, s = n.trim(e), e.length === 0 && (h = t.prompt(f, ""), e = n.trim(h), e === null || e.length === 0)) return !1;
            o = s || e;
            e = e.replace(o, i + o + u);
            r.replaceSelection(e);
            r.scrollTop()
        }

        function f(t, r, f, o, s) {
            var h = n("<button>").attr({type: "button", title: r, tabindex: -1}).text(t).on("click", function () {
                var t = n.isFunction(f) ? f() : f;
                return t !== i && setTimeout(function () {
                    e(t, o, s)
                }, 10), !1
            });
            u.append(h)
        }

        f("(*: title)", "clickable title", "(title: `", "`)", "enter the title");
        f("hede", "clickable title", "`", "`", "enter the title");
        f("*", "clickable asterisk", "*", "*", "enter the title");
        f("- spoiler -", "spoiler thingy", "--- `spoiler` ---\r\n\r\n", "\r\n--- `spoiler` ---", "spoilers");
        f("http://", "link", function () {
            var i = n.trim(t.prompt("hangi adrese gidecek?", "http://"));
            if (i !== "" && i !== "http://") return "(" + i + ")["
        }, "]", "verilecek linkin adı ne olacak?")
    }

    project.editing = {
        attachEditTools: function (n, t) {
            r(n, t)
        }
    };
    n(document).ready(function () {
        var t = n("#editbox"), i = t.parent();
        t.length > 0 && project.editing.attachEditTools(t, i.find(".edittools"));
        n("textarea").keydown("ctrl+return", function () {
            n(this).closest("form").submit()
        })
    })
}(jQuery, window);


/*let get = new XMLHttpRequest();
let parser = new DOMParser();
get.open("GET", site_name + "misc/searchsource/);
get.onload = function () {
    let autocomplete = get.responseText;
    let autocompletehtml = parser.parseFromString(autocomplete, "text/html");
    let result = autocompletehtml.body.innerHTML;
    let itemshelp = result.split("[")[1];
    let itemshelp2 = itemshelp.split("]")[0];
    let items = itemshelp2.split(",");
    for (i=0; i<items.length; i++){
        items[i] = items[i].slice(1,-1)
    }
    $(document).ready(function () {
        $('#search-textbox').devbridgeAutocomplete({
	        lookup: items,
            lookupLimit: 9
    });
});
};
get.send();

*/