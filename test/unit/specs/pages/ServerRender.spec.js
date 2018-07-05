import '@/components'
import '@/plugins/bootstrap'
import {shallowMount} from '@vue/test-utils'
import {createStore} from '@/store'
import {createApi} from '@/store/services'
import ServerRender from '@/pages/ServerRender.vue'

describe('Pages:ServerRender', () => {
    let Comp

    beforeEach(() => {
        const $api = createApi()
        const store = createStore().attachServices({$api})
        return Promise.all([store.actions.getUsers(1)]).then(res => {
            Comp = shallowMount(ServerRender, {
                store,
                mocks: {
                    // $router: router,
                    $route: {path: '/testssr', query: {}}
                }
            })
        })
    })

    it('Check user list', () => {
        expect(Comp.vm.usersList.results.length).toBeGreaterThanOrEqual(1)
    })
})
