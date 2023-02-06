import React from 'react';
import {Button, TextField, Dialog, DialogActions,DialogContent ,DialogContentText ,DialogTitle   } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import * as Actions from 'app/auth/store/actions';

function EmailModal({user, open, closeHandler}) {

    const dispatch = useDispatch();
    const [values, setValues] = React.useState(user);

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    };

    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSubmit();
        }
    };

    function handleClose() {
        closeHandler();
    }

    function handleSubmit() {
        if(values.email !== user.email){
            dispatch(Actions.updateUserEmail(values.email));
        }
        closeHandler();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Modificá tu email</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email ? values.email : ''}
                    type="email"
                    fullWidth
                    onChange={handleInputChange}
                    onKeyDown={onEnterPress}
                />
                <DialogContentText className='mt-5'>
                    Recordá mantener tu email actualizado para recibir las notificaciones de nuestra plataforma
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Actualizar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmailModal;