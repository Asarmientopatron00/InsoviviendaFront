import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const personasEntidadesConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: '/personas',
        component: React.lazy(() => import('./Persona')),
      },
      {
        exact: true,
        path: '/personas/:accion/:id',
        component: React.lazy(() => import('./Persona/PersonaCreator')),
      },
      {
        exact: true,
        path: '/personas/:accion',
        component: React.lazy(() => import('./Persona/PersonaCreator')),
      },
      {
        exact: true,
        path: '/familias',
        component: React.lazy(() => import('./Familia')),
      },
      {
        exact: true,
        path: '/benefactores',
        component: React.lazy(() => import('./Benefactor')),
      },
    ],
  },
];
