// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import _ from 'lodash';
import Draggable from 'gsap/Draggable';
import elementResizeDetectorMaker from 'element-resize-detector';

export const addTileToDashboard = (vm, tile) => {
  Draggable.create(
    tile.target,
    {
      type: 'top,left',
      bounds: {top: -20, left: -20},
      trigger: tile.trigger,
      liveSnap: true,
      zIndexBoost: tile.isHideable,
      snap: {
        x: (endValue) => {
          return Math.round(endValue / vm.state.grid.gridSize) * vm.state.grid.gridSize;
        },
        y: (endValue) => {
          return Math.round(endValue / vm.state.grid.gridSize) * vm.state.grid.gridSize;
        },
      },
      onDragStart: function() {
        vm.commit('grid/setGridVisibility', true);
      },
      onDragEnd: function() {
        vm.commit('grid/setGridVisibility', false);
        if (tile.isHideable) {
          vm.commit(
            'grid/setTilePosition',
            {
              name: this.vars.trigger.split('--')[1],
              x: this.x,
              y: this.y,
            }
          );
        }
      },
    }
  );
  if (tile.isResizeable) {
    snapOnResize(vm, tile);
  }
};

export const setupDashboard = (vm) => {
  vm.commit(
    'grid/createResizeDetector',
    elementResizeDetectorMaker({
      strategy: 'scroll',
    })
  );
  for (let i of vm.state.grid.gridData) {
    if (!i.isHidden) {
      addTileToDashboard(
        vm,
        {
          name: i.name,
          target: document.getElementsByClassName('gridTile--' + i.name)[0],
          trigger: '.gridTile__headerContainer--' + i.name,
          container: document.getElementsByClassName('gridTile__content--' + i.name)[0],
          isHideable: true,
          isResizeable: true,
        }
      );
    }
  }
};

export const snapOnResize = ({state, commit}, tile) => {
  if (tile.container) {
    state.grid.resizeDetector.listenTo(
      tile.container,
      _.debounce(
        (el) => {
          console.log('resize event');
          tile.container.style.height = Math.round(el.offsetHeight / state.grid.gridSize) * state.grid.gridSize + 'px';
          tile.container.style.width = Math.round(el.offsetWidth / state.grid.gridSize) * state.grid.gridSize + 'px';
          if (el.offsetHeight > 0 && el.offsetWidth > 0) {
            commit(
              'grid/setTileSize',
              {
                name: tile.name,
                height: el.offsetHeight,
                width: el.offsetWidth,
              }
            );
          }
        },
        250
      )
    );
  }
};
