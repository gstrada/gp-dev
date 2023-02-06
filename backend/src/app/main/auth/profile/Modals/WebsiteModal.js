import React from 'react';
import {Button, TextField, Dialog, DialogActions,DialogContent ,DialogContentText ,DialogTitle   } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import * as Actions from 'app/auth/store/actions';

function WebsiteModal({user, open, closeHandler}) {

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
        if(values.website !== user.website){
            dispatch(Actions.updateUserWebsite(values.website));
        }
        closeHandler();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Modificá tu sitio web</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="website"
                    name="website"
                    label="Teléfono"
                    value={values.website ? values.website : ''}
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    onKeyDown={onEnterPress}
                />
                <DialogContentText className='mt-5'>
                    Protocolo + URL
                    <br/>Ejemplo: https://www.tuweb.org
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

export default WebsiteModal;