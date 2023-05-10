function Validation(option) {
    const formElement = document.querySelector(option.form);

    function validate(inputElement, rule) {
        const errorMessage = rule.test(inputElement.value);
        const errorDisplay = inputElement.parentElement.querySelector('.form-message')


        if (errorMessage) {
            errorDisplay.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorDisplay.innerText = '';
            inputElement.parentElement.classList.remove('invalid')

        }
    }

    if (formElement) {
        option.rules.forEach(function (rule) {
            // formElement get selector from Validation
            const inputElement = formElement.querySelector(rule.selector);
            const errorDisplay = inputElement.parentElement.querySelector('.form-message')


            if (inputElement) {
                // handle when user blur
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // handle when user is typing
                inputElement.oninput = function () {
                    errorDisplay.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}


// RULES
Validation.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            // Does not have special characters: (!@#$%^&*/.,)
            // Does not have number
            // VietNamese name
            let regix = /[ ^a-z-A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
            return regix.test(value) ? undefined : 'Please enter this field.'
        }
    }
}

Validation.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            let regix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regix.test(value) ? undefined : 'Please enter your email.'
        }
    }
}

Validation.isAge = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            //min: 5  max :150
            return value > 5 && value <= 150  ? undefined : 'Please enter this field.'
        }
    }
}

