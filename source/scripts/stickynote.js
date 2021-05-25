// const addBtn = document.querySelector("#addBtn");
const addBtn = document.getElementById('addBtn');
console.log(addBtn);

function itemUpdate(e){
    let tmp = document.createElement("DIV");
    tmp.innerHTML = e.target.innerHTML;
    if ((tmp.textContent || tmp.innerText) === "X---") {
        let tgt = e.target;
        tgt.innerHTML = "&#8203;";

        // Delete button
        let close = document.createElement('span');
        close.classList.add('close');
        close.innerHTML = "X";
        close.contentEditable = "false";
        tgt.appendChild(close);

        // Draggable
        let drag = document.createElement('span');
        drag.classList.add('draggable');
        drag.innerHTML = "---";
        drag.contentEditable = "false";
        tgt.appendChild(drag);

        close.onclick = function () {
            e.target.remove();
        }
        dragElement(e.target);
    }
}

addBtn.addEventListener("click", ()=>{
    let stickyCont = document.querySelector(".sticky-container");
    let stickySingle = document.createElement('div');
    stickySingle.classList.add('sticky');
    stickySingle.contentEditable = "true";
    stickySingle.setAttribute = ("role","textbox");
    // stickySingle.setAttribute = ("placeholder","...");
    stickySingle.innerHTML = "&#8203;";
    stickyCont.appendChild(stickySingle);

    // Delete button
    let close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = "X";
    close.contentEditable = "false";
    stickySingle.appendChild(close);

    // Draggable
    let drag = document.createElement('span');
    drag.classList.add('draggable');
    drag.innerHTML = "---";
    drag.contentEditable = "false";
    stickySingle.appendChild(drag);

    dragElement(stickySingle);

    close.onclick = function () {
        stickySingle.remove();
    }

    stickySingle.onclick = itemUpdate;

    // Delete function. used "for" to bind delete button with 
    // coresponding stickynote

    // for (let i = 0; i < stickies.length; i++){
    //     // xs[i].addEventListener("click", ()=> {
    //     //     // stickies[i].style.display = "none";
    //     //     stickies[i].remove();
    //     // });
    //     xs[i].onclick = function () {
    //         stickies[i].remove();
    //     };
    //     // stickies[i].addEventListener("click", ()=>{
    //     //     console.log(stickies[i].innerHTML);
    //     // })
    //     stickies[i].onclick = function () {
    //         console.log(stickies[i].innerHTML);
    //         itemUpdate;
    //     };
    // }
    
    // Random angle
    function randomNumber(min, max) { 
      return Math.random() * (max - min) + min; 
    }
  
    let color = randomNumber(1,720);
    stickySingle.style.filter = "hue-rotate(" + color +"deg)";
});

// const sticky = document.querySelectorAll

function dragElement(elmnt) {
    var pos3 = 0, pos4 = 0;
    elmnt.children.item(1).onmousedown = dragMouseDown;

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
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos3 = e.clientX;
        pos4 = e.clientY;
        //set the new position 
        elmnt.style.top = (pos4-20) + "px";
        elmnt.style.left = (pos3-(elmnt.offsetWidth/2))+ "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}