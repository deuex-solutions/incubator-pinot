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

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Checkbox, Button } from '@material-ui/core';
import { TableData, SQLResult } from 'Models';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material.css';
import _ from 'lodash';
import exportFromJSON from 'export-from-json';
import Utils from '../utils/Utils';
import {
  getQueryTables,
  getTableSchema,
  getSqlResult,
  getQueryResult,
} from '../requests';
import AppLoader from '../components/AppLoader';
import CustomizedTables from '../components/Table';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    paddingLeft: '20px',
  },
  leftPanel: {
    width: 250,
    height: 'calc(100vh)',
    borderRight: '1px solid #D8E1E8',
    paddingRight: 20,
    paddingTop: 20,
  },
  rightPanel: {
    padding: '20px',
  },
  codeMirror: {
    '& .CodeMirror': { height: 100, border: '1px solid #BDCCD9' },
  },
  queryOutput: {
    border: '1px solid #BDCCD9',
  },
  btn: {
    marginRight: '10px'
  },
  checkBox: {
    margin: '20px 0',
  },
  runNowBtn: {
    marginLeft: 'auto',
    paddingLeft: '74px',
  },
}));

const jsonoptions = {
  lineNumbers: true,
  mode: 'application/json',
  styleActiveLine: true,
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
};

const QueryPage = () => {
  const classes = useStyles();
  const [fetching, setFetching] = useState(true);
  const [tableList, setTableList] = useState<TableData>({
    columns: [],
    records: [],
  });

  const [tableSchema, setTableSchema] = useState<TableData>({
    columns: [],
    records: [],
  });
  const [resultData, setResultData] = useState<TableData>({
    columns: [],
    records: [],
  });

  const [selectedTable, setSelectedTable] = useState('');

  const [inputQuery, setInputQuery] = useState('');

  const [outputResult, setOutputResult] = useState('');

  const [checked, setChecked] = React.useState({
    tracing: false,
    querySyntaxPQL: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handleOutputDataChange = (editor, data, value) => {
    setInputQuery(value);
  };

  const getAsObject = (str: SQLResult) => {
    if (typeof str === 'string' || str instanceof String) {
      return JSON.parse(JSON.stringify(str));
    }
    return str;
  };

  const handleRunNow = () => {
    setFetching(true);
    let url;
    let params;
    if (checked.querySyntaxPQL === true) {
      url = 'pql';
      params = JSON.stringify({
        pql: inputQuery.trim(),
        trace: checked.tracing,
      });
    } else {
      url = 'sql';
      params = JSON.stringify({
        sql: inputQuery.trim(),
        trace: checked.tracing,
      });
    }
    setChecked(checked);
    getQueryResult(params, url).then(({ data }) => {
      let queryResponse = null;
      
      queryResponse = getAsObject(data);

      let dataArray = [];
      let columnList = [];
      if (checked.querySyntaxPQL === true) {
        if (queryResponse) {
          if (queryResponse.selectionResults) {
            // Selection query
            columnList = _.map(
              queryResponse.selectionResults.columns,
              (columnName) => {
                return columnName;
              }
            );
            dataArray = queryResponse.selectionResults.results;
          } else if (
            queryResponse.aggregationResults &&
            queryResponse.aggregationResults.length > 0 &&
            !queryResponse.aggregationResults[0].groupByResult
          ) {
            // Simple aggregation query
            columnList = _.map(
              queryResponse.aggregationResults,
              (aggregationResult) => {
                return { title: aggregationResult.function };
              }
            );

            dataArray.push(
              _.map(queryResponse.aggregationResults, (aggregationResult) => {
                return aggregationResult.value;
              })
            );
          } else if (
            queryResponse.aggregationResults &&
            queryResponse.aggregationResults.length > 0 &&
            queryResponse.aggregationResults[0].groupByResult
          ) {
            // Aggregation group by query
            const columns = queryResponse.aggregationResults[0].groupByColumns;
            columns.push(queryResponse.aggregationResults[0].function);
            columnList = _.map(columns, (columnName) => {
              return columnName;
            });

            dataArray = _.map(
              queryResponse.aggregationResults[0].groupByResult,
              (aggregationGroup) => {
                const row = aggregationGroup.group;
                row.push(aggregationGroup.value);
                return row;
              }
            );
          }
        }
      } else if (
        queryResponse.resultTable &&
        queryResponse.resultTable.rows &&
        queryResponse.resultTable.rows.length > 0
      ) {
        columnList = _.map(
          queryResponse.resultTable.dataSchema.columnNames,
          (columnName) => {
            return columnName;
          }
        );
        dataArray = queryResponse.resultTable.rows;
      }

      setResultData({
        columns: columnList,
        records: dataArray,
      });
      setFetching(false);

      setOutputResult(JSON.stringify(data, null, 2));
    });
  };

  const fetchSQLData = (tableName) => {
    getTableSchema(tableName).then(({ data }) => {
      setTableSchema({
        columns: ['column', 'type'],
        records: data.dimensionFieldSpecs.map((field) => {
          return [field.name, field.dataType];
        }),
      });
    });

    getSqlResult(tableName).then((results) => {
      const res = results.data;
      setResultData({
        columns: res.resultTable.dataSchema.columnNames,
        records: res.resultTable.rows.map((row) => {
          return row;
        }),
      });
    });
  
    setInputQuery(`select * from ${tableName} limit 10`);
    setSelectedTable(tableName);
    handleRunNow();
  };

  const downloadData = (exportType) => {
    const data = Utils.tableFormat(resultData);
    const fileName = 'download';

    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    getQueryTables().then(({ data }) => {
      setTableList({
        columns: [],
        records: data.tables.map((table) => {
          return [table];
        }),
      });
      setFetching(false);
    });
  }, []);

  return fetching ? (
    <AppLoader />
  ) : (
    <Grid container>
      <Grid item xs className={classes.leftPanel}>
        <CustomizedTables
          title="Tables"
          data={tableList}
          isPagination={false}
          getCellValue={fetchSQLData}
          isCellClickable
        />

        {tableSchema.records.length ? (
          <CustomizedTables title="" data={tableSchema} isPagination={false} />
        ) : null}
      </Grid>
      <Grid item xs={9} className={classes.rightPanel}>
        <CodeMirror
          options={jsonoptions}
          value={inputQuery}
          onChange={handleOutputDataChange}
          className={classes.codeMirror}
        />

        <Grid container className={classes.checkBox}>
          <Grid item xs={1}>
            <Checkbox
              name="tracing"
              color="primary"
              onChange={handleChange}
              checked={checked.tracing}
            />
            Tracing
          </Grid>

          <Grid item xs={2}>
            <Checkbox
              name="querySyntaxPQL"
              color="primary"
              onChange={handleChange}
              checked={checked.querySyntaxPQL}
            />
            Query Syntax: PQL
          </Grid>

          <Grid item xs={2} className={classes.runNowBtn}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleRunNow()}
            >
              Run Query
            </Button>
          </Grid>
        </Grid>
        
        <Grid item xs style={{ backgroundColor: 'white' }}>
          {resultData.records.length ? (
            <>
              <Grid container className={classes.checkBox}>
                <Button variant="contained" color='primary' size='small' className={classes.btn}>
                  Copy
                </Button>
                <Button variant="contained" color='primary' size='small' className={classes.btn} onClick={() => downloadData('xls')}>
                  Excel
                </Button>
                <Button variant="contained" color='primary' size='small' onClick={() => downloadData('csv')}>
                  CSV
                </Button>
              </Grid>
              <CustomizedTables
                title={selectedTable}
                data={resultData}
                isPagination
              />
            </>
          ) : null}
        </Grid>

        {resultData.records.length ? (
          <CodeMirror
            options={jsonoptions}
            value={outputResult}
            className={classes.queryOutput}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default QueryPage;
