import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {Scrollbar} from '@crema';
import {makeStyles} from '@material-ui/core/styles/index';
import { Fonts } from 'shared/constants/AppEnums';
import { Slide, Box, Button } from '@material-ui/core';
import Persona from 'modules/PersonasEntidades/Persona';

const cells = [
  {
    id: 'personasIdentificacion',
    typeHead: 'numeric',
    label: 'Identificacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'nombre',
    typeHead: 'string',
    label: 'Nombre',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
];

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
  bottomsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
    gap: '10px',
    backgroundColor: 'white',
    paddingRight: '20px',
    position: 'sticky',
    left: 0,
    bottom: 0,
  },
  btnRoot: {
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  btnPrymary: {
    backgroundColor: theme.palette.secondary.main,
  },
  btnSecundary: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const MySearcher = (props) => {
  const { showForm, handleOnClose, getValue } = props;
  const classes = useStyles(props);

  let columnasMostradasInicial = [];
  cells.forEach((cell) => {
    columnasMostradasInicial.push({
      id: cell.id,
      mostrar: cell.mostrarInicio,
      typeHead: cell.typeHead,
      label: cell.label,
      value: cell.value,
      align: cell.align,
      width: cell.width,
      cellColor: cell.cellColor,
    });
  });

  const onSelect = (id) => {
    getValue(id);
  }

  return (
    <Dialog
      open={showForm}
      onClose={handleOnClose}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}
      maxWidth={'lg'}>
      <Scrollbar>
        <Persona 
          buscador={true} 
          route={{path:'/personas'}} 
          onSelectPersona={(id) => {
            onSelect(id);
            handleOnClose();
          }}
        />
        <Box className={classes.bottomsGroup}>
          <Button
            className={`${classes.btnRoot} ${classes.btnSecundary}`}
            onClick={handleOnClose}>
            Cerrar
          </Button>
        </Box>
      </Scrollbar>
    </Dialog>
  )
}

export default MySearcher;
