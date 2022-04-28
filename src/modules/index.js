import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@crema/utility/Utils';
import {errorPagesConfigs} from './errorPages';
import {authRouteConfig} from './auth';
import {initialUrl} from '../shared/constants/AppConst';
import {seguridadConfigs} from './Seguridad';
import {personasEntidadesConfigs} from './PersonasEntidades';

const routeConfigs = [
  ...authRouteConfig,
  ...errorPagesConfigs,
  ...seguridadConfigs,
  ...personasEntidadesConfigs
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to='/error-pages/error-404' />,
  },
];

export default routes;
