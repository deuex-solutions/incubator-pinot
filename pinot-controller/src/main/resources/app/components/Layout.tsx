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

import { FunctionComponent, Children } from 'react';
import * as React from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from './SideBar';
import Header from './Header';

const navigationItems = [
  { name: 'Cluster Manager', link: '/' },
  { name: 'Query Console', link: '/query', },
  { name: 'Zookeeper Browser', link: '/' },
  { name: 'Swagger REST API', link: 'help', target: '_blank' },
];

const Layout: FunctionComponent = (props) => (
  <Grid container direction="column">
    <Header />
    <Grid item xs={12}>
      <Grid container>
        <Grid item>
          <Sidebar list={navigationItems} showMemu={false} />
        </Grid>
        <Grid item xs style={{padding: 20, backgroundColor: 'white', maxHeight: 'calc(100vh - 70px)', overflowY: 'auto'}}>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Layout;