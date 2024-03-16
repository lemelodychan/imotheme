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

            $('#itemList').empty();
            data.forEach(item => {
                const listItem = `<li>ID: ${item.id}, Nom: ${item.nom}, Prenom: ${item.prenom}, Surnom: ${item.surnom}, NDF: ${item.ndf}, DOB: ${item.dob}</li>`;
                $('#itemList').append(listItem);
            });
        } catch (error) {
            console.error('Error fetching data:', error.message);
            $('#error').text('An error occurred while fetching data. Please try again later.');
        }
    }

    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();

        const formData = getFormData();

        try {
            displayConfirmationStep(formData);
        } catch (error) {
            console.error('Error handling form submission:', error.message);
            $('#error').text('An error occurred while handling form submission. Please try again later.');
        }
    }

    // Validate form fields before submission
    function validateForm() {
        return true;
    }

    // Event listener for form submission
    $('#registreForm').submit(async function(e) {
        e.preventDefault();
        if (validateForm()) {
            await handleFormSubmit(e);
        } else {
            $('#error').text('Please fill out all required fields.');
        }
    });

    fetchDataAndDisplay();
});

// Function to get form data
function getFormData() {
    return {
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
}

// Display confirmation step
function displayConfirmationStep(formData) {
    $('#registreForm').hide();
    $('#registreConf').show();

    // Event listener for confirm button
    $('#confirmButton').click(async function() {
        try {
            // Insert form data into Supabase
            const { data, error } = await supabaseClient
                .from('Registre')
                .insert([formData]);

            if (error) {
                throw error;
            }

            $('#registreForm')[0].reset();
            fetchDataAndDisplay();
            closeModal();
            location.reload(true);
        } catch (error) {
            console.error('Error inserting data:', error.message);
            $('#error').text('An error occurred while submitting the form. Please try again later.');
        }
    });

    // Event listener for edit button
    $('#editButton').click(function() {
        $('#registreForm').show();
        $('#registreConf').hide();
        setFormData(formData);
    });
}

// Set form data
function setFormData(formData) {
    $('#id').val(formData.id);
    $('#nom').val(formData.nom);
    $('#prenom').val(formData.prenom);
    $('#surnom').val(formData.surnom);
    $('#ndf').val(formData.ndf);
    $('#dob').val(formData.dob);
    $('#type').val(formData.type);
    $('#plURL').val(formData.plURL);
    $('#intouche').prop('checked', formData.intouche);
    $('#ryu').prop('checked', formData.ryu);
    $('#dustquash').val(formData.dustquash);
    $('#parti1').val(formData.parti1);
    $('#parti2').val(formData.parti2);
    $('#ronin_details').val(formData.ronin_details);
    $('#animal').val(formData.animal);
    $('#mangetsuki_details').val(formData.mangetsuki_details);
    $('#maison').val(formData.maison);
    $('#promo').val(formData.promo);
    $('#ecole').val(formData.ecole);
    $('#otherEcole').val(formData.otherEcole);
    $('#occupation1').val(formData.occupation1);
    $('#occupation2').val(formData.occupation2);
    $('#occupation_lieu1').val(formData.occupation_lieu1);
    $('#occupation_lieu2').val(formData.occupation_lieu2);
    $('#occupation_details1').val(formData.occupation_details1);
    $('#occupation_details2').val(formData.occupation_details2);
    $('#cursus1').val(formData.cursus1);
    $('#cursus1_annee').val(formData.cursus1_annee);
    $('#cursus2').val(formData.cursus2);
    $('#cursus2_annee').val(formData.cursus2_annee);
    $('#option1').val(formData.option1);
    $('#option2').val(formData.option2);
    $('#cosmoball').val(formData.cosmoball);
    $('#cosmo_equipe').val(formData.cosmo_equipe);
    $('#cosmo_poste').val(formData.cosmo_poste);
    $('#cosmo_cap').prop('checked', formData.cosmo_cap);
    $('#logement').val(formData.logement);
    $('#logement_details').val(formData.logement_details);
    $('#logement_type').val(formData.logement_type);
    $('#coloc').val(formData.coloc);
    $('#pseudo').val(formData.pseudo);
    $('#faceclaim').val(formData.faceclaim);
    $('#image').val(formData.image);
    $('#credits').val(formData.credits);
    $('#fiche').val(formData.fiche);
    $('#jdb').val(formData.jdb);
}

// Close modal
function closeModal() {
    $('#registreModal').modal('hide');
}
