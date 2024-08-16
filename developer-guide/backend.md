# Developer Guide - Backend

## SASjs CLI
SAS code is compiled, built & deployed using the SASjs CLI.

Using the CLI provides a lot of benefits:

* Self contained web services (no code is used from the server filesystem)
* Test framework for Jobs, Services and Macros
* Auto-generated documentation
* Automated deployment

The following software should be installed on your local machine in order to commence development:

* [VS Code](https://sasjs.io/windows/#vscode)
* [GIT](https://sasjs.io/windows/#git)
* [Doxygen](https://www.doxygen.nl/download.html)
* [SASjs CLI](https://cli.sasjs.io/installation)

The following resources may also be studied, to understand the nuances of SASjs:

* [Scaffolding SAS Projects with SASjs](https://communities.sas.com/t5/SAS-Global-Forum-Proceedings/Scaffolding-SAS-Projects-With-NPM-and-SASjs/ta-p/726347)
* [Using SASjs Doc](https://sasjs.io/videos/#use-sasjs-doc-to-generate-html-documentation-from-source-programs)
* [VSCode with SASjs](https://www.youtube.com/watch?v=KKfUHTngSFo)

## Development Workflow

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

