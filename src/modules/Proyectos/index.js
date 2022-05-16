import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const proyectosConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: '/proyectos',
        component: React.lazy(() => import('./Proyecto')),
      },
      {
        exact: true,
        path: '/proyectos/:accion/:id',
        component: React.lazy(() => import('./Proyecto/ProyectoEditor')),
      },
    ],
  },
];