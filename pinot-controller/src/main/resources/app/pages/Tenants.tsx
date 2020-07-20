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

import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { TableData } from 'Models';
import { RouteComponentProps } from 'react-router-dom';
import CustomizedTables from '../components/Table';
import AppLoader from '../components/AppLoader';
import { getTenantTable, getTableSize, getIdealState, getExternalView } from '../requests';
import Utils from '../utils/Utils';

type Props = {
  tenantName: string
};

const TenantPage = ({ match }: RouteComponentProps<Props>) => {

  const tenantName = match.params.tenantName;
  const columnHeaders = ['Table Name', 'Reported Size', 'Estimated Size', 'Number of Segments', 'Status'];
  const [fetching, setFetching] = useState(true);
  const [tableData, setTableData] = useState<TableData>({
    columns: columnHeaders,
    records: []
  });

  useEffect(() => {
    getTenantTable(tenantName).then(({ data }) => {
      const tableArr = data.tables.map(table => table);
      if(tableArr.length){
        const promiseArr = [];
        tableArr.map((name) => {
          promiseArr.push(getTableSize(name));
          promiseArr.push(getIdealState(name));
          promiseArr.push(getExternalView(name));
        });

        Promise.all(promiseArr).then(results => {
          const tableLength = tableArr.length;
          let finalRecordsArr = [];
          let singleTableData = [];
          let idealStateObj = null;
          let externalViewObj = null;
          results.map((result, index)=>{
            // since we have 3 promises, we are using mod 3 below
            if(index % 3 === 0){
              // response of getTableSize API
              const {tableName, reportedSizeInBytes, estimatedSizeInBytes} = result.data;
              singleTableData.push(tableName, reportedSizeInBytes, estimatedSizeInBytes);
            } else if (index % 3 === 1){
              // response of getIdealState API
              idealStateObj = result.data.OFFLINE || result.data.REALTIME;
            } else if (index % 3 === 2){
              // response of getExternalView API
              externalViewObj = result.data.OFFLINE || result.data.REALTIME;
              const externalSegmentCount = Object.keys(externalViewObj).length;
              const idealSegmentCount = Object.keys(idealStateObj).length;
              // Generating data for the record
              singleTableData.push(
                `${externalSegmentCount} / ${idealSegmentCount}`,
                Utils.getSegmentStatus(idealStateObj, externalViewObj)
              );
              // saving into records array
              finalRecordsArr.push(singleTableData);
              // resetting the required variables
              singleTableData = [];
              idealStateObj = null;
              externalViewObj = null;
            }
          });
          setTableData({
            columns: columnHeaders,
            records: finalRecordsArr
          });
          setFetching(false);
        })
      } else {
        setFetching(false);
      }
    });
  }, []);
  return (
    fetching ? <AppLoader /> :
    <Grid item xs style={{ padding: 20, backgroundColor: 'white', maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
      <CustomizedTables
        title={tenantName}
        data={tableData}
        isPagination addLinks
        baseURL={`/tenants/${tenantName}/table/`}
        showSearchBox={true}
        inAccordionFormat={true}
      />
    </Grid>
  );
};

export default TenantPage;
