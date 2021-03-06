// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  VSelect.dropdown(
    :class="{'dropdown--noBorder': noBorder, 'dropdown--noPadding': noPadding, 'dropdown--underline': underline, 'dropdown--noTriangle':  noTriangle, 'dropdown--whiteTriangle': whiteTriangle, 'dropdown--blue': isColorBlue, 'dropdown--black': isColorBlack, 'dropdown--smallTriangle': isSmallTriangle}",
    :options="$_options",
    placeholder="",
    :show-labels="false",
    :allow-empty="false",
    :value="$_value",
    :track-by="$_trackBy",
    :searchable="searchable",
    @input="onChange",
    v-bind="$attrs",
    no-border,
    no-padding,
    :preselect-first="preselectFirs",
    underline,
    whiteTriangle,
    :maxHeight="maxHeight",
  )
    span.multiselect__placeholder(slot="placeholder") {{placeholder}}
    span(slot="noResult") No Results
    template(v-for="(value, slotName) in $scopedSlots", :slot="slotName",  slot-scope="props")
      slot(:name="slotName" v-bind="props")
</template>

<script>
import VSelect from 'vue-multiselect';

export default {
  name: 'CommonSelect',
  computed: {
    isOptionsObject() {
      return this.options && typeof this.options === 'object' && !Array.isArray(this.options);
    },
    $_options() {
      if (this.isOptionsObject) {
        return Object.keys(this.options).map((key) => {
          if (typeof this.options[key] === 'object') {
            return {...this.options[key], keyValue: key};
          } else {
            return {label: this.options[key], keyValue: key};
          }
        });
      }
      return this.options;
    },
    $_value() {
      if (this.isOptionsObject) {
        return this.options[this.value];
      } else if (this.trackBy) {
        return this.options.find((opt) => opt[this.trackBy] === this.value);
      }
      return this.value;
    },
    $_trackBy() {
      if (this.isOptionsObject) {
        return 'keyValue';
      }
      return this.trackBy;
    },
  },
  methods: {
    onChange(val) {
      let value = val;
      if (this.isOptionsObject) {
        value = val.keyValue;
      } else if (this.trackBy) {
        value = val[this.trackBy];
      }
      this.$emit('input', value);
    },
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    preselectFirs: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'sdfsdf',
    },
    options: [Array, Object],
    trackBy: String,
    searchable: {
      type: Boolean,
      default: false,
    },
    noBorder: Boolean,
    noPadding: Boolean,
    noTriangle: [Boolean, String],
    whiteTriangle: [Boolean, String],
    underline: {
      type: Boolean,
      required: false,
      default: false,
    },
    isColorBlue: Boolean,
    isColorBlack: Boolean,
    maxHeight: {
      type: Number,
      required: false,
      default: 240,
    },
    isSmallTriangle: Boolean,
  },
  components: {
    VSelect,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import 'variables';
.index--dark .dropdown {
  &--black{
    color: $color__white;
  }
}
  .multiselect {
    position: relative;
    cursor: pointer;
    display: block;
    outline: 0;
    text-align: left;
    margin-right: 18px;
    &--active /deep/ &__tags {
      border-color: $input-border-color-highlight;
    }

    /deep/ & {
      &__input {
        background: transparent;
        border-radius: 0;
        border: none;
        box-sizing: border-box;
        display: inline-block;
        line-height: 1em;
        margin: 0;
        min-height: 1em;
        padding: 0;
        position: relative;
        transition: border .1s ease;
        vertical-align: middle;
        width: 100%;

        &::placeholder {
          color: $input-placeholder-color;
        }
      }

      &__placeholder {
        color: $input-placeholder-color;
      }

      &__tags {
        align-items: center;
        background: transparent;
        display: flex;
        font-size: 14px;
        font-weight: 500;
        transition: $input-transition;
        padding: 0 !important;
      }

      &__content-wrapper {
        position: absolute;
        top: calc(100% + 4px);
        overflow: auto;
        display: block;
        background: $color-white;
        min-width: 100%;
        max-height: 240px;
        z-index: 3;
        color: #00354D;
      }

      &__content {
        list-style: none;
        display: inline-block;
        padding: 0;
        margin: 0;
        min-width: 100%;
        vertical-align: top;
      }

      &__option {
        align-items: center;
        cursor: pointer;
        color: $input-option-color;
        display: flex;
        line-height: 16px;
        min-height: 32px;
        padding: $input-padding;
        padding-left: 20px;
        position: relative;
        text-decoration: none;
        text-transform: none;
        vertical-align: middle;
        transition: all .2s;
        white-space: nowrap;

        &--highlight {
          background-color: #eee;
          color: $input-option-highlight-color;
        }

        &--selected {
          &:before {
            border: solid $input-option-color;
            border-width: 0 2px 2px 0;
            content: '';
            display: block;
            height: 8px;
            left: 8px;
            position: absolute;
            transform: rotate(45deg);
            width: 4px;
          }
        }
      }

      &__select {
        position: absolute;
        height: 100%;
        right: -15px;
        top: 0;
        // padding: 0 9px;
        transition: transform .2s ease;
        display: flex;
        align-items: center;
        &:before {
          content: "";
          border-style: solid;
          border-width: 9px 6px 0;
          border-color: $background__blue transparent transparent;
        }
      }

      &__spinner {
        display: block;
        height: 16px;
        position: absolute;
        right: 6px;
        width: 16px;

        &:before,
        &:after {
          position: absolute;
          content: "";
          top: 50%;
          left: 50%;
          margin: -8px 0 0 -8px;
          width: 16px;
          height: 16px;
          border-radius: 100%;
          border-color: #ffc600 transparent transparent;
          border-style: solid;
          border-width: 2px;
          box-shadow: 0 0 0 1px transparent;
        }

        &:before {
          animation: spinning 2.4s  cubic-bezier(.41,.26,.2,.62);
          animation-iteration-count: infinite;
        }

        &:after {
          animation: spinning 2.4s cubic-bezier(.51,.09,.21,.8);
          animation-iteration-count: infinite;
        }
      }
    }
  }

  .dropdown {
    color: $color__white;
    &--noBorder /deep/ .multiselect__tags {
      border: none;
    }
    &--noPadding /deep/ .multiselect {
      &__tags {
        padding: 0 19px 0 0;
      }
      &__select {
        padding:  0 0 0 0px;
      }
    }
    &--underline /deep/ .multiselect {
      &__tags {
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -7px;
          background: $background__white;
          transition: transform .3s ease-in;
          transform: scale3d(1,1,1);
        }

        &:hover:after {
          transition: transform .3s ease-out;
          transform: scale3d(0,1,1);
        }
      }
    }
    &--noTriangle {
      margin-right: 0 !important;

      & /deep/ .multiselect {

        &__select {
          height: 0;
          right: 0;
          padding: 0;

          &:before {
            display: none;
          }
        }
      }
      &--whiteTriangle /deep/ .multiselect {
        &__select {
          &:before {
            border-color: $background__white transparent transparent;
          }
        }
      }
    }
    &--blue {
      color: $color__blue;
      & /deep/ .multiselect {
        &__tags {
          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            bottom: -7px;
            background: $background__blue;
            transition: transform .3s ease-in;
            transform: scale3d(1,1,1);
          }

          &:hover:after {
            transition: transform .3s ease-out;
            transform: scale3d(0,1,1);
          }
        }
        &__single {
          font-weight: 700;
          font-size: 16px;
          color: #004DFF;
        }
      }
    }
    &--black {
      color: $color__black;
    }

    &--smallTriangle {
      & /deep/ .multiselect {
        &__select {
          &:before {
            border-width: 7px 4px 0;
          }
        }
      }
    }
  }


  @keyframes spinning {
    from { transform:rotate(0) }
    to { transform:rotate(2turn) }
  }
</style>
