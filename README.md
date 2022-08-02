# Pipes Game

You can run this game on [Netlify](https://admirable-lokum-ed2cb3.netlify.app/)

## Level passwords obtained

- JustWarmingUp

## Known limitations

- Won't scale well in levels beyond 3
- Stutters when rendering levels beyond 3
- Level 5 and 6 are impossible to play using this solution and it could be better managed if we previously know every kind of pipe so when rotating, it rotates on client and just update server side not needing to get map again
- It full re-renders map on every click

## Key design decisions

Using:
- React
- Typescript
- [Create React App](https://github.com/facebook/create-react-app)
- [react-use-websocket](https://github.com/robtaussig/react-use-websocket)
- Create-react-App basic styling look and feel so it appears we are playing an old arcade or atari game

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
