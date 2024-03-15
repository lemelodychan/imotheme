const lieu1Select = document.getElementById('occupation_lieu1');
const lieu2Select = document.getElementById('occupation_lieu2');
    
function fetchJSONData() {
    const jsonFileURL = 'https://mikrokosmos-rpg.gitlab.io/isekai-monogatari/imo-directory/imo_jobs.json';
    fetch(jsonFileURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const uniqueNomValues = [...new Set(data.map(item => item.nom))];
            populateDropdown(lieu1Select, uniqueNomValues);
            populateDropdown(lieu2Select, uniqueNomValues);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}
function populateDropdown(selectElement, optionsArray) {
    optionsArray.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        selectElement.appendChild(option);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchJSONData();
});

const typeSelect = document.getElementById('type');
const urlDiv = document.getElementById('plLien');
const parti1Select = document.getElementById('parti1');
const parti2Select = document.getElementById('parti2');
const roninDiv = document.getElementById('ronin_pouvoir');
const roninDetailsInput = document.getElementById('ronin_details');
const animalDiv = document.getElementById('animal_forme');
const animalInput = document.getElementById('animal');
const mangetsukiDiv = document.getElementById('mangetsuki_role');
const mangetsukiDetailsSelect = document.getElementById('mangetsuki_details');
const occup1Select = document.getElementById('occupation1');
const occup2Select = document.getElementById('occupation2');
const occup1Details = document.getElementById('occup1_details');
const occup1DetailsInput = document.getElementById('occupation_details1');
const occup2Details = document.getElementById('occup2_details');
const occup2DetailsInput = document.getElementById('occupation_details2');
const etudiantDiv = document.querySelector('.formsection.etudiant');
const cosmoSelect = document.getElementById('cosmoball');
const cosmoptionsDiv = document.getElementById('cosmo_options');

function toggleURLSelect() {
    const selectedType = typeSelect.value;
    const showURLSelect = selectedType === 'Pré-lien' || selectedType === 'Scénario';
    if (showURLSelect) {
        urlDiv.style.display = 'grid';
    } else {
        urlDiv.style.display = 'none';
        showURLSelect.value = '';
    }
}
function toggleOccup1Details() {
    const selectedOccup1 = occup1Select.value;
    const showOccup1Details = selectedOccup1 === '' || selectedOccup1 === 'Étudiant.e';
    if (showOccup1Details) {
        occup1Details.style.display = 'none';
        occup1DetailsInput.value = '';
    } else {
        occup1Details.style.display = 'flex';
    }
}
function toggleOccup2Details() {
    const selectedOccup2 = occup2Select.value;
    const showOccup2Details = selectedOccup2 === '' || selectedOccup2 === 'Étudiant.e';
    if (showOccup2Details) {
        occup2Details.style.display = 'none';
        occup2DetailsInput.value = '';
    } else {
        occup2Details.style.display = 'flex';
    }
}
function toggleRoninDetails() {
    const selectedParti1 = parti1Select.value;
    const selectedParti2 = parti2Select.value;
    const showRoninDetails = selectedParti1 === 'Rōnin' || selectedParti2 === 'Rōnin';
    if (showRoninDetails) {
        roninDiv.style.display = 'inline-flex';
    } else {
        roninDiv.style.display = 'none';
        roninDetailsInput.value = '';
    }
}
function toggleAnimalInput() {
    const selectedParti1 = parti1Select.value;
    const selectedParti2 = parti2Select.value;
    const showAnimalInput = selectedParti1 === 'Henjū' || selectedParti2 === 'Henjū' ||
        selectedParti1 === 'Jūjin' || selectedParti2 === 'Jūjin';
    if (showAnimalInput) {
        animalDiv.style.display = 'inline-flex';
    } else {
        animalDiv.style.display = 'none';
        animalInput.value = '';
    }
}
function toggleMangetsukiDetailsSelect() {
    const selectedParti1 = parti1Select.value;
    const selectedParti2 = parti2Select.value;
    const showMangetsukiDetailsSelect = selectedParti1 === 'Mangetsuki' || selectedParti2 === 'Mangetsuki';

    if (showMangetsukiDetailsSelect) {
        mangetsukiDiv.style.display = 'inline-flex';
    } else {
        mangetsukiDiv.style.display = 'none';
        mangetsukiDetailsSelect.value = '';
    }
}
function toggleEtudiantDetails() {
    const selectedOccup1 = occup1Select.value;
    const selectedOccup2 = occup2Select.value;
    const etudiantInputs = document.querySelectorAll('.formsection.etudiant input, .formsection.etudiant select');
    const showEtudiantDetails = selectedOccup1 === 'Étudiant.e' || selectedOccup2 === 'Étudiant.e';
    if (showEtudiantDetails) {
        etudiantDiv.style.display = 'grid';
    } else {
        etudiantDiv.style.display = 'none';
        etudiantInputs.forEach(element => {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.value = '';
            } else if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            }
        });
    }
}
function toggleCosmoSelect() {
    const selectedCosmo = cosmoSelect.value;
    const cosmoInputs = document.querySelectorAll('#cosmo_options input, #cosmo_options select');
    const showCosmoSelect = selectedCosmo === 'Yes';
    if (showCosmoSelect) {
        cosmoptionsDiv.style.display = 'grid';
    } else {
        cosmoptionsDiv.style.display = 'none';
        cosmoInputs.forEach(element => {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.value = '';
            } else if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            }
        });
    }
}

typeSelect.addEventListener('change', () => {
    toggleURLSelect();
});
parti1Select.addEventListener('change', () => {
    toggleRoninDetails();
    toggleAnimalInput();
    toggleMangetsukiDetailsSelect();
});
parti2Select.addEventListener('change', () => {
    toggleRoninDetails();
    toggleAnimalInput();
    toggleMangetsukiDetailsSelect();
});
occup1Select.addEventListener('change', () => {
    toggleOccup1Details();
    toggleEtudiantDetails();
});
occup2Select.addEventListener('change', () => {
    toggleOccup2Details();
    toggleEtudiantDetails();
});
cosmoSelect.addEventListener('change', () => {
    toggleCosmoSelect();
});
toggleURLSelect();
toggleRoninDetails();
toggleAnimalInput();
toggleMangetsukiDetailsSelect();
toggleOccup1Details();
toggleOccup2Details();
toggleEtudiantDetails();
toggleCosmoSelect();

const ecoleSelect = document.getElementById('ecole');
const otherEcoleInput = document.getElementById('otherEcoleInput');
const occupationInputs = document.querySelectorAll('input[name="occupation[]"]');

ecoleSelect.addEventListener('change', () => {
    if (ecoleSelect.value === 'Autre') {
        otherEcoleInput.style.display = 'flex';
    } else {
        otherEcoleInput.style.display = 'none';
        document.getElementById('otherEcole').value = '';
    }
});
