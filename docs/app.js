const comment = `
  /**
   * @module setting - hero's setting
   * @page profile - hero's basic info
   * @action getHero - get a hero's profile
   * @api {GET} /api/heroes/:id
   * @param {Int} id - hero's id
   */`
     
const { tokenizer, parser, transformer } = cp3

const tokens = tokenizer(comment)
const ast = parser(tokens)
const newAst = transformer(ast)

console.log(JSON.stringify(newAst, null, 2))
