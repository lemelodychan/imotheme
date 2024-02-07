var Wombat = function () {
    "use strict";

    function isGuest() {
        return -1 == parseInt(((my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data") || "").match(/"userid";(?:s:[0-9]+:"|i:)([0-9]+)/) || [0, -1])[1]);
    }

    const defaultOptions = {
        excludes: [],
        allowGuests: false,
        selector: "#wombat",
        displayOnLoad: "",
        overlay: true,
        overlayClass: "wombat-overlay",
        drawerClass: "wombat-aside",
        afterLoad: function () {}
    };

    function Wombat(options) {
        if (!new.target) throw "Wombat() doit être utilisé comme constructeur et déclaré avec le mot-clef new.";

        this.dependencies = {
            switcheroo: typeof Switcheroo !== "undefined"
        };
        this.options = Object.assign({}, defaultOptions, options);

        if (!this.options.allowGuests && isGuest()) {
            return;
        }

        this.transitionEnd = (function () {
            var testElement = document.createElement("div");
            return testElement.style.WebkitTransition ? "webkitTransitionEnd" : (testElement.style.OTransition ? "oTransitionEnd" : "transitionend");
        })();

        this.onClick();
    }

    Wombat.prototype.build = function () {
        var fragment = document.createDocumentFragment();
        this.aside = document.createElement("aside");
        this.aside.className = this.options.drawerClass;
        if (this.content) {
            this.aside.appendChild(this.content);
        }

        fragment.appendChild(this.aside);

        if (this.options.overlay) {
            this.overlay = document.createElement("div");
            this.overlay.className = this.options.overlayClass;
            fragment.appendChild(this.overlay);
        }

        document.body.appendChild(fragment);

        window.getComputedStyle(this.aside).height;
        this.aside.classList.add("open");
        this.overlay && this.overlay.classList.add("open");

        this.updateColor();

        if (typeof this.options.afterLoad === "function") {
            this.options.afterLoad(this.aside, this.overlay);
        }
    };

    Wombat.prototype.binds = function () {
        this.overlay && this.overlay.addEventListener("click", this.close.bind(this));
    };

    Wombat.prototype.onClick = function () {
        var excludes = this.options.excludes.join(",");
        document.querySelectorAll(excludes ? `a[href^="/u"]:not(${excludes})` : 'a[href^="/u"]').forEach(link => {
            link.addEventListener("click", event => {
                event.stopPropagation();
                event.preventDefault();
                var userId = new URL(link.href).pathname.replace(/\D/g, "");
                this.load(userId).then(() => this.open());
            });
        });
    };

    Wombat.prototype.hexToRgb = function (hex) {
        if (!hex) {
            return '';
        }
        hex = hex.replace(/^#/, '');
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return r + ',' + g + ',' + b;
    };

    Wombat.prototype.updateColor = function () {
        var groupColor = jQuery('#wombat #username > span').css("color");

        if (groupColor) {
            var matches = groupColor.match(/rgb\(([^)]+)\)/);
            if (matches && matches[1]) {
                var rgbValues = matches[1].split(',').map(Number);
                jQuery('#wombat > div').attr('style', 
                    `--co2_rgb: ${rgbValues.join(',')} !important; 
                     --co2: rgb(${rgbValues.join(',')}) !important;`);
            } else {
                console.error('Color not found in the style attribute.');
            }
        }
    };

    Wombat.prototype.load = function (userId) {
        var url = "/u" + userId;
        var selector = this.options.selector;

        return fetch(url)
            .then(response => response.text())
            .then(html => {
                var profileContent = (new DOMParser()).parseFromString(html, "text/html").querySelector(selector);

                if (profileContent === null) {
                    throw new Error("Profile content not found");
                }

                var fragment = document.createDocumentFragment();
                fragment.appendChild(profileContent);
                this.content = fragment;

                return this.content;
            })
            .catch(error => {
                console.error(error);
            });
    };

    Wombat.prototype.close = function () {
        this.aside.classList.remove("open");
        this.overlay && this.overlay.classList.remove("open");
        this.clear(this.aside, this.overlay);
    };

    Wombat.prototype.clear = function () {
        var elements = Array.from(arguments);
    
        elements.forEach(element => {
            element.addEventListener(this.transitionEnd, function () {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                element.removeEventListener(this.transitionEnd, arguments.callee);
            });
        });
    };

    Wombat.prototype.open = function () {
        this.build();
        this.binds();
    };

    return Wombat;
}();
