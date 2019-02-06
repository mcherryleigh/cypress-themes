const Docma = require('docma');

const config = {
  debug: 5,
  jsdoc: {
    encoding: 'utf8',
    recurse: false,
    pedantic: false,
    access: null,
    package: null,
    module: true,
    undocumented: false,
    undescribed: false,
    ignored: false,
    hierarchy: true,
    sort: 'grouped',
    relativePath: null,
    filter: null,
    allowUnknownTags: true,
    plugins: [],
  },
  markdown: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    tasks: true,
    emoji: true,
  },
  app: {
    title: 'Make-Believe',
    meta: null,
    base: '/cypress-themes',
    entrance: 'content:readme', // use "api:your-lib" to set the entrance to a JSAPI page
    routing: 'path',
    server: 'github',
    favicon: 'docs/img/logo-favicon.png', // local path of favicon to be copied
  },
  src: [
    './LICENSE:md',
    './CODE_OF_CONDUCT.md',
    './README.md'
  ],
  assets: {
    '/img': ['./docs/img/*.*'],
  },
  dest: './site_output',
  template: {
    path: 'zebra',
    options: {
      title: {
        label: 'Cypress Themes',
        href: '.',
      },
      logo: { // URL String or { dark: String, light: String }
        dark: 'img/logo-320x320.png',
        light: 'img/logo-320x320.png',
      },
      sidebar: {
        enabled: true,
        outline: 'tree', // "flat" | "tree"
        collapsed: false,
        toolbar: false,
        itemsFolded: false,
        itemsOverflow: 'crop', // "crop" | "shrink"
        badges: true, // true | false | <string-value>
        search: true,
        animations: true,
      },
      symbols: {
        autoLink: true, // "internal" | "external" | true (both)
        params: 'list', // "list" | "table"
        enums: 'list', // "list" | "table"
        props: 'list', // "list" | "table"
        meta: false,
      },
      contentView: {
        bookmarks: 'h1,h2,h3',
        faLibs: 'all', // "all" or "solid"|"regular"|"brands" or comma-separated or null
      },
      navbar: {
        enabled: true,
        fixed: true,
        dark: false,
        animations: true,
        menu: [
          {
            label: 'Home',
            href: '.',
          },
          {
            // "iconClass": "fas fa-book",
            label: 'About',
            items: [
              { label: 'License', href: 'license' },
              { separator: true },
              { label: 'Code of Conduct', href: 'code_of_conduct' },
            ],
          },
          {
            iconClass: 'fab fa-lg fa-github',
            label: '',
            href: 'https://github.com/mcherryleigh/cypress-themes',
            target: '_blank',
          },
        ],
      },
    },
  },
};

console.log(JSON.stringify(config))