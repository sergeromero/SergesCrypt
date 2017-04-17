$(document).ready(() => {
    'use script';

    let spin = () => {
        theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);
    };

    let loginButton = document.getElementById("loginButton");
    let registrationButton = document.getElementById('registrationButton');
    loginButton.addEventListener("click", spin);
    registrationButton.addEventListener("click", spin);
})