import Avaliador from '@/views/Avaliador'

import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = [
  {
    produto: 'Livro da casa do código',
    lanceInicial: 50,
    descricao: 'Livro bem bacana sobre Vue'
  },
  {
    produto: 'Outro livro da casa do código',
    lanceInicial: 100,
    descricao: 'Livro bem bacana sobre testes unitários'
  }
]

describe('Um avaliador que se conecta com a API', () => {
  test('mostra todos os leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leilao)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leilao.length)
  })
  test('nao há leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce()

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
