import { itemUpdate, dragElement, getLSData } from "./stickyFunc.js";

const addBtn = document.querySelector("#addBtn");
var stickyCont = document.querySelector(".sticky-container");
const myStorage = window.localStorage;

/**
 * When the document loads, fetch all sticky notes found in local storage and load them into the webpage
 */
document.addEventListener("DOMContentLoaded", () => {
    //Get the data from local storage
    let stickyList = getLSData();
    if (stickyList === null) {
        return;
    }

    //for each sticky note, get the data found and create a new note, setting each field
    stickyList.forEach((note) => {
        let [text, filter, top, left, width, height] = note;

        let stickySingle = document.createElement("div");
        stickySingle.classList.add("sticky");
        stickySingle.contentEditable = "true";
        stickySingle.setAttribute = ("role", "textbox");
        stickySingle.innerText = text.substring(0, text.length - 6);
        stickySingle.style.filter = filter;
        stickySingle.style.top = top;
        stickySingle.style.left = left;
        stickySingle.style.width = width;
        stickySingle.style.height = height;
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
    });
});

/**
 * Before the webpage unloads, store all of the stickynotes found in the page into local storage.
 */
window.addEventListener("beforeunload", () => {
    let newStickyList = [];
    // add each sticky note field into LS as a tuple
    for (let i = 0; i < stickyCont.children.length; i++) {
        newStickyList.push([
            stickyCont.children[i].innerText,
            stickyCont.children[i].style.filter,
            stickyCont.children[i].style.top,
            stickyCont.children[i].style.left,
            stickyCont.children[i].style.width,
            stickyCont.children[i].style.height,
        ]);
    }

    // store the information
    myStorage.setItem("stickynote", JSON.stringify(newStickyList));
});

/**
 * Everytime the add button is clicked, we add a new stickynote into the webpage.
 */
addBtn.addEventListener("click", () => {
    // General Stickynote
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

    // Make draggable
    dragElement(stickySingle);

    // Close function
    close.onclick = function () {
        stickySingle.remove();
    };

    // Ensure writable
    stickySingle.onclick = itemUpdate;

    // random number function
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Random color generation
    let color = randomNumber(1, 720);
    stickySingle.style.filter = "hue-rotate(" + color + "deg)";
});
