
describe('Tests for taskslist ', () => {
    beforeAll(async () => {
        await page.goto('https://cse110-sp21-group26.github.io/cse110-sp21-group26/source/index.html');      
        await page.waitForTimeout(500);
    });
  
    
    it('Test1: Initial Home Page - Check for tasks list module', async () => {   
        const title = await page.$eval("#tasks_list_title", titleResult => titleResult.textContent);
        expect(title).toContain("Tasks List");
    });

    it('Test2: Initial Home Page - Check for tasks list form', async () => {      
        const formCN = await page.$eval("#tasks_list_form", formResult => formResult.classList);
        expect(formCN).toBe("tasks_list_form");
    });

});