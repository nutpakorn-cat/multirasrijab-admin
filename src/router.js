import { createRouter, createWebHistory } from 'vue-router';

import LoginScreen from './screens/login-screen';
import AdminScreen from './screens/admin-screen';

import AdminHome from './screens/admin/admin-home-screen';
import AdminFooter from './screens/admin/admin-footer-screen';
import AdminAboutUs from './screens/admin/admin-about-us-screen';
import AdminTopic from './screens/admin/admin-topic-screen';
import AdminWork from './screens/admin/admin-work-screen';
import AdminMedia from './screens/admin/admin-media-screen';
import AdminPassword from './screens/admin/admin-password';

const routes = [
    {
        path: '/',
        component: LoginScreen,
    },
    {
        path: '/admin',
        component: AdminScreen,
        children: [
            {
                path: '',
                component: AdminHome
            },
            {
                path: 'home',
                component: AdminHome
            },
            {
                path: 'footer',
                component: AdminFooter
            },
            {
                path: 'about-us',
                component: AdminAboutUs
            },
            {
                path: 'topic',
                component: AdminTopic
            },
            {
                path: 'work',
                component: AdminWork
            },
            {
                path: 'footer',
                component: AdminFooter
            },
            {
                path: 'media',
                component: AdminMedia
            },
            {
                path: 'change-password',
                component: AdminPassword
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;