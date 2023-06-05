import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  {path: '/', component: 'x-home-view'},
  {path: '/users', component: 'x-user-list'}
]);