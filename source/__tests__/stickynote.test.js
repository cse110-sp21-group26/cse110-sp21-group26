describe("Sticky Note Testing ", () => {
    beforeEach(async () => {
        // await page.goto("http://127.0.0.1:5500");
        await page.goto(
            "https://cse110-sp21-group26.github.io/cse110-sp21-group26/"
        );
        await page.waitForTimeout(500);
        jest.setTimeout(30000);
        // await page.waitForTimeout(500000000000000000);
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
    }, 30000);

    it("Test3: Clicking Delete - Sticky Note should be deleted", async () => {
        await page.evaluate(() =>
            document
                .querySelector('div[class="sticky-container"]')
                .children[0].children[0].click()
        );

        const stickies = await page.evaluate(() => {
            return Array.from(
                document.querySelector('div[class="sticky-container"]').children
            );
        });
        expect(stickies.length).toBe(0);
    });
});
