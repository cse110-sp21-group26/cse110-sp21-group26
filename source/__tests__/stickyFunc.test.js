/**
 * @jest-environment jsdom
 */

import {
    generateCorrecter,
    itemUpdate,
    dragElement,
    getLSData,
} from "../scripts/stickyFunc.js";

test("GenerateCorrecter 1-10 on 5 => 5", () => {
    expect(generateCorrecter(1, 10)(5)).toBe(5);
});

test("GenerateCorrecter 1-10 on -2 => 1", () => {
    expect(generateCorrecter(1, 10)(-2)).toBe(1);
});

test("GenerateCorrecter 1-10 on 15 => 10", () => {
    expect(generateCorrecter(1, 10)(15)).toBe(10);
});

// test("calls correct function on click", () => {
//     const { getSticky } = render(
//         <div {...defaultProps} onClick={itemUpdate}>
//             <span class="close" contenteditable="false">
//                 X
//             </span>
//             <span calss="draggable" contenteditable="false">
//                 ---
//             </span>
//         </div>
//     );
//     fireEvent.click(getSticky());
//     expect(itemUpdate).toHaveBeenCalled();
// });

// test("Stickynote Click on empty note = added empty space", () => {
//     document.body.innerHTML =
//         `<div class="sticky" contenteditable="true" onclick={itemUpdate}>` +
//         `<span class="close" contenteditable="false">X</span>` +
//         `<span class="draggable" contenteditable="false">---</span>` +
//         `</div>`;
//     let note = document.getElementsByClassName("sticky");
//     console.log(document.body.innerHTML);
//     note.onclick = itemUpdate;
//     note.click();
//     // console.log(note.innerText);
// });

// test("Stickynote Click on full note => no changes", () => {});
