import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('nao aceita lances com valores menores que zero', () => {
  const wrapper = mount(Lance)
  expect(wrapper).toBeTruthy()
})
