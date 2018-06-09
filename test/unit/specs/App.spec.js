import '@/components'
import '@/plugins/bootstrap'
import {shallowMount} from '@vue/test-utils'
import {sync} from 'vuex-router-sync'
import {createStore} from '@/store'
import {createRouter} from '@/router'
import {createStoreStorage} from '@/services/storestorage'
import Navbar from '@/components/Layout/Navbar.vue'

describe('App.vue', () => {
    let Comp

    beforeEach(() => {
        const api = {
            get: (url) => console.log('get', url),
            post: (url, data) => console.log('post', url, data)
        }
        const router = createRouter()
        const store = createStore(createStoreStorage())
        sync(store, router)
        store.replaceState({...store.state, api})
        Comp = shallowMount(Navbar, {store})
    })

    it('Check app not login', () => {
        expect(Comp.vm.isLoggedIn).toBe(false)
    })

    it('Check app logined', () => {
        Comp.vm.$store.dispatch('signin', {fullname: 'Quang Ngô', token: '123456'})
        expect(Comp.vm.currentUser.fullname).toEqual('Quang Ngô')
    })
})
