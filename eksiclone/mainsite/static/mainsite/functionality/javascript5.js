const sitename = window.location.href.split("/")[0] + "//" + window.location.href.split("/")[2] + "/";
const dellink = "feedback/del/";
const titlelink = "titles/";
const favlink = "feedback/fav/";
const likelink = "feedback/like/";
const dislikelink = "feedback/dislike/";
const reportlink = "feedback/report/";
const notification_delete = "notification/del";
const notification_follow_title = "notification/followtitle";
const notification_follow_user = "notification/followuser";
const notification_archive = "notification/archive";
const notification_unread = "notification/unread";
// TODO get these from sitemap instead of hardcoding

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

function parse_cookies() {
    let cookies = {};
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            let m = c.trim().match(/(\w+)=(.*)/);
            if (m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }
    return cookies;
}

let cookies = parse_cookies();

//  ajax index


let ajaxcurrent = document.getElementById("partial-index");
let ajaxindex = document.getElementById("ajax-index");
let ajaxmainindex = document.getElementById("quick-index-nav");
let dropdownindex = document.getElementById("dropdownindex");

function indexajaxfunc(ajaxbutton) {
    function indexy() {
        let getnew = new XMLHttpRequest();
        let parser = new DOMParser();
        if (ajaxbutton.firstChild.innerHTML[0] !== "#") {
            getnew.open("GET", sitename + titlelink + ajaxbutton.firstChild.innerHTML + "/");
        } else {
            getnew.open("GET", sitename + titlelink + ajaxbutton.firstChild.innerHTML.slice(1) + "/");
        }
        getnew.onload = function () {
            let newtitlespagestring = getnew.responseText;
            let newtitlespage = parser.parseFromString(newtitlespagestring, "text/html");
            let newtitles = newtitlespage.getElementById("content-body").children[2];
            ajaxcurrent.children[0].children[0].innerHTML = newtitlespage.getElementById("content-body").children[0].innerHTML;
            while (ajaxindex.hasChildNodes()) {
                ajaxindex.removeChild(ajaxindex.lastChild)
            }
            while (newtitles.firstChild) {
                ajaxindex.appendChild(newtitles.firstChild);
            }
            for (i = 0; i < ajaxmainindex.childElementCount; i++) {
                ajaxmainindex.children[i].classList.remove("active")
            }
            ajaxbutton.classList.add("active")
        };
        getnew.send();
    }

    ajaxbutton.addEventListener("click", indexy);
}

for (i = 0; i < ajaxmainindex.children.length; i++) {
    indexajaxfunc(ajaxmainindex.children[i])
}

for (i = 0; i < dropdownindex.children.length; i++) {
    indexajaxfunc(dropdownindex.children[i])
}

function indexajaxrefresh(button, info) {
    function refreshy() {
        let getnew = new XMLHttpRequest();
        let parser = new DOMParser();
        getnew.open("GET", sitename + titlelink + info.children[0].children[0].innerHTML + "/");
        getnew.onload = function () {
            let newtitlespagestring = getnew.responseText;
            let newtitlespage = parser.parseFromString(newtitlespagestring, "text/html");
            let newtitles = newtitlespage.getElementById("content-body").children[1];
            ajaxcurrent.children[0].children[0].innerHTML = newtitlespage.getElementById("content-body").children[0].innerHTML;
            while (ajaxindex.hasChildNodes()) {
                ajaxindex.removeChild(ajaxindex.lastChild)
            }
            while (newtitles.firstChild) {
                ajaxindex.appendChild(newtitles.firstChild);
            }
        };
        getnew.send();
    }

    button.addEventListener("click", refreshy);
}

let refresh = document.getElementById("feed-refresh-link");

indexajaxrefresh(refresh, ajaxcurrent);


// ajax like dislike favorite

let ajaxlike = document.getElementsByClassName("like");
let ajaxdislike = document.getElementsByClassName("dislike");
let ajaxfavorite = document.getElementsByClassName("favorite-link");
let ajaxdelete = document.getElementsByClassName("delete");
let ajaxrep = document.getElementsByClassName("reportentry");
let ajaxfavclass = document.getElementsByClassName("fav");

function ajaxdelhelper(x, y) {
    function dely() {
        let getnew = new XMLHttpRequest();
        getnew.open("POST", sitename + dellink);
        getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        getnew.onload = function () {
            let t = x[y].parentElement.parentElement.parentElement.children[0].children[0];
            if (t.tagName === "P") {
                let wrapper = document.createElement('strike');
                wrapper.appendChild(t.cloneNode(true));
                t.parentNode.replaceChild(wrapper, t);
            } else {
                t.replaceWith(t.cloneNode(true).firstChild)
            }

        };
        getnew.send(x[y].getAttribute("data-id"));
    }

    x[y].addEventListener("click", dely);
}

function ajaxdel(feedback) {
    for (let i = 0; i < feedback.length; i++) {
        ajaxdelhelper(feedback, i)
    }
}

ajaxdel(ajaxdelete);

function ajaxreporthelper(x, y) {
    function report() {
        let getnew = new XMLHttpRequest();
        getnew.open("POST", sitename + reportlink);
        getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        getnew.onload = function () {
            let e = document.createElement("a");
            e.classList.add("entry-date");
            e.classList.add("permalink");
            if (getnew.status === 404) {
                e.innerHTML = "already reported"
            } else {
                e.innerHTML = "reported";
            }
            x[y].parentElement.insertAdjacentElement('beforeend', e);
            x[y].removeEventListener("click", report);
        };
        getnew.send(x[y].getAttribute("data-id"));
    }

    x[y].addEventListener("click", report);
}

function ajaxreport(feedback) {
    for (let i = 0; i < feedback.length; i++) {
        ajaxreporthelper(feedback, i)
    }
}

ajaxreport(ajaxrep);

function ajaxfavhelper(x, y) {
    function favy() {
        let getnew = new XMLHttpRequest();
        getnew.open("POST", sitename + favlink);
        getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        getnew.onload = function () {
            x[y].classList.toggle("voted")
        };
        getnew.send(x[y].getAttribute("data-id"))
    }

    x[y].children[0].addEventListener("click", favy);
}

function ajaxfav(feedback) {
    for (let i = 0; i < feedback.length; i++) {
        ajaxfavhelper(feedback, i)
    }
}

ajaxfav(ajaxfavorite);

function ajaxfeedbackhelper(a, x, y, z) {
    function helpy() {
        let getnew = new XMLHttpRequest();
        if (x[z].classList.contains("like")) {
            getnew.open("POST", sitename + likelink);
            getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
            getnew.onload = function () {
                if (x[z].classList.contains("voted")) {
                    x[z].classList.remove("voted");
                    a[z].innerHTML = parseInt(a[z].innerHTML) - 1
                } else {
                    if (y[z].classList.contains("voted")) {
                        x[z].classList.add("voted");
                        y[z].classList.remove("voted");
                        a[z].innerHTML = parseInt(a[z].innerHTML) + 2
                    } else {
                        x[z].classList.add("voted");
                        a[z].innerHTML = parseInt(a[z].innerHTML) + 1
                    }
                }
            };
        } else if (x[z].classList.contains("dislike")) {
            getnew.open("POST", sitename + dislikelink);
            getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
            getnew.onload = function () {
                if (x[z].classList.contains("voted")) {
                    x[z].classList.remove("voted");
                    a[z].innerHTML = parseInt(a[z].innerHTML) + 1
                } else {
                    if (y[z].classList.contains("voted")) {
                        x[z].classList.add("voted");
                        y[z].classList.remove("voted");
                        a[z].innerHTML = parseInt(a[z].innerHTML) - 2
                    } else {
                        x[z].classList.add("voted");
                        a[z].innerHTML = parseInt(a[z].innerHTML) - 1
                    }
                }
            };
        }
        console.log(x[z]);
        getnew.send(x[z].getAttribute("data-id"))
    }

    x[z].children[0].addEventListener("click", helpy);
}

function ajaxfeedback(feedback, affected) {
    for (let i = 0; i < feedback.length; i++) {
        ajaxfeedbackhelper(ajaxfavclass, feedback, affected, i)
    }
}

ajaxfeedback(ajaxlike, ajaxdislike);
ajaxfeedback(ajaxdislike, ajaxlike);

let ajaxtwitter = document.getElementsByClassName("svgico-twitter");

function ajaxtwittershare(x, y) {
    x[y].addEventListener("click", function () {
        let shareattwitter = x[y].getAttribute("data-href");
        let win = window.open(shareattwitter, '_blank');
        win.focus();
    });
}

function ajaxtshare(feedback) {
    for (let i = 0; i < feedback.length; i++) {
        ajaxtwittershare(feedback, i)
    }
}

ajaxtshare(ajaxtwitter);

function ajax_ntfc_feedback(cls, path) {
    function callback(elm) {
        function inner() {
            let getnew = new XMLHttpRequest();
            getnew.open("POST", sitename + path);
            getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
            getnew.onload = function () {
                console.log()
            };
            getnew.send(elm.getAttribute('data-id'));
            elm.parentElement.parentElement.parentElement.parentElement.remove()
        }

        return inner
    }

    let anchors = document.getElementsByClassName(cls);
    for (let i = 0; i < anchors.length; i++) {
        let anc = anchors[i];
        anc.addEventListener('click', callback(anc))
    }
}

ajax_ntfc_feedback('ntfc_del', notification_delete);
ajax_ntfc_feedback('ntfc_arch', notification_archive);
ajax_ntfc_feedback('ntfc_unread', notification_unread);


function ajax_follow(cls, path) {
    function callback(elm) {
        function inner() {
            let getnew = new XMLHttpRequest();
            getnew.open("POST", sitename + path);
            getnew.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
            getnew.onload = function () {
                let old = elm.innerHTML;
                if (old === 'follow') {
                    elm.innerHTML = 'following';
                } else {
                    elm.innerHTML = 'follow'
                }
            };
            let title = document.getElementById('the_title').children[0].children[0].innerHTML;
            getnew.send(title);
        }
        return inner
    }
    let follow_button = document.getElementById(cls);
    if (follow_button) {
        follow_button.addEventListener('click', callback(follow_button))
    }
}

ajax_follow('followuser', notification_follow_user);
ajax_follow('followtitle', notification_follow_title);