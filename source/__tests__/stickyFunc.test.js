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
