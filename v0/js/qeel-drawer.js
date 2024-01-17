$(document).ready(function () {

    // Function to add a status span with a class before the strong name
    function addStatusAndAvatar(userLink, statusClass, avatarUrl, hoverText) {
      var strongElement = userLink.find('strong');

      if (strongElement.length) {
        // Create an img element for the avatar
        var avatarImg = $('<img>').attr('src', avatarUrl).addClass('avatar_qeel');

        // Create a new span element for the status with the specified class
        var statusSpan = $('<span></span>').addClass('status ' + statusClass);

        // Prepend the avatar and status before the strong element
        strongElement.before(avatarImg, statusSpan);
        
        var userId = userLink.attr('href').replace('/u', '');
        if (isStaffUser(userId)) {
          userLink.append('<span class="tag">staff</span>');
        }
      }
    }

    // Function to fetch avatar URL from user profile page
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
      // Add user IDs to the staff list as needed
      var staffUserIds = [
        '1', 
        '3', '62', '226', '266',
        '4', '93', '96', '263',
        '21', '81', '92'
      ]; // Replace with actual user IDs

      return staffUserIds.includes(userId);
    }

    // Function to populate content for the drawer
    function populateDrawerContent() {
      // Create the necessary structure inside the drawer
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
      
      // Append the content to the drawer
      $('#qeel_drawer').html(drawerContent);
      
      $('#online_number').load('/ #user_number > strong:first-of-type');

      // Load the initial content using jQuery.load for #qeel_online
      $('#qeel_online').load('/ div#loggedin', function () {
          // Find and replace "Utilisateurs enregistrés :"
          var pifContents = $('#qeel_online div#loggedin').contents();
          pifContents.each(function () {
            if (this.nodeType === 3) { // Node.TEXT_NODE
              this.nodeValue = this.nodeValue.replace(/Utilisateurs enregistrés : /g, '');
            }
            if (this.nodeType === 3) { // Node.TEXT_NODE
              this.nodeValue = this.nodeValue.replace(/, /g, '');
            }
          });

          // Get all user links within divs with the classes "connectes"
          var userLinksOnline = $('#qeel_online div#loggedin a');

          // Iterate over each user link for #qeel_online
          userLinksOnline.each(function () {
            var userLink = $(this);

            // Extract the user ID from the href attribute
            var userId = userLink.attr('href').replace('/u', '');

            // Fetch the user's avatar URL
            getAvatarUrl(userLink, function (avatarUrl) {

              // Fetch the user's page content
              $.ajax({
                url: '/u' + userId,
                method: 'GET',
                success: function (html) {

                  // Check if the specific HTML string is present in the desired div's text content
                  var fieldContent = $(html).find('#field_id1 > dd > div.field_uneditable').text();

                  // Determine the status class based on the field content
                  var statusClass = '';
                  if (fieldContent.includes('Présent.e')) {
                    statusClass = 'present';
                  } else if (fieldContent.includes('Présence Réduite')) {
                    statusClass = 'presred';
                  } else if (fieldContent.includes('Absent.e')) {
                    statusClass = 'absent';
                  }

                  // Add status span and avatar to the user link
                  addStatusAndAvatar(userLink, statusClass, avatarUrl, fieldContent);
                },
                error: function (error) {
                  // Log to the console to check if this part is executed
                  console.error('Error fetching user page:', error);
                }
              });
            });
          });

          setTimeout(function () {
          $('#qeel_online').removeClass('loading');
        }, 4000);
      });

      // Load the initial content using jQuery.load for #qeel_48h
      $('#qeel_48h').load('/ div#latest', function () {
          // Find and replace "Utilisateurs enregistrés :"
          var kaboumContents = $('#qeel_48h div#latest').contents();
          kaboumContents.each(function () {
            if (this.nodeType === 3) { // Node.TEXT_NODE
              this.nodeValue = this.nodeValue.replace(/Membres connectés au cours des 48 dernières heures : /g, '');
            }
            if (this.nodeType === 3) { // Node.TEXT_NODE
              this.nodeValue = this.nodeValue.replace(/, /g, '');
            }
          });

          // Get all user links within divs with the classes "connectes"
          var userLinks48h = $('#qeel_48h div#latest a');

          // Iterate over each user link for #qeel_48h
          userLinks48h.each(function () {
            var userLink = $(this);

            // Extract the user ID from the href attribute
            var userId = userLink.attr('href').replace('/u', '');

            // Fetch the user's avatar URL
            getAvatarUrl(userLink, function (avatarUrl) {

              // Fetch the user's page content
              $.ajax({
                url: '/u' + userId,
                method: 'GET',
                success: function (html) {

                  // Check if the specific HTML string is present in the desired div's text content
                  var fieldContent = $(html).find('#field_id1 > dd > div.field_uneditable').text();

                  // Determine the status class based on the field content
                  var statusClass = '';
                  if (fieldContent.includes('Présent.e')) {
                    statusClass = 'present';
                  } else if (fieldContent.includes('Présence Réduite')) {
                    statusClass = 'presred';
                  } else if (fieldContent.includes('Absent.e')) {
                    statusClass = 'absent';
                  }

                  // Add status span and avatar to the user link
                  addStatusAndAvatar(userLink, statusClass, avatarUrl, fieldContent);
                },
                error: function (error) {
                  // Log to the console to check if this part is executed
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

      // If the drawer is not in the DOM, create and append it
      if (!drawer.length) {
        drawer = $('<div id="qeel_drawer"></div>');
        drawerContainer.append(drawer);

        // Populate the content for the drawer
        populateDrawerContent();
    }

    // Check if the drawer is visible
    var isDrawerVisible = drawer.is(':visible');

    // If the drawer is visible, slide it out of view and hide
    if (isDrawerVisible) {
      drawer.animate({
        right: '-400px'
      }, {
        duration: 300
      });
    } else {
      // If the drawer is not visible, slide it into view
      drawer.css('right', '-400px'); // Set initial position before animation
      drawer.show().animate({
        right: '0'
      }, {
        duration: 300
      });
    }

    // Toggle the "open" class on the button
    button.toggleClass('open', !isDrawerVisible);
  }

  // Attach click event handler to the toggle button
  $('#qeel_button').on('click', toggleDrawer);
});
