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
import * as Actions from 'app/main/catalog/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function PackProductsCreateModal({pack_id, open, closeHandler}) {
    const dispatch = useDispatch();
    const packInfo = useSelector(({CatalogApp}) => CatalogApp.pack.packInfo);
    const loading = useSelector(({CatalogApp}) => CatalogApp.pack_product.stateCreateLoading);

    const providers = useSelector(({CatalogApp}) => CatalogApp.pack_product.providers);
    const provider_products = useSelector(({CatalogApp}) => CatalogApp.pack_product.provider_products);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = React.useState({'pack_id' : pack_id});

    const [provider_id, setProviderId] = React.useState('');
    const [product_id, setProductId] = React.useState('');

    useEffect(() => {
        if(pack_id){
            dispatch(Actions.getPackInfo(pack_id));
            dispatch(Actions.getProviders());
        }
    }, [pack_id]);

    useEffect(() => {
        if(provider_id){
            dispatch(Actions.getProviderProducts(provider_id));
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
        dispatch(Actions.loadingPackProductCreate(true));
        dispatch(Actions.createPackProduct(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }
    if (!packInfo || (providers && providers.length === 0) || loading) {
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
            <DialogTitle id="form-dialog-title">Agregá un producto al pack {packInfo.name}</DialogTitle>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <Select
                                id="provider_id"
                                className="w-full"
                                native
                                value={provider_id}
                                onChange={e => {
                                    setProviderId(e.target.value);
                                }}>
                                <option value="" disabled>Seleccioná un prestador</option>
                                {providers && providers.map(item => (
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
                                value={product_id}
                                onChange={e => {
                                    setProductId(e.target.value);
                                    setValues({...values, ['product_id']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccioná un producto</option>
                                {provider_products && provider_products.map(item => (
                                    <option key={'products_'+item.id} value={item.id}>
                                        {item.name} (SKU: {item.sku})
                                    </option>
                                ))}
                            </Select>
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

export default PackProductsCreateModal;
