import React from 'react';
import { authRole } from '../../shared/constants/AppConst';

export const parametrizacionConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: '/tipos-identificacion',
        component: React.lazy (() => import('./TipoIdentificacion')),
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
      {
        exact: true,
        path: '/tipos-orientacion',
        component: React.lazy(() => import('./TipoAsesoria')),
      },
      {
        path: '/tipos-programa',
        component: React.lazy (() => import('./TipoPrograma')),
      },
      {
         exact: true,
         path: '/paises',
         component: React.lazy (() => import('./Pais')),
      },
      {
         exact: true,
         path: '/departamentos',
         component: React.lazy (() => import('./Departamento')),
      },
      {
         exact: true,
         path: '/ciudades',
         component: React.lazy (() => import('./Ciudad')),
      },
      {
        exact: true,
        path: '/comunas',
        component: React.lazy (() => import('./Comuna')),
      },
      {
      exact: true,
      path: '/barrios',
      component: React.lazy (() => import('./Barrio')),
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

