import {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const AlertMessage = ({
    alertMessage,
    setAlertMessage
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
      if(alertMessage){
          setOpen(true);
      } else {
          setOpen(false);
      }

  }, [alertMessage])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertMessage('');
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alertMessage}
        action={
            <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            </>
        }
      />
    </div>
  );
}

export default AlertMessage;