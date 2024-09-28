let red = document.getElementById ('clickme');
let blue = document.getElementById ('dontclickme');
let body = document.querySelector("body");

red.addEventListener("click", function() {
    body.classList.value = "pilulered";
     // ajouter les enfants du body 
    const children = document.querySelectorAll("body ");
    console.log(children);
    children.forEach(function(child) {
        console.log(child);
        child.classList.value = "pilulered";
    });
  
    const navbar = document.querySelectorAll("navbar");
    console.log(navbar);
    navbar.classList.value ="rednavbar";
})

// cliquer sur red pour ajouter la class pilulered à tous les éléments enfants du body

