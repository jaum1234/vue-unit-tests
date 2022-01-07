import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('deve criar o componente Lance', () => {
  const wrapper = mount(Lance)
  expect(wrapper).toBeTruthy()
})

test('deve encontrar um input em Lance', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  expect(input).toBeTruthy()
})

test('nao aceita lances com valores menores que zero', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(-100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  expect(lancesEmitidos).toBeUndefined()
})

test('emite um lance quando o valor é maior do que zero', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  expect(lancesEmitidos).toHaveLength(1)
})

test('deve emitir o valor esperado de um lance válido', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  // [
  //    [100]
  // ]
  const lance = parseInt(lancesEmitidos[0][0])
  expect(lance).toBe(100)
})

describe('um lance com valor mínimo', () => {
  test('todos os lances devem possuir um valor maior do que o mínimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })
  test('emite o valor esperado em um lance válido', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(parseInt(lancesEmitidos[0][0])).toBe(400)
  })
  test('nao sao aceitos lances com valores menores do qu o mínimo informado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgErro = wrapper.find('p.alert').element.textContent
    const msgErroEsperada = 'O valor mínimo para o lance é de R$ 300'
    expect(msgErro).toContain(msgErroEsperada)
  })
})
