# cp3

[![Travis branch](https://img.shields.io/travis/DrakeLeung/cp3/master.svg?style=flat-square)](https://travis-ci.org/DrakeLeung/cp3)
[![Coveralls branch](https://img.shields.io/coveralls/DrakeLeung/cp3/master.svg?style=flat-square)](https://coveralls.io/github/DrakeLeung/cp3)
[![npm](https://img.shields.io/npm/v/cp3.svg?style=flat-square)](https://www.npmjs.com/package/cp3)
[![node](https://img.shields.io/node/v/cp3.svg?style=flat-square)](https://github.com/nodejs/node/releases/tag/v7.0.0)

> a comment parser 🌵 


## Install

```bash
npm i -S cp3
```


## Usage

```javascript
const cp3 = require('cp3')

const comment = `
  /**
   * @module setting - hero's setting
   * @page profile - hero's basic info
   * @action getHero - get a hero's profile
   * @api {GET} /api/heroes/:id
   * @param {Int} id - hero's id
   */`

const tokens = cp3.tokenizer(comment)
/**
 * the tokens we get:
 *
 * [
 *   { "type": "tag", "value": "module" },
 *   { "type": "field", "value": "setting" },
 *   { "type": "description", "value": "hero's setting" },
 *  
 *   { type: 'tag', value: 'page' },
 *   { type: 'field', value: 'profile' },
 *   { type: 'description', value: 'hero\'s basic info' },
 *
 *   { "type": "tag", "value": "action" },
 *   { "type": "field", "value": "getHero" },
 *   { "type": "description", "value": "get a hero's profile" },
 *
 *   { "type": "tag", "value": "api" },
 *   { "type": "datatype", "value": "GET" },
 *   { "type": "field", "value": "/api/heroes/:id" },
 *
 *   { "type": "tag", "value": "param" },
 *   { "type": "datatype", "value": "Int" },
 *   { "type": "field", "value": "id" },
 *   { "type": "description", "value": "hero's id" },
 * ]
 */

const ast = cp3.parser(tokens)
/**
 * ast you can see after parsing tokens:
 *
 * {
 *   type: "project",
 *   body: [{
 *     type: "module",
 *     field: "setting",
 *     description: "hero's setting",
 *     body: [{
 *       type: 'page',
 *       field: 'profile',
 *       description: 'get a hero\'s profile',
 *       body: [{
 *         type: "action",
 *         field: "getHero",
 *         description: "get a hero",
 *         body: [{
 *           type: "api",
 *           datatype: "GET",
 *           field: "/api/heroes/:id"
 *         }, {
 *           type: "param",
 *           datatype: "Int",
 *           field: "id",
 *           description: "hero's id"
 *         }]
 *       }, {
 *         type: 'action',
 *         field: 'getSkill',
 *         description: 'get skills of hero',
 *         body: [],
 *       }]
 *     }]
 *   }] 
 * } 
 */

const newAst = cp3.transformer(ast)
```


## Development

```bash
# install
npm i

# start, and open http://localhost:10001/docs/index.html
npm start

# build for production
npm run build
```
