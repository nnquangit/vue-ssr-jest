import Vue from 'vue'
import '@/components'
import '@/plugins/bootstrap'
import {shallowMount} from '@vue/test-utils'
import {sync} from 'vuex-router-sync'
import {createStore} from '@/store'
import {createRouter} from '@/router'
import {createStoreStorage} from '@/services/storestorage'
import {createApi} from '@/services/api'
import Protected from '@/pages/Protected.vue'


describe('Pages:Protected', () => {
    let Comp

    beforeEach(() => {
        const api = createApi()
        const router = createRouter()
        const store = createStore(createStoreStorage())

        sync(store, router)
        store.replaceState({...store.state, api})
        store.dispatch('signin', {fullname: 'Quang Ngô', token: '123456'})
        Comp = shallowMount(Protected, {store})
    })

    it('Check protected page html', () => {
        expect(Comp.vm.$el.innerHTML).toEqual(expect.stringContaining('Quang Ngô'))
    })
})
