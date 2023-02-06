import React, {useEffect, useRef} from 'react';
import {Typography, IconButton, Icon, Avatar, Tooltip, makeStyles, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/card/store/actions';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from 'clsx';

import * as GlobalActions from 'app/store/actions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
        flexFlow: 'column',
        height: '100%'
    },

    rootHeader: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        marginTop: 20,
        marginBottom: 20,
        marginLeft:20,
        marginRight: 20,
    },

    rootContent: {
        display: 'block',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
    },


    table:{
        height: '100%'
    },

    inputStyle:{
        background: '#75b9e7',
        color: '#FFFFFF',
        '&:hover': {
            background: '#75b9e7',
            color: '#000000',
        },
    },

    inputStyleHighlight:{
        background: '#36a555',
        color: '#FFFFFF',
        '&:hover': {
            background: '#36a555',
            color: '#FFFFFF',
        },
        '&:active': {
            background: '#36a555',
        },
    },

    icon:{
        color: '#FFFFFF',
    },

    inputAdornment:{
        color: '#FFFFFF',
    },

    labelStyle:{
        fontsize: 14,
        color: '#FFFFFF',
    },

    labelStyleHighlight:{
        fontsize: 14,
        color: '#FFFFFF',
    },

    textField: {
        marginTop: 20,
        width: 200,
        margin: theme.spacing(1),

        '&:disabled': {
            background: '#75b9e7',
        },
    },
    invoiceInput : {
        display: 'none'
    },
    invoiceButton: {
        fontSize: 12,
        fontWeight: 'bold',
        height: 56,
        marginTop: 20,
        marginLeft: 8,
        marginRight: 8,
        background: '#36a555',
        color: '#FFFFFF',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    invoiceIcon: {
        color: '#FFFFFF',
        marginLeft: theme.spacing(1),
    },

    submitButton: {
        fontSize: 12,
        fontWeight: 'bold',
        height: 56,
        marginTop: 20,
        marginLeft: 8,
        marginRight: 8,
        background: '#b6e74f',
        color: '#525252',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

function CardPaymentRequestsList({openDeleteAlertHandler, openDetailModalHandler}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let fileInput = useRef(null);

    const card = useSelector(({CardApp}) => CardApp.payment_request.entities);
    const info = useSelector(({CardApp}) => CardApp.payment_request.info);
    const page = useSelector(({CardApp}) => CardApp.payment_request.page);
    const loading = useSelector(({CardApp}) => CardApp.payment_request.loading);


    const [redirectTo, setRedirectTo] = React.useState(null);

    const [invoice_number, setInvoiceNumber] = React.useState('');
    const [invoice_file, setInvoiceFile] = React.useState(null);

    useEffect(() => {
        dispatch(Actions.loadingCardPaymentHistories(true));
        dispatch(Actions.getCardPaymentRequests(page));
        dispatch(Actions.getPayment());
    }, []);


    if (!card || !info || loading ) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    Cargando
                </Typography>
            </div>
        );
    }

    if(info.total_cards === 0){
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    No hay tarjetas pendientes de pago
                </Typography>
            </div>
        );
    }

    function fetchData(state, table) {
        let table_page = state.page + 1;
        let new_page = {...page}
        new_page.current_page = table_page;
        dispatch(Actions.getCardPaymentRequests(new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.getCardPaymentRequests(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.getCardPaymentRequests(new_page));
    }

    const handleInputChange = e => {
        let {value} = e.target;
        setInvoiceNumber(value);
    };

    function handleFileChange(event){
        if(event.target && event.target.files && event.target.files[0]){
            setInvoiceFile(event.target.files[0]);
        }
        fileInput.value = null;
    }

    const submitForm = () => {
        if(invoice_number.length === 0){
            dispatch(GlobalActions.showMessage({message:'El Número de Factura es requerido', variant: 'error'}));
        }else{
            if(!invoice_file){
                dispatch(GlobalActions.showMessage({message:'La Factura es requerida', variant: 'error'}));
            }else{
                dispatch(Actions.requestPayment(invoice_number, invoice_file));

            }
        }

    };


    if(redirectTo){
        return <Redirect to={redirectTo}/>;
    }

    return (
        <div className={classes.root}>
            <div className={classes.rootHeader}>
                <TextField
                    label="Cantidad de Tarjetas"
                    id="filled-start-adornment"
                    className={classes.textField}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" className={classes.inputAdornment}><Icon color="action" className={classes.icon}>credit_card</Icon></InputAdornment>,
                        className: classes.inputStyle,
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        className: classes.labelStyle
                    }}
                    value={info.total_cards}
                    variant="filled"
                    readOnly={true}
                />
                <TextField
                    label="Monto a pagar"
                    id="filled-start-adornment"
                    className={classes.textField}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" className={classes.inputAdornment}><Icon color="action" className={classes.icon}>attach_money</Icon></InputAdornment>,
                        className: classes.inputStyle
                    }}
                    InputLabelProps={{
                        className: classes.labelStyle
                    }}
                    value={info.total_payment}
                    variant="filled"
                    readOnly={true}
                />
                <TextField
                    label="Número de Factura *"
                    id="filled-start-adornment"
                    className={classes.textField}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" className={classes.inputAdornment}><Icon color="action" className={classes.icon}>insert_drive_file</Icon></InputAdornment>,
                        className: classes.inputStyleHighlight
                    }}
                    InputLabelProps={{
                        className: classes.labelStyleHighlight
                    }}
                    value={invoice_number}
                    variant="filled"
                    onChange={handleInputChange}
                />

                <input
                    accept="*"
                    className={classes.invoiceInput}
                    id="invoice-upload-input"
                    type="file"
                    onChange={event => handleFileChange(event)}
                    ref={(input) => {
                        fileInput = input;
                    }}
                />

                <label htmlFor="invoice-upload-input">
                    <Button size="small" component="span"  variant="contained" color="default" className={classes.invoiceButton}>
                        Subí la factura
                        <Icon color="action" className={classes.invoiceIcon}>cloud_upload</Icon>
                    </Button>
                </label>

                <Button size="small" component="span"  variant="contained" color="default" className={classes.submitButton} onClick={submitForm}>
                    Solicitá el pago
                </Button>

            </div>
            <div className={classes.rootContent}>
                <ReactTable
                    className={clsx(classes.table, "-striped -highlight overflow-hidden pl-2")}
                    data={card}
                    pages={page.last_page}
                    pageSizeOptions={[page.per_page]}
                    manual={true}
                    // getTdProps={(state, row, col, instance) => ({
                    //     onClick: () => {
                    //         if(col.id !== 'remove_column' && col.id !== 'edit_column' ){
                    //             if ( row ) {
                    //                setRedirectTo('/card/states/' + row.original.id);
                    //             }
                    //         }
                    //     }
                    // })}
                    columns={[
                        {
                            Header    : "Código",
                            accessor  : "number",
                            filterable: true,
                            sortable : true,
                        },
                        {
                            Header    : "Código Impreso",
                            accessor  : "custom_number",
                            filterable: true,
                            sortable : true,
                        },
                        {
                            Header    : "Producto",
                            accessor  : "used_on_product.name",
                            filterable: true,
                            sortable : false,
                        },
                        {
                            Header    : "Monto de Pago",
                            accessor  : "used_on_product.internal_price",
                            Cell     : row => {
                                return (
                                    <Typography>$ {row.value}</Typography>
                                )
                            },
                            filterable: true,
                            sortable : false,
                            className: "justify-center",
                            width    : 120,
                        },
                        {
                            Header    : "Descuento",
                            accessor  : "used_on_product.internal_benefit_discount",
                            Cell     : row => {
                                return (
                                    <Typography>{row.value}%</Typography>
                                )
                            },
                            filterable: true,
                            sortable : false,
                            className: "justify-center",
                            width    : 120,
                        },
                        {
                            Header    : "Monto de Pago",
                            accessor  : "price_to_pay",
                            Cell     : row => {
                                return (
                                    <Typography>$ {row.value}</Typography>
                                )
                            },
                            filterable: true,
                            sortable : false,
                            className: "justify-center",
                            width    : 120,
                        },
                        {
                            Header    : "Estado de Pago",
                            accessor  : "",
                            Cell     : row => {
                                return (
                                    <Typography>{(row.original.provider_transaction && row.original.provider_transaction.paid) ? 'Abonado' : 'Pendiente'}</Typography>
                                )
                            },
                            className: "justify-center",
                            filterable: false,
                            sortable : false,
                            width    : 120,
                        },
                        {
                            Header    : "Fecha de Pago",
                            accessor  : "provider_transaction.date_paid",
                            Cell     : row => {
                                return (
                                    <Typography>{(row.original.provider_transaction && row.original.provider_transaction.paid) ? row.value : ''}</Typography>
                                )
                            },
                            filterable: true,
                            sortable : false,
                            className: "justify-center",
                            width    : 120,
                        },
                        {
                            Header    : "Ref. de Pago",
                            accessor  : "provider_transaction.id",
                            Cell     : row => {
                                return (
                                    <Typography>{row.original.provider_transaction_id ? row.value : ''}</Typography>
                                )
                            },
                            filterable: true,
                            sortable : false,
                            className: "justify-center",
                            width    : 120,
                        },
                        {
                            Header    : "Factura",
                            accessor  : "provider_transaction.reference_id",
                            Cell     : row => {
                                return (
                                    <Typography>{(row.original.provider_transaction && row.original.provider_transaction.reference_file && row.original.provider_transaction.reference_id) ? row.value : 'Pendiente'}</Typography>
                                )
                            },
                            filterable: true,
                            sortable : false,
                            className: "justify-center",
                            width    : 120,
                        },
                        {
                            Header    : "",
                            accessor  : "",
                            Cell     : row => {
                                if(row.original.provider_transaction_id ){
                                    return (
                                        <Tooltip title="Descargar">
                                            <IconButton size='small' aria-label="Descargar" onClick={() => {
                                                openDetailModalHandler(row.value);
                                            }}>
                                                <Icon color="action" className="text-20">cloud_download</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    );
                                }
                                return null;
                            },
                            filterable: false,
                            sortable : false,
                            className: "justify-center",
                            width    : 60,
                        },
                    ]}
                    defaultPageSize={card.length === 0 ? 5 : card.length}
                    noDataText="No hay items para mostrar"
                    loading={loading}
                    onFetchData={fetchData}
                    onFilteredChange={filteredChanged}
                    onSortedChange={sortChanged}
                />
            </div>
        </div>


    );
}

export default CardPaymentRequestsList;
