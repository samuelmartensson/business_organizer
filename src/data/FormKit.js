export default class {
  checkVatInput(input) {
    if (input) {
      const value = input;
      const regex = new RegExp(/^(SE)?[0-9]{10}$/);
      return regex.test(value);
    }
  }
  checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  checkIsNumber(val) {
    return /^\d+$/.test(val);
  }
  reportError(errObj, key, message) {
    errObj[key] = message;
  }
  validate(fields, callback, errorCb) {
    let errors = {};
    let formIsValid = true;
    if (fields.vatNr !== undefined && !this.checkVatInput(fields.vatNr)) {
      formIsValid = false;
      this.reportError(errors, 'vatNr', 'Format should be SE + 10 numbers');
    }
    if (fields.email !== undefined && !this.checkEmail(fields.email)) {
      formIsValid = false;
      this.reportError(errors, 'email', 'Email is not valid');
    }
    if (
      fields.paymentTerm !== undefined &&
      !this.checkIsNumber(fields.paymentTerm)
    ) {
      formIsValid = false;
      this.reportError(errors, 'paymentTerm', 'Should only contain numbers');
    }
    if (
      fields.organisationNr !== undefined &&
      !this.checkIsNumber(fields.organisationNr)
    ) {
      formIsValid = false;
      this.reportError(errors, 'organisationNr', 'Should only contain numbers');
    }
    if (
      fields.reference !== undefined &&
      !this.checkIsNumber(fields.reference)
    ) {
      formIsValid = false;
      this.reportError(errors, 'reference', 'Should only contain numbers');
    }
    if (
      fields.phoneNumber !== undefined &&
      !this.checkIsNumber(fields.phoneNumber)
    ) {
      formIsValid = false;
      this.reportError(errors, 'phoneNumber', 'Should only contain numbers');
    }

    Object.entries(fields).forEach((field) => {
      const key = field[0];
      const value = field[1];
      if (value === '') {
        formIsValid = false;
        errors[key] = 'Required';
      }
    });

    //SUBMIT
    if (formIsValid) {
      callback();
    } else {
      errorCb(errors);
    }
  }
}
