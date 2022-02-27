# Developer Guide - Documentation

The documentation is in 3 parts:

 * Docsify User Guide (also this dev guide, and admin guide)
 * Doxygen SAS docs
 * Typedoc JS Docs

To build all the doc sites, just run `npm run doc`.

## Docsify

Docsify can be installed with `npm i -g docsify-cli`.  To serve locally, just `cd public` and run `docsify serve ./docs`.

Docsify does not need to be compiled, and so the source files are stored directly in the `public` folder.  It is added to the final frontend build when running `npm run build-react`.

To ensure new pages are listed in the sidebar, add them to `public/docs/_sidebar.md`.  The remaining configuration is made in `public/docs/index.html`.

For more info, see [Docsify documentation](https://docsify.js.org/#/).

## Doxygen

Doxygen is used to read the header comments from SAS programs to create the appropriate documentation site.  It is controlled by the [sasjs doc](https://cli.sasjs.io/doc/) command, which tells doxygen which folders to scan, and where to put the outputs (see the `docConfig` in `sasjs/sasjsconfig.json`).

Doxygen supports simple HTML and markdown, as well as many custom tags.  For more info, see [Doxygen documentation](https://www.doxygen.nl/index.html).


## TypeDoc

TypeDoc is used to capture the documentation for the javascript methods and functions.  It can also display types, and whether each argument is optional or not.

The `npm run doc` command invokes typedoc and publishes the outputs to `public/docs/static/js`.

For more information, see [Typedoc documentation](https://typedoc.org/).