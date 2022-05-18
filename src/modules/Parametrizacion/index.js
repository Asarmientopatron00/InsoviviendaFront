import React from 'react';
import { authRole } from '../../shared/constants/AppConst';

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

