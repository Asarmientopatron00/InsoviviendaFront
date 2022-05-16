import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/FamiliaAction';
import Slide from '@material-ui/core/Slide';
import FamiliaForm from './FamiliaForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
});

const FamiliaCreador = (props) => {
  const {
    familia, 
    personas, 
    handleOnClose, 
    accion, 
    updateColeccion, 
    titulo, 
    tiposFamilia, 
    condicionesFamilia
  } = props;

  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 600,
        width: '100%',
        // maxHeight:'fit-content'
      },
      '& .MuiTypography-h6': {
        fontWeight: Fonts.LIGHT,
      },
    },
  }));

  const classes = useStyles(props);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({familiaReducer}) => familiaReducer.selectedRow,
  );

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
  }, []);

  if (accion === 'crear') {
    initializeSelectedRow();
  }

  useEffect(() => {
    if (selectedRow) {
      setShowForm(true);
    } else if (accion === 'crear') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedRow, accion]);

  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(familia));
    }
  }, [accion, dispatch, familia]);

  useEffect(() => {
    if(selectedRow){
      const egresos = [
        selectedRow.familiasEgresosVivienda,
        selectedRow.familiasEgresosAlimentacion,
        selectedRow.familiasEgresosSerPublicos,
        selectedRow.familiasEgresosTransporte,
        selectedRow.familiasEgresosSalud,
        selectedRow.familiasEgresosEducacion,
        selectedRow.familiasEgresosDeudas,
        selectedRow.familiasEgresosOtros,
      ];
      const aportes = [
        selectedRow.familiasAportesFormales,
        selectedRow.familiasAportesInformales,
        selectedRow.familiasAportesArriendo,
        selectedRow.familiasAportesSubsidios,
        selectedRow.familiasAportesPaternidad,
        selectedRow.familiasAportesTerceros,
        selectedRow.familiasAportesOtros,
      ];
      getTotales(egresos, aportes);
    }
  },[selectedRow])

  const total = useRef(0);
  const totalAportes = useRef(0);

  const getTotales = (egresos, aportes) => {
    egresos.forEach((egreso) => {
      total.current = total.current + parseFloat(egreso??'0')
    })
    aportes.forEach((aporte) => {
      totalAportes.current = totalAportes.current + parseFloat(aporte??'0')
    })
  }

  return (
    showForm && (
      <Dialog
        open={showForm}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        disableBackdropClick={true}
        fullWidth
        maxWidth={'md'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              identificacion_persona: selectedRow ? selectedRow.identificacion_persona : '',
              nombre: selectedRow ? selectedRow.persona.nombre : '',
              tipo_familia_id: selectedRow ? selectedRow.tipo_familia_id : '',
              condicion_familia_id: selectedRow ? selectedRow.condicion_familia_id : '',
              familiasFechaVisitaDomici: selectedRow ? selectedRow.familiasFechaVisitaDomici : '',
              familiasEgresosVivienda: selectedRow ? selectedRow.familiasEgresosVivienda : 0,
              familiasEgresosAlimentacion: selectedRow ? selectedRow.familiasEgresosAlimentacion : 0,
              familiasEgresosSerPublicos: selectedRow ? selectedRow.familiasEgresosSerPublicos : 0,
              familiasEgresosTransporte: selectedRow ? selectedRow.familiasEgresosTransporte : 0,
              familiasEgresosSalud: selectedRow ? selectedRow.familiasEgresosSalud : 0,
              familiasEgresosEducacion: selectedRow ? selectedRow.familiasEgresosEducacion : 0,
              familiasEgresosDeudas: selectedRow ? selectedRow.familiasEgresosDeudas : 0,
              familiasEgresosOtros: selectedRow ? selectedRow.familiasEgresosOtros : 0,
              familiasTotalEgresos: selectedRow ? total.current : 0,
              familiasAportesFormales: selectedRow ? selectedRow.familiasAportesFormales : 0,
              familiasAportesInformales: selectedRow ? selectedRow.familiasAportesInformales : 0,
              familiasAportesArriendo: selectedRow ? selectedRow.familiasAportesArriendo : 0,
              familiasAportesSubsidios: selectedRow ? selectedRow.familiasAportesSubsidios : 0,
              familiasAportesPaternidad: selectedRow ? selectedRow.familiasAportesPaternidad : 0,
              familiasAportesTerceros: selectedRow ? selectedRow.familiasAportesTerceros : 0,
              familiasAportesOtros: selectedRow ? selectedRow.familiasAportesOtros : 0,
              familiasTotalAportes: selectedRow ? totalAportes.current : 0,
              familiasObservaciones: selectedRow ? selectedRow.familiasObservaciones : '',
              familiasEstado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              if (accion === 'crear') {
                dispatch(onCreate(data, handleOnClose, updateColeccion));
              } else if (accion === 'editar') {
                if (selectedRow) {
                  dispatch(onUpdate(data, handleOnClose, updateColeccion));
                }
              }
              setSubmitting(false);
            }}>
            {({values, initialValues, setFieldValue}) => (
              <FamiliaForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                personas={personas}
                tiposFamilia={tiposFamilia}
                condicionesFamilia={condicionesFamilia}
                initialValues={initialValues}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default FamiliaCreador;
