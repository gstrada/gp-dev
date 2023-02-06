import React, {useEffect} from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    Select,
    Slide
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {buildAddressString} from "../../../../helpers/helpers";
import * as Actions from 'app/main/orders/store/actions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


function SaleDetailModal({item, open, closeHandler}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [status, setStatus] = React.useState( (item ? item.status : null));

    useEffect(() => {
        setStatus(item ? item.status : null);
    }, [item]);

    const handleInputChange = e => {
        const {value} = e.target;
        setStatus(value)
    };

    function handleClose() {
        closeHandler();
    }

    function handleSubmit() {
        dispatch(Actions.updateSaleStatus(item.id ,status));
        closeHandler();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} fullScreen TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Detalle de la Orden  #{String(item.id).padStart(8, '0')}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>

            <DialogTitle id="form-dialog-title">
                <div className={"flex flex-col flex-1 flex-shrink-0 md:flex-row"}>
                    <Typography variant='h6' className="sm:w-auto md:w-5/6">
                        Detalle del pedido #{item.id}
                    </Typography>
                    <Typography variant='body1' color='secondary' className="sm:w-auto md:w-2/6 text-right pt-2">
                        {item.created_at}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Tipo de Orden
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.delivery_mode }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Nombre
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.user.name + ' ' + item.user.lastname}
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Email
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.user.email }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Forma de Pago
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.payment ? item.payment.name  : 'Sin Especificar' }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Precio
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        $ { item.amount_to_pay }
                    </Typography>
                </div>

                <Divider className="mt-5 mb-5"/>

                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Dirección de Facturación
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.full_billing_address }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Teléfono de Facturación
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.billing_phone}
                    </Typography>
                </div>


                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Dirección de Envío
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.full_shipping_address }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Teléfono de Envío
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.shipping_phone}
                    </Typography>
                </div>

                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Nota para el Envío
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.shipping_note}
                    </Typography>
                </div>

                <Divider className="mt-10 mb-5"/>

                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Estado
                    </Typography>
                    <Select
                        fullWidth
                        value={status}
                        onChange={handleInputChange}
                        inputProps={{
                            name: 'state',
                            id: 'state_selector',
                        }}
                        className="sm:w-auto md:w-5/6 font-bold"
                    >
                        <MenuItem value="confirmed">Confirmado</MenuItem>
                        <MenuItem value="dismissed">Rechazado</MenuItem>
                        <MenuItem value="pending">Pendiente</MenuItem>
                    </Select>
                </div>

                <Divider className="mt-10 mb-5"/>

                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Items
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6"/>
                    {item.items && item.items.map(data => (
                        <Typography variant='body1' className="sm:w-auto md:w-4/6 font-bold" key={'country_'+data.id}>
                            {data.name} {data.typeName} x {data.quantity}
                        </Typography>
                    ))}
                </div>




            </DialogContent>
        </Dialog>
    );
}

export default SaleDetailModal;
