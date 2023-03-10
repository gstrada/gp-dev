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
import * as Actions from 'app/main/serviceProvider/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function AddressesCreateModal({provider_id, open, closeHandler}) {
    const dispatch = useDispatch();
    const providerInfo = useSelector(({ProviderApp}) => ProviderApp.provider.providerInfo);
    const loading = useSelector(({ProviderApp}) => ProviderApp.address.stateCreateLoading);

    const countries = useSelector(({ProviderApp}) => ProviderApp.address.countries);
    const country_states = useSelector(({ProviderApp}) => ProviderApp.address.country_states);
    const state_cities = useSelector(({ProviderApp}) => ProviderApp.address.state_cities);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState({'provider_id' : provider_id});

    const [country_id, setCountryId] = React.useState('');
    const [country_state_id, setCountryStateId] = React.useState('');
    const [state_city_id, setStateCityId] = React.useState('');

    useEffect(() => {
        if(provider_id){
            dispatch(Actions.getProviderInfo(provider_id));
            dispatch(Actions.getCountries());
        }
    }, [provider_id]);

    useEffect(() => {
        if(country_id){
            dispatch(Actions.getCountryStates(country_id));
        }
    }, [country_id]);

    useEffect(() => {
        if(country_state_id){
            dispatch(Actions.getStateCities(country_state_id));
        }
    }, [country_state_id]);

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
        dispatch(Actions.loadingAddressCreate(true));
        dispatch(Actions.createAddress(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }
    if (!providerInfo || (countries && countries.length === 0) || loading) {
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
            <DialogTitle id="form-dialog-title">Agreg?? una direcci??n al prestador {providerInfo.name}</DialogTitle>
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
                                <option value="" disabled>Seleccion?? un pa??s</option>
                                {countries && countries.map(item => (
                                    <option key={'country_'+item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className={"flex flex-row flex-1 flex-shrink-0 mt-10"}>
                            <Select
                                id="state_id"
                                className="w-full"
                                native
                                value={country_state_id}
                                onChange={e => {
                                    setCountryStateId(e.target.value);
                                    setValues({...values, ['state_id']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccion?? una provincia</option>
                                {country_states && country_states.map(item => (
                                    <option key={'country_states_'+item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className={"flex flex-row flex-1 flex-shrink-0 mt-10"}>
                            <Select
                                id="state_id"
                                className="w-full"
                                native
                                value={state_city_id}
                                onChange={e => {
                                    setStateCityId(e.target.value);
                                    setValues({...values, ['city_id']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccion?? una ciudad</option>
                                {state_cities && state_cities.map(item => (
                                    <option key={'state_cities_'+item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <TextField
                                margin="dense"
                                id="address"
                                name="address"
                                label="Direcci??n"
                                value={(values && values.address) ? values.address : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={(values && values.email) ? values.email : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="phone"
                                    name="phone"
                                    label="Tel??fono"
                                    value={(values && values.phone) ? values.phone : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="lat"
                                    name="lat"
                                    label="Latitud"
                                    value={(values && values.lat) ? values.lat : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="lon"
                                    name="lon"
                                    label="Longitud"
                                    value={(values && values.lon) ? values.lon : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <TextField
                                margin="dense"
                                id="website"
                                name="website"
                                label="Sitio Web"
                                value={(values && values.website) ? values.website : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <TextField
                                margin="dense"
                                id="embedded_map"
                                name="embedded_map"
                                label="Url Mapa Embebido"
                                value={(values && values.embedded_map) ? values.embedded_map : ''}
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

export default AddressesCreateModal;