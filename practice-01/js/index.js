const formId = document.querySelector('#form-survey');
const nameId = document.querySelector('#fullname');
const emailId = document.querySelector('#email');
const ageId = document.querySelector('#age');

/**
 * Show a message to the user when submitting
 */
function showError(input, message) {
    // If false error message and invalid CSS
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.add('invalid');
    errorMessage.innerText = message;
}
function showSuccess(input) {
    // If it's true, there's no message
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.remove('invalid');
    errorMessage.innerText = '';
}

/**
 * Validation for the blank
 */
function checkEmtyError(listInput) {
    // Check if the user has entered or not
    // Not > report an error
    let isValid;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            isValid = false;
        } else {
            isValid = true;
        }
    });
    return isValid;
}
/**
 * Validation for Email
 */
function checkEmailError(input) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    input.value = input.value.trim();

    let isEmailError = !regexEmail.test(input.value);

    if (regexEmail.test(input.value)) {
        isEmailError = true;
    } else {
        isEmailError = false;
    }
    return isEmailError;
}
/**
 * Validation for charcaters
 */
function checkCharacter(input) {
    const regexCharacter = /[ ^a-z-A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

    if (regexCharacter.test(input.value)) {
        return true;
    } else {
        return false;
    }
}
/**
 * Validation for limit of number
 */
function checkLimitNumberError(input, min, max) {

    if (input.value < min) {
        return false;
    }
    if (input.value > max) {
        return false;
    }
    return true;
}
/**
 * Event submit
 */
formId.addEventListener('submit', function (e) {
    e.preventDefault()

    let isValid = checkEmtyError([nameId, ageId, emailId]);
    let isCharacterError = checkCharacter(nameId);
    let isEmailError = checkEmailError(emailId);
    let isLimitError = checkLimitNumberError(ageId, 5, 150);
});