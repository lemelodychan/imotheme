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
        this.replaceIcons();
        this.tabClickHandler();
        this.addIcon();
        this.colorDia();
        this.contactInfo();
        this.addMulticomptes();
        this.cloneContent('#field_id-6 div.field_uneditable', 'div.profil-msg > dd');
        this.cloneContent('#field_id-13 div.field_uneditable', 'div.profil-points > dd');
        this.cloneContent('#field_id11 div.field_uneditable', '#content_tab2 > span');
        this.cloneContent('#field_id-8 div.field_uneditable', '#pseudo');
        this.cloneContent('#field_id4 div.field_uneditable', '#pronoms');
        this.cloneContent('#field_id-11 div.field_uneditable', '.faceclaim > span');
        this.cloneContent('#field_id-9 div.field_uneditable', '.credits > span');

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
                    `--co2_rgb: ${rgbValues.join(',')} !important; --co2: rgb(${rgbValues.join(',')}) !important;`);
            } else {
                console.error('Color not found in the style attribute.');
            }
        }
    };

    Wombat.prototype.replaceIcons = function () {
        var replacements = [
            { source: 'https://2img.net/images2.imgbox.com/fd/40/a84fgaVp_o.png', replacement: '<ion-icon name="mail"></ion-icon>' },
            { source: 'https://2img.net/images2.imgbox.com/94/db/dbgG5XaY_o.png', replacement: '<ion-icon name="person-circle"></ion-icon>' },
            { source: 'https://i.imgur.com/TqXDBUX.png', replacement: '<ion-icon name="document-text"></ion-icon>' },
            { source: 'https://i.imgur.com/dqeB3t2.png', replacement: '<ion-icon name="logo-instagram"></ion-icon>' },
            { source: 'https://i.imgur.com/q7sw2M1.png', replacement: '<ion-icon name="heart-circle"></ion-icon>' },
        ];
        
        var postProfileContact = jQuery('#wombat').find('.profil-contact a');
        postProfileContact.each(function () {
            var contactLink = $(this);
            replacements.forEach(function (replacement) {
                var targetImg = contactLink.find('img[src="' + replacement.source + '"]');
                if (targetImg.length) {
                    targetImg.replaceWith(replacement.replacement);
                }
            });
        });
    };
    
    Wombat.prototype.tabClickHandler = function () {
        var tabs = jQuery('#wombat').find('.tab');
        var contentDivs = jQuery('#wombat').find('.tab-content');
        var profilContainer = jQuery('#wombat').find('.profil-container');
    
        tabs.on('click', function() {
            var tabId = $(this).attr('id');
            tabs.removeClass('active');
            $(this).addClass('active');
            contentDivs.addClass('hidden');
            $('#content_' + tabId).removeClass('hidden');
            profilContainer.attr('data-active-tab', tabId);
        });
    };

    Wombat.prototype.addIcon = function () {
        var champIonIcon = jQuery('#wombat').find('#field_id9 div.field_uneditable');
        var profilName = jQuery('#wombat').find('.profil-name-title');
        if (champIonIcon) {
          var ionIconName = champIonIcon.text().trim();
          var newIonIcon = $('<ion-icon></ion-icon>').attr('name', ionIconName);
          profilName.append(newIonIcon);
        }
    }

    Wombat.prototype.colorDia = function () {
        var colorContainer = jQuery('#wombat').find('span.couleur-dia');
        var couleurSpan = jQuery('#wombat').find('#field_id2 div.field_uneditable');
        var couleurWrite = couleurSpan.text().trim();
        var clonedContent = couleurSpan.clone();
        colorContainer.append(clonedContent);
        if (!couleurWrite || couleurWrite === '&nbsp;' || couleurWrite === '-') {
          colorContainer[0].style.setProperty('--co3', 'var(--co3)');
        } else {
          colorContainer[0].style.setProperty('--co3', couleurWrite);
        }
    }

    Wombat.prototype.contactInfo = function() {
        var mainuserId = jQuery('#wombat').find("#field_id14 div.field_uneditable");
        var mainuserIDContent = mainuserId.text().trim();
        var userUrl = '/u' + mainuserIDContent;
      
        if (mainuserIDContent === '0') {
          contactStatut('#field_id12 div.field_uneditable', '.irl-contact > .mp');
          contactStatut('#field_id13 div.field_uneditable', '.irl-contact > .discord');
  
          var sourceField = jQuery('#wombat').find('#field_id1 div.field_uneditable').clone();
          var statusContainer = jQuery('#wombat').find('.irl-contact > .statut');
          statusContainer.append(sourceField);
  
          var trimmedHtml = sourceField.html().trim();
          if (trimmedHtml === 'Présent.e') {
            statusContainer.addClass('pres');
          } else if (trimmedHtml === 'Présence réduite') {
            statusContainer.addClass('presred');
          } else if (trimmedHtml === 'Absent.e') {
            statusContainer.addClass('abs');
          }
  
        } else {
          $.get(userUrl, function(data) {
                var mpField = $(data).find('#field_id12 div.field_uneditable');
                var targetMPContainer = jQuery('#wombat').find('.irl-contact > .mp');
                var clonedMPContent = mpField.clone();
                var trimmedMPHtml = clonedMPContent.html().trim();
                if (trimmedMPHtml === 'Ouverts') {
                  targetMPContainer.addClass('open');
                  var openIcon = $('<ion-icon name="checkmark-circle-outline"></ion-icon>');
                  targetMPContainer.append(openIcon);
                } else if (trimmedMPHtml === 'Fermés') {
                  targetMPContainer.addClass('closed');
                  var closedIcon = $('<ion-icon name="close-circle-outline"></ion-icon>');
                  targetMPContainer.append(closedIcon);
                }
  
                var discField = $(data).find('#field_id13 div.field_uneditable');
                var targetdiscContainer = jQuery('#wombat').find('.irl-contact > .discord');
                var cloneddiscContent = discField.clone();
                var trimmeddiscHtml = cloneddiscContent.html().trim();
                if (trimmeddiscHtml === 'Ouvert') {
                  targetdiscContainer.addClass('open');
                  var openIcon = $('<ion-icon name="checkmark-circle-outline"></ion-icon>');
                  targetdiscContainer.append(openIcon);
                } else if (trimmeddiscHtml === 'Fermé') {
                  targetdiscContainer.addClass('closed');
                  var closedIcon = $('<ion-icon name="close-circle-outline"></ion-icon>');
                  targetdiscContainer.append(closedIcon);
                }
  
                var sourceField = $(data).find('#field_id1 div.field_uneditable').clone();
                var statusContainer = jQuery('#wombat').find('.irl-contact > .statut');
                statusContainer.append(sourceField);
                var trimmedHtml = sourceField.html().trim();
                if (trimmedHtml === 'Présent.e') {
                  statusContainer.addClass('pres');
                } else if (trimmedHtml === 'Présence réduite') {
                  statusContainer.addClass('presred');
                } else if (trimmedHtml === 'Absent.e') {
                  statusContainer.addClass('abs');
                }
          });
        }
    };

    Wombat.prototype.contactStatut = function(sourceSelector, targetSelector) {
        var sourceField = jQuery('#wombat').find(sourceSelector);
        var targetContainer = jQuery('#wombat').find(targetSelector);
        var clonedContent = sourceField.clone();
        var trimmedHtml = clonedContent.html().trim();
        if (trimmedHtml === 'Ouverts' || trimmedHtml === 'Ouvert') {
          targetContainer.addClass('open');
          var openIcon = $('<ion-icon name="checkmark-circle-outline"></ion-icon>');
          targetContainer.append(openIcon);
        } else if (trimmedHtml === 'Fermés' || trimmedHtml === 'Fermé') {
          targetContainer.addClass('closed');
          var closedIcon = $('<ion-icon name="close-circle-outline"></ion-icon>');
          targetContainer.append(closedIcon);
        }
    };

    Wombat.prototype.addMulticomptes = function () { 
      var champMulticomptes = jQuery('#wombat').find('#field_id10 div.field_uneditable');
      var profileLinksContainer = jQuery('#wombat').find('div.multicomptes > div.multicomptes-list > span');
      if (champMulticomptes.length > 0) {
          var multicomptesContent = champMulticomptes.text().trim();
          var numbers = multicomptesContent.split(',');
          function fetchData(userNumber) {
              return new Promise(function(resolve) {
                var userUrl = '/u' + userNumber;
                var profileLink = $('<a>').attr('href', userUrl);
                $.get(userUrl, function(data) {
                  var imgSrc = $(data).find('#field_id3 > dd img').attr('src');
                  var altText = $(data).find('#username').text().trim();
                  var profileImage = $('<img>').attr('src', imgSrc).attr('alt', altText);
                  profileLink.append(profileImage);
                  if (altText !== '') {
                    resolve(profileLink);
                  } else {
                    resolve(null);
                  }
                });
              });
          }
          Promise.all(numbers.map(fetchData))
              .then(function(links) {
                links.filter(function(link) {
                  return link !== null;
                }).forEach(function(link) {
                  profileLinksContainer.append(link);
                });
          });
      }    
    };

    Wombat.prototype.cloneContent = function (sourceSelector, targetSelector) {
        var sourceContainer = jQuery('#wombat');
        var sourceField = sourceContainer.find(sourceSelector);
        var targetContainer = sourceContainer.find(targetSelector);
        var clonedContent = sourceField.clone();
        targetContainer.append(clonedContent);
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

    Wombat.prototype.onClickOutside = function () {
        var self = this;
        document.addEventListener("click", function (event) {
            if (!self.aside.contains(event.target)) {
                self.close();
            }
        });
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
        this.onClickOutside();
    };

    return Wombat;
}();