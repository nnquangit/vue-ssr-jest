import Vue from 'vue'
import '@/components'
import '@/plugins/bootstrap'
import {shallowMount} from '@vue/test-utils'
import {sync} from 'vuex-router-sync'
import {createStore} from '@/store'
import {createRouter} from '@/router'
import {createStoreStorage} from '@/services/storestorage'
import {createApi} from '@/services/api'
import ServerRender from '@/pages/ServerRender.vue'


describe('ServerRender', () => {
    let Comp
    beforeEach(() => {
        const api = createApi()
        const router = createRouter()
        const store = createStore(createStoreStorage())

        sync(store, router)
        store.replaceState({...store.state, api})

        return Promise.all([store.dispatch('getUsers', 1)]).then(res => {
            Comp = shallowMount(ServerRender, {
                store,
                mocks: {
                    $router: router,
                    $route: {path: '/testssr', query: {}}
                }
            })
        })
    })

    it('Check user list', () => {
        expect(Comp.vm.usersList.length).toBeGreaterThanOrEqual(1)
    })
})
