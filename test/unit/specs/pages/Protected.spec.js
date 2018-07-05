import '@/components'
import '@/plugins/bootstrap'
import {shallowMount} from '@vue/test-utils'
import {createStore} from '@/store'
import Protected from '@/pages/Protected.vue'

describe('Pages:Protected', () => {
    let Comp

    beforeEach(() => {
        const store = createStore()
        store.actions.signin({fullname: 'Quang Ngô', token: '123456'})
        Comp = shallowMount(Protected)
    })

    it('Check protected page html', () => {
        expect(Comp.vm.$el.innerHTML).toEqual(expect.stringContaining('Quang Ngô'))
    })
})
