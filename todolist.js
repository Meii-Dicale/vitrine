let modeSombreActif = false; // État du mode sombre => Lorelei

document.getElementById("sombre").addEventListener("click", function () { // on suit le bouton de changement de mode => Greg
    document.body.classList.toggle("sombre"); // Appliquer ou retirer la classe sombre au body => Greg
    modeSombreActif = !modeSombreActif; // Basculer l'état de la variable mode sombre => Lorelei

    [...document.querySelectorAll("*")].forEach((tout) => { // Appliquer ou retirer la classe sombre aux balises => Greg
        tout.classList.toggle('sombre', modeSombreActif); // Appliquer ou retirer la classe sombre => Lorelei + Greg
    });
});


let add = document.getElementById('add'); // Ajouter une tâche => Oussama
let champFormulaire = document.getElementById('input'); // Champs de texte => Oussama
let list = document.getElementById('list'); // Liste des tâches => Oussama

function creator(sorte,texte,fonction) { // fonction de création de balise avec paramètres => Greg
    let balise = document.createElement(sorte); // balise => Oussama
    balise.textContent = texte; // texte => Oussama
    if (sorte == 'button') {    // si la balise est un bouton => Greg
        balise.addEventListener('click',fonction); // on ajoute l'event => Greg
    }
    return balise; // et on retourne la balise => Greg
}
champFormulaire.addEventListener('keypress', function (event) { // on ajoute l'event de clavier => lorelei / Greg
    if (event.key === 'Enter') { // si on appuie sur entrée => Lorelei / Greg
        generateur(); // on exécute la fonction => lorelei
    }
})
add.addEventListener('click', generateur); // on ajoute l'event de click => Lorelei

function generateur() { // fonction de création d'une nouvelle tâche => Oussama
    let taskText = champFormulaire.value; // on recupere le contenu de l'input => Oussama
    if (!taskText) { // si la tâche est vide => Lorelei
        alert("Veuillez entrer une Tâche"); // on affiche une alerte => Lorelei
        return;} // et on sort de la fonction => Lorelei
    let li = creator('li', taskText);  // on creer le li conteneur => Oussama
    let box = creator('input', ''); // on creer la checkbox => Lorelei
    let boutonsupp = creator('button', 'supprimer',function () { // on creer le bouton supprimer => Oussama + Greg
        this.parentElement.remove();});
    let boutonsauv = creator('button', 'modifier',function () { // on creer le bouton modifier => Oussama + Greg
        let choix = prompt("Voulez-vous modifier ?", // on demande la modification => Oussama + Lorelei
             this.parentElement.firstChild.textContent); // et on met le contenu actuel par défaut => Greg
        if (choix) {
            li.textContent = choix; 
            li.appendChild(box);
            li.appendChild(boutonsauv);
            li.appendChild(boutonsupp);
            }});
    box.type = 'checkbox'; // on ajoute le type checkbox => Lorelei
    if (modeSombreActif) { // si le mode sombre est actif => Lorelei + Greg
        li.classList.add('sombre'); // on ajoute la classe sombre => Lorelei + Greg
        box.classList.add('sombre');
        boutonsupp.classList.add('sombre');
        boutonsauv.classList.add('sombre');
    }
    list.appendChild(li); // on ajoute le li conteneur avec toutes les balises concaténées => Oussama
    // boutonsupp.textContent = 'supp';
    
    // boutonsupp.addEventListener('click', function () {
        // this.parentElement.remove();});

    // boutonsauv.addEventListener('click', function () {
    //     let choix = prompt("Voulez-vous modifier ?");
    //     if (choix) {
    //         li.textContent = choix; 
    //         li.appendChild(box);
    //         li.appendChild(boutonsauv);
    //         li.appendChild(boutonsupp);
    //         }});
    
    li.appendChild(box); // on ajoute la checkbox => Oussama
    li.appendChild(boutonsauv); // on ajoute le bouton modifier => Oussama
    li.appendChild(boutonsupp); // on ajoute le bouton supprimer => Oussama
    
    champFormulaire.value = ""; // on vide l'input => Oussama
// Récupérer toutes les cases à cocher
let checkboxes = document.querySelectorAll('input[type="checkbox"]'); // on reccupere la balise input => Lorelei

checkboxes.forEach(function(checkbox) { // on boucle sur toutes les cases => Lorelei
    checkbox.addEventListener('change', function() {
        // on vérifie si c'est coché
        if (checkbox.checked) {
            // si oui, on ajoute la classe checked
            checkbox.parentElement.classList.add("checked");
            // et on hidden l'élément parent
            checkbox.parentElement.style.display = "none";
            }
        });
    });

// Quand je clique sur le bouton Montrer les cases cochées apparaissent via display => Lorelei
let boutonMontrer = document.getElementById("montrer"); // on reccupère la balise boutonMontrer => Lorelei

boutonMontrer.addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
        // Si la case est cochée
        if (checkbox.checked) {
            // On affiche l'élément parent
            checkbox.parentElement.style.display = "flex";
        }
        else { 
            checkbox.parentElement.style.display = "none";
        }
    });
});

let boutonCacher = document.getElementById("cacher"); // on reccupère la balise boutonCacher => Lorelei

boutonCacher.addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
        // Si la case n'est pas cochée
        if (!checkbox.checked) {
            // On affiche l'élément parent
            checkbox.parentElement.style.display = "flex";
        }
        else { // sinon on le cache
            checkbox.parentElement.style.display = "none";
        }
    });
});

let tout = document.getElementById("tout"); // on reccupère la balise boutonCacher => Lorelei

tout.addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
        // Si la case n'est pas cochée
        if (!checkbox.checked) {
  
            // On affiche le parent
            checkbox.parentElement.style.display = "flex";
        }
        else { 
            // sinon on l'affiche aussi (tout)
            checkbox.parentElement.style.display = "flex";
        }
    });
});
};


