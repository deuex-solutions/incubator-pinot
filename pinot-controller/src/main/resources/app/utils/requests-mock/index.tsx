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

  mock.onGet('/tenants').reply(200, ResTenants);
  mock.onGet('/instances').reply(200, ResInstances);

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
