/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { Tenants, Instances } from 'Models';


const isDev = process.env.NODE_ENV !== 'production';

const ResTenants: Tenants = {
  SERVER_TENANTS: ['DefaultTenant', 'DemoTenantServer'],
  BROKER_TENANTS: ['DefaultTenant', 'DemoTenantBroker'],
};

const ResInstances: Instances = {
  instances: [
    'Controller_192.168.1.10_9000',
    'Controller_192.168.1.11_9000',
    'Controller_192.168.1.12_9000',
    'Controller_192.168.1.13_9000',
    'Broker_192.168.1.10_8000',
    'Server_192.168.1.10_7000',
  ],
};

const handleMockServer = (baseApi: AxiosInstance) => {
  if (!isDev) {
    return;
  }

  const mock = new MockAdapter(baseApi);

  mock.onPost('/sql').reply(200, {
    'resultTable':{'dataSchema':{'columnDataTypes':['INT'],'columnNames':['ActualElapsedTime']},'rows':[[-2147483648],[-2147483648],[250],[223],[-2147483648],[123],[-2147483648],[-2147483648],[131],[168]]},'exceptions':[],'numServersQueried':2,'numServersResponded':2,'numSegmentsQueried':41,'numSegmentsProcessed':40,'numSegmentsMatched':6,'numConsumingSegmentsQueried':10,'numDocsScanned':60,'numEntriesScannedInFilter':0,'numEntriesScannedPostFilter':60,'numGroupsLimitReached':false,'totalDocs':12421,'timeUsedMs':10,'segmentStatistics':[],'traceInfo':{},'minConsumingFreshnessTimeMs':1594114243381
  });

  mock.onPost('/pql').reply(200, {
    'selectionResults':{'columns':['ActualElapsedTime','AirTime','AirlineID','ArrDel15','ArrDelay','ArrDelayMinutes','ArrTime'],'results':[['-2147483648','-2147483648','19805','-2147483648','-2147483648','-2147483648','1157']]}
  });

  mock.onGet('/tenants').reply(200, ResTenants);
  mock.onGet('/instances').reply(200, ResInstances);

  mock.onGet('/tenants/DefaultTenant/tables').reply(200, {
    tables: ['airlineStats_OFFLINE', 'airlineStats_REALTIME'],
  });

  mock.onGet('/tables').reply(200, {
    tables: ['airlineStats_OFFLINE', 'airlineStats_REALTIME'],
  });

  mock.onGet('/tables/airlineStats_OFFLINE/schema').reply(200, {
    dimensionFieldSpecs: [
      {
        name: 'ActualElapsedTime',
        dataType: 'INT',
      },
      {
        name: 'AirTime',
        dataType: 'INT',
      },
      {
        name: 'AirlineID',
        dataType: 'INT',
      },
      {
        name: 'ArrDel15',
        dataType: 'INT',
      },
      {
        name: 'ArrDelay',
        dataType: 'INT',
      },
      {
        name: 'ArrDelayMinutes',
        dataType: 'INT',
      },
      {
        name: 'ArrTime',
        dataType: 'INT',
      },
    ],
  });

  mock.onGet('/tables/airlineStats_REALTIME/schema').reply(200, {
    dimensionFieldSpecs: [
    ],
  });

  mock.onGet('/airlineStats_OFFLINE/sql').reply(200, {
    resultTable: {
      dataSchema: {
        columnDataTypes: ['INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT'],
        columnNames: [
          'ActualElapsedTime',
          'AirTime',
          'AirlineID',
          'ArrDel15',
          'ArrDelay',
          'ArrDelayMinutes',
          'ArrTime',
        ],
      },
      rows: [
        [
          -2147483648,
          -2147483648,
          19805,
          -2147483648,
          -2147483648,
          -2147483648,
          1157,
        ],
        [1, 11, 12, 568, 258, 658, 789],
      ],
    },
  });

  mock.onGet('tables/airlineStats_OFFLINE/idealstate').reply(200, {
    OFFLINE: {
      airlineStats_OFFLINE_16071_16071_23: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16072_16072_3: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16073_16073_26: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16074_16074_10: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16075_16075_21: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16076_16076_29: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16077_16077_17: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16078_16078_7: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16079_16079_25: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16080_16080_28: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16081_16081_12: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16082_16082_6: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16083_16083_0: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16084_16084_22: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16085_16085_30: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16086_16086_14: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16087_16087_5: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16088_16088_13: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16089_16089_11: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16090_16090_19: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16091_16091_27: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16092_16092_18: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16093_16093_4: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16094_16094_24: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16095_16095_9: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16096_16096_15: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16097_16097_20: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16098_16098_2: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16099_16099_8: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16100_16100_1: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats_OFFLINE_16101_16101_16: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
    },
    REALTIME: null,
  });

  mock.onGet('/tables/airlineStats_REALTIME/idealstate').reply(200, {
    OFFLINE: null,
    REALTIME: {
      airlineStats__0__0__20200630T1342Z: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats__0__1__20200630T1443Z: {
        'Server_192.168.0.107_7000': 'CONSUMING',
      },
      airlineStats__1__0__20200630T1342Z: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats__1__1__20200630T1443Z: {
        'Server_192.168.0.107_7000': 'CONSUMING',
      },
      airlineStats__2__0__20200630T1342Z: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats__2__1__20200630T1443Z: {
        'Server_192.168.0.107_7000': 'CONSUMING',
      },
      airlineStats__3__0__20200630T1342Z: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats__3__1__20200630T1443Z: {
        'Server_192.168.0.107_7000': 'CONSUMING',
      },
      airlineStats__4__0__20200630T1342Z: {
        'Server_192.168.0.107_7000': 'ONLINE',
      },
      airlineStats__4__1__20200630T1443Z: {
        'Server_192.168.0.107_7000': 'CONSUMING',
      },
    },
  });

  mock.onGet('/tables/airlineStats_OFFLINE/size').reply(200, {
    tableName: 'airlineStats_OFFLINE',
    reportedSizeInBytes: 3535422,
    estimatedSizeInBytes: 3535422,
    offlineSegments: {
      reportedSizeInBytes: 3535422,
      estimatedSizeInBytes: 3535422,
      missingSegments: 0,
      segments: {
        airlineStats_OFFLINE_16072_16072_3: {
          reportedSizeInBytes: 126866,
          estimatedSizeInBytes: 126866,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats_OFFLINE_16072_16072_3',
              diskSizeInBytes: 126866,
            },
          },
        },
        airlineStats_OFFLINE_16080_16080_28: {
          reportedSizeInBytes: 118213,
          estimatedSizeInBytes: 118213,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats_OFFLINE_16080_16080_28',
              diskSizeInBytes: 118213,
            },
          },
        },
      },
    },
    realtimeSegments: null,
  });

  mock.onGet('/tables/airlineStats_REALTIME/size').reply(200, {
    tableName: 'airlineStats_REALTIME',
    reportedSizeInBytes: 1113123,
    estimatedSizeInBytes: 1113123,
    offlineSegments: null,
    realtimeSegments: {
      reportedSizeInBytes: 1113123,
      estimatedSizeInBytes: 1113123,
      missingSegments: 0,
      segments: {
        airlineStats__0__0__20200630T1342Z: {
          reportedSizeInBytes: 110600,
          estimatedSizeInBytes: 110600,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__0__0__20200630T1342Z',
              diskSizeInBytes: 110600,
            },
          },
        },
        airlineStats__1__0__20200630T1342Z: {
          reportedSizeInBytes: 111129,
          estimatedSizeInBytes: 111129,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__1__0__20200630T1342Z',
              diskSizeInBytes: 111129,
            },
          },
        },
        airlineStats__9__0__20200630T1342Z: {
          reportedSizeInBytes: 112510,
          estimatedSizeInBytes: 112510,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__9__0__20200630T1342Z',
              diskSizeInBytes: 112510,
            },
          },
        },
        airlineStats__4__0__20200630T1342Z: {
          reportedSizeInBytes: 111376,
          estimatedSizeInBytes: 111376,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__4__0__20200630T1342Z',
              diskSizeInBytes: 111376,
            },
          },
        },
        airlineStats__3__0__20200630T1342Z: {
          reportedSizeInBytes: 111498,
          estimatedSizeInBytes: 111498,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__3__0__20200630T1342Z',
              diskSizeInBytes: 111498,
            },
          },
        },
        airlineStats__2__0__20200630T1342Z: {
          reportedSizeInBytes: 110734,
          estimatedSizeInBytes: 110734,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__2__0__20200630T1342Z',
              diskSizeInBytes: 110734,
            },
          },
        },
        airlineStats__5__0__20200630T1342Z: {
          reportedSizeInBytes: 111155,
          estimatedSizeInBytes: 111155,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__5__0__20200630T1342Z',
              diskSizeInBytes: 111155,
            },
          },
        },
        airlineStats__8__0__20200630T1342Z: {
          reportedSizeInBytes: 111524,
          estimatedSizeInBytes: 111524,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__8__0__20200630T1342Z',
              diskSizeInBytes: 111524,
            },
          },
        },
        airlineStats__7__0__20200630T1342Z: {
          reportedSizeInBytes: 111746,
          estimatedSizeInBytes: 111746,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__7__0__20200630T1342Z',
              diskSizeInBytes: 111746,
            },
          },
        },
        airlineStats__6__0__20200630T1342Z: {
          reportedSizeInBytes: 110851,
          estimatedSizeInBytes: 110851,
          serverInfo: {
            'Server_192.168.0.107_7000': {
              segmentName: 'airlineStats__6__0__20200630T1342Z',
              diskSizeInBytes: 110851,
            },
          },
        },
      },
    },
  });

  mock.onGet('/instances/Controller_192.168.1.10_9000').reply(200, {
    instanceName: 'Controller_192.168.1.10_9000',
    hostName: 'Controller_192.168.1.10',
    enabled: true,
    port: '9000',
    tags: ['controller'],
    pools: null,
  });

  mock.onGet('/instances/Controller_192.168.1.11_9000').reply(200, {
    instanceName: 'Controller_192.168.1.11_9000',
    hostName: 'Controller_192.168.1.11',
    enabled: true,
    port: '9000',
    tags: ['controller'],
    pools: null,
  });
  mock.onGet('/instances/Controller_192.168.1.12_9000').reply(200, {
    instanceName: 'Controller_192.168.1.12_9000',
    hostName: 'Controller_192.168.1.12',
    enabled: true,
    port: '9000',
    tags: ['controller'],
    pools: null,
  });
  mock.onGet('/instances/Controller_192.168.1.13_9000').reply(200, {
    instanceName: 'Controller_192.168.1.13_9000',
    hostName: 'Controller_192.168.1.13',
    enabled: true,
    port: '9000',
    tags: ['controller'],
    pools: null,
  });

  mock.onGet('/instances/Broker_192.168.1.10_8000').reply(200, {
    instanceName: 'Broker_192.168.1.10_8000',
    hostName: 'Broker_192.168.1.10',
    enabled: true,
    port: '8000',
    tags: ['DefaultTenant_BROKER'],
    pools: null,
  });

  mock.onGet('/instances/Server_192.168.1.10_7000').reply(200, {
    instanceName: 'Server_192.168.1.10_7000',
    hostName: '192.168.1.10',
    enabled: true,
    port: '7000',
    tags: ['DefaultTenant_OFFLINE', 'DefaultTenant_REALTIME'],
    pools: null,
  });

  mock.onGet('/cluster/configs').reply(200, {
    allowParticipantAutoJoin: 'true',
    'enable.case.insensitive': 'false',
    'pinot.broker.enable.query.limit.override': 'false',
    'default.hyperloglog.log2m': '8',
  });
};

export default handleMockServer;
