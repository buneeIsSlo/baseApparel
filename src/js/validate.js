import Swal from "sweetalert2";

export default class Validate {

    constructor() {
        if(!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            emailInput: ".launch__email",
            submitButton: ".launch__submit",
            errorMsg: "error",
            cursorOutline: ".outline"
        }

        this.emailInput = document.querySelector(this.selectors.emailInput);
        this.submitButton = document.querySelector(this.selectors.submitButton);
        this.errorMsg = document.getElementById(`${this.selectors.errorMsg}`);
        this.cursorOutline = document.querySelector(`${this.selectors.cursorOutline}`);

        this.emailRegExp = /\b[A-Z0-9._%+-]+@[A-Z0-9]+\.{1}[A-Z]{2,4}\b/i;

        return true;
    }

    setUpEvents() {
        this.submitButton.addEventListener("click", event => {
            // Prevent reload upon submission
            event.preventDefault();

            // Validate email
            this.validateEmail()

            // Reset input to originial stat upon click or keydown
            /* *Note: Both of these event listeners run just once to prevent memeory leaks */
            this.emailInput.addEventListener("click", () => {
                this.inputOriginalState();
            }, {once: true});

            this.emailInput.addEventListener("keydown", () => {
                this.inputOriginalState();
            }, {once: true});
        });
    }

    /* Function to validate email */
    validateEmail() {
        let email = this.emailInput.value;
        return this.emailRegExp.test(email) ? this.validationSuccessful() : this.validationFailed();
    }

    /* Function to display modal upon successful validation  */
    validationSuccessful() {
        Swal.fire({
            width:"550px",
            title: '<strong class="modal-title">Thank You!',
            text: "You should recive an email once we go live.",
            padding: "4em 1em",
            color: "var(--desaturated-red)",
            background: "linear-gradient(135deg, hsl(0, 0%, 100%), hsl(0, 100%, 92%))",
            showClass: {
              popup: 'animation-Down'
            },
            buttonsStyling: false,
            confirmButtonClass: "modal-confirm-btn",
            allowOutsideClick: false
          }).then(() => window.location.reload(true));
    }

    /* Function to apply error styling to input upon unsuccessful validation */
    validationFailed() {
        if(this.emailInput.value !== "") {
            this.cursorOutline.style.outlineColor = "var(--soft-red)";
            this.emailInput.classList.add("error-styles");
            this.errorMsg.style.display = "block";
            this.errorMsg.classList.add("animation-Down");
            this.emailInput.value = "";
        }
    }

    /* Function to reset email-input styles */
    inputOriginalState() {
        this.emailInput.classList.remove("error-styles");
        this.errorMsg.style.display = "none";
        this.cursorOutline.style.outlineColor = "var(--pastel-pink)";
    }

}