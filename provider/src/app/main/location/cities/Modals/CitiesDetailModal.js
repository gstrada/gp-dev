import React, {useEffect} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField, Checkbox, FormControlLabel, DialogTitle
} from '@material-ui/core';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/location/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function CitiesDetailModal({item, open, closeHandler}) {
    const dispatch = useDispatch();
    const stateInfo = useSelector(({LocationApp}) => LocationApp.state.stateInfo);
    const cityInfo = useSelector(({LocationApp}) => LocationApp.city.cityInfo);
    const loading = useSelector(({LocationApp}) => LocationApp.city.cityInfoLoading);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);

    useEffect(() => {
        if(item){
            dispatch(Actions.loadingCityInfo(true));
            dispatch(Actions.getCityInfo(item.id));
            dispatch(Actions.getStateInfo(item.state_id));
        }
    }, [item]);

    useEffect(() => {
        if(cityInfo){
            setValues(cityInfo);
        }
    }, [cityInfo]);

    const handleInputChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            value = values[name] === 1 ? 0 : 1;
        }
        setValues({...values, [name]: value})
    };
    
    function handleSubmit() {
        dispatch(Actions.loadingCityInfo(true));
        dispatch(Actions.updateCityItem(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }

    if (!cityInfo || !stateInfo || loading || !values) {
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
            <DialogTitle id="form-dialog-title">Editar una ciudad de {stateInfo.name}</DialogTitle>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className="flex-col w-full">
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Nombre"
                                value={(values && values.name) ? values.name : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                                className="mr-5"
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
                                        checked={!!values.enabled}
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

export default CitiesDetailModal;