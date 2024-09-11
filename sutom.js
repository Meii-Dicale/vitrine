// création d'une liste de mots 
let words = ["pomme", "banane", "cerise", "noix", "ananas","éléphant","crocodile","chenille","chat","escargot","noël"];

console.log(words);

// Création d'une fonction pour choisir un mot du tableau 

function randomword(words) {
   return words[Math.floor(Math.random() * words.length)];
}

// stocker le mot aléatoire dans une variable
let random = randomword(words);
let majuscule = random.toUpperCase()
console.log(random);

let sansAccents = majuscule.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// découper le mot en tableau et stocker chaque lettre dans une variable 


let letters = sansAccents.split("");
console.log(letters);

// compter le nombre d'élément dans letters

let count = letters.length;
console.log(count);

// créer un tableau dans la div grid
let grid = document.getElementById("grid")

let table = document.createElement("table");
grid.appendChild(table);


// création de 6 lignes pour chaque lettre tableau

for ( i = 0; i < 6; i++) {
    // console.log(i);
    let row = document.createElement("tr")
    row.setAttribute("id","try"+i)
    table.appendChild(row)
    for ( j = 0; j < letters.length; j++) {
        // console.log(j);
        let cell = document.createElement("td")
        cell.setAttribute("id","letter"+i+j)
        row.appendChild(cell)
        cell = letters[j]
    }
}


// Variable pour suivre la position de la lettre
let currentRow = 0;
let currentCol = 0;
console.log(currentRow +","+ currentCol)
// Sélectionner toutes les divs avec un attribut data-lettre
let lettreDivs = document.querySelectorAll('div[data-lettre]');
// Boucle à travers chaque div et ajout de l'écouteur d'événements
lettreDivs.forEach(div => {
    div.addEventListener('click', function() {
        // Récupérer la valeur de l'attribut data-lettre
        let lettre = div.getAttribute('data-lettre');
        console.log('Lettre cliquée :', lettre);
        //test pour voir si lettre récupère bien la valeur        // Effacer la case précédente si on appuie sur effacer
        if (lettre === "_effacer") {
            console.log("EFFACE MOI CA");
            console.log(currentRow +","+ currentCol)
            let cell = document.getElementById("letter" + currentRow + (currentCol-1))
            if (currentCol > 0) {
            currentCol--;}
            else { return}
            cell.textContent ="" ;
            console.log(currentRow +","+ currentCol)
        }else {
            if (currentCol < letters.length && lettre === "_entree") {
                return

            }
        if (currentCol < letters.length ) {  // S'assurer que la colonne ne dépasse pas la longueur du mot
                let cell = document.getElementById("letter" + currentRow + currentCol);
                cell.textContent = lettre;
                currentCol++; // Passer à la prochaine colonne
                console.log(currentRow +","+ currentCol)
        }


               // Si la ligne est terminée, passer à la ligne suivante
               if (currentCol === letters.length && lettre === "_entree") { verify
                
                // ICI il faut ajouter une fonction qui compare les éléments
               function verify () {
                    for(currentCol = 0, currentCol > count; currentCol++;);
                    let cell = document.getElementById("letter" + currentRow + currentCol);
                console.log(cell);
                        if (cell.textContent = letters[currentCol])
                        { cell.addAttribute ("class", "correct")
                } //else { return}
                }  
                currentRow++; // passer à la ligne 
                currentCol = 0; // Réinitialiser la colonne pour la prochaine ligne
                
                }else {
              return; }
    }});
});

