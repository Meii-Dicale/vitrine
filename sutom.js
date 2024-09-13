// TEST LOCAL STORAGE POUR LES VICTOIRES 

let compteurwin = 0
let compteurloose = 0
let nombreessais = 0
let moyenne = 0



if (localStorage.getItem('compteurwin')) {
    compteurwin = parseInt(localStorage.getItem('compteurwin'))
}

if (localStorage.getItem('compteurloose')) {
    compteurloose = parseInt(localStorage.getItem('compteurloose'))
}
if (localStorage.getItem('moyenne')) {
    moyenne = parseInt(localStorage.getItem('moyenne'))
}
if (localStorage.getItem('nombreessais')) {
    nombreessais = parseInt(localStorage.getItem('nombreessais'))
}
if (compteurwin > 0) {
    moyenne = Math.round(nombreessais / (compteurwin + compteurloose));
}
console.log ( "essais" + nombreessais)
console.log('moyenne'+ moyenne)


console.log('win' + compteurwin) //
console.log('loose'+ compteurloose)

vic = document.getElementById('victoires')
vic.innerHTML = compteurwin
loss = document.getElementById('defaites')
loss.innerHTML = compteurloose
moy = document.getElementById('tentatives')
moy.innerHTML = moyenne


////////////////////////////////

// création d'une liste de mots 
let words = ["pomme", "banane", "cerise", "noix", "ananas", "éléphant", "crocodile", "chenille", "chat", "escargot", "noël","carnaval","cuisine","service","festival",];

// console.log(words);

// Création d'une fonction pour choisir un mot du tableau 

function randomword(words) {
    return words[Math.floor(Math.random() * words.length)];
}

// stocker le mot aléatoire dans une variable
let random = randomword(words);
let majuscule = random.toUpperCase()
// console.log(random);

let sansAccents = majuscule.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// découper le mot en tableau et stocker chaque lettre dans une variable 


let letters = sansAccents.split("");
// console.log(letters);

// compter le nombre d'élément dans letters

let count = letters.length;
// console.log(count);

// créer un tableau dans la div grid
let grid = document.getElementById("grid")

let table = document.createElement("table");
grid.appendChild(table);


// création de 6 lignes pour chaque lettre tableau

for (i = 0; i < 6; i++) {
    // // console.log(i);
    let row = document.createElement("tr")
    row.setAttribute("id", "try" + i)
    table.appendChild(row)
    for (j = 0; j < letters.length; j++) {
        // // console.log(j);
        let cell = document.createElement("td")
        cell.setAttribute("id", "letter" + i + j)
        row.appendChild(cell)
        if (j === 0 ) {
            let first = letters[0]
            cell.textContent  = first
            // console.log(cell);
            // console.log(first);
            
        }
        cell = letters[j]
       
    }
}
// Variable pour suivre la position de la lettre
let currentRow = 0;
let currentCol = 1;
// console.log(currentRow +","+ currentCol)

// Sélectionner toutes les divs avec un attribut data-lettre
let lettreDivs = document.querySelectorAll('div[data-lettre]');
// Boucle à travers chaque div et ajout de l'écouteur d'événements
lettreDivs.forEach(div => {
    div.addEventListener('click', function () {
        // Récupérer la valeur de l'attribut data-lettre
        let lettre = div.getAttribute('data-lettre');
        // console.log('Lettre cliquée :', lettre);
        //test pour voir si lettre récupère bien la valeur        // Effacer la case précédente si on appuie sur effacer
        if (lettre === "_effacer") {
            // console.log("EFFACE MOI CA");
            // console.log(currentRow + "," + currentCol)
            let cell = document.getElementById("letter" + currentRow + (currentCol - 1))
            if (currentCol > 0) {
                currentCol--;
            }
            else { return }
            cell.textContent = "";
            // console.log(currentRow + "," + currentCol)
        } else {
            if (currentCol < letters.length && lettre === "_entree") {
                return

            }
            if (currentCol < letters.length) {  // S'assurer que la colonne ne dépasse pas la longueur du mot
                let cell = document.getElementById("letter" + currentRow + currentCol);
                cell.textContent = lettre;
                currentCol++; // Passer à la prochaine colonne
                // console.log(currentRow + "," + currentCol)

            }


               // Si la ligne est terminée, passer à la ligne suivante et vérification de placement et victoire
               if (currentCol === letters.length && lettre === "_entree") 
                { verifyredAndOrange(letters, currentRow)
                  let victoire = win(letters, currentRow);
                  nombreessais ++;
                  localStorage.setItem('nombreessais', nombreessais);
                  if (!victoire && currentRow === 5) {  // 5 car les lignes sont indexées de 0 à 5 (6 essais en tout)
                    loose(letters, currentRow, currentCol);
                }

                currentRow++; // passer à la ligne 
                currentCol = 1; // Réinitialiser la colonne pour la prochaine ligne

            } else {
                
                return;
            }
        }
    });
});

addEventListener('keydown', function (event) {
    // Convertir la touche en majuscule
    let maj = event.key;
    let lettre = maj.toUpperCase();

    console.log('Touche pressée :', event.key);
    
    // Vérifier si c'est la touche "Backspace" pour effacer
    if (event.key === "Backspace") {
        lettre = "_effacer";
        console.log('Lettre :', lettre);
    }

    // Sélectionner le div correspondant à la lettre
    let lettreDiv = document.querySelector(`div[data-lettre='${lettre}']`);

    // Si un div existe pour cette lettre, simuler un clic
    if (lettreDiv) {
        lettreDiv.click();
    }

    // Gérer l'appui sur "Enter" pour valider
    if (event.key === "Enter") {
        let entreeDiv = document.querySelector(`div[data-lettre='_entree']`);
        if (entreeDiv) {
            entreeDiv.click();
        }
    }
});


// Fonction de vérification des lettres ( on défini la victoire en true, et dès qu'une lettre est mal placé ou incorrect la valeur gagné passe en false)
/* function verifyred(letters, currentRow, lettre, repetitions,){
    
    for (let col = 0; col < letters.length; col++) {
        let currentAttempt = [];
        let cell = document.getElementById("letter" + currentRow + col);
        let lalettre = cell.textContent;
        let keyboardKey = document.querySelector(`div[data-lettre='${lalettre}']`);
        // console.log(keyboardKey);
        countRepetitions(letters)
        currentAttempt.push(lalettre);
        // si la lettre de la colonne actuelle correspond la lettre du la liste (meme position) alors ajout de correct
        if (cell.textContent === letters[col] && ){
            cell.setAttribute("class", "correct");
            keyboardKey.setAttribute("class", "correctkey");
            repetitions[lalettre]--;
            
            } 
            else {
            // si la lettre de la colonne actuelle est contenu dans la liste alors ajout de misplaced
            
                
                    
                        
                    };       
    }
}; */
function win(letters, currentRow) {
    for (let col = 0; col < letters.length; col++) {
        // console.log(col);
        let cell = document.getElementById("letter" + currentRow + col);
        
        // Si une des lettres n'est pas correcte, retour sans victoire
        if (cell.getAttribute("class") !== "correct") {
            return false; 
        }
    }
    
    // Si on arrive à la fin de la boucle, toutes les lettres sont correctes
    alert("Victoire !");
    compteurwin++;
    localStorage.setItem('compteurwin', compteurwin);
    location.reload();
    return true;  // Le joueur a gagné
}
/* function verifyorange (letters , currentRow) {
    for (let col = 0; col < letters.length; col++) {
        let cell = document.getElementById("letter" + currentRow + col);
        let lalettre = cell.textContent;
        let keyboardKey = document.querySelector(`div[data-lettre='${lalettre}']`);
        if (letters.includes(cell.textContent ) ) {
            cell.setAttribute("class", "misplaced");
           // ajouter une classe sur le clavier
           keyboardKey.setAttribute("class", "misplacedkey");}
           else {
          
            // si pas correct ou pas misplaced alors incorrect et victoire false
                     cell.setAttribute("class", "incorrect");
                     keyboardKey.setAttribute("class", "incorrectkey");
                     
                    } 
           

           } } */
    

// la partie est perdu si on a appuyé sur entree et que la colonne est la dernière, la ligne 6 et que la fonction win n'abouti pas


function loose(letters, currentRow, currentCol, compteurloose) {
    let cell = document.getElementById("letter" + currentRow + (currentCol - 1)); // dernière lettre entrée
    if (currentRow === 5 && currentCol === letters.length && cell.getAttribute("class") !== "correct") {
        alert("Perdu! Tu as raté le mot : " + letters.join(""));
        compteurloose++;
        localStorage.setItem('compteurloose', compteurloose);
        location.reload();
        return true; // Le joueur a perdu
    }
    return false; // Le joueur n'a pas encore perdu
}

function countRepetitions(letters) {
    let letterCount = {};

    letters.forEach(letter => {
        // Si la lettre existe déjà dans l'objet, on incrémente son compteur
        if (letterCount[letter]) {
            letterCount[letter]++;
        } else {
            // Sinon, on l'ajoute avec une valeur initiale de 1
            letterCount[letter] = 1;
        }
    });

    return letterCount;
}

let repetitions = countRepetitions(letters);    
// console.log(repetitions);

// Changement de fonction car il faut d'abord vérifier toutes les rouges puis les oranges plutot que de vérifier cellule par cellule
function verifyredAndOrange(letters, currentRow) {
    // Compter le nombre d'apparitions de chaque lettre dans le mot à deviner
    let repetitions = countRepetitions(letters);
    // console.log("Répartition des lettres dans le mot:", repetitions);

    // Liste pour stocker les lettres de la tentative actuelle
    let currentAttempt = [];

    // Première passe : vérifier et marquer les lettres correctement placées (rouge)
    for (let col = 0; col < letters.length; col++) {
        let cell = document.getElementById("letter" + currentRow + col);
        let lalettre = cell.textContent; // on récupère la lettre pour la décompter après
        currentAttempt.push(lalettre); // Ajouter la lettre dans la tentative actuelle
        let keyboardKey = document.querySelector(`div[data-lettre='${lalettre}']`); //ajoute la lettre qui a été tapé dans la variable

        // Si la lettre est à la bonne position, on la marque comme correcte (rouge)
        if (cell.textContent === letters[col]) {
            cell.setAttribute("class", "correct"); // applique une classe sur la cellulle
            keyboardKey.setAttribute("class", "correctkey"); // applique une classe sur le clavier
            repetitions[lalettre]--; // Décrémenter le compteur de cette lettre
        }
    }

    // Deuxième passe : vérifier les lettres mal placées (orange) ou incorrectes
    for (let col = 0; col < letters.length; col++) {
        let cell = document.getElementById("letter" + currentRow + col);
        let lalettre = cell.textContent; // on récupère la lettre pour la décompter après 
        let keyboardKey = document.querySelector(`div[data-lettre='${lalettre}']`);

        // Si la lettre n'est pas correcte et est ailleurs dans le mot
        if (cell.getAttribute("class") !== "correct" && letters.includes(lalettre)) {
            // Si la lettre a encore des occurrences disponibles (répétitions restantes)
            if (repetitions[lalettre] > 0) {
                cell.setAttribute("class", "misplaced");
                keyboardKey.setAttribute("class", "misplacedkey");
                repetitions[lalettre]--; // Décrémenter le compteur de cette lettre
            } else {
                // Si la lettre est en surplus, la marquer comme incorrecte (gris)
                cell.setAttribute("class", "incorrect");
                keyboardKey.setAttribute("class", "incorrectkey");
            }
        } else if (cell.getAttribute("class") !== "correct") {
            // Si la lettre n'est ni correcte ni mal placée, la marquer comme incorrecte
            cell.setAttribute("class", "incorrect");
            keyboardKey.setAttribute("class", "incorrectkey");
        }
    }
};


