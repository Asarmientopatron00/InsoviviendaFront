import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {Tooltip} from '@material-ui/core';

const MyCell = (props) => {
  const {align, width, claseBase, value, cellColor, useStyles, tooltipValue} = props;
  const classes = useStyles({width: width, cellColor: cellColor});

  let allClassName = claseBase;

  if (width !== undefined) {
    allClassName = `${allClassName} ${classes.cellWidth}`;
  }

  return (
    <TableCell align={align} className={allClassName}>
      <Tooltip title={tooltipValue || ""}>
        <span className={cellColor ? classes.cellColor : ''}>{value}</span>
      </Tooltip>
    </TableCell>
  );
};

export default MyCell;
