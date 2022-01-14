import NovoLeilao from '@/views/NovoLeilao'

import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
  push: jest.fn()
}

describe('Um novo leilao deve ser criado', () => {
  test('dado o formulário preenchido, um leilao precisa ser criado', () => {
    const wrapper = mount(NovoLeilao, {
      mocks: { $router }
    })

    wrapper.find('.produto').setValue('Nome 1')
    wrapper.find('.descricao').setValue('Descricao 1')
    wrapper.find('.valor').setValue(50)

    wrapper.find('form').trigger('submit')

    expect(createLeilao).toBeCalledTimes(1)
  })
})
