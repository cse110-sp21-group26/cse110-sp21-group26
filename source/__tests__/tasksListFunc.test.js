/**
 * @jest-environment jsdom
 */

import {
    getTodayDate,
} from "../scripts/tasksListScript.js";

test("getTodayDate", () => {
    let today = new Date();
    let y = today.getFullYear();
    expect(getTodayDate()).toContain(y);
});
