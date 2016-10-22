import test from 'ava'
import parser from '../src/parser'

test('parser() -> should return {Array}', t => {
  t.is(parser(), null)
})

test('parser() -> a single module', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/profile' },
    { type: 'description', value: 'hero\'s basic info' },
  ]
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting/profile',
      description: 'hero\'s basic info',
      body: [],
    }]
  })
})

test('parser() -> multiple same modules', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/profile' },
    { type: 'description', value: 'hero\'s basic info' },
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/profile' },
  ]
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting/profile',
      description: 'hero\'s basic info',
      body: [],
    }]
  })
})

test('parser() -> multiple different modules', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/profile' },
    { type: 'description', value: 'hero\'s basic info' },
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/auth' },
  ]
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting/profile',
      description: 'hero\'s basic info',
      body: [],
    }, {
      type: 'module',
      field: 'setting/auth',
      body: [],
    }]
  })
})

test('parser() -> module with action', t => {
   const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting/profile' },
    { type: 'description', value: 'hero\'s basic info' },

    { type: 'tag', value: 'action' },
    { type: 'field', value: 'getHero' },
    { type: 'description', value: 'get a hero\'s profile' },

    { type: 'tag', 'value': 'api' },
    { type: 'datatype', value: 'GET'},
    { type: 'field', 'value': '/api/heroes/:id' },
    
    { type: 'tag', value: 'param' },
    { type: 'datatype', value: 'Int'},
    { type: 'field', 'value': 'id' },
    { type: 'description', value: 'hero\'s id'}
  ]
  
  t.deepEqual(parser(tokens), {
    type: "project",
    body: [{
      type: "module",
      field: "setting/profile",
      description: "hero's basic info",
      body: [{
        type: "action",
        field: "getHero",
        description: "get a hero's profile",
        body: [{
          type: "api",
          datatype: "GET",
          field: "/api/heroes/:id"
        }, {
          type: "param",
          datatype: "Int",
          field: "id",
          description: "hero's id"
        }]
      }]
    }]
  })
})