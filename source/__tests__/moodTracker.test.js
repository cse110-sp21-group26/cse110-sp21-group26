describe("Mood Tracker Testing ", () => {
    beforeEach(async () => {
        await page.goto("http://127.0.0.1:5500");
        // await page.goto(
        //     "https://cse110-sp21-group26.github.io/cse110-sp21-group26/"
        // );
        await page.waitForTimeout(500);
        jest.setTimeout(30000);
    });

    it("Test1: Initial Home Page - Check for Add New button", async () => {
        const addBtn = await page.$$("#addBtn");
        // expect(addBtn).toBeTruthy();
    });
});
