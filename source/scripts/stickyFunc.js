/**
 * Function to return a bounding function between two inputs.
 * @param {number} min Minimum bound for function
 * @param {number} max Maximum bound for function
 * @returns
 */
export const generateCorrecter = (min, max) => (val) =>
    val < min ? min : val > max ? max : val;

/**
 * This functino ensures that a clicked stickynote will alwyas be able to have editable text
 * @param {ClickEvent} e Event passed in from a sticky note being clicked
 */
export function itemUpdate(e) {
    console.log(e);
    let tmp = document.createElement("div");
    tmp.innerHTML = e.target.innerHTML;

    //If the inner html is only the close and drag, then we know the stickynote is empty
    if ((tmp.textContent || tmp.innerText) === "X---") {
        let tgt = e.target;
        tgt.innerHTML = "&#8203;";

        // Delete button
        let close = document.createElement("span");
        close.classList.add("close");
        close.innerHTML = "X";
        close.contentEditable = "false";
        tgt.appendChild(close);

        // Draggable
        let drag = document.createElement("span");
        drag.classList.add("draggable");
        drag.innerHTML = "---";
        drag.contentEditable = "false";
        tgt.appendChild(drag);

        close.onclick = function () {
            e.target.remove();
        };
        dragElement(e.target);
    }
}

/**
 * Function that makes an element draggable, specifically for sticky notes
 * @param {Element} elmnt StickyNote to be made draggable
 */
export function dragElement(elmnt) {
    var pos3 = 0,
        pos4 = 0;
    elmnt.children.item(1).onmousedown = dragMouseDown;

    var stickyCont = document.querySelector(".sticky-container");
    var xCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().width);
    var yCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().height);

    /**
     * Function to make an element draggable on mouseclick
     * @param {Element} e Element to be clicked for dragging
     */
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        //generate bounding functions for the stickynote
        xCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().width);
        yCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().height);
    }

    /**
     * This function calculates the position for the element being dragged
     * @param {Element} e Element that needs to be dragged
     */
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos3 =
            e.clientX -
            elmnt.offsetWidth / 2 -
            5 -
            addBtn.getBoundingClientRect().left;
        pos4 = e.clientY - 50 - addBtn.getBoundingClientRect().top;
        //set the new position
        elmnt.style.top =
            yCorr(yCorr(pos4 + elmnt.offsetHeight) - elmnt.offsetHeight) + "px";
        elmnt.style.left =
            xCorr(xCorr(pos3 + elmnt.offsetWidth) - elmnt.offsetWidth) + "px";
    }

    /**
     * Function to make sure that once the mouse is released, the element is no longer dragged
     */
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

/**
 * Function to retrieve data from local storage
 * @returns LocalStored Data containing a list of stickynotes
 */
export function getLSData() {
    const myStorage = window.localStorage;
    let stickyNotes = JSON.parse(myStorage.getItem("stickynote"));
    return stickyNotes;
}
