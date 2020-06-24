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

import React, {useState, useEffect, ReactComponentElement} from 'react';
import { TableData } from 'Models';
import { RouteComponentProps } from 'react-router-dom';
import CustomizedTables from '../components/Table';
import { getTenant } from '../requests';

type Props = {
  name: string
};

const TenantPage = ({match}: RouteComponentProps<Props>) => {

  const [tableData, setTableData] = useState<TableData>({
    columns: [],
    records: []
  }); 

  useEffect(() => {
    getTenant(match.params.name).then(({data}) => {
      setTableData(data);
    });
  }, []);
  return <CustomizedTables title="TABLES" data={tableData} />;
};

export default TenantPage;
