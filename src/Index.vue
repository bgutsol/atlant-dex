// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.index(:class="`index--${theme}`")
  .index__body
    Sidebar
    .index__content
      MainPage(v-if="!isPageOpened()")
      PageLayout(v-else)
    //- Modals
    ResetPasswordModal(v-if="isModalOpened('reset')")
    NewPasswordModal(v-else-if="isModalOpened('newPassword')")
    SignUpModal(v-else-if="isModalOpened('signUp')")
    SignInModal(v-else-if="isModalOpened('signIn')")
    CryptoDepositModal(v-else-if="isModalOpened('cryptoDeposit')")
    CryptoWithdrawModal(v-else-if="isModalOpened('cryptoWithdraw')")
    FiatModal(v-else-if="isModalOpened('fiat')")
    TFAWarningModal(v-else-if="isModalOpened('tfaWarningModal')")
    RegistrationFailedModal(v-else-if="isModalOpened('registrationFailed')")
    AddNewAlertModal(v-else-if="isModalOpened('addAlert')")
    SaveViewModal(v-else-if="isModalOpened('saveView')")
</template>

<script>
import i18n from '@/i18n';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {notification} from 'services/notification';
// import * as Trade from 'services/api/trade';
import {showWelcome} from '@/config';
import Sidebar from 'components/Sidebar';
import MainPage from 'pages/MainPage';
import PageLayout from 'layouts/PageLayout';
import ResetPasswordModal from 'modals/ResetPasswordModal';
import NewPasswordModal from 'modals/NewPasswordModal';
import SignUpModal from 'modals/SignUpModal';
import SignInModal from 'modals/SignInModal';
import CryptoDepositModal from 'modals/CryptoDepositModal';
import CryptoWithdrawModal from 'modals/CryptoWithdrawModal';
import FiatModal from 'modals/FiatModal';
import TFAWarningModal from 'modals/TFAWarningModal';
import RegistrationFailedModal from 'modals/RegistrationFailedModal';
import AddNewAlertModal from 'modals/AddNewAlertModal';
import SaveViewModal from 'modals/SaveViewModal';
import {signalRNotification} from '@/store/staticData/signalRNotification';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
      currentPage: 'currentPage',
    }),
    ...mapState('tradeInfo', {
      pair: 'pair',
    }),
    ...mapState('membership', {
      token: 'token',
    }),
    ...mapState('user', {
      account: 'account',
      notificationsCounter: 'notificationsCounter',
      theme: 'theme',
    }),
    ...mapGetters('user', [
      'isTFAEnabled',
    ]),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('modal', {
      isModalOpened: 'isOpened',
    }),
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
  },
  methods: {
    ...mapMutations('misc', {
      setSidebar: 'setSidebar',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('tradeInfo', {
      setPair: 'setPair',
      setDesktopData: 'setDesktopData',
      setOHLC: 'setOHLC',
      addNewPrices: 'addNewPrices',
    }),
    ...mapMutations('orders', {
      addActiveOrder: 'addActiveOrder',
      changeOrderStatus: 'changeOrderStatus',
      addNewTrade: 'addNewTrade',
    }),
    ...mapMutations('user', [
      'changePortfolio',
      'setNotificationsCounter',
    ]),
    ...mapMutations('alerts', [
      'updateSidebarAlert',
      'insertListAlert',
    ]),
    ...mapActions('membership', [
      'dropUser',
      'setRefreshTimeout',
    ]),
    ...mapActions('localization', [
      'setLang',
    ]),
    ...mapActions('user', [
      'getTokens',
      'getProfileData',
      'getCurrencies',
    ]),
    ...mapActions('alerts', [
      'insertSidebarAlert',
    ]),
    ...mapActions('orders', [
      'updateOrderBook',
    ]),
    updateOverflow() {
      // document.querySelector('#app').style.overflow = this.showSidebar ? 'hidden' : null;
    },
    hubSubscribe() {
      // add signalR events here
      this.$hub.on('newNotification', (data) => {
        if (signalRNotification[data.notificationType]) {
          notification({
            text: i18n.t(`notifications.${signalRNotification[data.notificationType]}`, i18n.locale, data.arguments),
            type: 'info',
          });
          if (data.notificationType < 7) {
            this.setNotificationsCounter(this.notificationsCounter + 1);
          }
        };
      });
      this.$hub.on('newOrder', (data) => {
        this.addActiveOrder(data);
      });
      this.$hub.on('orderChanged', (data) => {
        this.changeOrderStatus(data);
      });
      this.$hub.on('newTrade', (data) => {
        this.addNewTrade(data);
      });
      this.$hub.on('newBalance', (data) => {
        this.changePortfolio(data);
      });
      this.$hub.on('newTransaction', (data) => {
        EventHub.$emit('updateTransactions', data);
      });
      this.$hub.on('newTradeStatistic', (data) => {
      });
      this.$hub.on('orderBookChanged', (data) => {
        this.updateOrderBook(data);
      });
      this.$hub.on('newAlert', (data) => {
        EventHub.$emit('appendSidebarAlerts', data);
        EventHub.$emit('appendAlertsList');
      });
      this.$hub.on('alertTriggered', (data) => {
        EventHub.$emit('updateSidebarAlerts', data);
        EventHub.$emit('updateAlertsList', data);
      });
      this.$hub.onclose(() => {
        this.$hub.isClosed = true;
        this.$hub.reconnect(this.token, this.pair).then(() => this.hubSubscribe());
      });
    },
  },
  watch: {
    pair() {
      this.$hub.invokeByStart
        .then(
          (connection) => {
            connection.invoke('setPair', this.pair);
          }
        );
    },
    token() {
      if (this.token && !this.$hub.isClosed) {
        this.$hub.invokeByStart.then(
          (connection) => {
            connection.invoke('authenticate', this.token);
          }
        );
      } else {
        this.$hub.stop();
      }
    },
    showSidebar() {
      this.updateOverflow();
    },
    isLoggedIn(isTrue) {
      if (!isTrue) {
        this.openModal({name: 'signIn'});
        notification({
          text: 'Logged out',
        });
      } else {
        this.getProfileData().then((response) => {
          if (!this.isTFAEnabled) {
            this.openModal({name: 'tfaWarningModal'});
          }
          return response;
        });
      }
    },
  },
  created() {
    this.setLang();
    this.hubSubscribe();

    if (this.isLoggedIn) {
      this.setRefreshTimeout();
      this.getProfileData();
      this.getCurrencies();
    };
  },
  mounted() {
    if (showWelcome) {
      this.openModal('welcome');
    }
    this.updateOverflow();
  },
  components: {
    Sidebar,
    MainPage,
    PageLayout,
    ResetPasswordModal,
    NewPasswordModal,
    SignUpModal,
    SignInModal,
    CryptoDepositModal,
    CryptoWithdrawModal,
    FiatModal,
    TFAWarningModal,
    RegistrationFailedModal,
    AddNewAlertModal,
    SaveViewModal,
  },
};
</script>

<style src="noty/lib/noty.css"></style>
<style lang='scss'>
@import '~perfect-scrollbar/css/perfect-scrollbar.css';
@import 'styles/fonts';
@import 'styles/defaults';
@import 'styles/global';
@import 'styles/overrides';
@import 'variables';

.index {
  position: relative;
  display: flex;
  min-width: 1000px;
  min-height: 700px;
  height: 100vh;

  &--dark {
    color: white;
  }

  &__body {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin-left: auto;
    margin-right: auto;
  }
  &__content {
    position: relative;
    display: flex;
    flex: 2;
    flex-direction: column;
    z-index: 0;
  }
}
</style>
