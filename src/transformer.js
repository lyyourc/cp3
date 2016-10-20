/**
 * transformer
 * 
 * @param {Object} ast
 * @returns {Object}
 */
export default function transformer (
  ast = {}
) {
  const newAst = { moduleList: [] }
  
  traverser(ast, {
    module: function (node, parent) {
      newAst.moduleList.push({
        name: node.field,
        introduction: node.description,
        actionList: [],
      })
    },
 
    action: function (node, parent) {
      newAst.moduleList
        .find(m => m.name === parent.field)
        .actionList.push({
          name: node.field,
          requestParameterList: []
        })
    },
    
    api: function (node, parent) {
      newAst.moduleList.some(m => {
        const action = m.actionList.find(a => a.name === parent.field)

        if (action == null) return false
        
        action.requestUrl = node.field
        action.requestType = node.datatype
        return true
      })
    },
    
    param: function (node, parent) {
      newAst.moduleList.some(m => {
        const action = m.actionList.find(a => a.name === parent.field)

        if (action) {
          action.requestParameterList.push({
            identifier: node.field,
            name: node.description,
            dataType: node.datatype
          })
          return true
        }

        return false
      })
    },
  })
  
  return newAst
}

/**
 * traverser
 * 
 * @param {Object} ast
 * @param {Object} visitor
 */
function traverser (ast, visitor) {
  function traverseNode (node, parent) {
    const method = visitor[node.type]
    method && method(node, parent)
    
    node.body && node.body.forEach(c => traverseNode(c, node))
  }
  
  traverseNode(ast, {})
}