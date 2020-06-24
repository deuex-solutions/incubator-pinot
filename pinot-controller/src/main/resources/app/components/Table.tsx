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

import * as React from 'react';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TablePagination, Typography, Toolbar } from '@material-ui/core';
import { TableData } from 'Models';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

type Props = {
  title?: string,
  data: TableData,
  noOfRows?: number,
  addLinks?: boolean
};

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      padding: '.75rem',
      borderTop: '1px solid #BDCCD9',
    },
    head: {
      fontWeight: 500,
      borderBottom: '2px solid #BDCCD9',
    },
    body: {
      fontSize: 14,
      color: '#3B454E',
      padding: '0.5rem 0.6rem',
    },
  })
)(TableCell);

const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  root: {
    border: '1px #BDCCD9 solid',
    borderRadius: 4,
    marginBottom: '20px'
  },
  table: {
    minWidth: 700,
  },
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props: { name: string, searchValue: string, handleSearch: (val: string) => void }) => {
  const classes = useToolbarStyles();
  const { name, searchValue, handleSearch } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {name}
      </Typography>
      <SearchBar value={searchValue} onChange={e => handleSearch(e.target.value)} />
    </Toolbar>
  );
};


let timeout: NodeJS.Timeout;

export default function CustomizedTables({ title, data, noOfRows, addLinks }: Props) {

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(noOfRows || 10);
  const [page, setPage] = React.useState(0);

  const [filteredRows, setFilteredRows] = React.useState<Array<Array<string | number | boolean>>>(data.records);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      filterSearchResults(search);
    }, 500)
  }, [search, timeout])

  const filterSearchResults = (str: string) => {
    if(str === '') {
      setFilteredRows(data.records);
    } else {
      const filteredRescords = data.records.filter((record) => {
        const searchFound  = record.find(cell => cell.toString().toLowerCase().indexOf(str) > -1 )
        if(searchFound) {
          return true;
        }
        return false;
      })
      setFilteredRows(filteredRescords);
    }
  }


  return (
    <div className={classes.root}>
      <TableContainer>
        {title ? <EnhancedTableToolbar name={title} searchValue={search} handleSearch={(val: string) => setSearch(val)} /> : null}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {data.columns.map((column, index) => (
                <StyledTableCell key={index}>{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={index}>
                  {row.map((cell, idx) =>
                    addLinks && !idx ? (
                      <NavLink to={`/tenants/${cell}`}>
                        <StyledTableCell>{cell}</StyledTableCell>
                      </NavLink>
                    ) : (
                      <StyledTableCell key={idx}>{cell.toString()}</StyledTableCell>
                    )
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
