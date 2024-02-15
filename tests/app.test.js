const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../main.html'), 'utf-8');

const dom = new JSDOM(html);
global.document = dom.window.document;

const appScript = require('../app.js');

describe('DOM interactions in app.js', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('DOMContentLoaded event is handled', () => {
    document.body.innerHTML = `
      <div class="map-thumbnail" data-src="map1.jpg" data-map="map1"></div>
      <img id="map-image" src="map1.jpg">
      <div class="node map1"></div>
    `;

    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

    //Check if nodes are displayed as expected
    const displayedNodes = document.querySelectorAll('.node[style="display: block;"]');
    expect(displayedNodes.length).toBeGreaterThan(0);
  });

});
