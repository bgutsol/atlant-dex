// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import {HubConnectionBuilder, LogLevel} from '@aspnet/signalr/dist/browser/signalr.min.js';
import {notification} from 'services/notification';

const startConnection = (Vue, url) => {
  return function connect(token, pair) {
    return new Promise((resolve, reject) => {
      let connection = new HubConnectionBuilder()
        .withUrl(`${url}?token=${token}&pair=${pair}`)
        .configureLogging(LogLevel.Trace) // TODO: delete for prod. for debugging
        .build();

      connection.invokeByStart = connection.start().then(() => {
        connection.isClosed = false;
        return connection;
      }).catch(() => {
          notification({
            title: 'Error',
            text: 'Could not connect to Websocket',
          });
        }
      );

      connection.reconnect = connect;
      Vue.prototype.$hub = connection;

      return resolve();
    });
  };
};

export default {
  install(Vue, url, token, pair) {
    startConnection(Vue, url)(token, pair);
  },
};
