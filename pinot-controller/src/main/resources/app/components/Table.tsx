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
import PropTypes from 'prop-types';
import {
  withStyles,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TablePagination, Typography, Toolbar } from '@material-ui/core';
import { TableData } from 'Models';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { NavLink } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import SearchBar from './SearchBar';
import Utils from '../utils/Utils';

type Props = {
  title?: string;
  data: TableData;
  noOfRows?: number;
  addLinks?: boolean;
  isPagination?: boolean;
  getCellValue?: Function,
  isCellClickable?: boolean,
};

const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px #BDCCD9 solid',
    borderRadius: 4,
    marginBottom: '20px',
  },
  table: {
    padding: '.75rem',
    borderTop: '1px solid #BDCCD9',
  },
  isCellClickable: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  head: {
    fontWeight: 600,
    borderBottom: '2px solid #BDCCD9',
    lineHeight: '1rem',
  },
  body: {
    fontSize: 14,
    color: '#3B454E',
    padding: '0.5rem 0.6rem',
  },
  nodata: {
    textAlign: 'center',
  },
  link: {
    color: 'inherit',
  },
  spacer: {
    flex: '0 1 auto',
  },
  cellSatusGood: {
    color: '#4CAF50',
    border: '1px solid #4CAF50',
  },
  cellStatusBad: {
    color: '#f44336',
    border: '1px solid #f44336',
  }
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minHeight: 48,
  },
  title: {
    flex: '1 1 100%',
    fontWeight: 600,
    letterSpacing: '2px',
  },
}));

const usePaginationStyles = makeStyles({
  root: {
    flexShrink: 0,
    marginLeft: 'auto',
  },
});

const EnhancedTableToolbar = (props: {
  name: string;
  searchValue: string;
  handleSearch: (val: string) => void;
}) => {
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
        {name.toUpperCase()}
      </Typography>
      <SearchBar
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Toolbar>
  );
};

function TablePaginationActions(props) {
  const classes = usePaginationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


let timeout: NodeJS.Timeout;

export default function CustomizedTables({
  title,
  data,
  noOfRows,
  addLinks,
  isPagination,
  getCellValue,
  isCellClickable,
}: Props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(noOfRows || 10);
  const [page, setPage] = React.useState(0);

  const [filteredRows, setFilteredRows] = React.useState<
    Array<Array<string | number | boolean>>
  >(data.records);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      filterSearchResults(search);
    }, 500);
  }, [search, timeout]);

  const filterSearchResults = (str: string) => {
    if (str === '') {
      setFilteredRows(data.records);
    } else {
      const filteredRescords = data.records.filter((record) => {
        const searchFound = record.find(
          (cell) => cell.toString().toLowerCase().indexOf(str) > -1
        );
        if (searchFound) {
          return true;
        }
        return false;
      });
      setFilteredRows(filteredRescords);
    }
  };

  const styleCell = (str: string | number | boolean) => {
    if (str === 'Good') {
      return (
        <Chip
          label={str}
          className={classes.cellSatusGood}
          variant="outlined"
        />
      );
    }
    if (str === 'Bad') {
      return (
        <Chip
          label={str}
          className={classes.cellStatusBad}
          variant="outlined"
        />
      );
    }
    return str.toString();
  };

  return (
    <div className={classes.root}>
      <TableContainer>
        {title ? (
          <EnhancedTableToolbar
            name={title}
            searchValue={search}
            handleSearch={(val: string) => setSearch(val)}
          />
        ) : null}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {data.columns.map((column, index) => (
                <TableCell className={classes.head} key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell
                  className={classes.nodata}
                  colSpan={data.columns.length}
                >
                  No Record(s) found
                </TableCell>
              </TableRow>
            ) : (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    {row.map((cell, idx) =>
                      addLinks && !idx ? (
                        <TableCell key={idx}>
                          <NavLink
                            className={classes.link}
                            to={`/tenants/${cell}/tables`}
                          >
                            {cell}
                          </NavLink>
                        </TableCell>
                      ) : (
                        <TableCell className={isCellClickable ? classes.isCellClickable : ''} onClick={() => {getCellValue && getCellValue(cell);}}>
                          {styleCell(cell)}
                        </TableCell>
                      )
                    )}
                  </StyledTableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          classes={{ spacer: classes.spacer }}
        />
      ) : null}
    </div>
  );
}
