import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import * as Actions from 'app/auth/store/actions';

function AddressModal({user, open, closeHandler}) {

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
        dispatch(Actions.updateUserAddress(values.state, values.city, values.street_name, values.street_number, values.zip_code));
        closeHandler();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Modificá tu dirección</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="state"
                    name="state"
                    label="Provincia"
                    value={values.state ? values.state : ''}
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    className='mb-3'
                />
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <TextField
                        margin="dense"
                        id="city"
                        name="city"
                        label="Ciudad / Localidad / Partido"
                        value={values.city ? values.city : ''}
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                        className="sm:w-auto md:w-4/6"
                    />
                    <TextField
                        margin="dense"
                        id="zip_code"
                        name="zip_code"
                        label="Código postal"
                        value={values.zip_code ? values.zip_code : ''}
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                        className="sm:w-auto md:w-2/6"
                    />
                </div>

                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3"}>
                    <TextField
                        margin="dense"
                        id="street_name"
                        name="street_name"
                        label="Calle"
                        value={values.street_name ? values.street_name : ''}
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                        className="sm:w-auto md:w-4/6"
                    />
                    <TextField
                        margin="dense"
                        id="street_number"
                        name="street_number"
                        label="Número"
                        value={values.street_number ? values.street_number : ''}
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                        className="sm:w-auto md:w-2/6"
                        onKeyDown={onEnterPress}
                    />
                </div>

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

export default AddressModal;