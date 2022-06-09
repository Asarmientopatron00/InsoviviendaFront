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
      {
        exact: true,
        path: '/documentos-proyecto/:proyecto_id',
        component: React.lazy(() => import('./DocumentosProyecto')),
      },
      {
        exact: true,
        path: '/orientaciones',
        component: React.lazy(() => import('./Orientacion')),
      },
      {
        exact: true,
        path: '/bitacoras-proyecto/:proyecto_id',
        component: React.lazy(() => import('./BitacoraProyecto')),
      },
      { 
        exact: true,
        path: '/plan-amortizacion/:proyecto_id',
        component: React.lazy(() => import('./PlanAmortizacion')),
      },
      {
        exact: true,
        path: '/donaciones',
        component: React.lazy(() => import('./Donacion')),
      },
      {
        exact: true,
        path: '/desembolsos',
        component: React.lazy(() => import('./Desembolso')),
      },
    ],
  }
];
