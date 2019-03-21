import Vue from 'vue';
import Router from 'vue-router';
import EventList from './views/EventList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: () => import('./views/EventCreate.vue'),
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: () => import('./views/EventShow.vue'),
      props: true,
    },
  ],
});
