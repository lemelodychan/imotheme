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
                const listItem = `<li>ID: ${item.id}, Nom: ${item.nom}, Prenom: ${item.prenom}, Surnom: ${item.surnom}, NDF: ${item.ndf}</li>`;
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

        try {
            const { data, error } = await supabaseClient
                .from('Registre')
                .insert([{ id, nom, prenom, surnom, ndf }]);

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
