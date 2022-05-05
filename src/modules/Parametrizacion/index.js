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
    ],
  },
];
