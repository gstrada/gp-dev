import React, {useEffect} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField, Checkbox, FormControlLabel, DialogTitle, Select
} from '@material-ui/core';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/payment/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function StatesDetailModal({payment_method_id, item, open, closeHandler}) {
    const dispatch = useDispatch();
    const methodInfo = useSelector(({PaymentApp}) => PaymentApp.method.methodInfo);
    const stateInfo = useSelector(({PaymentApp}) => PaymentApp.state.stateInfo);
    const loading = useSelector(({PaymentApp}) => PaymentApp.state.stateInfoLoading);

    const countries = useSelector(({PaymentApp}) => PaymentApp.state.countries);
    const country_states = useSelector(({PaymentApp}) => PaymentApp.state.country_states);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);

    const [country_id, setCountryId] = React.useState('');
    const [country_state_id, setCountryStateId] = React.useState('');

    useEffect(() => {
        if(payment_method_id){
            dispatch(Actions.getMethodInfo(payment_method_id));
            dispatch(Actions.getStateInfo(item.id));
            dispatch(Actions.getCountries());
        }
    }, [payment_method_id]);

    useEffect(() => {
        if(country_id){
            dispatch(Actions.getCountryStates(country_id));
        }
    }, [country_id]);


    useEffect(() => {
        if(stateInfo){
            setValues(stateInfo);
            setCountryId(stateInfo.state.country_id);
            setCountryStateId(stateInfo.state.id);
        }
    }, [stateInfo]);

    const handleInputChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            value = values[name] === 1 ? 0 : 1;
        }
        setValues({...values, [name]: value})
    };
    
    function handleSubmit() {
        dispatch(Actions.loadingStateInfo(true));
        dispatch(Actions.updateStateItem(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }

    if (!stateInfo || !methodInfo || loading || !values) {
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
            <DialogTitle id="form-dialog-title">Editar una provincia de {methodInfo.name}</DialogTitle>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <Select
                                id="country_id"
                                className="w-full"
                                native
                                value={country_id}
                                onChange={e => {
                                    setCountryId(e.target.value);
                                }}>
                                <option value="" disabled>Seleccioná un país</option>
                                {countries && countries.map(item => (
                                    <option key={'country_'+item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className={"flex flex-row flex-1 flex-shrink-0 mt-10"}>
                            <Select
                                id="payment_method_id"
                                className="w-full"
                                native
                                value={country_state_id}
                                onChange={e => {
                                    setCountryStateId(e.target.value);
                                    setValues({...values, ['state_id']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccioná una provincia</option>
                                {country_states && country_states.map(item => (
                                    <option key={'country_states_'+item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="Precio"
                                value={(values && values.price) ? values.price : ''}
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
                                label="Habilitado para todas las ciudades"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        name='enabled'
                                        checked={ !values ? false : !!values.enabled}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Habilitado"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Actualizar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default StatesDetailModal;