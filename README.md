# Tunisia recruitmentet web app (Front)

## Tools
* [Node.js / NPM](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Create react app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
* [Semantic-ui-react](https://react.semantic-ui.com/)
* [Git](https://git-scm.com/)
* [VS Code (optional)](https://code.visualstudio.com/)

## Set Up
1.  Install Node.js (npm installs automatically with it)
2.  Pull the repository
3.  In the proyect folder run `npm install`
4.  Run `npm start` to start the server

## Folder rules
The *src* folder should be structured following the next diagram

*   src
    *   components
        *   component_name
            * ComponentName.js
            * ComponentNameStyle.css (*if needed*)
            * ComponentName.test.js (*always create even if its empty*)
    *   services
    *   utils

## Naming convention

Try to follow [ES6](http://es6-features.org) features whenever possible

*   Top **folders** and **component folders**: snake_case
*   **Components** files: PascalCase
*   **Class**: PascalCase
*   Constants: UPPERCASE
*   Variables: camelCase


## Branch worflow

*   Production/Release: **master** (*protected branch*)
*   Active development: **staging**
*   General procedure: staging => feature_or_page_branch => new_branch_issue_name

If you want to merge to **master** or **staging** please make a merge request

**IMPORTANT!** If you want to start a merge or want to work directly on any 'common' branch (*staging,master, or feature/page*) or do a quick fix,

 **ASK/CHECK FIRST** if someone is currently working on that branch
