# Admin Guide - Overview

This application was built on the [SASjs](https://github.com/sasjs) framework - which provides an opinionated (consistent) approach for building and deploying applications on SAS Platforms.

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

To deploy to a standalone web server there are some configuration items to modify inside the `index.html` file as follows:

```
    serverUrl: 'https://yourSASserver:5000',
    appLoc: '/logical/SAS/folder',
    serverType: 'SASJS',
```

The `serverUrl` can be _removed_ entirely if the app is being served directly from the SAS server itself.  Otherwise, the SAS Server URL (and port, if not 80/443) should be provided here.

The `appLoc` is the location in SAS Drive (or Metadata, or SASjs Drive) under which the backend services will be deployed.

The `serverType` can be `SAS9`, `SASVIYA` or `SASJS` depending on the server being used.

Once this file is adjusted, the contents of the build folder can be deployed to the SAS Web Server.  For SAS 9 this would typically be `!SASCONFIG/LevX/Web/WebServer/htdocs`.  For Viya 3.5, this is usually `/var/www/html`.  Just create a subfolder there (such as `myapp`) and add the contents of `build` folder.  The app will then be available at `yourSASserver/myapp`.

## Backend

Backend deployment depends on the server type, as follows:

* SASJS - auto deployed when importing the app zip
* SAS9 - execute the sas9.sas program after setting the appLoc macro variable at the start
* SASVIYA - execute the viya.sas program after setting the appLoc macro variable at the start