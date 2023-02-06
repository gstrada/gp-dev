import React, {useEffect, useRef} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField, Checkbox, FormControlLabel, Icon, FormControl, FormLabel, Select
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

function PacksDetailModal({item, open, closeHandler}) {

    let pictureInput = useRef(null);

    const dispatch = useDispatch();
    const packInfo = useSelector(({CatalogApp}) => CatalogApp.pack.packInfo);
    const loading = useSelector(({CatalogApp}) => CatalogApp.pack.packInfoLoading);
    const classes = useStyles();
    const categories = useSelector(({CatalogApp}) => CatalogApp.pack.categories);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);
    const [category_id, setCategoryId] = React.useState('');

    useEffect(() => {
        if(item){
            dispatch(Actions.loadingPackInfo(true));
            dispatch(Actions.getPackInfo(item.id));
            dispatch(Actions.getJsonCategories());

        }
    }, [item]);



    useEffect(() => {
        if(packInfo){
            setValues(packInfo);
            setCategoryId(packInfo.category_id);
        }
    }, [packInfo]);

    const handleInputChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            value = values[name] === 1 ? 0 : 1;
        }
        setValues({...values, [name]: value})
    };

    function handlePictureFileChange(event){
        if(event.target && event.target.files && event.target.files[0]){
            setValues({...values, ['logo']: event.target.files[0]})
        }
        pictureInput.value = null;
    }

    function handleSubmit() {
        dispatch(Actions.loadingPackInfo(true));
        dispatch(Actions.updatePackItem(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }

    if (!packInfo || loading || !values) {
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

                        <div className={"flex flex-row flex-1 flex-shrink-0 mt-10"}>
                            <Select
                                id="category_id"
                                className="w-full"
                                native
                                value={category_id}
                                onChange={e => {
                                    setCategoryId(e.target.value);
                                    setValues({...values, ['category_id']: e.target.value});
                                }}>
                                <option value="" disabled>Seleccioná una categoría</option>
                                {categories && categories.map(item => (
                                    <option key={'category_'+item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>

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
                                    autoFocus={true}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="sku"
                                    name="sku"
                                    label="SKU"
                                    value={(values && values.sku) ? values.sku : ''}
                                    type="text"
                                    fullWidth
                                    autoFocus={true}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="friendly_url"
                                    name="friendly_url"
                                    label="URL Amigable"
                                    value={(values && values.friendly_url) ? values.friendly_url : ''}
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <FormControl component="fieldset" className="mt-3 pt-1">
                                    <FormLabel component="legend" className="text-11">Color</FormLabel>
                                    <ColorPicker
                                        fullWidth
                                        name='color'
                                        defaultValue='#000'
                                        value={(values && values.color) ? values.color : ''}
                                        onChange={color =>  setValues({...values, ['color']: color})}

                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="physical_price"
                                    name="physical_price"
                                    label="Precio Físico"
                                    value={(values && values.physical_price) ? values.physical_price : ''}
                                    type="number"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="digital_price"
                                    name="digital_price"
                                    label="Precio Digital"
                                    value={(values && values.digital_price) ? values.digital_price : ''}
                                    type="number"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-row flex-1 flex-shrink-0">
                                <TextField
                                    margin="dense"
                                    id="card_price"
                                    name="card_price"
                                    label="Precio con Tarjeta"
                                    value={(values && values.card_price) ? values.card_price : ''}
                                    type="number"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="short_description"
                                name="short_description"
                                label="Descripción Corta"
                                value={(values && values.short_description) ? values.short_description : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Descripción Completa"
                                value={(values && values.description) ? values.description : ''}
                                type="text"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="flex flex-row flex-1 flex-shrink-0 items-center text-center justify-center mt-3 mb-3">
                            <div className="w-auto pt-16">
                                <input
                                    accept="*"
                                    className={classes.pictureInput}
                                    id="logo-upload-input"
                                    type="file"
                                    onChange={event => handlePictureFileChange(event)}
                                    ref={(input) => {
                                        pictureInput = input;
                                    }}
                                />
                                <label htmlFor="logo-upload-input">
                                    <Button size="small" component="span"  variant="contained" color="default" className={classes.pictureButton}>
                                        {(values && ((values.pictureUrl && values.pictureUrl.length > 0) || values.logo)) ? 'Modificá la imágen' : 'Subí una imágen'}
                                        <Icon color="action" className={classes.pictureIcon}>cloud_upload</Icon>
                                    </Button>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        name='online_only'
                                        checked={ !values ? false : !!values.online_only}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Solo venta Online"
                                className="w-full"
                            />
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        name='featured'
                                        checked={ !values ? false : !!values.featured}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Destacado"
                                className="w-full"
                            />
                        </div>

                        <div className="flex flex-row flex-1 flex-shrink-0 mt-3 mb-3">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        name='available_for_sale'
                                        checked={ !values ? false : !!values.available_for_sale}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Disponible para la Venta"
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

export default PacksDetailModal;
