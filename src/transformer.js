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
        pageList: [],
      })
    },
    
    page: function (node, parent) {
      newAst.moduleList
        .find(m => m.name === parent.field)
        .pageList.push({
          name: node.field,
          actionList: [], 
        })
    },
 
    action: function (node, parent) {
      newAst.moduleList.some(m => {
        const page = m.pageList.find(p => p.name === parent.field)
        
        if (page == null) return false
        
        page.actionList.push({
          name: node.field,
          requestParameterList: []
        })
        return true
      })
    },
    
    api: function (node, parent) {
      newAst.moduleList.some(m => {
        const action = m.pageList.reduce((prev, page) => {
          if (prev != null) return prev
          return page.actionList.find(a => a.name === parent.field)
        }, null)

        if (action == null) return false
        
        action.requestUrl = node.field
        action.requestType = node.datatype
        return true
      })
    },
    
    param: function (node, parent) {
      newAst.moduleList.some(m => {
        const action = m.pageList.reduce((prev, page) => {
          if (prev != null) return prev
          return page.actionList.find(a => a.name === parent.field)
        }, null)

        if (action == null) return false

        action.requestParameterList.push({
          identifier: node.field,
          name: node.description,
          dataType: node.datatype
        })
        return true
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