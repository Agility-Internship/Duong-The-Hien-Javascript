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
    let isValid = true;
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
function validationEmty(isValid, listInput) {
    // display error when user does not enter form
    listInput.forEach(input => {
        input.value = input.value.trim();

        if (isValid == false) {
            showError(input, 'cannot be left blank')
        } else {
            showSuccess(input);
        }
    })
}
/**
 * Validation for Email
 */
function checkEmailError(input) {
    //Check and return the result when the user enters it, if it's true, it returns true, if it's not, it returns false
    // regexEmail = must have @ character
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
function validationEmail(isEmailError, input) {
    // Get the result returned from isEmailError , if true then showSucces(), false showError with message
    if (isEmailError == false) {
        showError(input, 'Email Invalid');
    } else {
        showSuccess(input);
    }
}
/**
 * Validation for charcaters
 */
function checkCharacter(input) {
    // Check if the input the user entered is empty or not
    // Allow names with Vietnamese accents
    const regexCharacter = /[ ^a-z-A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

    if (regexCharacter.test(input.value)) {
        return true;
    } else {
        return false;
    }
}
function validationFullName(isCharacterError, input) {
    // Get the result returned from checkCharacter , if true then showSuccess(), false showError with message
    if (isCharacterError == false) {
        showError(input, 'Name cannot contain characters')
    } else {
        showSuccess(input)
    }
}
/**
 * Validation for limit of number
 */
function checkLimitNumberError(input, min, max) {
    // Add 2 arguments min and max , check people condition limit users when entering form
    // Greater than or less than the argument, both return false
    if (input.value < min) {
        return false;
    }
    if (input.value > max) {
        return false;
    }
    return true;
}
function validationAge(isLimitError, input, min, max) {
    // Get the result returned from checkLimitNumberError ,false and meet the conditions showError with message
    if (isLimitError == false && input.value < min) {
        showError(input, `Number must be larger than ${min}`);
    }
    if (isLimitError == false && input.value > max) {
        showError(input, `Number must be small than ${max}`);
    }
}

/**
 * Event submit
 */
formId.addEventListener('submit', function (e) {
    e.preventDefault()

    let isValid = checkEmtyError([nameId, emailId, ageId]);
    validationEmty(isValid, [nameId, emailId, ageId]);
    let isEmailError = checkEmailError(emailId);
    validationEmail(isEmailError, emailId);
    let isCharacterError = checkCharacter(nameId);
    validationFullName(isCharacterError, nameId);
    let isLimitError = checkLimitNumberError(ageId, 5, 150);
    validationAge(isLimitError, ageId, 5, 150);
});