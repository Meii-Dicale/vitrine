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


               // Si la ligne est terminée, passer à la ligne suivante et vérification de placement et victoire
               if (currentCol === letters.length && lettre === "_entree") 
                { verify(letters, currentRow);
                  win(letters, currentRow);



                
                
             
                currentRow++; // passer à la ligne 
                currentCol = 0; // Réinitialiser la colonne pour la prochaine ligne
                
                }else {
              return; }
    }});
});


// Fonction de vérification des lettres ( on défini la victoire en true, et dès qu'une lettre est mal placé ou incorrect la valeur gagné passe en false)
function verify(letters, currentRow, lettre){
    
    for (let col = 0; col < letters.length; col++) {
        let cell = document.getElementById("letter" + currentRow + col);
        let lalettre = cell.textContent;
        let keyboardKey = document.querySelector(`div[data-lettre='${lalettre}']`);
        console.log(keyboardKey);
        // si la lettre de la colonne actuelle correspond la lettre du la liste (meme position) alors ajout de correct
        if (cell.textContent === letters[col]){
            cell.setAttribute("class", "correct");
            keyboardKey.setAttribute("class", "correctkey");
            
            } 
            else {
            // si la lettre de la colonne actuelle est contenu dans la liste alors ajout de misplaced
                 if (letters.includes(cell.textContent) ) {
                  cell.setAttribute("class", "misplaced");
                 // ajouter une classe sur le clavier
                 keyboardKey.setAttribute("class", "misplacedkey");
                 

                 } 
                    else {
          
            // si pas correct ou pas misplaced alors incorrect et victoire false
                     cell.setAttribute("class", "incorrect");
                     keyboardKey.setAttribute("class", "incorrectkey");
                     
                    } 
                        
                    };       
    }
};
function win(letters, currentRow) {
    for (let col = 0; col < letters.length; col++) {
        console.log(col);
        let cell = document.getElementById("letter" + currentRow + col);
        
        // Si une des lettres n'est pas correcte, retour sans victoire
        if (cell.getAttribute("class") !== "correct") {
            return false; 
        }
    }
    
    // Si on arrive à la fin de la boucle, toutes les lettres sont correctes
    alert("Victoire !");
    return true;  // Le joueur a gagné
}