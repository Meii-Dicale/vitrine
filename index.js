let red = document.getElementById('clickme');
let blue = document.getElementById('dontclickme');
let body = document.querySelector("body");
let matrice = document.getElementById("matrice");
let navbar = document.querySelector(".navbar"); // Assurez-vous que l'élément navbar a cette classe
let originalMatriceSrc = matrice.src; // Sauvegarde de l'URL originale de l'image

red.addEventListener("click", function() {
    body.classList.add("pilulered"); // Ajoute plutôt que remplace toutes les classes
    
    // Sélectionner et changer la classe des enfants du body
    const children = body.querySelectorAll("*");
    children.forEach(function(child) {
        child.classList.add("pilulered");
    });
  
    // Changer la classe de la navbar
    if (navbar) {
        navbar.classList.add("rednavbar");
    }
    
    // Remplacer le gif de la matrice par le lapin
    if (matrice) {
        matrice.src = "lapin.gif";
    }
});

blue.addEventListener("click", function() {
    // Enlever la classe pilulered du body et des enfants
    body.classList.remove("pilulered");
    
    const children = body.querySelectorAll("*");
    children.forEach(function(child) {
        child.classList.remove("pilulered");
    });
    
    // Enlever la classe rednavbar de la navbar
    if (navbar) {
        navbar.classList.remove("rednavbar");
    }
    
    // Remettre l'image originale dans la matrice
    if (matrice) {
        matrice.src = "matrix.gif";
    }
});
