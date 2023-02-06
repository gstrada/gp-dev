import React, {useEffect} from 'react';
import {Typography, IconButton, Icon, Tooltip, makeStyles, Button} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/card/store/actions';


const useStyles = makeStyles(theme => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // flexFlow: 'column',
        // height: '100%'
    },

}));

function CardPaymentHistoriesList({openDeleteAlertHandler, openDetailModalHandler}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const card = useSelector(({CardApp}) => CardApp.payment_history.entities);
    const page = useSelector(({CardApp}) => CardApp.payment_history.page);
    const loading = useSelector(({CardApp}) => CardApp.payment_history.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
            dispatch(Actions.loadingCardPaymentHistories(true));
            dispatch(Actions.getCardPaymentHistories(page));
    }, []);

    if (!card || loading ) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    Cargando
                </Typography>
            </div>
        );
    }

    function fetchData(state, table) {
        let table_page = state.page + 1;
        let new_page = {...page}
        new_page.current_page = table_page;
        dispatch(Actions.getCardPaymentHistories(new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeCardPaymentHistoriesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeCardPaymentHistoriesPage(new_page));
    }

    if(redirectTo){
        return <Redirect to={redirectTo}/>;
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
        <ReactTable
            className="-striped -highlight h-full overflow-hidden pl-2"
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
                    Header    : "Factura",
                    accessor  : "reference_id",
                    Cell     : row => {
                        return (
                            <Typography>{(row.original.reference_file && row.original.reference_id) ? row.value : 'Pendiente'}</Typography>
                        )
                    },
                    filterable: true,
                    sortable : false,
                    className: "justify-center",
                },
                {
                    Header    : "Ref. de Pago",
                    accessor  : "id",
                    Cell     : row => {
                        return (
                            <Typography>{row.value}</Typography>
                        )
                    },
                    filterable: true,
                    sortable : false,
                    className: "justify-center",
                },
                {
                    Header    : "Fecha de Solicitud",
                    accessor  : "created_at",
                    Cell     : row => {
                        return (
                            <Typography>{ row.value }</Typography>
                        )
                    },
                    filterable: true,
                    sortable : false,
                    className: "justify-center",
                    // width    : 150,
                },
                {
                    Header    : "Monto de Pago",
                    accessor  : "amount",
                    Cell     : row => {
                        return (
                            <Typography>$ {row.value}</Typography>
                        )
                    },
                    filterable: true,
                    sortable : false,
                    className: "justify-center",
                    // width    : 120,
                },
                {
                    Header    : "Fecha de Pago",
                    accessor  : "date_paid",
                    Cell     : row => {
                        return (
                            <Typography>{ row.value }</Typography>
                        )
                    },
                    filterable: true,
                    sortable : false,
                    className: "justify-center",
                    // width    : 150,
                },
                {
                    Header    : "Estado de Pago",
                    accessor  : "paid",
                    Cell     : row => {
                        return (
                            <Typography>{row.value === 1 ? 'Abonado' : 'Pendiente'}</Typography>
                        )
                    },
                    className: "justify-center",
                    filterable: false,
                    sortable : false,
                    width    : 120,
                },

                {
                    Header    : "Fac.",
                    accessor  : "",
                    Cell     : row => {
                        if(row.original.reference_file ){
                            return (
                                <Tooltip title="Descargar Factura">
                                    <IconButton size='small' aria-label="Descargar Factura" onClick={() => {
                                        window.open(row.original.referenceFileUrl, "_blank")
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
                {
                    Header    : "Comp.",
                    accessor  : "",
                    Cell     : row => {
                        if(row.original.transaction_file ){
                            return (
                                <Tooltip title="Descargar Comprobante">
                                    <IconButton size='small' aria-label="Descargar Comprobante" onClick={() => {
                                        window.open(row.original.transactionFileUrl, "_blank")
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
        </FuseAnimate>

    );
}

export default CardPaymentHistoriesList;
