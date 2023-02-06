import React, {useEffect, useRef} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField, Checkbox, FormControlLabel, Icon, FormControl, FormLabel
} from '@material-ui/core';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/catalog/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles} from "@material-ui/styles";
import ColorPicker from "material-ui-color-picker";

const useStyles = makeStyles(theme => ({
    root: {
        color     : theme.palette.primary.contrastText
    },
    pictureInput : {
        display: 'none'
    },
    pictureButton: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    pictureIcon: {
        marginLeft: theme.spacing(1),
    },
    pictureMini: {
        width: '3rem',
        height: '3rem',
        overflow: 'hidden',
        borderRadius: '3rem',
    },
}));

function DiscountsDetailModal({item, open, closeHandler}) {



    const dispatch = useDispatch();
    const discountInfo = useSelector(({CatalogApp}) => CatalogApp.discount.discountInfo);
    const loading = useSelector(({CatalogApp}) => CatalogApp.discount.discountInfoLoading);
    const classes = useStyles();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);

    useEffect(() => {
        if(item){
            dispatch(Actions.loadingDiscountInfo(true));
            dispatch(Actions.getDiscountInfo(item.id));
        }
    }, [item]);

    useEffect(() => {
        if(discountInfo){
            setValues(discountInfo);
        }
    }, [discountInfo]);

    const handleInputChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            value = values[name] === 1 ? 0 : 1;
        }
        setValues({...values, [name]: value})
    };


    function handleSubmit() {
        dispatch(Actions.loadingDiscountInfo(true));
        dispatch(Actions.updateDiscountItem(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }

    if (!discountInfo || loading || !values) {
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
                                    id="code"
                                    name="code"
                                    label="Código"
                                    value={(values && values.code) ? values.code : ''}
                                    type="text"
                                    fullWidth
                                    autoFocus={true}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-row flex-1 flex-shrink-0">

                                <TextField
                                    margin="dense"
                                    id="rate"
                                    name="rate"
                                    label="Descuento en %"
                                    value={(values && values.rate) ? values.rate : ''}
                                    type="number"
                                    fullWidth
                                    onChange={handleInputChange}
                                />

                            </div>

                        </div>
                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-24">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        name='one_time_use'
                                        checked={ !values ? false : !!values.one_time_use}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="De uso único"
                                className="w-full"
                            />
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-24">
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

export default DiscountsDetailModal;
