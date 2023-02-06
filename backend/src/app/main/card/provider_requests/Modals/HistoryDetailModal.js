import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useTheme, TextField, Checkbox, FormControlLabel, DialogTitle, Select, MenuItem, Menu, Icon
} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/card/store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    block: {
        display: 'block',
        width: '100%',
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

function HistoryDetailModal({item, open, closeHandler}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const historyInfo = useSelector(({CardApp}) => CardApp.history.historyInfo);
    const loading = useSelector(({CardApp}) => CardApp.history.historyInfoLoading);

    let pictureInput = useRef(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [values, setValues] = React.useState(null);

    useEffect(() => {
        if(item){
            dispatch(Actions.getHistoryInfo(item.id));
        }
    }, [item]);


    useEffect(() => {
        if(historyInfo){
            setValues(historyInfo);
        }
    }, [historyInfo]);

    const handleInputChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            value = values[name] === 1 ? 0 : 1;
        }
        setValues({...values, [name]: value})
    };

    function handlePictureFileChange(event){
        if(event.target && event.target.files && event.target.files[0]){
            setValues({...values, ['attachment']: event.target.files[0]})
        }
        pictureInput.value = null;
    }

    function handleSubmit() {
        dispatch(Actions.loadingHistoryInfo(true));
        dispatch(Actions.updateHistoryItem(values));
        closeHandler();
    }

    function handleClose() {
        closeHandler();
    }

    if (!historyInfo || loading || !values) {
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
            <DialogTitle id="form-dialog-title" className="pb-0">
                <span className="w-full block">Solicitud de Pago a {historyInfo.provider.name}</span>
                <span className="w-full block text-13">Razón Social: {historyInfo.provider.social_name}</span>
                <span className="w-full block text-13">CUIT: {historyInfo.provider.social_number}</span>
                <span className="w-full block text-20">
                    { historyInfo.paid ? "Monto a Pagado: $ " + historyInfo.amount :  "Monto a Pagar: $ " + historyInfo.amount}
                </span>
                <span className="w-full block text-9">
                    #{historyInfo.id}
                </span>
                <span className="w-full block text-16">
                    Factura: <a href={historyInfo.referenceFileUrl} target="_blank">Descargar</a>
                </span>

                {historyInfo.transactionFileUrl ? (
                    <span className="w-full block text-16">
                    Comprobante: <a href={historyInfo.transactionFileUrl} target="_blank">Descargar</a>
                </span>
                ) : null}

                <div className="mb-3 inline-block">
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                name='paid'
                                checked={ !values ? false : !!values.paid}
                                onChange={handleInputChange}
                            />
                        }
                        label="Pagado"
                        className="w-full text-11"
                    />
                </div>

                <div className="mb-3  inline-block">
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                name='removed'
                                checked={ !values ? false : !!values.removed}
                                onChange={handleInputChange}
                            />
                        }
                        label="Rechazado"
                        className="w-full text-11"
                    />
                </div>

                <div className="mb-3 inline-block ml-8">
                    <div className="w-full pt-16">
                        <input
                            accept="*"
                            className={classes.pictureInput}
                            id="file-upload-input"
                            type="file"
                            onChange={event => handlePictureFileChange(event)}
                            ref={(input) => {
                                pictureInput = input;
                            }}
                        />
                        <label htmlFor="file-upload-input" className='text-11'>
                            <Button size="small" component="span"  variant="contained" color="default" className={classes.pictureButton}>
                                {(values && ((values.transactionFileUrl && values.transactionFileUrl.length > 0) || values.attachment)) ? 'Modificá el comprobante' : 'Subí el comprobante'}
                                <Icon color="action" className={classes.pictureIcon}>cloud_upload</Icon>
                            </Button>
                        </label>
                    </div>
                </div>

                <span className="w-full block text-22 mt-12">
                    Canjes
                </span>


            </DialogTitle>
            <DialogContent className='flex-col'>
                <div className={clsx("flex", 'w-full')}>
                    <div className={"flex-col w-full"}>
                        <div className="flex flex-row flex-1 flex-shrink-0 mb-3">
                            <List className={classes.root}>
                                {historyInfo.cards && historyInfo.cards.map(card =>  {
                                    return card.used_on_product ? (
                                            <div key={'list_card' + card.id}>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt={card.used_on_product.name} src={card.used_on_product.pictureUrl} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={'Código: ' + card.number}
                                                        secondary={
                                                            <React.Fragment>
                                                                {card.custom_number ? (
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.block}
                                                                        color="textPrimary"
                                                                    >
                                                                        {'Código Alt.: ' + card.custom_number}
                                                                    </Typography>
                                                                ) : null}
                                                                {card.cvv ? (
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.block}
                                                                        color="textPrimary"
                                                                    >
                                                                        {'CVV: ' + card.cvv}
                                                                    </Typography>
                                                                ) : null}
                                                                {card.valid_from ? (
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.block}
                                                                        color="textPrimary"
                                                                    >
                                                                        {'Vencimiento:  Del ' + card.valid_from + ' al ' + card.valid_thru}
                                                                    </Typography>
                                                                ) : null}
                                                                {card.date_used ? (
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.block}
                                                                        color="textPrimary"
                                                                    >
                                                                        {'F. Uso: ' + card.date_used}
                                                                    </Typography>
                                                                ) : null}
                                                                {card.user ? (
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.block}
                                                                        color="textPrimary"
                                                                    >
                                                                        { card.user.name + ' ' + card.user.lastname}
                                                                    </Typography>
                                                                ) : null}
                                                                {card.user ? (
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.block}
                                                                        color="textPrimary"
                                                                    >
                                                                        { card.user.email}
                                                                    </Typography>
                                                                ) : null}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </div>
                                        ) : null}
                                    )}
                            </List>
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

export default HistoryDetailModal;
