import React from 'react';
import {Button, TextField, Dialog, DialogActions,DialogContent ,DialogContentText ,DialogTitle   } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import * as Actions from 'app/auth/store/actions';

function LastNameModal({user, open, closeHandler}) {

    const dispatch = useDispatch();
    const [values, setValues] = React.useState(user);

    const handleInputChange = e => {
        const {name, value} = e.target;
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
        if(values.lastname !== user.lastname){
            dispatch(Actions.updateUserLastName(values.lastname));
        }
        closeHandler();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Modificá tu apellido</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastname"
                    name="lastname"
                    label="Apellido"
                    value={values.lastname ? values.lastname : ''}
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    onKeyDown={onEnterPress}
                />
                <DialogContentText className='mt-5'>
                    Completá tu apellido
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

export default LastNameModal;
