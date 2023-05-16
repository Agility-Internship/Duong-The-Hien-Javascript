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
 * Check blanks and pass arguments back to the function that displays the message
 */
function checkEmtyError(listInput) {
    // Return the result of check
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
    // Pass arguments based on the returned result
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
 * Check email syntax and pass arguments back to the function that displays the message
 */
function checkEmailError(input) {
    // Return the result of check
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
    // Pass arguments based on the returned result
    if (isEmailError == false) {
        showError(input, 'Email Invalid');
    } else {
        showSuccess(input);
    }
}
/**
 * Check character entered and pass arguments back to the function that displays the message
 */
function checkCharacter(input) {
    // Return the result of check
    const regexCharacter = /[ ^a-z-A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

    if (regexCharacter.test(input.value)) {
        return true;
    } else {
        return false;
    }
}
function validationFullName(isCharacterError, input) {
    // Pass arguments based on the returned result
    if (isCharacterError == false) {
        showError(input, 'Name cannot contain characters')
    } else {
        showSuccess(input)
    }
}
/**
 * Check the limit of the number and pass arguments back to the function that displays the message
 */
function checkLimitNumberError(input, min, max) {
    // Return the result of check
    if (input.value < min) {
        return false;
    }
    if (input.value > max) {
        return false;
    }
    return true;
}
function validationAge(isLimitError, input, min, max) {
    // Pass arguments based on the returned result
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