// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.logout(@click="membershipAction")
  Icon.logout__icon(v-if="isLoggedIn" id="out")
  Icon.logout__icon(v-if="!isLoggedIn" id="in")
  // .logout__text {{ isLoggedIn ? 'Logout' : 'Login' }}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('membership', {
      logout: 'logout',
    }),
    membershipAction() {
      this.isLoggedIn ? this.logout() : this.openModal({name: 'signIn'});
    },
  },
};
</script>

<style lang="scss">
@import 'variables';
.logout {
  cursor: pointer;
  display: flex;
  align-items: center;
  fill: $fill__blue;
  color: $color__blue;
  &__icon {
    $size: 19px;
    width: $size;
    height: $size;
  }
  &__text {
    font-size: 12px;
    font-weight: 700;
    margin-left: 12px;
  }
  &:hover {
    fill: $fill__blue;
    color: $color__blue;
  }
}
</style>
