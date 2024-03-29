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
        path: '/plan-amortizacion/:proyecto_id',
        component: React.lazy(() => import('./PlanAmortizacion')),
      },
      {
        exact: true,
        path: '/plan-amortizacion-definitivo/:proyecto_id',
        component: React.lazy(() => import('./PlanAmortizacionDefinitivo')),
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
      {
        exact: true,
        path: '/gestion-cartera',
        component: React.lazy(() => import('./GestionCartera')),
      },
      {
        exact: true,
        path: '/pagos',
        component: React.lazy(() => import('./Pago')),
      },
      {
        exact: true,
        path: '/bitacoras-proyecto/:proyecto_id',
        component: React.lazy(() => import('./BitacoraProyecto')),
      },
      {
        exact: true,
        path: '/pagos-detalle/:pago_id',
        component: React.lazy(() => import('./PagoDetalle')),
      },
      {
        exact: true,
        path: '/pagos-especiales',
        component: React.lazy(() => import('./PagoEspecial')),
      },
      {
        exact: true,
        path: '/informe-gestion-cartera',
        component: React.lazy(() => import('./InformeCartera')),
      },
      {
        exact: true,
        path: '/pagos-abonar-extra',
        component: React.lazy(() => import('./Pago')),
      },
      {
        exact: true,
        path: '/ajustar-fecha-pago',
        component: React.lazy(() => import('./ReajustarFechaPago')),
      },
    ],
  },
];
