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

            if (error) throw error;

            // Clear previous list items
            $('#itemList').empty();

            // Display fetched data in a list
            data.forEach(item => {
                const listItem = `<li>ID: ${item.id}, Nom: ${item.nom}, Prenom: ${item.prenom}, Surnom: ${item.surnom}, NDF: ${item.ndf}, DOB: ${item.dob}</li>`;
                $('#itemList').append(listItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const id = parseInt($('#id').val(), 10);
        const nom = $('#nom').val();
        const prenom = $('#prenom').val();
        const surnom = $('#surnom').val();
        const ndf = $('#ndf').val();

        const dobValue = $('#dob').val();
        const selectedDate = new Date(dobValue);
        const dob = selectedDate.getFullYear() + '-' +
                  ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' +
                  ('0' + selectedDate.getDate()).slice(-2);

        const type = $('#type').val();
        const plURL = $('#plURL').val();
        const intouche = $('#intouche').prop('checked');
        const ryu = $('#ryu').prop('checked');
        const dustquash = $('#dustquash').val();
        const parti1 = $('#parti1').val();
        const parti2 = $('#parti2').val();
        const ronin_details = $('#ronin_details').val();
        const animal = $('#animal').val();
        const mangetsuki_details = $('#mangetsuki_details').val();
        const maison = $('#maison').val();
        const promo = $('#promo').val();
        const ecole = $('#ecole').val();
        const otherEcole = $('#otherEcole').val();
        const occupation1 = $('#occupation1').val();
        const occupation2 = $('#occupation2').val();
        const occupation_lieu1 = $('#occupation_lieu1').val();
        const occupation_lieu2 = $('#occupation_lieu2').val();
        const occupation_details1 = $('#occupation_details1').val();
        const occupation_details2 = $('#occupation_details2').val();
        const cursus1 = $('#cursus1').val();
        const cursus1_annee = $('#cursus1_annee').val();
        const cursus1 = $('#cursus2').val();
        const cursus2_annee = $('#cursus2_annee').val();
        const option1 = $('#option1').val();
        const option2 = $('#option2').val();
        const cosmoball = $('#cosmoball').val();
        const cosmo_equipe = $('#cosmo_equipe').val();
        const cosmo_poste = $('#cosmo_poste').val();
        const cosmo_cap = $('#cosmo_cap').prop('checked');
        const logement = $('#logement').val();
        const logement_details = $('#logement_details').val();
        const logement_type = $('#logement_type').val();
        const coloc = $('#coloc').val();
        const pseudo = $('#pseudo').val();
        const faceclaim = $('#faceclaim').val();
        const image = $('#image').val();
        const credits = $('#credits').val();
        const fiche = $('#fiche').val();
        const jdb = $('#jdb').val();

        try {
            const { data, error } = await supabaseClient
                .from('Registre')
                .insert([{ id, nom, prenom, surnom, ndf, dob, type, plURL, intouche, ryu, dustquash, 
                          parti1, parti2, ronin_details, animal, mangetsuki_details, maison, promo,
                         ecole, otherEcole, occupation1, occupation2, occupation_lieu1, occupation_lieu2,
                         occupation_details1, occupation_details2, cursus1, cursus1_annee, cursus2_annee,
                         option1, option2, cosmoball, cosmo_equipe, cosmo_poste, cosmo_cap, logement,
                         logement_details, logement_type, coloc, pseudo, faceclaim, image, credits, fiche, jdb}]);

            if (error) throw error;
            $('#entryForm')[0].reset();
            fetchDataAndDisplay();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchDataAndDisplay();
    $('#entryForm').submit(handleFormSubmit);
});
