import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Um livro da casa do código',
  lanceInicial: 49,
  descricao: 'Um maravilho livro sobre Vue'
}

describe('Um leilao exibe os dados do produto', () => {
  test('exibe os dados do leilao no card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    expect(wrapper).toBeTruthy()
    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element

    expect(header.textContent).toBe(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(title.textContent).toBe(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(text.textContent).toBe(`${leilao.descricao}`)
  })
})
