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

function CitiesCreateModal({payment_method_state_id, open, closeHandler}) {


    const dispatch = useDispatch();
    const stateInfo = useSelector(({PaymentApp}) => PaymentApp.state.stateInfo);
    const loading = useSelector(({PaymentApp}) => PaymentApp.city.cityCreateLoading);

    //const states = useSelector(({PaymentApp}) => PaymentApp.city.states);
    const state_cities = useSelector(({PaymentApp}) => PaymentApp.city.state_cities);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState({'payment_method_state_id' : payment_method_state_id});

    const [state_city_id, setStateCityId] = React.useState('');

    useEffect(() => {
        if(payment_method_state_id){
            dispatch(Actions.getStateInfo(payment_method_state_id));
        }
    }, [payment_method_state_id]);

    useEffect(() => {
        if(stateInfo){
            dispatch(Actions.getStateCities(stateInfo.state_id));
        }
    }, [stateInfo]);

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
        dispatch(Actions.loadingCityCreate(true));
        dispatch(Actions.createCity(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }
    if (!stateInfo || loading) {
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
            <DialogTitle id="form-dialog-title">Agregá una ciudad a {stateInfo.payment_method.name} ({stateInfo.state.name})</DialogTitle>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>
                        <div className={"flex flex-row flex-1 flex-shrink-0"}>
                            <Select
                                id="city_id"
                                className="w-full"
                                native
                                value={state_city_id}
                                onChange={e => {
                                    setStateCityId(e.target.value);
                                    setValues({...values, ['city_id']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccioná una ciudad</option>
                                {state_cities && state_cities.map(item => (
                                    <option key={'state_cities_'+item.id} value={item.id}>
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
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CitiesCreateModal;