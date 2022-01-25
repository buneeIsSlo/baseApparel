export default class Cursor {

    constructor() {
        if(!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            cursorOutline: ".outline",
            cursorFilter: ".filter",
            emailInput: ".launch__email",
            submitButton: ".launch__submit",
            heroImage: ".launch__model-huge"
        }

        this.cursorOutline = document.querySelector(`${this.selectors.cursorOutline}`);
        this.cursorFilter = document.querySelector(`${this.selectors.cursorFilter}`);
        this.emailInput = document.querySelector(`${this.selectors.emailInput}`);
        this.submitButton = document.querySelector(`${this.selectors.submitButton}`);
        this.heroImage = document.querySelector(`${this.selectors.heroImage}`);

        this.cursorOutlineObj = this.cursorOutline.getBoundingClientRect();
        this.cursorFilterObj = this.cursorFilter.getBoundingClientRect();
        this.emailInputObj = this.emailInput.getBoundingClientRect();

        // Function to set the position of the outline(div) and filter(div) at the cursor
        /* * Note: Half of the widths and heights of the divs are subtracted to center them to the cursor */
        this.positionToCursor = event => {
            this.cursorOutline.style.top = `${event.pageY - (this.cursorOutlineObj.height / 2)}px`;
            this.cursorOutline.style.left = `${event.pageX - (this.cursorOutlineObj.width / 2)}px`;

            this.cursorFilter.style.top = `${event.pageY - (this.cursorFilterObj.height / 2)}px`;
            this.cursorFilter.style.left = `${event.pageX - (this.cursorFilterObj.width / 2)}px`;
        }

        return true;
    }

    setUpEvents() {

        // Follow cursor
        this.followCursor();
        
        // Expand and lock outline(div) to input on click
        this.emailInput.addEventListener("click", (event) => {

            //Stop event from propagating further i.e. prevent event from bubbling
            /* * Note: This is an important step */
            event.stopPropagation();

            const obj = this.emailInputObj;
            let styles = {
                width: `${obj.width}px`,
                height: `${obj.height}px`,
                top: `${event.clientY - event.offsetY}px`,
                left: `${event.clientX - event.offsetX}px`,
            }
            
            // Assign styles that expands outline(div)
            Object.assign(this.cursorOutline.style, styles);

            // Remove the mousemove event listener(this locks the position of outline(div))
            document.removeEventListener("mousemove", this.positionToCursor, true);

            // Set pointer events on hero to none
            this.heroImage.style.pointerEvents = "none";

            // Listen for click outside form
            this.ifClickOutsideForm();
        });

        this.submitButton.addEventListener("click", event => {
            //Stop event from propagating further i.e. prevent event from bubbling
            /* * Note: This is an important step */
            event.stopPropagation();
            
            // Listen for click outside form
            this.ifClickOutsideForm();
        })
    }

    /* Function to follow cursor */
    followCursor() {
        document.addEventListener("mousemove", this.positionToCursor, true);
    }

    /* Functino to unlock outline(div) and follow cursor */
    ifClickOutsideForm() {

        /* * Note: This event listener runs just once to prevent memeory leaks */
        document.addEventListener("click", event => {

            // Make sure the click was outside the form
            if(event.target !== this.emailInput && event.target !== this.submitButton) {
                let styles = {
                    width: `${this.cursorOutlineObj.width}px`,
                    height: `${this.cursorOutlineObj.height}px`,
                    outlineColor: `var(--pastel-pink)`
                }

                // Assign the original styles to outline(div)
                Object.assign(this.cursorOutline.style, styles);

                //Set the position of the outline(div) and filter(div) at the cursor
                this.positionToCursor(event);

                //Follow the cursor
                this.followCursor();
                
                // Remove all error styling from input
                this.emailInput.classList.remove("error-styles")

                // Set pointer events on hero to auto
                this.heroImage.style.pointerEvents = "auto";
            }
        }, {once: true});
    }

}