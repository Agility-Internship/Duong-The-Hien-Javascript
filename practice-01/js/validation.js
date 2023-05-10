function Validation(option) {
    const formElement = document.querySelector(option.form);

    if (formElement) {
        option.rules.forEach(function (rule) {
            // formElement get selector from Validation
            const inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // handle when user blur
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
            }
        })
    }

    function validate(inputElement, rule) {
        const errorMessage = rule.test(inputElement.value);
        const errorDisplay = inputElement.parentElement.querySelector('.form-message')

        // handle : Hide message err when user is typing
        inputElement.oninput = function () {
            errorDisplay.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }

        // Display the message line when validation is wrong
        if (errorMessage) {
            errorDisplay.innerText = errorMessage;
            // 'invalid' class css err.
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorDisplay.innerText = '';
            inputElement.parentElement.classList.remove('invalid')

        }
    }


}


// RULES
// 1. When there is an error => Return error message
// 2. When valid => Returns undefined
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

