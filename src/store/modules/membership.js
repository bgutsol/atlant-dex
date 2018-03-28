import * as Membership from 'services/api/membership';
import {serverNotification} from 'services/notification';

export default {
  state: {
    token: '',
    refreshToken: '',
    userId: '',
    email: '',
    lastAction: '',
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== '';
    },
    hasRefreshToken(state) {
      return state.refreshToken != '';
    },
    getLastAction(state) {
      return state.lastAction;
    },
  },
  mutations: {
    createUser(state, data) {
      state.token = data.accessToken;
      state.refreshToken = data.refreshTokenCode;
    },
    flushUser(state) {
      state.token = '';
      state.refreshToken = '';
    },
    setLastActionTime(state) {
      state.lastAction = Date.now();
    },
  },
  actions: {
    login({commit, dispatch}, {email, password}) {
      return Membership.login({
        email,
        password,
      }).then((response) => {
        commit('createUser', response.data);
        dispatch('refreshToken');
        setTimeout(() => {
          dispatch('refreshToken');
        }, 1500000);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    logout({dispatch, state}) {
      return Membership.logout(state.refreshToken).then(() => {
        dispatch('dropUser');
      }).catch((res) => {
        serverNotification(res);
      });
    },
    tryReconnect({state, dispatch}) {
      dispatch('refreshToken').then((res) => {
      }).catch(() => {
        dispatch('dropUser');
      });
    },
    dropUser({commit}) {
      commit('flushUser');
      // commit('trade/clearOrders', null, {root: true});
      commit('trade/emptyWallet', null, {root: true});
    },
    regFinish({state}, code) {
      return Membership.regFinish(code).then((res) => {
        commit('createUser', response.data);
      });
    },
    refreshToken({state, commit, dispatch}) {
      return Membership.refreshToken({
        grantType: 'RefreshToken',
        refreshToken: state.refreshToken,
        email: state.email,
      }).then((response) => {
        commit('createUser', response.data);
      }).catch((response) => {
        console.log(response);
      });
    },
    rememberLastAction({getters, commit}) {
      if (getters.isLoggedIn) commit('setLastActionTime');
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
