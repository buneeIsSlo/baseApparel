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

        this.positionToCursor = event => {
            this.cursorOutline.style.top = `${event.pageY - (this.cursorOutlineObj.height / 2)}px`;
            this.cursorOutline.style.left = `${event.pageX - (this.cursorOutlineObj.width / 2)}px`;

            this.cursorFilter.style.top = `${event.pageY - (this.cursorFilterObj.height / 2)}px`;
            this.cursorFilter.style.left = `${event.pageX - (this.cursorFilterObj.width / 2)}px`;
        }

        return true;
    }

    setUpEvents() {

        this.followCursor();
        
        this.emailInput.addEventListener("click", (event) => {
            event.stopPropagation();

            const obj = this.emailInputObj;
            let styles = {
                width: `${obj.width}px`,
                height: `${obj.height}px`,
                top: `${event.clientY - event.offsetY}px`,
                left: `${event.clientX - event.offsetX}px`,
            }
    
            Object.assign(this.cursorOutline.style, styles);

            document.removeEventListener("mousemove", this.positionToCursor, true);

            this.heroImage.style.pointerEvents = "none";

            this.ifClickOutsideForm();
        });

        this.submitButton.addEventListener("click", event => {
            event.stopPropagation();
            
            this.ifClickOutsideForm();
        })
    }

    followCursor() {
        document.addEventListener("mousemove", this.positionToCursor, true);
    }

    ifClickOutsideForm() {
        document.addEventListener("click", event => {
            if(event.target !== this.emailInput && event.target !== this.submitButton) {
                let styles = {
                    width: `${this.cursorOutlineObj.width}px`,
                    height: `${this.cursorOutlineObj.height}px`,
                    outlineColor: "pink"
                }

                Object.assign(this.cursorOutline.style, styles);

                this.positionToCursor(event);
                this.followCursor();
                
                this.emailInput.classList.remove("error-styles")
                this.heroImage.style.pointerEvents = "auto";
                console.log("iss ouside");
            }
        }, {once: true});
    }

}