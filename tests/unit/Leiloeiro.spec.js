import Leiloeiro from '@/views/Leiloeiro'

import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'

import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
  produto: 'Livro da casa do código',
  lanceInicial: 50,
  descricao: 'Livro bem bacana sobre Vue'
}

const lances = [
  {
    id: 1,
    valor: 100,
    data: '2020-06-01',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 101,
    data: '2020-06-02',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 102,
    data: '2020-06-03',
    leilao_id: 1
  }
]

describe('Leiloeiro inicia um leilao que nao possui lances', () => {
  test('avisa quando nao existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')

    expect(alerta.exists()).toBe(true)
  })
})

describe('Leiloeiro inicia leilao com lances', () => {
  test('nao deve exibir alerta "sem lances" quando existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')

    expect(alerta.exists()).toBe(false)
  })
  test('possui uma lista de lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const listaLances = wrapper.find('.list-inline')
    expect(listaLances.exists()).toBe(true)
  })
})

describe('Leiloeiro comunica os lances de maior e menor valor', () => {
  test('mostra lance de maior valor', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.exists()).toBeTruthy()
    expect(maiorLance.text()).toBe('Maior lance: R$ 102')
  })

  test('mostra lance de menor valor', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const maiorLance = wrapper.find('.menor-lance')
    expect(maiorLance.exists()).toBeTruthy()
    expect(maiorLance.text()).toBe('Menor lance: R$ 100')
  })
})
