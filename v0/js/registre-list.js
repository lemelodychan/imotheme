$(document).ready(function() {
    async function fetchAndDisplayItems() {
        try {
            const { data, error } = await supabase
                .from('Registre') 
                .select('*'); 
            if (error) throw error;

            $('#itemList').empty();
            data.forEach(item => {
                const listItem = `<li>ID: ${item.id}, Nom: ${item.nom}, Prenom: ${item.prenom}, Surnom: ${item.surnom}, NDF: ${item.ndf}</li>`;
                $('#itemList').append(listItem);
            });
          
        } catch (error) {
            console.error('Error:', error);
        }
    }
    fetchAndDisplayItems();
  
});
