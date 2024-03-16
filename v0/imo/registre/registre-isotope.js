$(document).ready(function(){
    const supabaseUrl = 'https://gbejdguvqhsdvwtmqfbp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZWpkZ3V2cWhzZHZ3dG1xZmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NjUxOTksImV4cCI6MjAyNjA0MTE5OX0.kK8RMRPvXehp86KIM-sXfq9qERgaSLEFOqXuwZVZUqw';
    const { createClient } = supabase;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const dataList = document.getElementById('grid');

    async function fetchDataAndDisplay() {
        try {
          const { data, error } = await supabaseClient.from('Registre').select('*');
          data.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('grid-item');
  
            // Filtre Maison
            listItem.classList.add(item.maison);
    
            let occup1 = item.occupation1;
            let occup2 = item.occupation2;
            if (occup1 === "Étudiant.e" || occup2 === "Étudiant.e") { listItem.classList.add('etudiant'); }
            if (occup1 === "Commerce" || occup2 === "Commerce") { listItem.classList.add('commerce'); }
            if (occup1 === "Hôtellerie" || occup2 === "Hôtellerie") { listItem.classList.add('hotellerie'); }
            if (occup1 === "Divertissement" || occup2 === "Divertissement") { listItem.classList.add('divertissement'); }
            if (occup1 === "Santé" || occup2 === "Santé") { listItem.classList.add('sante'); }
            if (occup1 === "Fonction Publique" || occup2 === "Fonction Publique") { listItem.classList.add('publique'); }
            if (occup1 === "Justice" || occup2 === "Justice") { listItem.classList.add('justice'); }
            if (occup1 === "Arts et Médias" || occup2 === "Arts et Médias") { listItem.classList.add('medias'); }
            if (occup1 === "Éducation" || occup2 === "Éducation") { listItem.classList.add('education'); }
            if (occup1 === "Sports" || occup2 === "Sports") { listItem.classList.add('sports'); }
            if (occup1 === "Illégalité" || occup2 === "Illégalité") { listItem.classList.add('illegalite'); }
            if (!(listItem.classList.contains('etudiant') ||
                  listItem.classList.contains('commerce') ||
                  listItem.classList.contains('hotellerie') ||
                  listItem.classList.contains('divertissement') ||
                  listItem.classList.contains('sante') ||
                  listItem.classList.contains('publique') ||
                  listItem.classList.contains('justice') ||
                  listItem.classList.contains('medias') ||
                  listItem.classList.contains('education') ||
                  listItem.classList.contains('sports') ||
                  listItem.classList.contains('illegalite'))) { listItem.classList.add('autrejob'); }
    
            let place = item.logement;
            if (place === "Shinmeidai") { listItem.classList.add('shinmeidai'); }
            else if (place === "Wakoku") { listItem.classList.add('wakoku'); }
            else if (place === "Chuo-Kōei") { listItem.classList.add('chuokoei'); }
            else if (place === "Eiyamachi") { listItem.classList.add('eiyamachi'); }
            else if (place === "Tenchijima") { listItem.classList.add('tenchijima'); }
            else { listItem.classList.add('autreplace'); } 
  
            let cosmo = item.cosmoball;
            if (cosmo === "TRUE") { listItem.classList.add('cosmo'); }
            let dust = item.dustquash;
            if (dust === "TRUE") { listItem.classList.add('dustq'); }
            let ryu = item.ryu;
            if (ryu === "TRUE") { listItem.classList.add('ryu'); }
            let intouche = item.intouche;
            if (intouche === "TRUE") { listItem.classList.add('intouche'); }
    
            let parti1 = item.parti1;
            if (parti1 === "Rōnin") { listItem.classList.add('ronin'); }
            else if (parti1 === "Mangetsuki") { listItem.classList.add('mangetsuki'); }
            else if (parti1 === "Reiketsuki") { listItem.classList.add('reiketsuki'); }
            else if (parti1 === "Ryūketsuki") { listItem.classList.add('ryuketsuki'); }
            else if (parti1 === "Henjin") { listItem.classList.add('henjin'); }
            else if (parti1 === "Henjū") { listItem.classList.add('henjuu'); }
            else if (parti1 === "Jūjin") { listItem.classList.add('juujin'); }
            else if (parti1 === "Sōgaka") { listItem.classList.add('sogaka'); }
            else if (parti1 === "Tabigaka") { listItem.classList.add('tabigaka'); }
            else if (parti1 === "Yumegaka") { listItem.classList.add('yumegaka'); }
            else if (parti1 === "Gengaka") { listItem.classList.add('gengaka'); }
            else if (parti1 === "Témoin") { listItem.classList.add('temoin'); }
    
            let parti2 = item.parti2;
            if (parti2 === "Rōnin") { listItem.classList.add('ronin'); }
            else if (parti2 === "Mangetsuki") { listItem.classList.add('mangetsuki'); }
            else if (parti2 === "Reiketsuki") { listItem.classList.add('reiketsuki'); }
            else if (parti2 === "Ryūketsuki") { listItem.classList.add('ryuketsuki'); }
            else if (parti1 === "Henjin") { listItem.classList.add('henjin'); }
            else if (parti1 === "Henjū") { listItem.classList.add('henjuu'); }
            else if (parti2 === "Jūjin") { listItem.classList.add('juujin'); }
            else if (parti2 === "Sōgaka") { listItem.classList.add('sogaka'); }
            else if (parti2 === "Tabigaka") { listItem.classList.add('tabigaka'); }
            else if (parti2 === "Yumegaka") { listItem.classList.add('yumegaka'); }
            else if (parti2 === "Gengaka") { listItem.classList.add('gengaka'); }
            else if (parti2 === "Témoin") { listItem.classList.add('temoin'); }
            
            // Filtre Age
            const date = new Date();
            let year = date.getFullYear();
            let DOB = `${item.dob}`;
            let DOBy = DOB.substring(0, 4);
            let age = year - DOBy;
            if (age <= 20) { listItem.classList.add('u20'); }
            else if (age > 20 && age < 30) { listItem.classList.add('u30'); }
            else if (age > 30 && age < 40) { listItem.classList.add('u40'); }
            else if (age >= 40) { listItem.classList.add('o40'); }
  
            const containerSpan = document.createElement('span');
            containerSpan.classList.add('container');
              // Image
              const avatar = document.createElement('a');
              avatar.classList.add('avatar');
              avatar.href = `/u${item.id}`;
              avatar.target = `_blank`;
                    const avatarImg = document.createElement('img');
                    avatarImg.classList.add('image');
                    avatarImg.src = `${item.image}`;
                    // Crédits avatar
                    const credits = document.createElement('span');
                    credits.classList.add('credits');
                    credits.innerHTML = `<b>CR :</b> ${item.credits}`;
              avatar.appendChild(avatarImg);
              avatar.appendChild(credits);
                  
            // Titre avec Nom et Age
            const titreSpan = document.createElement('span');
            titreSpan.classList.add('nom');
                // Nom
                const nameSpan = document.createElement('span');
                nameSpan.textContent = `${item.nom}, `;
                 // Age
                const ageSpan = document.createElement('span');
                ageSpan.textContent = `${age} ans`;
            titreSpan.appendChild(nameSpan);
            titreSpan.appendChild(ageSpan);
    
            const tagsSpan = document.createElement('span');
            tagsSpan.classList.add('tags');
    
            const placeSpan = document.createElement('span');
            placeSpan.classList.add('location');
            if (item.logement_details) {
                placeSpan.innerHTML = `<ion-icon name="location-outline"></ion-icon> <span>${item.logement_details}</span>`;
            } else { placeSpan.innerHTML = `<ion-icon name="location-outline"></ion-icon> <span>${item.logement}</span>`; }

            const promoSpan = document.createElement('span');
            promoSpan.classList.add('promo');
            promoSpan.innerHTML = `<ion-icon name="school-outline"></ion-icon> <span>${item.ecole}, ${item.promo}</span>`;
    
            let jobdet1 = item.occupation_details1;
            let jobdet2 = item.occupation_details2;
            let job1 = item.occupation1;
            let job2 = item.occupation2;
            let cursus1 = item.cursus1;
            let cursus2 = item.cursus2;
            const jobSpan = document.createElement('span');
            jobSpan.classList.add('job');
                      
            if (job1 !== "Étudiant.e" && job2 !== "Étudiant.e") {
                if (job1 !== "") {
                    if (job2 !== "") {
                        jobSpan.innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> <span>${jobdet1}, ${jobdet2}</span>`;
                    } else {
                        jobSpan.innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> <span>${jobdet1}</span>`;
                    }
                } else if (job2 !== "") {
                    jobSpan.innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> <span>${jobdet2}</span>`;
                }
            } else if (job1 === "Étudiant.e" || job2 === "Étudiant.e") {
                let studentText = "Étudiant.e en";
                if (cursus1 !== "") {
                    studentText += ` ${cursus1}`;
                }
                if (cursus2 !== "") {
                    studentText += ` et ${cursus2}`;
                }
                if (job2 !== "" && job1 === "Étudiant.e") {
                    studentText += `, ${jobdet2}`;
                }
                if (job1 !== "" && job2 === "Étudiant.e") {
                    studentText += `, ${jobdet1}`;
                }
                jobSpan.innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> <span>${studentText}</span>`;
            } else if (job1 === "" && job2 === "" && cursus1 === "" && cursus2 === "") {
                jobSpan.classList.add('nojob');
                jobSpan.innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> <span>Sans activité</span>`;
            } else if ((job1 === "Étudiant.e" && cursus1 !== "" && cursus2 === "") || (job2 === "Étudiant.e" && cursus2 !== "" && cursus1 === "")) {
                let studentText = "Étudiant.e en";
                if (cursus1 !== "") {
                    studentText += ` ${cursus1}`;
                }
                if (cursus2 !== "") {
                    studentText += ` ${cursus2}`;
                }
                jobSpan.innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> <span>${studentText}</span>`;
            }
            
            const partiSpan = document.createElement('span');
            partiSpan.classList.add('parti');
            if (parti1 !== "" || parti2 !== "") { 
                if (parti1 !== "" && parti2 !== "") {
                    partiSpan.innerHTML = `<ion-icon name="star-outline"></ion-icon> <span>${item.parti1}, ${item.parti2}</span>`;
                } else if (parti1 !== "" && parti2 === "") { 
                    partiSpan.innerHTML = `<ion-icon name="star-outline"></ion-icon> <span>${item.parti1}</span>`;
                } else if (parti1 === "" && parti2 !== "") { 
                    partiSpan.innerHTML = `<ion-icon name="star-outline"></ion-icon> <span>${item.parti2}</span>`;
                }
            }
            else if (parti1 === "" && parti2 === "") { 
                partiSpan.classList.add('noparti');
                partiSpan.innerHTML = `<ion-icon name="star-outline"></ion-icon> <span>Aucune particularité</span>`;
            }
                
            tagsSpan.appendChild(placeSpan);
            if (item.ecole) { 
                  tagsSpan.appendChild(promoSpan);
            }
            tagsSpan.appendChild(jobSpan);
            tagsSpan.appendChild(partiSpan);
    
            const lienSpan = document.createElement('span');
            lienSpan.classList.add('liens');
            const profilLien = document.createElement('a');
            const ficheLien = document.createElement('a');
            ficheLien.classList.add('fiche');
            ficheLien.href = item.fiche;
            ficheLien.alt = `Fiche`;
            ficheLien.target = `_blank`;
            ficheLien.innerHTML = `<ion-icon name="document-text-outline"></ion-icon> <span>Fiche</span>`;

            const jdbLien = document.createElement('a');
            jdbLien.classList.add('jdb');
            jdbLien.href = item.jdb;
            jdbLien.alt = `Journal de Bord`;
            jdbLien.target = `_blank`;
            jdbLien.innerHTML = `<ion-icon name="book-outline"></ion-icon> <span>Journal</span>`;
    
            lienSpan.appendChild(ficheLien);
            lienSpan.appendChild(jdbLien);
        
            containerSpan.appendChild(avatar);
            containerSpan.appendChild(titreSpan);
            containerSpan.appendChild(tagsSpan);
            containerSpan.appendChild(lienSpan);

            listItem.appendChild(containerSpan);
  
            dataList.appendChild(listItem); 
        });

        // Initialize Isotope after appending grid items
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            stagger: 30,
            layoutMode: 'masonry',
            masonry: {
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                horizontalOrder: true,
            },
            getSortData: {
                name: '.nom span:first-child',
                category: '[data-category]',
                weight: function( itemElem ) {
                    var weight = $( itemElem ).find('.weight').text();
                    return parseFloat( weight.replace( /[\(\)]/g, '') );
                }
            },
            sortBy: 'name'
        });
    
        var filters = {};
        $('.filters').on('click', '.button', function() {
            var $this = $(this);
            var $buttonGroup = $this.parents('.button-group');
            var filterGroup = $buttonGroup.attr('data-filter-group');
            filters[filterGroup] = $this.attr('data-filter');
            var filterValue = concatValues(filters);
    
            console.log('Filter Value:', filterValue);
    
            $buttonGroup.find('.button').removeClass('is-checked');
            $this.addClass('is-checked');
    
            $grid.isotope({ filter: filterValue });
        });
            
        function concatValues(obj) {
            var value = '';
            for (var prop in obj) {
                value += obj[prop];
            }
            return value;
        }  
                
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
    
        const columnWidth = $('.grid-sizer').width();
        console.log('Column Width:', columnWidth);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndDisplay();
});
