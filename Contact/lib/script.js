let genderValue = male.checked ? "male" : "female";

function getGender(){
    return document.querySelector('input[name="gender"]: checked');
}

let fields = {};

document.addEventListener("DOMContentLoaded", function(){
    fields.firstName = document.getElementById('firstName');
    fields.lastName = document.getElementById('lastName');
    fields.email = document.getElementById('email');
    fields.address = document.getElementById('address');
    fields.houseNumber = document.getElementById('houseNumber');
    fields.country = document.getElementById('country');
    fields.password = document.getElementById('password');
    fields.passwordCheck = document.getElementById('passwordCheck');
    fields.newsletter = document.getElementById('newsletter');
    fields.question = document.getElementById('question');

});

function isNotEmpty(value){
    if(value == null || typeof value == 'undefined'){
        return (value.length > 0);
    }
}

function isNumber(num){
    return (num.length > 0 ) && !isNaN(num);
}

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function isPasswordValid(password){
    return password.length > 5 ? true : false;
}