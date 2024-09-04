let nom 
let mail
let message

mail = document.getElementById('email').value
nom = document.getElementById('name').value
message = document.getElementById('message').value 

document.getElementById('submit').addEventListener('submit', function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "Lorelei@wannyn.fr",
        Password: "6A3D0FDB33424BA3DEF386BD8487A8D7431D",
        To: 'lorelei@wannyn.fr',
        From: "lorelei@wannyn.fr",
        Subject: "Email de Test",
        Body: nom + mail  + message,
    })
    .then(function (message) {
        alert("Email envoyé avec succès") // Message d'alerte en cas de succès de l'envoi de l'email
    });
})