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
   
const { tokenizer } = couple

const tokens = tokenizer(comment)
console.log('hello', tokens)