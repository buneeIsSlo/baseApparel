export default class Validate {

    constructor() {
        if(!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            emailInput: ".launch__email",
            submitButton: ".launch__submit"
        }

        this.emailInput = document.querySelector(this.selectors.emailInput);
        this.submitButton = document.querySelector(this.selectors.submitButton);

        this.emailRegExp = /\b[A-Z0-9._%+-]+@[A-Z0-9]+\.{1}[A-Z]{2,4}\b/i;

        return true;
    }

    setUpEvents() {
        this.submitButton.addEventListener("click", event => {
            event.preventDefault();
            this.validateEmail()
        });
    }

    validateEmail() {
        let email = this.emailInput.value;
        return this.emailRegExp.test(email) ? this.validationSuccessful() : this.validationFailed();
    }

    validationSuccessful() {
        console.log("lettuce go!");
    }

    validationFailed() {
        console.log("bruhhh");
    }

}