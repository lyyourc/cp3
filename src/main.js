import tokenizer from './tokenizer'
import parser from './parser'
import transformer from './transformer'

const comment = `
  /*
   * @module setting/profile - hero's basic info
   * @action getHero - get a hero's profile
   * @api {GET} /api/heroes/:id
   * @param {Int} id - hero's id
   */
  
  /*
   * @module setting/profile
   * @action getUser
   * @api {GET} /api/users
   */`


const tokens = tokenizer(comment)
const ast = parser(tokens)
console.log(transformer(ast))
