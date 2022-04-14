# rtl-cypress-tests

This project was created for doing the pratice of automated tests using React Testing Library and Cypress.io.
It is a clone of the MDN project [todo-react](https://github.com/facebook/create-react-app), with a few tweaks made by me, like persisting the data inside the user Local Storage.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the RTL test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn cy:open`

Launches the Cypress test runner.<br />
The project must be running at http://localhost:3000/.<br />
See the section about [cypress command line](https://docs.cypress.io/guides/guides/command-line) for more information.

### `yarn cy:run`

Runs Cypress tests to completion. By default, cypress run will run all tests headlessly.<br />
The project must be running at http://localhost:3000/.<br />
See the section about [cypress command line](https://docs.cypress.io/guides/guides/command-line) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
