import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  success: {
    color: '#fff!important',
    backgroundColor: '#4caf50!important',
    borderRadius: '4px',
  },
  error: {
    color: '#fff!important',
    backgroundColor: '#f44336!important',
    borderRadius: '4px',
  },
  delete: {
    color: '#fff!important',
    backgroundColor: '#2196f3!important',
    borderRadius: '4px',
  }
});

export default function SimpleSnackbar(props) {
  const {msg, type, open, setOpen} = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  var typeClass = classes.success;
  if(type === "error"){
   typeClass = classes.error;
  }
  else if(type === "delete"){
    typeClass = classes.delete;
  }
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      classes={{
        root: typeClass, 
      }}
      children={
        <div className="SnackbarAlert">
          <p className="SnackbarLabel">{msg}</p>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      }
    >
    </Snackbar>
  );
}