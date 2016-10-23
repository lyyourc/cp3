import test from 'ava'
import parser from '../src/parser'

test('parser() -> should return {Array}', t => {
  t.is(parser(), null)
})

test('parser() -> a single module', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },
  ]
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting',
      description: 'hero\'s setting',
      body: [],
    }]
  })
})

test('parser() -> multiple same modules', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
  ]
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting',
      description: 'hero\'s setting',
      body: [],
    }]
  })
})

test('parser() -> multiple different modules', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },

    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'home' },
  ]
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting',
      description: 'hero\'s setting',
      body: [],
    }, {
      type: 'module',
      field: 'home',
      body: [],
    }]
  })
})

test('parser() -> module with multiple pages', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },
    
    { type: 'tag', value: 'page' },
    { type: 'field', 'value': 'profile' },
    { type: 'description', value: 'get a hero\'s profile' },
    
    { type: 'tag', value: 'page' },
    { type: 'field', 'value': 'auth' },
    { type: 'description', value: 'hero\'s authentication' },
  ]
  
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting',
      description: 'hero\'s setting',
      body: [{
        type: 'page',
        field: 'profile',
        description: 'get a hero\'s profile',
        body: [],
      }, {
        type: 'page',
        field: 'auth',
        description: 'hero\'s authentication',
        body: [],
      }]
    }]
  })
})

test('parser() -> module with different pages', t => {
  const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },
    
    { type: 'tag', value: 'page' },
    { type: 'field', 'value': 'profile' },
    { type: 'description', value: 'get a hero\'s profile' },
    
    { type: 'tag', value: 'page' },
    { type: 'field', 'value': 'profile' },
  ]
  
  t.deepEqual(parser(tokens), {
    type: 'project',
    body: [{
      type: 'module',
      field: 'setting',
      description: 'hero\'s setting',
      body: [{
        type: 'page',
        field: 'profile',
        description: 'get a hero\'s profile',
        body: [],
      }]
    }]
  })
})

test('parser() -> module with page & action', t => {
   const tokens = [
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },
    
    { type: 'tag', value: 'page' },
    { type: 'field', 'value': 'profile' },
    { type: 'description', value: 'get a hero\'s profile' },

    { type: 'tag', value: 'action' },
    { type: 'field', value: 'getHero' },
    { type: 'description', value: 'get a hero' },

    { type: 'tag', 'value': 'api' },
    { type: 'datatype', value: 'GET'},
    { type: 'field', 'value': '/api/heroes/:id' },
    
    { type: 'tag', value: 'param' },
    { type: 'datatype', value: 'Int'},
    { type: 'field', 'value': 'id' },
    { type: 'description', value: 'hero\'s id'},
    
    { type: 'tag', value: 'module' },
    { type: 'field', 'value': 'setting' },
    { type: 'description', value: 'hero\'s setting' },
    
    { type: 'tag', value: 'page' },
    { type: 'field', 'value': 'profile' },
    { type: 'description', value: 'get a hero\'s profile' },

    { type: 'tag', value: 'action' },
    { type: 'field', value: 'getSkill' },
    { type: 'description', value: 'get skills of hero' },
  ]
  
  t.deepEqual(parser(tokens), {
    type: "project",
    body: [{
      type: "module",
      field: "setting",
      description: "hero's setting",
      body: [{
        type: 'page',
        field: 'profile',
        description: 'get a hero\'s profile',
        body: [{
          type: "action",
          field: "getHero",
          description: "get a hero",
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
        }, {
          type: 'action',
          field: 'getSkill',
          description: 'get skills of hero',
          body: [],
        }]
      }]
    }]
  })
})