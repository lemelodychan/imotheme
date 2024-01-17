$(document).ready(function () {
    
    function addStatusAndAvatar(userLink, statusClass, avatarUrl, hoverText) {
          var strongElement = userLink.find('strong');
    
          if (strongElement.length) {
            var avatarImg = $('<img>').attr('src', avatarUrl).addClass('avatar_qeel');
            var statusSpan = $('<span></span>').addClass('status ' + statusClass);
            strongElement.before(avatarImg, statusSpan);
              
            var userId = userLink.attr('href').replace('/u', '');
            if (isStaffUser(userId)) {
              userLink.append('<span class="tag">staff</span>');
            }
          }
    }

    function getAvatarUrl(userLink, callback) {
          var userId = userLink.attr('href').replace('/u', '');
          var userPageUrl = '/u' + userId;
    
          $.ajax({
            url: userPageUrl,
            method: 'GET',
            success: function (html) {
              var avatarUrl = $(html).find('#avQEEL img').attr('src');
              callback(avatarUrl);
            },
            error: function (error) {
              console.error('Error fetching user avatar:', error);
              callback(null);
            }
          });
    }
  
    function isStaffUser(userId) {
          var staffUserIds = [
            '1', 
            '3', '62', '226', '266',
            '4', '93', '96', '263',
            '21', '81', '92'
          ]; 
          return staffUserIds.includes(userId);
    }

    function populateDrawerContent() {
          var drawerContent = `
                <div>
                  <h3>Actuellement connecté.e.s&nbsp;ー&nbsp;<span id="online_number"></span></h3>
                  <div id="qeel_online" class="loading"></div>
                </div>
                <div>
                  <h3>Dernières 48h</h3>
                  <div id="qeel_48h" class="loading"></div>
                </div>
              `;
          
          $('#qeel_drawer').html(drawerContent);
          
          $('#online_number').load('/ #user_number > strong:first-of-type');
    
          $('#qeel_online').load('/ div#loggedin', function () {
              var pifContents = $('#qeel_online div#loggedin').contents();
              pifContents.each(function () {
                if (this.nodeType === 3) {
                  this.nodeValue = this.nodeValue.replace(/Utilisateurs enregistrés : /g, '');
                }
                if (this.nodeType === 3) {
                  this.nodeValue = this.nodeValue.replace(/, /g, '');
                }
              });
    
              var userLinksOnline = $('#qeel_online div#loggedin a');
    
              userLinksOnline.each(function () {
                var userLink = $(this);
                var userId = userLink.attr('href').replace('/u', '');
    
                getAvatarUrl(userLink, function (avatarUrl) {
                  $.ajax({
                    url: '/u' + userId,
                    method: 'GET',
                    success: function (html) {
                      var fieldContent = $(html).find('#field_id1 > dd > div.field_uneditable').text();
                      var statusClass = '';
                      if (fieldContent.includes('Présent.e')) {
                        statusClass = 'present';
                      } else if (fieldContent.includes('Présence Réduite')) {
                        statusClass = 'presred';
                      } else if (fieldContent.includes('Absent.e')) {
                        statusClass = 'absent';
                      }
                      addStatusAndAvatar(userLink, statusClass, avatarUrl, fieldContent);
                    },
                    error: function (error) {
                      console.error('Error fetching user page:', error);
                    }
                  });
                });
              });
    
              setTimeout(function () {
              $('#qeel_online').removeClass('loading');
            }, 4000);
          });

          $('#qeel_48h').load('/ div#latest', function () {
              var kaboumContents = $('#qeel_48h div#latest').contents();
              kaboumContents.each(function () {
                if (this.nodeType === 3) { 
                  this.nodeValue = this.nodeValue.replace(/Membres connectés au cours des 48 dernières heures : /g, '');
                }
                if (this.nodeType === 3) { 
                  this.nodeValue = this.nodeValue.replace(/, /g, '');
                }
              });
    
              var userLinks48h = $('#qeel_48h div#latest a');
    
              userLinks48h.each(function () {
                var userLink = $(this);
                var userId = userLink.attr('href').replace('/u', '');
    
                getAvatarUrl(userLink, function (avatarUrl) {
    
                  $.ajax({
                    url: '/u' + userId,
                    method: 'GET',
                    success: function (html) {
                      var fieldContent = $(html).find('#field_id1 > dd > div.field_uneditable').text();
                      var statusClass = '';
                      if (fieldContent.includes('Présent.e')) {
                        statusClass = 'present';
                      } else if (fieldContent.includes('Présence Réduite')) {
                        statusClass = 'presred';
                      } else if (fieldContent.includes('Absent.e')) {
                        statusClass = 'absent';
                      }
                      addStatusAndAvatar(userLink, statusClass, avatarUrl, fieldContent);
                    },
                    error: function (error) {
                      console.error('Error fetching user page:', error);
                    }
                  });
                });
              });
    
              setTimeout(function () {
                $('#qeel_48h').removeClass('loading');
    
                var userLinksPif = $('#qeel_online div#loggedin a');
                userLinksPif.each(function () {
                  var usernamePif = $(this).text().trim();
                  $('#qeel_48h div#latest a:contains("' + usernamePif + '")').remove();
                });
                if ($('#qeel_48h div#latest a').length === 0) {
                  $('#qeel_48h div#latest').text('Il semblerait que tout le monde soit en ligne !');
                }
    
              }, 4000);
            });
      }
      
      function toggleDrawer() {
            var drawerContainer = $('#qeel_drawer_container');
            var drawer = $('#qeel_drawer');
            var button = $('#qeel_button');
        
            if (!drawer.length) {
                drawer = $('<div id="qeel_drawer"></div>');
                drawerContainer.append(drawer);
                populateDrawerContent();
            }
        
            // Check if the drawer is visible
            var isDrawerVisible = drawer.is(':visible');
        
            if (isDrawerVisible) {
                // If the drawer is visible, slide it out of view and hide
                drawer.animate({
                    right: '-400px'
                }, {
                    duration: 400,
                    step: function (now, fx) {
                        if (fx.prop === 'right') {
                            drawer.css('right', now); // Update right property during animation
                        }
                    },
                    complete: function () {
                        drawer.css({
                            display: 'none',
                            right: '-400px'
                        });
                    }
                });
            } else {
                // If the drawer is not visible, slide it into view
                drawer.css({
                    display: 'grid',
                    right: '-400px'
                }); // Set initial position before animation
                drawer.show().animate({
                    right: '0'
                }, {
                    duration: 400,
                    step: function (now, fx) {
                        if (fx.prop === 'right') {
                            drawer.css('right', now); // Update right property during animation
                        }
                    }
                });
            }

            // Toggle the "open" class on the button
            button.toggleClass('open', !isDrawerVisible);
        }

    
    $('#qeel_button').on('click', toggleDrawer);

  });
