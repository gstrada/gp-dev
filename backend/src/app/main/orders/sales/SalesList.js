import React, {useEffect, useState} from 'react';
import {Typography, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/orders/store/actions';

function SalesList({openModalHandler, status}) {

    const dispatch = useDispatch();
    const sales = useSelector(({OrderApp}) => OrderApp.sales.entities);
    const loading = useSelector(({OrderApp}) => OrderApp.sales.loading);
    const page = useSelector(({OrderApp}) => OrderApp.sales.page);

    useEffect(() => {
        dispatch(Actions.loadingSales(true));
        dispatch(Actions.getSales(page, status));
    }, [status]);

    if (!sales || loading ) {
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
        let new_page = {...page};
        new_page.current_page = table_page;
        dispatch(Actions.getSales(new_page, status));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeSalesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeSalesPage(new_page));
    }


    function handleOpenModal(item) {
        openModalHandler(item);
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2"
                pages={page.last_page}
                pageSizeOptions={[page.per_page]}
                manual={true}
                data={sales}
                columns={[
                    {
                        Header   : "ID Orden",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {String(row.original.id).padStart(8, '0')}
                                </Typography>
                            );
                        },
                        className: "justify-center",
                        filterable: true,
                        sortable : true,
                    },
                    {
                        Header   : "Nombre",
                        accessor : "user.name",
                        filterable: true,
                        sortable : true,
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {row.original.user ? row.original.user.name : ''}
                                </Typography>
                            );
                        },
                    },
                    {
                        Header   : "Apellido",
                        accessor : "user.lastname",
                        filterable: true,
                        sortable : true,
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {row.original.user ? row.original.user.lastname : ''}
                                </Typography>
                            );
                        },
                    },
                    {
                        Header   : "Email",
                        accessor : "user.email",
                        filterable: true,
                        sortable : true,
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {row.original.user ? row.original.user.email : ''}
                                </Typography>
                            );
                        },
                        width: 300
                    },
                    {
                        Header    : "M. Pago",
                        accessor  : "payment.name",
                        filterable: true,
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {row.original.payment ? row.original.payment.name : 'Sin Especificar'}
                                </Typography>
                            );
                        },
                    },
                    {
                        Header   : "Total",
                        accessor : "amount_to_pay",
                        filterable: true,
                        sortable : true,
                        className: "justify-center",
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    $ {row.original.amount_to_pay}
                                </Typography>
                            );
                        },
                        width: 100
                    },
                    {
                        Header   : "Fecha",
                        accessor : "created_at",
                        filterable: true,
                        sortable : true,
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {row.original.created_at ? row.original.created_at : ''}
                                </Typography>
                            );
                        },
                    },
                    {
                        Header   : "Tipo",
                        accessor : "delivery_mode",
                        filterable: false,
                        sortable : false,
                        Cell     : row => {
                            return (
                                <Typography variant='caption'>
                                    {row.original.delivery_mode ? row.original.delivery_mode : ''}
                                </Typography>
                            );
                        },
                        width: 100
                    },
                    {
                        Header   : "Acciones",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Button size="small" color="secondary"  onClick={(e) => handleOpenModal(row.original)}>
                                    Ver Más
                                </Button>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 150,
                    },
                ]}
                defaultPageSize={sales.length === 0 ? 5 : sales.length}
                noDataText="No hay items para mostrar"
                loading={loading}
                onFetchData={fetchData}
                onFilteredChange={filteredChanged}
                onSortedChange={sortChanged}
            />
        </FuseAnimate>
    );
}

export default SalesList;
