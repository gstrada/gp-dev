import React from 'react';
import {Button, TextField, Dialog, DialogActions,DialogContent ,DialogContentText ,DialogTitle   } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import * as Actions from 'app/auth/store/actions';

function PasswordModal({user, open, closeHandler}) {

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
        if(values.old_password.length > 0){
            dispatch(Actions.updateUserPassword(values.old_password, values.password, values.password_confirmation));
        }
        closeHandler();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Modificá tu clave</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="old_password"
                    name="old_password"
                    label="Tu clave actual"
                    type="password"
                    fullWidth
                    onChange={handleInputChange}
                    //onKeyDown={onEnterPress}
                />
                <TextField
                    margin="dense"
                    id="password"
                    name="password"
                    label="Nueva clave"
                    type="password"
                    fullWidth
                    onChange={handleInputChange}
                    //onKeyDown={onEnterPress}
                />
                <TextField
                    margin="dense"
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Confirmá tu nueva clave"
                    type="password"
                    fullWidth
                    onChange={handleInputChange}
                    onKeyDown={onEnterPress}
                />
                <DialogContentText className='mt-5'>
                    Recordá mantener tu clave segura, no la divulges y modificala periodicamente
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

export default PasswordModal;