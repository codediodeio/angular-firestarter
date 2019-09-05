require('zone.js/dist/zone-node');
require('reflect-metadata');

const { join } = require('path');

const { enableProdMode } = require('@angular/core');

// Import module map for lazy loading
const {
  provideModuleMap
} = require('@nguniversal/module-map-ngfactory-loader');
const { renderModuleFactory } = require('@angular/platform-server');

const fs = require('fs-extra');

// Must manually define routes to prerender
const ROUTES = [
    '/', 
    '/customers',
    '/customers/78asJMXvM8q7f87cpVEF',
    '/customers/Wu2BRnrAxnizSgGaJXhN',
    '/customers/qe7EtWu4UWiWfZgtmP3C',
    '/kanban',
    '/login',
];

// leave this as require(), imported via webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist/server/main`);

// START prerender script

(async function() {
  enableProdMode();
  // Get the app index
  const views = 'dist/browser';
  const index = await fs.readFile(join(views, 'index.html'), 'utf8');

  // Loop over each route
  for (const route of ROUTES) {
    const pageDir = join(views, route);
    await fs.ensureDir(pageDir);

    // Render with Universal
    const html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    });

    await fs.writeFile(join(pageDir, 'index.html'), html);
  }

  process.exit();
  console.log('prerendering complete');
})();
