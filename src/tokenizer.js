/**
 * tokenizer
 * 
 * @param {string} [input='']
 * @returns {array}
 */

export default function tokenizer (
  input = ''
) {
  input = input.trim()

  let current = 0
  let tokens = []
  
  while (current < input.length) {
    let char = input[current]
    const nextChar = input[current + 1]
    
    // 注释开头或结束
    if ((char === '/' && nextChar === '*') ||
      (char === '*' && nextChar === '/') ||
      (char === '/' && (/\s/.test(nextChar) || nextChar == null))
    ) {
      current++
      continue
    }
    
    // 标签
    if (char === '@') {
      char = input[++current]
      let value = ''

      while(/\S/.test(char)) {
        value += char
        char = input[++current]
      }
      
      tokens.push({ type: 'tag', value: value })

      current++
      continue
    }
    
    // 参数类型
    if (char === '{') {
      char = input[++current]
      let value = ''

      while(/[^}]/.test(char)) {
        value += char
        char = input[++current]
      }
      
      tokens.push({ type: 'datatype', value: value })
      
      current++
      continue
    }
    
    // 描述
    if (/-/.test(char)) {
      let value = ''
      char = input[++current]
      
      while(/[^\n\r]/.test(char)) {
        value += char
        char = input[++current]
      }
      
      tokens.push({ type: 'description', value: value.trim() })
      
      current++
      continue
    }
    
    // 字段名/值
    if (char != null && /[^\s\*]/.test(char)) {
      let value = ''
      
      while(/\S/.test(char)) {
        value += char
        char = input[++current]
      }
      
      tokens.push({ type: 'field', value: value })
      
      current++
      continue
    }
    
    current++
  }
  
  return tokens
}
