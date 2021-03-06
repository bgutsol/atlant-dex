// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
  )

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  )
    .photos
      .photos__container
        .galleryInfo
          span.current {{ active + 1 }}
          span.length  / {{ length }}
        .gallery
          .galleryCell(
            v-for="(el, index) in preparedImages"
            :style="{ backgroundImage: 'url(' + el.src + ')' }"
            @click="setActive(el)"
          )
        .galleryBottom
          span.left(@click="prev()")
          span.address {{ address }}
          span.right(@click="next()")
</template>

<script>
import TileBase from '../../mixins/TileBase';

export default {
  mixins: [TileBase],
  data() {
    return {
      active: 0,
      images: [
        '/static/test_images/1.jpg',
        '/static/test_images/2.jpg',
        '/static/test_images/3.jpg',
        '/static/test_images/4.jpg',
        '/static/test_images/5.jpg',
      ],
      address: '42 E 12th St, New York',
    };
  },
  computed: {
    preparedImages() {
      let imgs = this.images
        .map(
          (el, index) => {
            return {
              index: index,
              src: el,
            };
          }
        );
      return imgs.concat(imgs)
        .concat(imgs)
        .slice(this.active)
        .slice(0, 3);
    },
    length() {
      return this.images.length;
    },
  },
  methods: {
    setActive(el) {
      this.active = el.index;
    },
    prev() {
      if (this.active <= 0) {
        this.active = this.length - 1;
      } else {
        this.active--;
      }
    },
    next() {
      if (this.active >= this.length - 1) {
        this.active = 0;
      } else {
        this.active++;
      }
    },
  },
};
</script>

<style lang="scss">
@import 'variables';

.index--dark .photos{
  border: 1px solid $border__dark_theme_tile;
  background: $background__dark_tile;

  & .galleryBottom{
    & .address{
      color: $color_white;
    }

    & .left{
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTEiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxMSAxOCI+PGRlZnM+PHBhdGggaWQ9IjR0b3ZhIiBkPSJNOTEwLjIyIDk1OGwtOC4yMiA4IDguMjIgNy45OSIvPjwvZGVmcz48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTAwIC05NTcpIj48dXNlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbWl0ZXJsaW1pdD0iNTAiIHN0cm9rZS13aWR0aD0iMiIgeGxpbms6aHJlZj0iIzR0b3ZhIi8+PC9nPjwvZz48L3N2Zz4=);
    }

    & .right{
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTEiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxMSAxOCI+PGRlZnM+PHBhdGggaWQ9IjZleW1hIiBkPSJNMTY1OCA5NThsOC4yMiA4LTguMjIgNy45OSIvPjwvZGVmcz48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTY1OCAtOTU3KSI+PHVzZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjUwIiBzdHJva2Utd2lkdGg9IjIiIHhsaW5rOmhyZWY9IiM2ZXltYSIvPjwvZz48L2c+PC9zdmc+);
    }
  }

  & .galleryInfo .length{
    color: $color_white;
  }
}

.photos {
  display: flex;
  width: 100%;
  background-color: $background__white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  &__container {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  & .galleryInfo{
    position: absolute;
    right: 0;
  }

  & .galleryInfo span:first-child{
    font-size: 18px;
    color: $color__blue;
  }

  & .galleryInfo span:last-child{
    font-size: 12px;
  }

  & .gallery{
    display: flex;
    align-items: center;
  }

  & .galleryCell {
    width: 207px;
    height: 137px;
    margin-right: 16px;
    background: #8C8;
    counter-increment: galleryCell;
    background-size: cover;
    opacity: 0.5;
    cursor: pointer;
  }

  & .galleryCell:first-child {
    width: 312px;
    height: 194px;
    transition: all 0.2s;
    opacity: 1;
  }

  & .galleryCell:last-child{
    margin-right: 0;
  }

  & .galleryBottom{
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    align-items: center;

    & .address{
      color: $color__grey;
      font-size: 12px;
      font-weight: 100;
    }

    & .right,
    & .left{
      display: block;
      width: 11px;
      height: 19px;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    & .left{
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMXB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxMSAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5QYXRoIDY8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iTUFJTiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iV0lER0VUUyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMC4wMDAwMDAsIC00OTg2LjAwMDAwMCkiPiAgICAgICAgICAgIDxyZWN0IGZpbGw9IiNGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNTA2IiBoZWlnaHQ9IjYyNDgiPjwvcmVjdD4gICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMi4wMDAwMDAsIDQ5ODAuMDAwMDAwKSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtNiIgcG9pbnRzPSI4LjIxNzQ4OTAyIDcgMS40MjEwODU0N2UtMTQgMTUgOC4yMTc0ODkwMiAyMi45ODUxMDU1Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
    }

    & .right{
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMXB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxMSAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5QYXRoIDYgQ29weTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJNQUlOIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJXSURHRVRTIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTgwLjAwMDAwMCwgLTQ5ODYuMDAwMDAwKSI+ICAgICAgICAgICAgPHJlY3QgZmlsbD0iI0ZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjI1MDYiIGhlaWdodD0iNjI0OCI+PC9yZWN0PiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMyLjAwMDAwMCwgNDk4MC4wMDAwMDApIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiI+ICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC02LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc1My4xMDg3NDUsIDE0Ljk5MjU1Mykgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNzUzLjEwODc0NSwgLTE0Ljk5MjU1MykgIiBwb2ludHM9Ijc1Ny4yMTc0ODkgNyA3NDkgMTUgNzU3LjIxNzQ4OSAyMi45ODUxMDU1Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
    }
  }
}
</style>
