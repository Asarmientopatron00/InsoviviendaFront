import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const parametrizacionConfigs = [
  {
    auth: authRole.user,
    routes: [

      {
        exact: true,
        path: '/banco',
        component: React.lazy(() => import('./Banco')),
      },

      {
        exact: true,
        path: '/forma-pago',
        component: React.lazy(() => import('./FormaPago')),
      },

      {
        exact: true,
        path: '/parametro-correo',
        component: React.lazy(() => import('./ParametroCorreo')),
      },

      {
        exact: true,
        path: '/tipo-benefactor',
        component: React.lazy(() => import('./TipoBenefactor')),
      },

      {
        exact: true,
        path: '/tipo-documento-proyecto',
        component: React.lazy(() => import('./TipoDocumentoProyecto')),
      },

      {
        exact: true,
        path: '/tipo-donacion',
        component: React.lazy(() => import('./TipoDonacion')),
      },
      
      {
        exact: true,
        path: '/tipo-gasto',
        component: React.lazy(() => import('./TipoGasto')),
      },

      {
        exact: true,
        path: '/tipos-identificacion',
        component: React.lazy(() => import('./TipoIdentificacion')),
      },
    ],
  },
];
