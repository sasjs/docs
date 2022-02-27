# Admin Guide - Overview

This application was built on the [SASjs](https://github.com/sasjs) framework - which provides an opinionated (consistent) approach for building and deploying applications on the SAS Platforms.

SASjs apps have three major server-side components:

* Frontend (all web content, including this documentation site)
* Backend (all SAS code - none of which is on the filesystem)
* Data Layer (database / fileysystem, including format catalogs)

The only software requirement on the Server is the SAS System (either Foundation SAS, SAS Viya, or SAS 9 EBI).

Client-side build & deployment is done entirely from a clone of the git repository.  It may also be configured to run automatically as part of a CI/CD pipeline.

The following software is needed locally:

* NodeJS (including NPM, the package manager for SASjs)
* GIT Bash (for cloning and submitting SASjs commands)
* Doxygen (for building the SAS Code documentation)

## Frontend

To compile the frontend from source, simply run the following command from the root of the project:

```bash
npm run build
```

This will compile the code documentation for both SAS and JS, and prepare a production build of the SASjs interface.  When this completes, the `build` folder will contain all necessary files.

Before deploying this folder, there are some configuration items inside the `build/index.html` file as follows:

```
    serverUrl: 'https://yourSASserver:5000',
    appLoc: '/logical/SAS/folder',
    serverType: 'SASJS',
```

The `serverUrl` can be _removed_ entirely if the app is being served directly from the SAS server itself.  Otherwise, the SAS Server URL (and port, if not 80) should be provided here.

The `appLoc` is the location in SAS Drive (or Metadata, or SASjs Drive) under which the backend services will be deployed.

The `serverType` can be `SAS9`, `SASVIYA` or `SASJS` depending on the server being used.

Once this file is adjusted, the contents of the build folder can be deployed to the SAS Web Server.  For SAS 9 this would typically be `!SASCONFIG/LevX/Web/WebServer/htdocs`.  For Viya 3.5, this is usually `/var/www/html`.  Just create a subfolder there (such as `myapp`) and add the contents of `build` folder.  The app will then be available at `yourSASserver/myapp`.

## Backend

SAS code is compiled locally, and deployed to SAS as a series of self contained Jobs and Services.  The production SAS server should be configured as an object in the Targets array of the `sasjs/sasjsconfig.json` file.  The following attributes are necessary:

* `name` - a unique name for the target (eg `"mytarget"`)
* `serverUrl` - the SAS server on which the services will be deployed
* `appLoc` - the root folder in which the services will be saved (SAS Drive or Metadata)
* `serverType` - either SAS9, SASVIYA or SASJS.


Before the deployment can take place, the CLI needs to be authenticated. First, install the  CLI as follows:

```
npm install -g @sasjs/cli
```

Next, authenticate against the previously defined target, eg:

```bash
sasjs auth -t mytarget
```

The subsequent prompts will depend on whether the server type is SAS 9, SASjs, or Viya.  For more information, see the documentation here: [https://cli.sasjs.io/auth/](https://cli.sasjs.io/auth/).  Note that SAS 9 deploys require a 'runner' in the home directory of the deployment account.

Once authenticated, the services can be compiled, built & deployed using a single command:

```
sasjs cbd -t mytarget
```

