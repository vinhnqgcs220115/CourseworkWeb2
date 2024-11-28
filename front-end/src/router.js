import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import TestResults from './views/testResults.vue';
import Details from './views/Details.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/words'
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/words',
            name: 'words',
            component: Words
        },
        {
            path: '/words/new',
            name: 'new-word',
            component: New
        },
        {
            path: '/words/:id',
            name: 'show',
            component: Show
        },
        {
            path: '/words/:id/edit',
            name: 'edit',
            component: Edit
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '/results',
            name: 'results',
            component: TestResults
        },
        {
            path: '/results/:id',
            name: 'details',
            component: Details
        }
    ]
});