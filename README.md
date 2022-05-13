# Rule of thumb

Rule of Thumb™️ tracks the sentiment of their users on trending and controversial people from different fields, including politics, business, media and entertainment, etc.

## How it was built

This project has been built using create-react-app and Node.js with express. LTC Node.js v18.1.0 was used for its development and Yarn as a module package manager, but it's still compatible with npm.

Inside the root folder you should be find two directories, one of them store the server and the other one the ui assets.

## Install process

To run the project, you must first install the packages dependencies in each subdirectory, please go to each subdirectory (server and ui) and rum yarn install.

```
cd server
yarn install
cd ..
cd ui
yarn install
```
### Execute the project

This project requires to have two process running simultaneously, therefore you need to open two terminals and run on each one yarn start.

Terminal A: For the server
```
cd server
yarn start
```
Terminal B: For the ui
```
cd ui
yarn start
```

The server process needs to have available the port 3001. If for some reason this is not possible, please update the port in the server/index.js file (line 21), and also be sure to update the proxy port in the file ui/package.json.

## About my decisions

For the persistence layer I chose Node.js, writing on plain files. Although I understand and share that there are more suitable and easy to implement tools such as Firebase, I chose this one with the aim to that skill would be assessed.

### Express API

The express server expose the following endpoints:

GET /candidates/list

GET /votes/{uuid_candidate}

POST /votes/{uuid_candidate}
body
{ vote: {true/false} }

For the UI layer, I decided not to mess with converting the original files to components and simply altered the index.html file in the public directory and be focused on the requirement itself. That is, the App component contains only the requested component.
