/**
 * parser
 * 
 * @param {Array} [tokens=[]]
 * @returns {Object}
 */

export default function parser (
  tokens = []
) {
  if (tokens.length === 0) return null

  Array.prototype.last = function () {
    return this.slice(-1)[0]
  }

  const ast = { type: 'project', body: [] }
  
  const modules = toNewTokens(tokens).reduce((prev, token) => {
    const t = Object.assign({}, token, { body: [] })

    if (token.type === 'module' &&
      prev.find(m => m.field === token.field) == null
    )
      prev.push(t)
    else if (token.type === 'page' &&
      prev.last().body.find(p => p.field === token.field) == null
    )
      prev.last().body.push(t)
    else if (token.type === 'action')
      prev.last().body.last().body.push(t)
    else if (token.type === 'api' || token.type === 'param')
      prev.last().body.last().body.last().body.push(token)
      
    return prev
  }, [])
  
  return Object.assign(ast, { body: modules })
}

/**
 * toNewTokens
 * nest some tokens
 * 
 * @param {Array} tokens
 * @returns {Array}
 */
function toNewTokens (tokens) {
  return tokens.reduce((prev, { type, value }) =>
    type === 'tag'
      ? prev.concat({ type: value })
      : prev.slice(0, -1)
        .concat(Object.assign(prev.slice(-1)[0], { [type]: value }))
  , [])
}