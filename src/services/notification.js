// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import Noty from 'noty';
import i18n from '@/i18n';
import {serverCodes} from '@/store/staticData/serverCodes';

window.i18n = i18n;

export const getServerErrorText = (responseData) => {
  if (i18n.te(`serverErrors.${responseData.status}`)) {
    return i18n.t(`serverErrors.${responseData.status}`);
  } else if (responseData.description) {
    return responseData.description;
  } else {
    return 'Something wrong';
  }
};

export const notification = ({title = '', text, type = 'info'}) => {
  let errorTag = '';
  if (type === 'error') {
    errorTag = `<b class="noty_errorText">Error: </b> <br>`;
  };
  new Noty({
    text: `${errorTag}<b>${title}</b> ${text}`,
    type: type,
    layout: 'topRight',
    closeWith: ['click', 'button'],
    progressBar: false,
    timeout: 3000,
  }).show();
};

export const serverNotification = (response) => {
  const {data: {code}, status} = response;
  let alias = '';
  let type = '';

  if (status === 401) {
    alias = 'Session Timed Out';
    type = 'error';
  } else {
    const message = serverCodes[code];
    alias = (message) ? message.name : ``;
    type = (message) ? message.type : 'error';
  }

  notification({
    title: `Code #${code}: `,
    text: alias,
    type,
  });
};

export const serverNotification2 = (response) => {
  const {data} = response;
  if (response.status >= 400) {
    const type = 'error';
    notification({
      text: getServerErrorText(data),
      type,
    });
  }
};
