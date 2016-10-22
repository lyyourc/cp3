import test from 'ava'
import couple from '../src/main'

test('couple() -> return an object', t => {
  t.true(couple === Object(couple))
})

test('couple() -> a `tokenizer` property -> is a function', t => {
  t.true(typeof couple.tokenizer === 'function')
})

test('couple() -> a `parser` property -> is a function', t => {
  t.true(typeof couple.parser === 'function')
})

test('couple() -> a `transformer` property -> is a function', t => {
  t.true(typeof couple.transformer === 'function')
})