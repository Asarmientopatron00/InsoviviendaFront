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
        path: '/tipos-parentesco',
        component: React.lazy(() => import('./TipoParentesco')),
      },
      {
        exact: true,
        path: '/tipos-discapacidad',
        component: React.lazy(() => import('./TipoDiscapacidad')),
      },
    ],

  },
];
