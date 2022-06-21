import React from 'react';
import { authRole } from '../../shared/constants/AppConst';

export const procesosConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: '/procesos-calculo-mora',
        component: React.lazy(() => import('./CalcularMora')),
      },
    ],
  },    
];