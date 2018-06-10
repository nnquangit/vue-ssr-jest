import Vue from 'vue'
import '@/components'
import '@/plugins/bootstrap'
import {shallowMount} from '@vue/test-utils'
import {sync} from 'vuex-router-sync'
import {createStore} from '@/store'
import {createRouter} from '@/router'
import {createStoreStorage} from '@/services/storestorage'
import Navbar from '@/components/Layout/Navbar.vue'


describe('Components:Navbar', () => {
    let Comp

    beforeEach(() => {
        const router = createRouter()
        const store = createStore(createStoreStorage())
        sync(store, router)
        Comp = shallowMount(Navbar, {store})
    })

    it('Check not login', () => {
        expect(Comp.vm.isLoggedIn).toBe(false)
    })

    it('Check logined', () => {
        Comp.vm.$store.dispatch('signin', {fullname: 'Quang Ngô', token: '123456'})
        expect(Comp.vm.currentUser.fullname).toEqual('Quang Ngô')
    })
})
