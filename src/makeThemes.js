const fs = require('fs');
const path = require('path');
const c2j = require('css2json');
const makeTest = require('./makeTest');

/*
 * TODO mapping worked for bootstrap themes but may need
 * adjusting with other sets warning/danger particularly
 */
async function getColors(lessFile) {
  const colors = await c2j(lessFile); // ?
  return {
    grayDarker: '#222',
    grayDark: '#333',
    gray: '#555',
    grayLight: '#999',
    grayLighter: '#eee',
    brandPrimary: colors['.p1-k'],
    brandSuccess: colors['p1-c1'],
    brandInfo: colors['p1-e'],
    brandWarning: '#800080', // TODO find mapping
    brandDanger: '#800080', // TODO find mapping
    textColor: colors['.p1-s1'].color,
  };
}

const makeCypressTheme = (colors) => {
  const theme = `/* Cypress v3 */
:root {
  --background: #222426;
  --dark-background: #171717;
  --lighter-background: #3a3a3a;
  --light-element: #444648;
  --active-button: #292c2e;
  --active-color: ${colors.brandPrimary};
  --runner-shadow: inset 0 0 10px ${colors.brandPrimary};
  --wrap-shadow: 0 3px 6px ${colors.brandPrimary};
  --button-border: 1px solid #3a3a3a;
  --command-border: 1px solid #606060;
  --command-important-border: 1px solid #888888;
  --active-command-border: 1px solid #707070;
  --highlighted-text: ${colors.gray};
  --pinned-command-background-color: ${colors.brandWarning};
  --pinned-command-background-color-hover: ${colors.brandPrimary};
  --icons-color: ${colors.brandWarning};
  --icons-hover-color: ${colors.brandPrimary};
  /* passed and failed commands */
  --failed-command-background-color: inherit;
  --state-failed-background-color: ${colors.brandDanger};
  --state-failed-color: ${colors.textColor};
  /* other misc stuff */
  --header-color: ${colors.brandPrimary};
  --header-shadow: 0 1px 3px ${colors.brandPrimary};
  --header-border: solid 1px ${colors.brandPrimary};
  /* main passing, failing, skipped colors */
  --failed-color: ${colors.brandDanger};
  --passed-color: ${colors.brandSuccess};
  --pending-color: ${colors.brandInfo};
  /* assert "badge" in front of passing or failing assertion */
  --assert-passed-background-color: ${colors.brandSuccess};
  --assert-passed-color: ${colors.textColor};
}
.reporter {
  background-color: var(--background);
}

.runner header {
  background-color: var(--background);
  box-shadow: var(--header-shadow);
  -webkit-box-shadow: var(--header-shadow);
}
.runner .url {
  color: var(--header-color);
  background-color: var(--background);
  border: var(--header-border);
}
.runner .url:hover,
.runner .url:focus,
.runner .url:active {
  color: var(--header-color);
}
.runner .highlighted .url {
  background-color: var(--light-element);
}
.runner .url:focus {
  background-color: var(--light-element);
}

.runner .viewport-info button {
  text-shadow: none;
}
.runner .viewport-info button:hover {
  color: var(--active-color);
}
.runner {
  background-image: none;
  background-color: var(--lighter-background);
  box-shadow: var(--runner-shadow);
  -webkit-box-shadow: var(--runner-shadow);
}

.reporter .wrap {
  box-shadow: var(--wrap-shadow);
  -webkit-box-shadow: var(--wrap-shadow);
}

.reporter .container {
  border: none;
}

.runner .selector-playground-toggle:hover {
  background: none;
  color: var(--active-color);
}

.reporter header {
  background-color: var(--background);
  color: var(--active-color);
  box-shadow: var(--header-shadow);
  -webkit-box-shadow: var(--header-shadow);
}
.reporter header button {
  background-color: var(--background);
}
.reporter header button:hover {
  background-color: var(--background);
  color: var(--active-color);
}

.reporter .runnable {
  background-color: var(--background);
}
.reporter .runnable:hover {
  background-color: var(--background);
}
.reporter .commands-container {
  background-color: var(--active-button);
}
.reporter .command-wrapper:hover {
  background-color: var(--active-button);
  color: var(--highlighted-text);
  box-shadow: none;
  -webkit-box-shadow: none;
}
.reporter .focus-tests button {
  border-right: var(--button-border);
}
.reporter .stats .duration {
  border-left: var(--button-border);
  border-right: var(--button-border);
}
.reporter .controls > span:last-child button {
  border-right: var(--button-border);
}

.reporter .command-state-pending > span > .command-wrapper {
  background-color: var(--lighter-background);
}
.reporter .command-type-parent {
  border-top: var(--command-border);
}
.reporter .command-type-parent:hover {
  border-top: var(--active-command-border);
}

.runner .aut-iframe {
  background-color: var(--background);
}

.reporter .runnable.suite > div > .runnable-wrapper .runnable-title {
  color: var(--active-color);
}

.reporter .hooks-container .hook-name:hover {
  color: var(--highlighted-text);
}

.reporter .command-is-pinned > span > .command-wrapper {
  background-color: var(--pinned-command-background-color);
}
.reporter .command-is-pinned > span > .command-wrapper span.command-pin{
  color: var(--pinned-command-background-color-hover);
}

.reporter .command-is-pinned > span > .command-wrapper:hover {
  background-color: var(--pinned-command-background-color-hover);
}
.reporter .command-is-pinned > span > .command-wrapper:hover span.command-pin{
  color: var(--pinned-command-background-color);
}

.runner .message-controls {
  background-color: var(--background);
}
.runner .snapshot-controls.showing-selection .toggle-selection {
  background-color: var(--active-button);
}
.runner .snapshot-controls button:active {
  background-color: var(--active-button);
  color: var(--active-color);
}
.runner .snapshot-controls .snapshot-state-picker button.state-is-selected {
  background-color: #666565;
  color: yellow;
}
.runner .snapshot-controls button:hover {
  background-color: var(--active-button);
  color: var(--active-color);
}
.reporter .command-name-assert.command-state-passed .command-method span {
  background-color: var(--assert-passed-background-color);
  color: var(--assert-passed-color);
}

.reporter ::-webkit-scrollbar-thumb {
  background-color: var(--background);
}
.reporter ::-webkit-scrollbar-track {
  background-color: var(--dark-background);
}

.reporter .command-state-failed > span > .command-wrapper {
  background-color: var(--failed-command-background-color);
}
.reporter .command-state-failed > span > .command-wrapper:hover {
  background-color: var(--failed-command-background-color);
}
.reporter .command-name-assert.command-state-failed .command-method span {
  background-color: var(--state-failed-background-color);
  color: var(--state-failed-color);
}
.reporter .runnable pre {
  background-color: var(--background);
}
.reporter .runnable pre:hover {
  background-color: var(--lighter-background);
}
.reporter pre {
  border: var(--command-important-border);
}

.reporter .runnable-controls i {
  color: var(--icons-color);
}
.reporter .runnable-controls i:hover {
  color: var(--icons-hover-color);
}
.reporter .runnable.suite.runnable-failed > div > .runnable-wrapper .collapsible-more {
  margin-left: 5px;
}

.reporter .no-commands {
  background-color: var(--background);
  border: none;
  color: var(--pending-color);
}

.reporter .runnable.test.runnable-failed > .runnable-wrapper {
  border-left: 10px solid var(--failed-color);
}
.reporter .runnable.test.runnable-passed > .runnable-wrapper {
  border-left: 10px solid var(--passed-color);
}
.reporter .runnable.test.runnable-pending > .runnable-wrapper {
  border-left: 10px solid var(--pending-color);
}
.reporter .stats li.failed {
  color: var(--failed-color);
}
.reporter .stats li.passed {
  color: var(--passed-color);
}
.reporter .stats li.pending {
  color: var(--pending-color);
}
.reporter .runnable.runnable-passed > .runnable-wrapper .runnable-title {
  color: var(--passed-color);
}
.reporter .runnable.runnable-pending > .runnable-wrapper .runnable-title {
  color: var(--pending-color);
}
.reporter .runnable.runnable-failed > .runnable-wrapper .runnable-title {
  color: var(--failed-color);
}
.reporter .runnable.suite > div > .runnable-wrapper .runnable-title {
  color: 'inherit';
}
.reporter .runnable.suite.runnable-failed > div > .runnable-wrapper {
  border-left: 10px solid var(--failed-color);
}
.reporter .runnable.suite.runnable-passed > div > .runnable-wrapper {
  border-left: 10px solid var(--passed-color);
}
.reporter .runnable.suite.runnable-pending > div > .runnable-wrapper,
.reporter .runnable.test.runnable-pending > .runnable-wrapper {
  border-left: 10px solid var(--pending-color);
}
li.suite.runnable.runnable-pending > div > div.collapsible-header.runnable-wrapper > span {
  color: var(--pending-color);
}
li.suite.runnable.runnable-passed > div > div.collapsible-header.runnable-wrapper > span {
  color: var(--passed-color);
}
li.suite.runnable.runnable-failed > div > div.collapsible-header.runnable-wrapper > span {
  color: var(--failed-color);
}
`;

  return theme;
};

const walkSync = (dir, filelist = []) => {
  let allFilePaths = filelist;
  fs.readdirSync(dir).forEach((file) => {
    allFilePaths = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return allFilePaths;
};

walkSync('./syntax/themes/github/themes/').forEach((filePath) => {
  // get the current rainglow theme to convert
  const cssInput = fs.readFileSync(filePath, 'UTF-8');
  // grab color codes from rainglow and use them to make the cypress theme
  const cypressThemeColors = getColors(cssInput);
  const cypressThemeStyles = makeCypressTheme(cypressThemeColors);
  // metadata for saving the theme and test to file
  const cypressThemeName = path.basename(filePath).replace('.css', '');
  const cypressThemePath = path.resolve(__dirname, 'themes', `${cypressThemeName}.css`); // ?

  fs.writeFile(cypressThemePath, cypressThemeStyles, { flag: 'w', encoding: 'utf8' }, (err) => {
    if (err) throw err;

    // print if theme was successful
    console.log(`${cypressThemeName} saved`);
  });

  makeTest(cypressThemeName);
});
