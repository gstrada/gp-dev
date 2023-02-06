import React, {useEffect, useRef} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField, Checkbox, FormControlLabel, Icon
} from '@material-ui/core';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/serviceProvider/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        color     : theme.palette.primary.contrastText
    },
    logoInput : {
        display: 'none'
    },
    logoButton: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    logoIcon: {
        marginLeft: theme.spacing(1),
    },
    logoMini: {
        width: '3rem',
        height: '3rem',
        overflow: 'hidden',
        borderRadius: '3rem',
    },
}));

function ProvidersCreateModal({item, open, closeHandler}) {

    let logoInput = useRef(null);

    const dispatch = useDispatch();
    const loading = useSelector(({ProviderApp}) => ProviderApp.provider.providerCreateLoading);

    const classes = useStyles();
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

    function handleLogoFileChange(event){
        if(event.target && event.target.files && event.target.files[0]){
            setValues({...values, ['logo']: event.target.files[0]})
        }
        logoInput.value = null;
    }

    function handleSubmit() {
        dispatch(Actions.loadingProviderCreate(true));
        dispatch(Actions.createProvider(values));
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
                            <div className="flex flex-row flex-1 flex-shrink-0">
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

                            <div className="flex flex-row flex-1 flex-shrink-0 items-center text-center justify-center">
                                <div className="w-auto pt-16">
                                    <input
                                        accept="*"
                                        className={classes.logoInput}
                                        id="logo-upload-input"
                                        type="file"
                                        onChange={event => handleLogoFileChange(event)}
                                        ref={(input) => {
                                            logoInput = input;
                                        }}
                                    />
                                    <label htmlFor="logo-upload-input">
                                        <Button size="small" component="span"  variant="contained" color="default" className={classes.logoButton}>
                                            {(values && ((values.logoUrl && values.logoUrl.length > 0) || values.logo)) ? 'Modificá el logo' : 'Subí el logo'}
                                            <Icon color="action" className={classes.logoIcon}>cloud_upload</Icon>
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="description"
                                name="slug"
                                label="Descripción"
                                value={(values && values.slug) ? values.slug : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="internal_contact_name"
                                    name="internal_contact_name"
                                    label="Persona de contacto"
                                    value={(values && values.internal_contact_name) ? values.internal_contact_name : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="internal_contact_address"
                                    name="internal_contact_address"
                                    label="Dirección contacto"
                                    value={(values && values.internal_contact_address) ? values.internal_contact_address : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="internal_contact_phone"
                                    name="internal_contact_phone"
                                    label="Teléfono de contacto"
                                    value={(values && values.internal_contact_phone) ? values.internal_contact_phone : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="internal_contact_email"
                                    name="internal_contact_email"
                                    label="Email contacto"
                                    value={(values && values.internal_contact_email) ? values.internal_contact_email : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>


                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="social_name"
                                    name="social_name"
                                    label="Razón Social"
                                    value={(values && values.social_name) ? values.social_name : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="social_number"
                                    name="social_number"
                                    label="CUIT/CUIL/DNI"
                                    value={(values && values.social_number) ? values.social_number : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="bank_name"
                                name="bank_name"
                                label="Nombre del Banco"
                                value={(values && values.bank_name) ? values.bank_name : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="bank_account_social_number"
                                    name="bank_account_social_number"
                                    label="CUIT/CUIL/DNI del Titular"
                                    value={(values && values.bank_account_social_number) ? values.bank_account_social_number : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="bank_account_holder"
                                    name="bank_account_holder"
                                    label="Nombre del Titular"
                                    value={(values && values.bank_account_holder) ? values.bank_account_holder : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="bank_account_number"
                                name="bank_account_number"
                                label="Número de Cuenta"
                                value={(values && values.bank_account_number) ? values.bank_account_number : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="bank_account_identifier"
                                    name="bank_account_identifier"
                                    label="CBU"
                                    value={(values && values.bank_account_identifier) ? values.bank_account_identifier : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="bank_account_alias"
                                    name="bank_account_alias"
                                    label="Alias"
                                    value={(values && values.bank_account_alias) ? values.bank_account_alias : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
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

export default ProvidersCreateModal;