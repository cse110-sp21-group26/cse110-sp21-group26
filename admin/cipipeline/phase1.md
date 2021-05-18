# Phase one of CI/CD pipeline

## Testing
While our skeleton remains barely functional as most of our features need to be completely implemented, but this hasn't impeded our ability to test the components of our product
that are working. so far, we've made use of the  unit testing framework Cypress to test if our skeleton is beig deployed, if any input to all the input modules is being correctly parsed 
and if all the urls for the links in our skeleton are not broken and working fine. We've also managed to trigger a lot of edge cases in out JSON parsing methods which we will then debug.


## Coding styles
Our coding style had the following rules:
- **indenting** : so the difference in where they started between a line of code and then code following
                  its heirarchical structure was decided to be 4 spaces
- **quoting** : All string parameters and variables are to be doublecoated, except for certain property names which are single quoted
- **no unused variables**
- **eqeqeq** : Always use "===" instead of "=="
- **comma-spacing**: All commas have no space before them, but a space after them
- **camelcase**: When nameing variables and functions.
The rest of the stle conventions we've chosen to uphld were absed in the standard javasript style linked [here](https://standardjs.com/rules.html)


## Code quality- human review
So far of the little functionality we've implemented we ahve started the practice of using github actions to help streamline the process, (for instance karan created issues and pull-requets in the process of designing the skeleton for the rest of us to look over at at our convenience). And we strongly feel like the pracice of creating pull-requests and issues whenever we commit is a healthy standard to observe.

## Documentation
We chose JSDoc as our format for annotating our documentation, about which more information can be found [here](https://jsdoc.app/about-getting-started.html)


## Pipeline diagram


