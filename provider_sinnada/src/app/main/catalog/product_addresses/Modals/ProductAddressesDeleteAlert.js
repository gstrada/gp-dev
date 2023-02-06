import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import * as Actions from 'app/main/catalog/store/actions';

function ProductAddressesDeleteAlert({item, open, closeHandler}) {
    const dispatch = useDispatch();

    function handleClose() {
        closeHandler();
    }

    function handleAccept() {
        dispatch(Actions.removeFromProductAddresses(item.id));
        closeHandler();
    }

    if(!item){
        closeHandler();
        return <div/>;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Eliminar item</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Esta seguro de eliminar este item? La acción no se puede deshacer y eliminará todo el contenido asociado.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleAccept} color="primary" autoFocus>
                    Si, Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductAddressesDeleteAlert;