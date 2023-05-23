const formId = document.querySelector('#form-survey');
const nameId = document.querySelector('#fullname');
const emailId = document.querySelector('#email');
const ageId = document.querySelector('#age');
const commentId = document.querySelector('#comment');

/**
 * Display error message and add invalid class to display error status
 * @param input: element of the argument
 * @param message: is the string literal of the error message passed from the parameter
 */
function showError(input, message) {
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.add('invalid');
    errorMessage.innerText = message;
}

/**
 * Change display of error messages to success and remove invalid class
 * @param input: element of the argument
 */
function showSuccess(input) {
    let errorDisplay = input.parentElement;
    let errorMessage = errorDisplay.querySelector('.form-message');

    errorDisplay.classList.remove('invalid');
    errorMessage.innerText = '';
}

/**
 * Check the form's status is empty or filled in information
 * @param listInput: the element list of the arguments
 * @returns {boolean} Returns true if the form has been filled in with any value. Otherwise, return false
 */
function checkEmptyError(listInput) {
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            return false;
        }
    });
}

/**
 * Display information to users when they forget to fill in the form
 * @param resultCheckEmpty: the result is returned from the checkEmptyError function
 * @param listInput: the element list of the arguments
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
 * Validate when the user fills in the information, including checking the content and displaying an error message if the user enters it incorrectly
 */
function validateEmpty() {
    const resultCheckEmpty = checkEmptyError([nameId, emailId, ageId]);
    displayEmptyError(resultCheckEmpty, [nameId, emailId, ageId]);
}

/**
 * Check the syntax mail which user fills in
 * @param input: element of the argument
 * @returns {boolean} Return true if text string match and pass the regex rule. Otherwise, return false
 */
function checkEmailError(input) {

    // Regex: there must be a ‘@’ symbol after initial characters, email address must begin with alpha-numeric characters, it may have periods, underscores and hyphens
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    input.value = input.value.trim();

    if (!regexEmail.test(input.value)) {
        return false;
    }
}

/**
 * Display an error message when the user enters the wrong email
 * @param resultCheckEmail: the result is returned from the checkEmailError function
 * @param input: element of email ID
 */
function displayEmailError(resultCheckEmail, input) {
    if (resultCheckEmail == false) {
        showError(input, 'Email Invalid');
    }
}

/**
 * Validate the user's email, check the syntax, and display an error if the user mistypes
 */
function validateEmail() {
    const resultCheckEmail = checkEmailError(emailId);
    displayEmailError(resultCheckEmail, emailId);
}

/**
 * Check special characters, text string match
 * @param input: element of the argument
 * @returns {boolean} Return true if text string match and pass the regex rule. Otherwise, return false
 */
function checkNameError(input) {

    // Regex: contains only letters, no numbers or special characters
    const regexCharacter = /^[a-z ,.'-]+$/i;

    if (!regexCharacter.test(input.value)) {
        return false;
    }
}

/**
 * Display a message to the user when the content contains special characters
 * @param resultCheckName: the result is returned from the checkNameError function
 * @param input: element of the argument
 */
function displayNameError(resultCheckName, input) {
    if (resultCheckName == false) {
        showError(input, 'Name cannot contain characters');
    }
}

/**
 * Validate the user's name, check the syntax, and display an error if the user mistypes
 */
function validateName() {
    const resultCheckName = checkNameError(nameId);
    displayNameError(resultCheckName, nameId);
}

/**
 * Check if the value of the number meets the requirements or not
 * @param value: element of the argument
 * @param min: minimum value that the user passed in
 * @param max: maximum value that the user passed in
 * @returns {boolean} Returns true if the number is larger than min and less than maximum. Otherwise, return false.
 */
function checkLimitNumberError(value, min, max) {
    return value < min && value > max;
}

/**
 * Display a message when the user enters the wrong number
 * @param resultCheckNumber: the result is returned from the checkLimitNumberError function
 * @param input: element of the argument
 * @param min: minimum value that the user passed in
 * @param max: maximum value that the user passed in
 */
function displayAgeError(resultCheckNumber, input, min, max) {
    let value = input.value;

    if (resultCheckNumber == false && value < min) {
        showError(input, `Number must be larger than ${min}`);
    }
    if (resultCheckNumber == false && value > max) {
        showError(input, `Number must be small than ${max}`);
    }
}

/**
 * Validate the user's age, Check the age limit, if less than or older than the allowed error display
 */
function validateCheckNumber() {
    const resultCheckNumber = checkLimitNumberError([ageId.value], 5, 150);
    displayAgeError(resultCheckNumber, ageId, 5, 150);
}

/**
 * Check the length of the array of characters entered by the user
 * @param input: an array of characters entered by the user in the textarea
 * @param maxLength: maximum length that the user passed in
 * @returns {boolean} If the length of the characters is greater than the maxLength, return true
 */
function checkTextLength(input, maxLength) {
    return input.length > maxLength;
}

/**
 * Display error message when user enters more than allowed characters
 * @param resultCheckTextLength: the result is returned from the checkTextLength function
 * @param input: element of the argument
 */
function displayTextLengthError(resultCheckTextLength, input) {
    if (resultCheckTextLength === true) {
        showError(input, 'Only 500 characters max');
    }
}

/**
 * Validate textarea, check the network character length, from the validation results show an error message
 */
function validateTextLength() {
    const resultCheckTextLength = checkTextLength(commentId.value, 500);
    displayTextLengthError(resultCheckTextLength, commentId)
}

/**
 * Display the results that the user has filed with alert
 */
function displayFormResults() {
    const results = [];

    // Show checked option
    const selectElements = document.querySelectorAll('.form-group .select');
    selectElements.forEach(select => {
        results.push(select.name + ': ' + select.value);
    });

    // Show checked radios
    const radioElements = document.querySelectorAll('.form-group .radio');
    radioElements.forEach(radio => {
        if (radio.checked) {
            results.push(radio.name + ': ' + radio.value);
        }
    });

    // Show checked checkbox
    const checkboxElements = document.querySelectorAll('.form-group .checkbox');
    checkboxElements.forEach(checkbox => {
        if (checkbox.checked) {
            results.push(checkbox.name + ': ' + 'Apply');
        }
    });

    // Display an alert box with a message about users what have filled in
    alert(`${results.join('\n')}`);
}

/**
 * User click event, show an error message if the user enters it wrong
 */
formId.addEventListener('submit', function (e) {
    e.preventDefault()

    validateEmpty();

    validateEmail();

    validateName();

    validateCheckNumber();

    validateTextLength();

    displayFormResults();
});