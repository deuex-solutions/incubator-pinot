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

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      height: 'calc(100vh - 70px)',
      flexShrink: 0,
      backgroundColor: '#333333',
    },
    drawerPaper: {
      position: 'unset',
      width: drawerWidth,
      backgroundColor: '#F5F7F9',
    },
    drawerContainer: {
      overflow: 'auto',
      paddingTop: '20px'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    itemContainer: {
      color: '#3B454E',
      borderRadius: '4px'
    },
    selectedItem: {
      background: '#D8E1E8!important'
    },
    link: {
      textDecoration: 'none'
    }
  }),
);

type Props = {
  showMemu: boolean;
  list: Array<{name: string, link: string, target?: string}>;
};

const Sidebar = ({ showMemu, list }: Props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event : React.MouseEvent<HTMLDivElement>, index : number) => {
    setSelectedIndex(index);
  };

  // TODO: Add links instead of click event listener
  const handelNavigation = (navigate: number) => {
    switch(navigate) {
      case 0:
        window.history.pushState(null, null, '/');
        break;
      case 1:
        window.history.pushState(null, null, '/query');
        break;
      case 2:
        window.history.pushState(null, null, '/');
        break;
      case 3:
        window.history.pushState(null, null, '/webapp');
        break;
    }
  };

  return (
    <>
      <CssBaseline />
      <Drawer
        open={showMemu}
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List disablePadding>
            {list.map(({name, link, target}, i) => (
              <Box width="210px" marginX="auto" marginBottom="5px" key={name}>
                <NavLink to={link} className={classes.link} target={target}>
                  <ListItem color="white" button className={`${classes.itemContainer} ${selectedIndex === i ? classes.selectedItem : ''}`} selected={selectedIndex === i} onClick={(event) => handleListItemClick(event, i)}>
                    <Typography variant="subtitle2">{name} &ensp;
                      {link === '/help' ? <FontAwesomeIcon icon={faExternalLinkAlt} /> : null}
                    </Typography>
                  </ListItem>
                </NavLink>
              </Box>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
