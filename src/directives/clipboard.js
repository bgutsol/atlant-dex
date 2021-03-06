// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import store from '@/store';
import Clipboard from 'clipboard';
import {notification} from 'services/notification';

function createClipboard(el, value) {
  const clipboard = new Clipboard(el, {
    text() {
      return value;
    },
  });
  clipboard.on('success', (e) => {
    notification({
      text: store.getters['localization/getMessage']('copied'),
      type: 'success',
    });
  });
}

export default {
  bind(el, {value}) {
    createClipboard(el, value);
  },
  update(el, {value}) {
    createClipboard(el, value);
  },
};
