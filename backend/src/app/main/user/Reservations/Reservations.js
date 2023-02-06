import React, {useEffect} from 'react';
import {Typography, IconButton, Icon, Avatar, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/user/store/actions';

function Reservations({openDeleteAlertHandler, openDetailModalHandler}) {

    const dispatch = useDispatch();
    const reservations = useSelector(({CardApp}) => CardApp.reservations.entities);
    const page = useSelector(({CardApp}) => CardApp.reservations.page);
    const loading = useSelector(({CardApp}) => CardApp.reservations.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
        dispatch(Actions.loadingReservations(true));
        dispatch(Actions.getReservations(page));
    }, []);

    if (!reservations || loading ) {
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
        dispatch(Actions.getUserLists(new_page));
    }

    // function filteredChanged(filtered) {
    //     let new_page = {...page}
    //     new_page.filters = filtered;
    //     dispatch(Actions.changeReservationsPage(new_page));
    // }
    //
    // function sortChanged(sort) {
    //     let new_page = {...page}
    //     new_page.sort = sort[0];
    //     dispatch(Actions.changeReservationsPage(new_page));
    // }


    if(redirectTo){
        return <Redirect to={redirectTo}/>;
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2"
                data={reservations}
                pages={page.last_page}
                pageSizeOptions={[page.per_page]}
                manual={true}
                columns={[
                    {
                        Header    : "id",
                        accessor  : "number",
                        filterable: true,
                        sortable : true,
                    },
                    {
                        Header    : "card_code",
                        accessor  : "card_code",
                        filterable: true,
                        sortable : true,
                    },
                    {
                        Header    : "custom_number",
                        accessor  : "custom_number",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "experience_selected",
                        accessor  : "experience_selected",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "recommended_people",
                        accessor  : "recommended_people",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "reservation_name",
                        accessor  : "reservation_name",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "contact_phone",
                        accessor  : "contact_phone",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "observations",
                        accessor  : "observations",
                        // Cell     : row => {
                        //     if(row.original.order_item && row.original.order_item.pack){
                        //         return (
                        //             <Typography>{row.original.order_item.pack.name}</Typography>
                        //         )
                        //     }
                        //     return null;
                        //
                        // },
                        filterable: false,
                        sortable : false,
                        className: "justify-center",
                        width    : 140,
                    },
                    {
                        Header    : "reservation_date",
                        accessor  : "reservation_date",
                        // Cell     : row => {
                        //     if(row.original.order_item){
                        //         return (
                        //             <Typography>$ {row.original.order_item.item_price / row.original.order_item.quantity}</Typography>
                        //         )
                        //     }
                        //     return null;
                        //
                        // },
                        filterable: true,
                        sortable : false,
                        className: "justify-center",
                        width    : 120,
                    },
                    {
                        Header    : "date_activated",
                        accessor  : "date_activated",
                        // Cell     : row => {
                        //     return (
                        //         <Typography>$ {row.value}</Typography>
                        //     )
                        // },
                        filterable: true,
                        sortable : false,
                        className: "justify-center",
                        width    : 120,
                    },
                    {
                        Header    : "status",
                        accessor  : "status",
                        // Cell     : row => {
                        //     return (
                        //         <Typography>{(row.original.provider_transaction && row.original.provider_transaction.paid) ? 'Abonada' : 'Pendiente'}</Typography>
                        //     )
                        // },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 120,
                    },
                    {
                        Header    : "created_at",
                        accessor  : "created_at",
                        // Cell     : row => {
                        //     return (
                        //         <Typography>{row.original.provider_transaction_id ? row.value : ''}</Typography>
                        //     )
                        // },
                        filterable: true,
                        sortable : false,
                        className: "justify-center",
                        width    : 150,
                    },
                    {
                        Header    : "updated_at",
                        accessor  : "updated_at",
                        // Cell     : row => {
                        //     return (
                        //         <Typography>{row.original.provider_transaction_id ? row.value : ''}</Typography>
                        //     )
                        // },
                        filterable: true,
                        sortable : false,
                        className: "justify-center",
                        width    : 120,
                    },
                    // {
                    //     Header    : "Factura",
                    //     accessor  : "provider_transaction.reference_id",
                    //     Cell     : row => {
                    //         return (
                    //             <Typography>{(row.original.provider_transaction && row.original.provider_transaction.reference_file && row.original.provider_transaction.reference_id) ? row.value : 'Pendiente'}</Typography>
                    //         )
                    //     },
                    //     filterable: true,
                    //     sortable : false,
                    //     className: "justify-center",
                    //     width    : 120,
                    // },
                    // {
                    //     Header    : "Fac..",
                    //     accessor  : "",
                    //     Cell     : row => {
                    //         if(row.original.provider_transaction ){
                    //             return (
                    //                 <Tooltip title="Descargar Factura">
                    //                     <IconButton size='small' aria-label="Descargar" onClick={() => {
                    //                         window.open(row.original.provider_transaction.referenceFileUrl, "_blank")
                    //                     }}>
                    //                         <Icon color="action" className="text-20">cloud_download</Icon>
                    //                     </IconButton>
                    //                 </Tooltip>
                    //             );
                    //         }
                    //         return null;
                    //     },
                    //     filterable: false,
                    //     sortable : false,
                    //     className: "justify-center",
                    //     width    : 60,
                    // },
                    //
                    // {
                    //     Header    : "Comp",
                    //     accessor  : "",
                    //     Cell     : row => {
                    //         if(row.original.provider_transaction && row.original.provider_transaction.transaction_file ){
                    //             return (
                    //                 <Tooltip title="Descargar Comprobante">
                    //                     <IconButton size='small' aria-label="Descargar" onClick={() => {
                    //                         window.open(row.original.provider_transaction.transactionFileUrl, "_blank")
                    //                     }}>
                    //                         <Icon color="action" className="text-20">cloud_download</Icon>
                    //                     </IconButton>
                    //                 </Tooltip>
                    //             );
                    //         }
                    //         return null;
                    //     },
                    //     filterable: false,
                    //     sortable : false,
                    //     className: "justify-center",
                    //     width    : 60,
                    // },
                ]}
                defaultPageSize={reservations.length === 0 ? 5 : reservations.length}
                noDataText="No hay items para mostrar"
                loading={loading}
                onFetchData={fetchData}
                // onFilteredChange={filteredChanged}
                // onSortedChange={sortChanged}
            />
        </FuseAnimate>
    );
}

export default Reservations;
