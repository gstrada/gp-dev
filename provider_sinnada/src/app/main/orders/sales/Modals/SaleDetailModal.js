import React from 'react';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    Select
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {buildAddressString} from "../../../../helpers/helpers";
import * as Actions from 'app/main/orders/store/actions';

function SaleDetailModal({item, open, closeHandler}) {
    const dispatch = useDispatch();
    const [status, setStatus] = React.useState( (item ? item.status : null));

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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">
                <div className={"flex flex-col flex-1 flex-shrink-0 md:flex-row"}>
                    <Typography variant='h6' className="sm:w-auto md:w-4/6">
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
                        Producto
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.retail_part.part.product }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Pieza
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.part_brand + ' ' + item.part_code}
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Cantidad
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.quantity }
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Precio
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.price }
                    </Typography>
                </div>

                <Divider className="mt-5 mb-5"/>

                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Cliente
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.buyer.name}
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Teléfono
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.buyer.phone}
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Email
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { item.buyer.email}
                    </Typography>
                </div>
                <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0 mt-3 mb-3"}>
                    <Typography variant='caption' className="sm:w-auto md:w-1/6">
                        Dirección
                    </Typography>
                    <Typography variant='body1' className="sm:w-auto md:w-5/6 font-bold">
                        { buildAddressString(item.buyer.information)}
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
                        <MenuItem value="waiting_for_stock">Confirmado en espera de stock</MenuItem>
                        <MenuItem value="dismissed">Rechazado</MenuItem>
                        <MenuItem value="pending">Pendiente</MenuItem>
                    </Select>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
                {item.status !== status ? (
                    <Button onClick={handleSubmit} color="primary">
                        Modificar
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}

export default SaleDetailModal;