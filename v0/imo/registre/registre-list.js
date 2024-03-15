$(document).ready(function() {
    const supabaseUrl = 'https://gbejdguvqhsdvwtmqfbp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZWpkZ3V2cWhzZHZ3dG1xZmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NjUxOTksImV4cCI6MjAyNjA0MTE5OX0.kK8RMRPvXehp86KIM-sXfq9qERgaSLEFOqXuwZVZUqw';
    const { createClient } = supabase;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    async function fetchDataAndDisplay() {
            try {
                const { data, error } = await supabaseClient
                    .from('Registre')
                    .select('*');

                if (error) {
                    throw error;
                }

                // Clear previous list items
                $('#itemList').empty();

                // Display fetched data in a list
                data.forEach(item => {
                    const listItem = `<li>ID: ${item.id}, Nom: ${item.nom}, Prenom: ${item.prenom}, Surnom: ${item.surnom}, NDF: ${item.ndf}, DOB: ${item.dob}</li>`;
                    $('#itemList').append(listItem);
                });
            } catch (error) {
                console.error('Error fetching data:', error.message);
                // Display error message to the user
                $('#error').text('An error occurred while fetching data. Please try again later.');
            }
        }

        // Handle form submission
        async function handleFormSubmit(e) {
            e.preventDefault();

            // Retrieve form field values
            const formData = {
                id: parseInt($('#id').val(), 10),
                nom: $('#nom').val(),
                prenom: $('#prenom').val(),
                surnom: $('#surnom').val(),
                ndf: $('#ndf').val(),
                dob: $('#dob').val(),
                type: $('#type').val(),
                plURL: $('#plURL').val(),
                intouche: $('#intouche').prop('checked'),
                ryu: $('#ryu').prop('checked'),
                dustquash: $('#dustquash').val(),
                parti1: $('#parti1').val(),
                parti2: $('#parti2').val(),
                ronin_details: $('#ronin_details').val(),
                animal: $('#animal').val(),
                mangetsuki_details: $('#mangetsuki_details').val(),
                maison: $('#maison').val(),
                promo: $('#promo').val(),
                ecole: $('#ecole').val(),
                otherEcole: $('#otherEcole').val(),
                occupation1: $('#occupation1').val(),
                occupation2: $('#occupation2').val(),
                occupation_lieu1: $('#occupation_lieu1').val(),
                occupation_lieu2: $('#occupation_lieu2').val(),
                occupation_details1: $('#occupation_details1').val(),
                occupation_details2: $('#occupation_details2').val(),
                cursus1: $('#cursus1').val(),
                cursus1_annee: $('#cursus1_annee').val(),
                cursus2: $('#cursus2').val(),
                cursus2_annee: $('#cursus2_annee').val(),
                option1: $('#option1').val(),
                option2: $('#option2').val(),
                cosmoball: $('#cosmoball').val(),
                cosmo_equipe: $('#cosmo_equipe').val(),
                cosmo_poste: $('#cosmo_poste').val(),
                cosmo_cap: $('#cosmo_cap').prop('checked'),
                logement: $('#logement').val(),
                logement_details: $('#logement_details').val(),
                logement_type: $('#logement_type').val(),
                coloc: $('#coloc').val(),
                pseudo: $('#pseudo').val(),
                faceclaim: $('#faceclaim').val(),
                image: $('#image').val(),
                credits: $('#credits').val(),
                fiche: $('#fiche').val(),
                jdb: $('#jdb').val()
            };

            try {
                // Insert form data into Supabase
                const { data, error } = await supabaseClient
                    .from('Registre')
                    .insert([formData]);

                if (error) {
                    throw error;
                }

                // Reset form and update displayed data
                $('#registreForm')[0].reset();
                fetchDataAndDisplay();
            } catch (error) {
                console.error('Error inserting data:', error.message);
                // Display error message to the user
                $('#error').text('An error occurred while submitting the form. Please try again later.');
            }
        }

        // Validate form fields before submission
        function validateForm() {
            // Implement validation logic here (e.g., check required fields)
            // Return true if validation passes, false otherwise
            return true;
        }

        // Event listener for form submission
        $('#registreForm').submit(async function(e) {
            e.preventDefault();
            if (validateForm()) {
                await handleFormSubmit(e);
            } else {
                // Display validation error message to the user
                $('#error').text('Please fill out all required fields.');
            }
        });

        // Fetch and display initial data
        fetchDataAndDisplay();
    });
