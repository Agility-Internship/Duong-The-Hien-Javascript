const formId = document.querySelector('#form-survey');
const nameId = document.querySelector('#fullname');
const emailId = document.querySelector('#email');
const ageId = document.querySelector('#age');

/**
 * display error message and add invalid class to display error status
 * @param  input  : results from functional validations
 * @param  message: results from functional validations
 */
function showError(input, message) {
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.add('invalid');
    errorMessage.innerText = message;
}

/**
 * change display of error messages to success and remove invalid class
 * @param input : results from functional validations
 */
function showSuccess(input) {
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.remove('invalid');
    errorMessage.innerText = '';
}

/**
 * check the form's status is empty or filled in information
 * @param listInput : the elements of the arguments
 * @returns {boolean} isValid
 */
function checkEmtyError(listInput) {
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

/**
 * display information to users when they forget to fill in the form
 * @param isValid : true || false
 * @param listInput : the element list of the arguments
 */
function validationEmty(isValid, listInput) {
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
 * check the syntax mail which user fills in
 * @param input : element of the argument
 * @returns {boolean} : isEmailError
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
 * display an error message when the user enters the wrong email
 * @param isEmailError : true || false
 * @param input : element of email ID
 */
function validationEmail(isEmailError, input) {
    if (isEmailError == false) {
        showError(input, 'Email Invalid');
    } else {
        showSuccess(input);
    }
}

/**
 * check special characters
 * @param input : element of the argument
 * @returns {boolean}
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
 * display a message to the user when the content contains special characters
 * @param isCharacterError : true || false
 * @param input : element of the argument
 */
function validationFullName(isCharacterError, input) {
    if (isCharacterError == false) {
        showError(input, 'Name cannot contain characters')
    } else {
        showSuccess(input)
    }
}

/**
 * check if the value of the number meets the requirements or not
 * @param input : element of the argument
 * @param min : minimum value that the user passed in
 * @param max : maximum value that the user passed in
 * @returns {boolean}
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
 * display a message when the user enters the wrong number
 * @param isLimitError :true || false
 * @param input :element of the argument
 * @param min : minimum value that the user passed in
 * @param max : maximum value that the user passed in
 */
function validationAge(isLimitError, input, min, max) {
    if (isLimitError == false && input.value < min) {
        showError(input, `Number must be larger than ${min}`);
    }
    if (isLimitError == false && input.value > max) {
        showError(input, `Number must be small than ${max}`);
    }
}

/**
 * event submit
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