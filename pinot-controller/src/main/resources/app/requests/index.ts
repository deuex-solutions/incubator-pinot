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

import { AxiosResponse } from 'axios';
import { TableData, Instances, Instance, Tenants, ClusterConfig } from 'Models';
import { baseApi } from '../utils/axios-config';

export const getTenants = (): Promise<AxiosResponse<Tenants>> =>
  baseApi.get('/tenants');

export const getTenant = (name: string): Promise<AxiosResponse<TableData>> => 
  baseApi.get(`/tenants/${name}`);

export const getInstances = (): Promise<AxiosResponse<Instances>> =>
  baseApi.get('/instances');

export const getInstance = (name: string): Promise<AxiosResponse<Instance>> =>
  baseApi.get(`/instances/${name}`);

export const getClusterConfig = (): Promise<AxiosResponse<ClusterConfig>> => 
  baseApi.get('/cluster/configs');