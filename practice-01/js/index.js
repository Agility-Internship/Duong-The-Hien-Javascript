const formElement = document.querySelector('#form-survey');
const userName = document.querySelector('#fullname');
const isEmail = document.querySelector('#email');
const isAge = document.querySelector('#age');

/* ------------------------------------*\
  Show a message to the user when submitting
\*------------------------------------*/

// If false error message and invalid CSS
function showError(input, message) {
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.add('invalid');
    errorMessage.innerText = message;
}
// If it's true, there's no message
function showSuccess(input) {
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.remove('invalid');
    errorMessage.innerText = '';
}

/* ------------------------------------*\
  Validation check
\*------------------------------------*/
// Check the form, the user has entered it or not
// Check if the user has entered or not,
// Not > report an error
function checkEmtyError(listInput) {
    let isEmtyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim();

        if (!input.value) {
            isEmtyError = true;
            showError(input, 'cannot be left blank');
        } else {
            showSuccess(input);
        }
    });
    return isEmtyError;
}
// Validation for Email
function checkEmailError(input) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    input.value = input.value.trim();

    let isEmailError = !regexEmail.test(input.value);

    if (regexEmail.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email Invalid')
    }
    return isEmailError;
}
// Check the name has characters
function checkCharacter(input) {
    const regexCharacter = /[ ^a-z-A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

    if (regexCharacter.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Wrong input');
    }
}
// Check tra limit of number
function checkLimitNumberError(input, min, max) {

    if (input.value < min) {
        showError(input, `Number must be larger than ${min}`);
        return true;
    }
    if (input.value > max ) {
        showError(input, `Number must be small than ${max}`);
        return true;
    }

    showSuccess(input);
    return false;
}
// event submit
formElement.addEventListener('submit', function (e) {
    e.preventDefault()

    let isEmtyError = checkEmtyError([userName, isAge, isEmail]);
    let isCharacterError = checkCharacter(userName);
    let isEmailError = checkEmailError(isEmail);
    let isLimitError = checkLimitNumberError(isAge, 5, 150);
});