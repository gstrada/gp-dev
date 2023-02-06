import React, {useEffect} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField,Checkbox, FormControlLabel
} from '@material-ui/core';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/payment/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MethodsCreateModal({item, open, closeHandler}) {
    const dispatch = useDispatch();
    const loading = useSelector(({PaymentApp}) => PaymentApp.method.methodCreateLoading);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);

    const handleInputChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            if(values){
                value = values[name] === 1 ? 0 : 1;
            }else{
                value = 1;
            }
        }
        setValues({...values, [name]: value})
    };

    function handleSubmit() {
        dispatch(Actions.loadingMethodCreate(true));
        dispatch(Actions.createMethod(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }
    if (loading) {
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <div className="flex flex-1 items-center justify-center h-full mt-32 mb-32">
                    <Typography color="textSecondary" variant="h5">
                        Cargando
                    </Typography>
                </div>
            </Dialog>
        );
    }



    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}  fullScreen={fullScreen}  maxWidth='sm'>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Nombre"
                                value={(values && values.name) ? values.name : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="slug"
                                name="slug"
                                label="Identificador Interno"
                                value={(values && values.slug) ? values.slug : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="success_description"
                                name="success_description"
                                label="Mensaje al comprador"
                                value={(values && values.success_description) ? values.success_description : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        name='enabled_for_all_subitems'
                                        checked={ !values ? false : !!values.enabled_for_all_subitems}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Habilitado para todas las provincias"
                                className="w-full"
                            />
                        </div>
                        {/*<div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={*/}
                        {/*            <Checkbox*/}
                        {/*                onClick={(event) => {*/}
                        {/*                    event.stopPropagation();*/}
                        {/*                }}*/}
                        {/*                name='enabled'*/}
                        {/*                checked={ !values ? false : !!values.enabled}*/}
                        {/*                onChange={handleInputChange}*/}
                        {/*            />*/}
                        {/*        }*/}
                        {/*        label="Habilitado"*/}
                        {/*        className="w-full"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MethodsCreateModal;