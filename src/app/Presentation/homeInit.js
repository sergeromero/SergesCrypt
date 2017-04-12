$(document).ready(() => {
    'use script';

    let loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", () => {
        theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);
    })
})