# E5(Beta)

Official repository for the User Interface used in the E5 webapp

[Works on most web browsers](https://b35000.github.io/E5UI/). Feel free to try it out for yourself.

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To get it working, youll need to do two things; first modify the webpack.config.js file which is under node_modules>react-scripts>config by replacing all the contents with the webpack.config.js file thats in the src directory. I made some changes to make some of the libraries work, so be sure to do so yourself.

Secondly, youll need to create and modify a .env file with the following api keys:
`   REACT_APP_INFURA_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_INFURA_API_SECRET = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_WEB3_STORAGE_ACCESS_TOKEN = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_NFT_STORAGE_ACCESS_TOKEN = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_SEED_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_BLOCKSCOUT_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_GNOSIS_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_MOONBEAM_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_MOONRIVER_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_POLYGONSCAN_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_BINANCE_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_ARBITRUM_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_FANTOM_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_APPKEY_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_DOGECOIN_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_TRON_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_BLOCKCYPHER_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_SOLANA_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_CHAINSAFE_API_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_CHAINSAFE_BUCKET_ID = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_BEACON_NITRO_NODE_BASE_URL = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx
    REACT_APP_COINAPI_KEY = xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxx`

Then run `npm install` to install all the dependencies specified in the package.json file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
