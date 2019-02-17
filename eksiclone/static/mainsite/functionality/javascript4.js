(jQuery), function (n, t) {
    function u(n, t) {
        return n < t
    }

    function f() {
        var f = n("#entry-list .content");
        if (window.location.pathname.indexOf("/entry/") !== -1 && f.length === 1) {
            n(f[0]).addClass(i);
            return
        }
        n.each(f, function (f, e) {
            var o = n(e), h = o.innerHeight(), c = e.scrollHeight, s, v;
            if (o.data("readmore-applied") !== !0 && u(h, c)) {
                if (h / c >= .666) {
                    o.addClass(i);
                    return
                }
                var l = t.createElement("span"), a = t.createElement("a"), y = t.createTextNode("read more...");
                l.className = "read-more-link-wrapper";
                a.appendChild(y);
                s = n(l);
                v = n(a).on("click", function () {
                    o.addClass(i).removeClass(r);
                    n(this).remove()
                });
                s.append(v);
                o.after(s);
                o.data("readmore-applied", !0)
            }
        })
    }

    var i = "content-expanded", r = "content-faded";
    n.extend(project, {readMore: {setup: f}});
    n(t).ready(function () {
        project.readMore.setup()
    })
}(jQuery, document), function (n) {
    var i = ".dropdown-toggle", t = ".dropdown-menu";
    n.fn.dropdown = function () {
        return this.each(function () {
            var r = n(this), u = r.find(i), f = r.find(t);
            if (u.length !== 0) {
                u.toggles(f, {keepInViewPort: !0});
                f.find("li > a").on("click", function () {
                    project.toggles.toggle(n(this).closest(t))
                })
            }
        })
    };
    n(document).ready(function () {
        n(".dropdown:not(:has(>a.toggles))").dropdown()
    })
}(jQuery);