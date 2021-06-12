# Illegal Unicorns Onboarding Document

## Development and Deployment

When we develop code, ensure that you are branching off of `main` and using your own branch.  
This ensures that each feature can be integrated later down the line without conflicting with other componenets.

Once code is completed on a branch and you would like to merge, create a pull request and mention in the #pr_review-comments Slack channel that you have a new pull request that needs to be reviewed.
Only when a pull request has at least one review by one other person can you, or someone else, merge that pull request.

Furthermore, all pushes to the repository run automated tests. Ensure that before you make a pull request, your tests pass. Otherwise ensure that you fix your code so that the tests pass before making a pull request.

## Testing Frameworks

Our testing framework runs based on `Jest` and `Puppeteer`. To run these tests, make sure that you have `npm` installed.

To test this, run `npm -v`. If you get an error, install `npm` at this link: https://www.npmjs.com/get-npm.

After each push to the github repository, the tests that are written will automatically be run for you. However, if you want to run your tests locally then you can also do so by running `npm test` in the `source/` directory.

## Code Styling and Documentation

Our styling is done using a VS Code extension called Prettier, found at this link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode.
The settings by default are what we use for our code styling.

Our documentation is also done using JSDoc.

Ensure that your code is styled and documented before creating a pull request.
