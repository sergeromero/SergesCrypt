$(document).ready(() => {
    'use script';

    let spin = () => {
        theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);
    };
    
    theCrypt.Initializers.Login.init(spin);    
});