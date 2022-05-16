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
        path: '/condiciones-familia',
        component: React.lazy(() => import('./CondicionFamilia')),
      },
      {
        exact: true,
        path: '/tipos-poblacion',
        component: React.lazy(() => import('./TipoPoblacion')),
      },      
      {
        exact: true,
        path: '/tipos-vivienda',
        component: React.lazy(() => import('./TipoVivienda')),
      },            
      {
        exact: true,
        path: '/tipos-techo',
        component: React.lazy(() => import('./TipoTecho')),
      },        
      {
        exact: true,
        path: '/tipos-piso',
        component: React.lazy(() => import('./TipoPiso')),
      },     
      {
        exact: true,
        path: '/tipos-division',
        component: React.lazy(() => import('./TipoDivision')),
      },  
    ],
  },
];
