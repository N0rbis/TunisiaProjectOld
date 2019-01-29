import localization from "../utils/localization";

export function formValidator(fieldName, value, state) {
    let fieldValidationErrors = state.formErrors;
    let emailValid = state.emailValid;
    let passwordValid = state.passwordValid;
    let firstnameValid = state.firstnameValid;
    let lastnameValid = state.lastnameValid;
    let mobileValid = state.mobileValid;
    let phoneValid = state.phoneValid;
    let confirmpasswordValid = state.confirmpasswordValid;
    let cityValid = state.cityValid;
    let provinceValid = state.provinceValid;
    let countryValid = state.countryValid;
    let postalcodeValid = state.postalcodeValid;
    let tickcheckedValid = state.tickcheckedValid;

    let mail = document.querySelector('#emailfield');
    let pass = document.querySelector('#passfield');
    let firstn = document.querySelector('#firstnamefield');
    let lastn = document.querySelector('#lastnamefield');
    let mobile = document.querySelector('#mobilefield');
    let phone = document.querySelector('#phonefield');
    let confpass = document.querySelector('#confirmpasswordfield');
    let city = document.querySelector('#cityfield');
    let province = document.querySelector('#provincefield');
    let country = document.querySelector('#countryfield');
    let postalcode = document.querySelector('#postalcodefield');
    let tickcheck = document.querySelector('#tickcheckedfield');

    //////////////////////////EMAIL/////////////////////////////////
    if (fieldName === 'email') {
        emailValid = value.match(/^([a-zA-Z0-9._-]+)@([a-zA-Z]+\.)+([a-zA-Z]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : localization.login.ValEmail;
        mail.className = emailValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////PASSWORD/////////////////////////////////
    else if (fieldName === 'password') {
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '' : localization.login.ValPass;
        pass.className = passwordValid === false ? "error_field" : "correct_field"
    }

    //////////////////////////FIRST NAME/////////////////////////////////
    else if (fieldName === 'firstname') {
        firstnameValid = value.match(/^[A-Z,',`,àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ, ,-]+$/i);
        fieldValidationErrors.firstname = firstnameValid ? '' : localization.sign_up.signup_error.ValidFirstName;
        firstn.className = firstnameValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////LAST NAME/////////////////////////////////
    else if (fieldName === 'lastname') {
        lastnameValid = value.match(/^[A-Z,',`,àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ, ,-]+$/i);
        fieldValidationErrors.lastname = lastnameValid ? '' : localization.sign_up.signup_error.ValidLastName;
        lastn.className = lastnameValid === null ? 'error_field' : "correct_field"
    }
    //////////////////////////MOBILE/////////////////////////////////
    else if (fieldName === 'mobile') {
        mobileValid = (value.length <= 14) && (value.match(/^([0-9]{12})+$/i));
        fieldValidationErrors.mobile = mobileValid ? '' : localization.sign_up.signup_error.ValidMobile;
        mobile.className = mobileValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////PHONE/////////////////////////////////
    else if (fieldName === 'phone') {
        phoneValid = (value.length <= 14) && (value.match(/^([0-9]{12})+$/i));
        fieldValidationErrors.phone = phoneValid ? '' : localization.sign_up.signup_error.ValidPhone;
        phone.className = phoneValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////CONFIRM PASSWORD/////////////////////////////////
    else if (fieldName === 'confirmpassword') {
        confirmpasswordValid = (value === state.password);
        fieldValidationErrors.confirmpassword = confirmpasswordValid ? '' : localization.sign_up.signup_error.ValidConfirmPassword;
        confpass.className = confirmpasswordValid === false ? "error_field" : "correct_field"
    }
    //////////////////////////CITY/////////////////////////////////
    else if (fieldName === 'city') {
        cityValid = value.match(/^[A-Z,',`,àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ, ,-]+$/i);
        fieldValidationErrors.city = cityValid ? '' : localization.sign_up.signup_error.ValidCity;
        city.className = cityValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////PROVINCE/////////////////////////////////
    else if (fieldName === 'province') {
        provinceValid = value.match(/^[A-Z,',`,àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ, ,-]+$/i);
        fieldValidationErrors.province = provinceValid ? '' : localization.sign_up.signup_error.ValidProvince;
        province.className = provinceValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////COUNTRY/////////////////////////////////
    else if (fieldName === 'country') {
        countryValid = value.match(/^[A-Z,',`,àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ, ,-]+$/i);
        fieldValidationErrors.country = countryValid ? '' : localization.sign_up.signup_error.ValidCountry;
        country.className = countryValid === null ? "error_field" : "correct_field"
    }
    //////////////////////////POSTAL CODE/////////////////////////////////
    else if (fieldName === 'postalcode') {
        postalcodeValid = (value.length === 5);
        fieldValidationErrors.postalcode = postalcodeValid ? '' : localization.sign_up.signup_error.ValidPostalCode;
        postalcode.className = postalcodeValid === null || postalcodeValid === false ? "error_field" : "correct_field"
    }
    //////////////////////////CHECKBOX/////////////////////////////////
    else if (fieldName === 'tickchecked') {
        tickcheckedValid = (value !== false);
        fieldValidationErrors.tickchecked = tickcheckedValid ? '' : localization.sign_up.signup_error.ValidTickCheck;
        tickcheck.className = tickcheckedValid === false ? "error_field" : "correct_field"
    }

    return {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        firstnameValid: firstnameValid,
        lastnameValid: lastnameValid,
        mobileValid: mobileValid,
        phoneValid: phoneValid,
        confirmpasswordValid: confirmpasswordValid,
        cityValid: cityValid,
        provinceValid: provinceValid,
        countryValid: countryValid,
        postalcodeValid: postalcodeValid,
        tickcheckedValid: tickcheckedValid
    }
}