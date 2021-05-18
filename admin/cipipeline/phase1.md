# Phase one of CI/CD pipeline

## Testing
While our skeleton remains barely functional as most of our features need to be completely implemented, but this hasn't impeded our ability to test the components of our product
that are working. so far, we've made use of the  unit testing framework Cypress to test if our skeleton is beig deployed, if any input to all the input modules is being correctly parsed and if all the urls for the links in our skeleton are not broken and working fine. We've also managed to trigger a lot of edge cases in out JSON parsing methods which we will then debug.

![image](https://github.com/cse110-sp21-group26/cse110-sp21-group26/blob/main/admin/cipipeline/pictures/cicd1.PNG)



## Coding styles
Our coding style had the following rules:
- **indenting** : so the difference in where they started between a line of code and then code following
                  its heirarchical structure was decided to be 4 spaces
- **quoting** : All string parameters and variables are to be doublecoated, except for certain property names which are single quoted
- **no unused variables**
- **eqeqeq** : Always use "===" instead of "=="
- **comma-spacing**: All commas have no space before them, but a space after them
- **camelcase**: When naming variables and functions.
The rest of the style conventions we've chosen to uphold were based in the standard javasript style linked [here](https://standardjs.com/rules.html)


## Code quality- human review
So far of the little functionality that we've implemented we have started the practice of using github actions to help streamline the process, (for instance Karan created issues and pull-requests in the process of designing the skeleton for the rest of us to look over at at our convenience). And we strongly feel like the practice of creating pull-requests and issues whenever we commit is a healthy standard to observe.


![image](https://github.com/cse110-sp21-group26/cse110-sp21-group26/blob/main/admin/cipipeline/pictures/cicd2.PNG)


## Documentation
We chose JSDoc as our format for annotating our documentation, about which more information can be found [here](https://jsdoc.app/about-getting-started.html)


## Pipeline diagram

![image](https://github.com/cse110-sp21-group26/cse110-sp21-group26/blob/main/admin/cipipeline/phase1.png)


As seen above our current pipelien seems very underdeveloped beccasue we are still quite new into our programming process, but as evident
we have already established a preliminary workflow that is inclusive of code-review and testing to make our work more efficient.

## Currently functional 
- URL transitions between states and links on the skeleton
- Parsing of JSON tasks from a local file and a API server.

## Planned or in progress

- **Task List** : This very crucial features implementation will mostly likely be complete later this week , after than incorporation to the skeleton can immediately begin
- **Calendar** : This is another critical feature for which we hope to have a template implemented also by the end of this week.
- **Mood tracker**: Although we have implemented the mood -tracker we are still yet to incorporate it into our skeleton
- **Sticky Notes**: We jsut aim to finalize ona  color scheme for both the notes and our application soon as well


