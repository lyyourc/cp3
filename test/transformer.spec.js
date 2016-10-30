import test from 'ava'
import transformer from '../src/transformer'

test('transformer() -> should return {Object}', t=> {
  t.truthy(typeof transformer() === 'object')
})

test('transformer() -> module with page & action', t => {
  const ast = {
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
  }

  t.deepEqual(transformer(ast), {
    "moduleList": [{
      "name": "setting",
      "introduction": "hero's setting",
      "pageList": [{
        "name": "profile",
        "actionList": [{
          "name": "getHero",
          "requestParameterList": [{
            "identifier": "id",
            "name": "hero's id",
            "dataType": "Int"
          }],
          "requestUrl": "/api/heroes/:id",
          "requestType": "GET"
        }, {
          "name": "getSkill",
          "requestParameterList": []
        }]
      }]
    }]
  })
})