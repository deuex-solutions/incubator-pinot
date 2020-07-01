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

import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link, { LinkProps } from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink} />;

const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Home',
  '/tenants': 'Tenants',
  '/tenants/DefaultTenant': 'DefaultTenant'
};

function BreadcrumbsComponent() {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);
    
  return (
    <Box marginY="auto" padding="0.25rem 1.5rem" display="flex">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {pathNames.length ? null : (
          <Typography color="textSecondary" variant="subtitle2" key="home">
            {breadcrumbNameMap['/']}
          </Typography>
        )}
        {pathNames.map((value, index) => {
          const last = index === pathNames.length - 1;
          const to = `/${pathNames.slice(0, index + 1).join('/')}`;
          return last ? (
            <Typography color="textSecondary" variant="subtitle2" key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter
              underline="none"
              variant="subtitle1"
              color="textSecondary"
              to={to}
              key={to}
            >
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadcrumbsComponent;
