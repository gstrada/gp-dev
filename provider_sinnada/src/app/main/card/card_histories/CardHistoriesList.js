import React, {useEffect} from 'react';
import {Typography, IconButton, Icon, Avatar, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/card/store/actions';

function CardHistoriesList({openDeleteAlertHandler, openDetailModalHandler}) {

    const dispatch = useDispatch();
    const card = useSelector(({CardApp}) => CardApp.card_history.entities);
    const page = useSelector(({CardApp}) => CardApp.card_history.page);
    const loading = useSelector(({CardApp}) => CardApp.card_history.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
            dispatch(Actions.loadingCardHistories(true));
            dispatch(Actions.getCardHistories(page));
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
        dispatch(Actions.getCardHistories(new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeCardHistoriesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeCardHistoriesPage(new_page));
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
                        Header    : "Precio",
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
                                <Typography>{row.value} %</Typography>
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
                                <Typography>{(row.original.provider_transaction && row.original.provider_transaction.paid) ? 'Abonada' : 'Pendiente'}</Typography>
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
                                <Typography>{row.original.provider_transaction_id ? row.value : ''}</Typography>
                            )
                        },
                        filterable: true,
                        sortable : false,
                        className: "justify-center",
                        width    : 150,
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
                        Header    : "Fac..",
                        accessor  : "",
                        Cell     : row => {
                            if(row.original.provider_transaction ){
                                return (
                                    <Tooltip title="Descargar Factura">
                                        <IconButton size='small' aria-label="Descargar" onClick={() => {
                                            window.open(row.original.provider_transaction.referenceFileUrl, "_blank")
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
                        Header    : "Comp",
                        accessor  : "",
                        Cell     : row => {
                            if(row.original.provider_transaction && row.original.provider_transaction.transaction_file ){
                                return (
                                    <Tooltip title="Descargar Comprobante">
                                        <IconButton size='small' aria-label="Descargar" onClick={() => {
                                            window.open(row.original.provider_transaction.transactionFileUrl, "_blank")
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

export default CardHistoriesList;
