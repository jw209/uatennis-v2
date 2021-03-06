const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {

    let errors = {};

    data.fname = !isEmpty(data.fname) ? data.fname : "";
    data.lname = !isEmpty(data.lname) ? data.lname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.uanetid = !isEmpty(data.uanetid) ? data.uanetid : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.fname)) {
        errors.fname = "First name is required";
    }

    if (Validator.isEmpty(data.lname)) {
        errors.lname = "Last name is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email formatting";
    }

    if (Validator.isEmpty(data.uanetid)) {
        errors.uanetid = "UA Net ID is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password verification required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 25 })) {
        errors.password = "Password must be between 6-25 characters (inclusive)";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords do not match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};