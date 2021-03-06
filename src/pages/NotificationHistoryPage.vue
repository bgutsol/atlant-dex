// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="Notification history",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checkedArray.sync='checkedArray',
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
  :getApiRequest="getNotifications"
  :getExport="getExport",
)
  .notificationHistory
    .table
      table.table__body
        thead
          tr.notificationHistory__row
            //- th
            th.table__sortable(:class="{'table__sortable--desc': sortBy==='datetime' && !asc}" @click="sortNotifications('datetime')") Time & Date
            th.table__sortable(:class="{'table__sortable--desc': sortBy==='level' && !asc}" @click="sortNotifications('level')") Type
            th Description
    Loader(v-if="loadingContent")
    .table.notificationHistory__table(v-else v-scrollbar="")
      table.table__body
        tbody
          tr.notificationHistory__row(v-for="(item, index) in data")
            //- td
            //-   Radio.notificationHistory__radio(size="17", :name="item", :value="item", v-model="checked")
            td {{formatTime(item.dateTime)}}
            td.notificationHistory__capital(:class="{'notificationHistory__capital--red' : getNotificationType(item.level) === 'Warning' || getNotificationType(item.level) === 'Error'}") {{getNotificationType(item.level)}}
            td {{$t('notifications.' + getStatus(item), item.arguments)}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {getNotificationsHistoryCSV} from 'services/api/user.js';
import {exportCSV} from 'services/misc';
import {serverNotification} from 'services/notification.js';
import {scrollbar} from '@/directives';
import {DateTime} from 'luxon';
import {signalRNotification} from '@/store/staticData/signalRNotification';
import {notificationType} from '@/store/staticData/notificationType';
import Checkbox from 'components/Checkbox';
import TableLayout from 'layouts/TableLayout';
import Loader from 'components/Loader';

export default {
  data() {
    return {
      checkedArray: [],
      page: 1,
      sortBy: 'datetime',
      asc: false,
      loadingContent: false,
      isLoadingError: false,
    };
  },
  computed: {
    ...mapState('user', {
      notificationsCounter: 'notificationsCounter',
    }),
    ...mapGetters('user', {
      data: 'getNotifications',
      totalItems: 'getNotificationItems',
      itemsOnPage: 'getNotificationsOnPage',
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.itemsOnPage);
    },
  },
  methods: {
    ...mapActions('user', ['getNotificationHistory']),

    isChecked(id) {
      return Boolean(this.checkedArray.indexOf(id) != -1);
    },

    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },

    formatTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },

    getNotificationType(level) {
      return notificationType[level];
    },

    getStatus(notification) {
      return signalRNotification[notification.type];
    },

    getNotifications() {
      if (this.isLoggedIn === false) return false;

      this.isLoadingError = false;
      this.loadingContent = true;
      this.getNotificationHistory({
        page: this.page,
        sortBy: this.sortBy,
        ascending: this.asc,
      }).then((response) => {
        this.loadingContent = false;
        return response;
      }).catch((error) => {
        this.isLoadingError = true;
        this.loadingContent = false;
        return error;
      });
    },

    sortNotifications(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getNotifications();
    },

    changeActivePage(num) {
      this.page = num;
      this.getNotifications();
    },

    getExport() {
      getNotificationsHistoryCSV({
        sortBy: this.sortBy,
        ascending: this.asc,
        Ids: this.checkedArray.toString(),
      }).then((res) => {
        exportCSV(res, 'notifications');
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  created() {
    this.getNotifications();
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    Checkbox,
    Loader,
  },
};
</script>


<style lang="scss" scoped>
@import "variables";
.notificationHistory {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    width: 100%;
    &__redText {
      color: $color_red;
    }
    &__capital {
      text-transform: capitalize;
      color: $color__green;
      &--red {
        color: $color__red;
      }
    }
    &__table {
      position: relative;
    }
    &__row {
      & > th, td {
        &:nth-child(1) {
          padding-left: 10px;
          width: 25%;
        }
        &:nth-child(2) {
          width: 25%;
        }
        &:nth-child(3) {
          width: 50%;
        }
      }
    }
}
</style>
