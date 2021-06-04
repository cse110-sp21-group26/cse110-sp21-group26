const addBtn = document.querySelector("#addBtn");
var stickyCont = document.querySelector(".sticky-container");

const generateCorrecter = (min, max) => (val) =>
    val < min ? min : val > max ? max : val;

function itemUpdate(e) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = e.target.innerHTML;
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

addBtn.addEventListener("click", () => {
    let stickyCont = document.querySelector(".sticky-container");
    let stickySingle = document.createElement("div");
    stickySingle.classList.add("sticky");
    stickySingle.contentEditable = "true";
    stickySingle.setAttribute = ("role", "textbox");
    stickySingle.innerHTML = "&#8203;";
    stickyCont.appendChild(stickySingle);

    // Delete button
    let close = document.createElement("span");
    close.classList.add("close");
    close.innerHTML = "X";
    close.contentEditable = "false";
    stickySingle.appendChild(close);

    // Draggable
    let drag = document.createElement("span");
    drag.classList.add("draggable");
    drag.innerHTML = "---";
    drag.contentEditable = "false";
    stickySingle.appendChild(drag);

    dragElement(stickySingle);

    close.onclick = function () {
        stickySingle.remove();
    };

    stickySingle.onclick = itemUpdate;

    // random number function
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    let color = randomNumber(1, 720);
    stickySingle.style.filter = "hue-rotate(" + color + "deg)";
});

function dragElement(elmnt) {
    var pos3 = 0,
        pos4 = 0;
    elmnt.children.item(1).onmousedown = dragMouseDown;

    var xCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().width);
    var yCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().height);

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        // console.log(pos3, pos4);
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        xCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().width);
        yCorr = generateCorrecter(0, stickyCont.getBoundingClientRect().height);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos3 =
            e.clientX -
            elmnt.offsetWidth / 2 -
            10 -
            addBtn.getBoundingClientRect().left;
        pos4 = e.clientY - 70 - addBtn.getBoundingClientRect().top;
        //set the new position
        elmnt.style.top =
            yCorr(yCorr(pos4 + elmnt.offsetHeight) - elmnt.offsetHeight) + "px";
        elmnt.style.left =
            xCorr(xCorr(pos3 + elmnt.offsetWidth) - elmnt.offsetWidth) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
