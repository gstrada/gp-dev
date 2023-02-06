import React, {useEffect, useRef} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/catalog/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';


function ProductsInfoModal({item, open, closeHandler}) {

    const dispatch = useDispatch();
    const productInfo = useSelector(({CatalogApp}) => CatalogApp.product.productInfo);
    const loading = useSelector(({CatalogApp}) => CatalogApp.product.productInfoLoading);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);

    useEffect(() => {
        if(item){
            dispatch(Actions.loadingProductInfo(true));
            dispatch(Actions.getProductInfo(item.id));
        }
    }, [item]);



    useEffect(() => {
        if(productInfo){
            setValues(productInfo);
        }
    }, [productInfo]);

    function handleClose() {
        closeHandler();
    }

    if (!productInfo || loading || !values) {
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}  fullScreen={fullScreen}  maxWidth='md'>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-20 mb-4">
                            <Typography variant="h6">Información del Producto</Typography>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-20 mb-4">
                            <Typography variant="body1">Cantidad de personas recomendada: <span className='font-bold text-blue text-20'>{(values && values.recommended_people) ? values.recommended_people : ''}</span></Typography>
                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-20 mb-4">
                            <Typography variant="body1" color='secondary' className='font-bold text-20' dangerouslySetInnerHTML={{ __html: values.details }}/>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductsInfoModal;
