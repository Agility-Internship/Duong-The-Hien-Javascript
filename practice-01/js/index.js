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
 * @returns {boolean}
 */
function checkEmptyError(listInput) {
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            return false;
        } else {
            return true;
        }
    });
}


/**
 * display information to users when they forget to fill in the form
 * @param resultCheckEmpty : true || false
 * @param listInput : the element list of the arguments
 */
function displayEmptyError(resultCheckEmpty, listInput) {
    listInput.forEach(input => {
        input.value = input.value.trim();

        if (resultCheckEmpty == false) {
            showError(input, 'cannot be left blank')
        } else {
            showSuccess(input);
        }
    })
}

/**
 * check the syntax mail which user fills in
 * @param input : element of the argument
 * @returns {boolean}
 */
function checkEmailError(input) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    input.value = input.value.trim();

    if (regexEmail.test(input.value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * display an error message when the user enters the wrong email
 * @param resultCheckEmail : true || false
 * @param input : element of email ID
 */
function displayEmailError(resultCheckEmail, input) {
    if (resultCheckEmail == false) {
        showError(input, 'Email Invalid');
    } else {
        showSuccess(input);
    }
}

/**
 * check special characters, text string match
 * @param input : element of the argument
 * @returns {boolean}
 */
function checkSpecialCharacters(input) {
    // Regex contains only letters, no numbers or special characters
    const regexCharacter = /^[a-z ,.'-]+$/i;

    if (regexCharacter.test(input.value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * display a message to the user when the content contains special characters
 * @param resultCheckCharacter : true || false
 * @param input : element of the argument
 */
function displayNameError(resultCheckCharacter, input) {
    if (resultCheckCharacter == false) {
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
 * @param resultCheckNumber :true || false
 * @param input :element of the argument
 * @param min : minimum value that the user passed in
 * @param max : maximum value that the user passed in
 */
function displayAgeError(resultCheckNumber, input, min, max) {
    if (resultCheckNumber == false && input.value < min) {
        showError(input, `Number must be larger than ${min}`);
    }
    if (resultCheckNumber == false && input.value > max) {
        showError(input, `Number must be small than ${max}`);
    }
}

/**
 * event submit
 */
formId.addEventListener('submit', function (e) {
    e.preventDefault()

    let resultCheckEmpty = checkEmptyError([nameId, emailId, ageId]);
    displayEmptyError(resultCheckEmpty, [nameId, emailId, ageId]);
    let resultCheckEmail = checkEmailError(emailId);
    displayEmailError(resultCheckEmail, emailId);
    let resultCheckCharacter = checkSpecialCharacters(nameId);
    displayNameError(resultCheckCharacter, nameId);
    let resultCheckNumber = checkLimitNumberError(ageId, 5, 150);
    displayAgeError(resultCheckNumber, ageId, 5, 150);
});