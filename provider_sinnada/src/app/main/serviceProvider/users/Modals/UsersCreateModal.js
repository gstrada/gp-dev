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

function UsersCreateModal({provider_id, open, closeHandler}) {
    const dispatch = useDispatch();
    const providerInfo = useSelector(({ProviderApp}) => ProviderApp.provider.providerInfo);
    const loading = useSelector(({ProviderApp}) => ProviderApp.user.stateCreateLoading);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState({'provider_id' : provider_id});
    const [provider_role, setProviderRole] = React.useState('');
  
    useEffect(() => {
        if(provider_id){
            dispatch(Actions.getProviderInfo(provider_id));
        }
    }, [provider_id]);

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
        dispatch(Actions.loadingUserCreate(true));
        dispatch(Actions.createUser(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }
    if (!providerInfo || loading) {
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
            <DialogTitle id="form-dialog-title">Agregá un usuario al prestador {providerInfo.name}</DialogTitle>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
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
                        <div className="flex flex-row flex-1 flex-shrink-0 pt-3">
                            <Select
                                id="provider_role"
                                className="w-full"
                                native
                                value={provider_role}
                                onChange={e => {
                                    setProviderRole(e.target.value);
                                    setValues({...values, ['provider_role']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccioná un rol</option>
                                <option value='admin'>Administrador</option>
                                <option value='editor'>Editor</option>
                                <option value='verifier'>Verificador</option>
                                <option value='accountant'>Contador</option>
                            </Select>
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

export default UsersCreateModal;