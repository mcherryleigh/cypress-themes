const fs = require('fs');
const path = require('path');

module.exports = (cypressThemeName) => {
  const testTemplate = `/* global after, before, cy, ,expect, describe, it */
const {
  loadTheme,
  stubMediaQuery,
} = require('../../src/utils');

const cypressThemeName = '${cypressThemeName}';

before(loadTheme(cypressThemeName));
before(stubMediaQuery());
describe(\`Theme: \${cypressThemeName}\`, () => {
  before(() => {
    cy.visit('http://www.google.com/').wait(300);
  });

  describe('mixed results suite', () => {
    it('failing test', () => {
      expect(1).to.equal(2);
    });

    it('passing test', () => {
      expect(1).to.equal(1);
    });

    it('has skipped test');
  });

  describe('passing suite', () => {
    it('has 1 passing test', () => {
      expect(1).to.equal(1);
    });
  });

  describe('failing suite', () => {
    it('failing test', () => {
      expect(1).to.equal(2);
    });
  });

  describe('skipped suite', () => {
    it('is empty');
    it('is also empty');
  });

  after(() => {
    cy.screenshot(cypressThemeName, { capture: 'runner' });
  });
});
`;


  const testPath = path.resolve(__dirname, '../cypress/integration', `${cypressThemeName}-theme.spec.js`); // ?
  fs.writeFileSync(testPath, testTemplate, { flag: 'w', encoding: 'utf8' }, (err) => {
    if (err) throw err;
    // print if successful
    console.log(`${cypressThemeName} saved at ${testPath}`);
  });
};
