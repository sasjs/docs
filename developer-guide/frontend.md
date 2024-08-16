# Developer Guide - Frontend

The frontend is built using the React framework, and is based on the SASjs React Seed app: [https://github.com/sasjs/react-seed-app](https://github.com/sasjs/react-seed-app).

The first build can be generated using `npm run build` - this will compile the code documentation for both SAS and JS, and prepare a production build of the SASjs interface.  When this completes, the `build` folder will contain all necessary files.

For subsequent builds, use `npm build-react` (which avoids the need to recompile the documentation).

All communication with SAS is made through the SASjs Adapter which is documented [here](https://adapter.sasjs.io).

