describe("Sticky Note Testing ", () => {
    beforeAll(async () => {
        await page.goto("http://127.0.0.1:5500");
        await page.waitForTimeout(500);
    });

    // test 1 is given
    it("Test1: Initial Home Page - Check for Add New button", async () => {
        const addBtn = await page.$$("#addBtn");
        expect(addBtn).toBeTruthy();
    });

    it("Test2: Clicking Sticky Note - New Sticky Note on Page", async () => {
        await page.click("#addBtn");
        const stickies = await page.evaluate(() => {
            return Array.from(
                document.querySelector('div[class="sticky-container"]').children
            );
        });
        expect(stickies.length).toBe(1);
    });

    // it("Test3: Clicking Delete - Sticky Note should be deleted", async () => {
    //     const stickies = await page.evaluate(() => {
    //         return Array.from(
    //             document.querySelector('div[class="sticky-container"]').children
    //         );
    //     });
    //     console.log(stickies[0]);
    //     await stickies[0].children[0].click();
    //     expect(stickies.length).toBe(0);
    // });
});
