// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import store from '@/store';
import Index from '@/Index.vue';
import * as Membership from 'services/api/membership';

export default [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/finish-registration',
    component: Index,
    props: (route) => ({
      code: route.query.code,
    }),
    beforeEnter(to, from, next) {
      store.dispatch('membership/regFinish', to.query.code).then((data) => {
        next('/');
      }).catch(() => {
        store.commit('modal/open', {
          name: 'registrationFailed',
        });
        next('/');
      });
    },
  },
  {
    path: '/finish-restore',
    component: Index,
    props: (route) => ({
      code: route.query.code,
    }),
    beforeEnter(to, from, next) {
      Membership.confirmPasswordRestore(to.query.code).then((data) => {
        store.commit('modal/open', {
          name: 'newPassword',
          data: {
            code: to.query.code,
          },
        });
        next('/');
      }).catch(() => {
        next('/');
      });
    },
  },
  {
    path: '/verify-email',
    component: Index,
    props: (route) => ({
      code: route.query.code,
    }),
    beforeEnter(to, from, next) {
      store.dispatch('user/verifyAdditionalEmail', to.query.code).then((data) => {
        next('/');
      }).catch(() => {
        next('/');
      });
    },
  },
];
