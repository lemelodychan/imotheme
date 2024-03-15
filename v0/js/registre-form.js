import { createClient } from '@supabase/supabase-js';

async function initSupabase() {
  const supabaseUrl = 'https://gbejdguvqhsdvwtmqfbp.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZWpkZ3V2cWhzZHZ3dG1xZmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NjUxOTksImV4cCI6MjAyNjA0MTE5OX0.kK8RMRPvXehp86KIM-sXfq9qERgaSLEFOqXuwZVZUqw';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  document.getElementById('entryForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('id').value, 10);
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const surnom = document.getElementById('surnom').value;
    const ndf = document.getElementById('ndf').value;

    try {
      const { data, error } = await supabase
        .from('registre')
        .insert([{ id, nom, prenom, surnom, ndf }]);

      if (error) throw error;
      alert('Entry added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add entry. Ensure the ID is unique and all fields are correctly filled.');
    }
  });
}

initSupabase();
