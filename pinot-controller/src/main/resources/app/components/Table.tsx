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
import Paper from '@material-ui/core/Paper';
import { TablePagination, Typography } from '@material-ui/core';

type Props = {
  title?: string,
  columns: string[],
  data: Array<Array<string | number>>,
  noOfRows?: number
};

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      fontWeight: 'bold',
      padding: '0.5rem 0.6rem',
      borderRight: '1px solid #E0E0E0',
    },
    body: {
      fontSize: 14,
      padding: '0.5rem 0.6rem',
    },
  }),
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
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({ title, data, columns, noOfRows }: Props) {

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(noOfRows || 10);
  const [page, setPage] = React.useState(0);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          {
            title ?
              <TableHead>
                <TableCell colSpan={columns.length - 1}>
                  <Typography variant="button">{title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">SearchBar</Typography>
                </TableCell>
              </TableHead>  : null
          }
          <TableHead>
            <TableRow>
              {
                columns.map((column, index) => <StyledTableCell key={index}>{column}</StyledTableCell>)
            }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={index}>
                {
                    row.map((cell, idx) => <StyledTableCell key={idx}>{cell}</StyledTableCell>)
                }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
