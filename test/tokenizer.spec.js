import test from 'ava'
import tokenizer from '../src/tokenizer'

test('tokenizer() -> should return {Array}', t => {
  t.deepEqual(tokenizer(), [])
})

// @module
test('tokenizer() -> @module', t => {
  const input = `
    /*
     * @module setting/profile - hero's basic info
     */`

  t.deepEqual(tokenizer(input), [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/profile' },
    { type: 'description', value: 'hero\'s basic info' },
  ])
})

// @action
test('tokenizer() -> @action', t => {
  const input = `
    /*
     * @action getHero - get a hero's profile
     * /
  `
  
  t.deepEqual(tokenizer(input), [
    { type: 'tag', value: 'action' },
    { type: 'field', 'value': 'getHero' },
    { type: 'description', value: 'get a hero\'s profile' },
  ])
})

// @api
test('tokenizer() -> @api', t => {
  const input = `
    /*
     * @api {GET} /api/heroes/:id
     */`
  
  t.deepEqual(tokenizer(input), [
    { type: 'tag', value: 'api' },
    { type: 'datatype', value: 'GET'},
    { type: 'field', 'value': '/api/heroes/:id' },
  ])
})

// @param
test('tokenizer() -> @param', t => {
  const input = `
    /*
     * @param {Int} id - hero's id
     */`
   
  t.deepEqual(tokenizer(input), [
    { type: 'tag', value: 'param' },
    { type: 'datatype', value: 'Int'},
    { type: 'field', 'value': 'id' },
    { type: 'description', value: 'hero\'s id'}
  ])
})

// all
test('tokenizer() -> all @', t => {
  const input = `
    /*
     * @module setting/profile - hero's basic info
     * @action getHero - get a hero's profile
     * @api {GET} /api/heroes/:id
     * @param {Int} id - hero's id
     */`
     
  t.deepEqual(tokenizer(input), [
    { "type": "tag", "value": "module" },
    { "type": "field", "value": "setting/profile" },
    { "type": "description", "value": "hero's basic info" },

    { "type": "tag", "value": "action" },
    { "type": "field", "value": "getHero" },
    { "type": "description", "value": "get a hero's profile" },

    { "type": "tag", "value": "api" },
    { "type": "datatype", "value": "GET" },
    { "type": "field", "value": "/api/heroes/:id" },

    { "type": "tag", "value": "param" },
    { "type": "datatype", "value": "Int" },
    { "type": "field", "value": "id" },
    { "type": "description", "value": "hero's id" },
  ])
})