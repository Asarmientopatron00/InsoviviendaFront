import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const parametrizacionConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: '/tipos-identificacion',
        component: React.lazy(() => import('./TipoIdentificacion')),
      },
      {
        exact: true,
        path: '/estados-civil',
        component: React.lazy(() => import('./Estadocivil')),
      },
      {
        exact: true,
        path: '/ocupaciones',
        component: React.lazy(() => import('./Ocupacion')),
      },
      {
        exact: true,
        path: '/grado-escolaridad',
        component: React.lazy(() => import('./Gradosescolaridad')),
      },
      {
        exact: true,
        path: '/eps',
        component: React.lazy(() => import('./Eps')),
      },
      {
        exact: true,
        path: '/tipos-familia',
        component: React.lazy(() => import('./Tipofamilia')),
      },
    ],
  },
];
