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
import * as Actions from 'app/main/shipping/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function StatesCreateModal({carrier_id, open, closeHandler}) {
    const dispatch = useDispatch();
    const carrierInfo = useSelector(({ShippingApp}) => ShippingApp.carrier.carrierInfo);
    const loading = useSelector(({ShippingApp}) => ShippingApp.state.stateCreateLoading);

    const countries = useSelector(({ShippingApp}) => ShippingApp.state.countries);
    const country_states = useSelector(({ShippingApp}) => ShippingApp.state.country_states);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState({'carrier_id' : carrier_id});

    const [country_id, setCountryId] = React.useState('');
    const [country_state_id, setCountryStateId] = React.useState('');

    useEffect(() => {
        if(carrier_id){
            dispatch(Actions.getCarrierInfo(carrier_id));
            dispatch(Actions.getCountries());
        }
    }, [carrier_id]);

    useEffect(() => {
        if(country_id){
            dispatch(Actions.getCountryStates(country_id));
        }
    }, [country_id]);

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
        dispatch(Actions.loadingStateCreate(true));
        dispatch(Actions.createState(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }
    if (!carrierInfo || (countries && countries.length === 0) || loading) {
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
            <DialogTitle id="form-dialog-title">Agregá una provincia a {carrierInfo.name}</DialogTitle>
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
                                id="carrier_id"
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
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-5 mb-3">
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
                            <TextField
                                margin="dense"
                                id="free_if_order_above"
                                name="free_if_order_above"
                                label="Gratis si la orden supera"
                                value={(values && values.free_if_order_above) ? values.free_if_order_above : ''}
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
                        {/*<div className="flex flex-row flex-1 flex-shrink-0 mb-3">*/}
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

export default StatesCreateModal;