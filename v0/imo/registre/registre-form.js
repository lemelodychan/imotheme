$(document).ready(function() {
    const supabaseUrl = 'https://gbejdguvqhsdvwtmqfbp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZWpkZ3V2cWhzZHZ3dG1xZmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NjUxOTksImV4cCI6MjAyNjA0MTE5OX0.kK8RMRPvXehp86KIM-sXfq9qERgaSLEFOqXuwZVZUqw';
    const { createClient } = supabase;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    $('#entryForm').submit(async function(e) {
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
            alert('Entry added successfully!');
            $('#entryForm')[0].reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add entry. Ensure the ID is unique and all fields are correctly filled.');
        }
    });
});
