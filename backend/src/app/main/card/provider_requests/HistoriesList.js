import React, {useEffect} from 'react';
import {Typography, IconButton, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/card/store/actions';

function HistoriesList({openDeleteAlertHandler, openDetailModalHandler, status}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({CardApp}) => CardApp.history.entities);
    const page = useSelector(({CardApp}) => CardApp.history.page);
    const loading = useSelector(({CardApp}) => CardApp.history.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);


    useEffect(() => {
        dispatch(Actions.changeHistoriesStatus(status));
        dispatch(Actions.loadingHistories(true));
        dispatch(Actions.getHistories(page,status));
    }, [status]);


    if (!catalog || loading ) {
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
        dispatch(Actions.getHistories(new_page, status));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeHistoriesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeHistoriesPage(new_page));
    }

    if(redirectTo){
        return <Redirect to={redirectTo}/>;
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2"
                data={catalog}
                pages={page.last_page}
                pageSizeOptions={[page.per_page]}
                manual={true}
                // getTdProps={(state, row, col, instance) => ({
                //     onClick: () => {
                //         if(col.id !== 'remove_column' ){
                //             if ( row ) {
                //                 openDetailModalHandler(row.original);
                //             }
                //         }
                //     }
                // })}
                columns={[
                    {
                        Header    : "Prestador",
                        accessor  : "provider.name",
                        filterable: true,
                        sortable:false,
                        className: "justify-center",
                    },
                    {
                        Header    : "Referencia",
                        accessor  : "reference_id",
                        filterable: true,
                        sortable:false,
                        width    : 300,
                    },
                    {
                        Header    : "Monto a Pagar",
                        accessor  : "amount",
                        filterable: false,
                        sortable:false,
                        width    : 140,
                    },
                    {
                        Header   : "Pagado",
                        accessor  : "paid",
                        Cell     : row => {
                            return (
                                <Typography>{row.value ? 'SI' : 'NO'}</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: true,
                        sortable : true,
                        width    : 80,
                    },
                    {
                        Header   : "Eliminado",
                        accessor  : "removed",
                        Cell     : row => {
                            return (
                                <Typography>{row.value ? 'SI' : 'NO'}</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: true,
                        sortable : false,
                        width    : 80,
                    },
                    {
                        Header    : "Fecha de Pago",
                        accessor  : "date_paid",
                        filterable: true,
                        className: "justify-center",
                    },
                    {
                        Header    : "Fecha de Creación",
                        accessor  : "created_at",
                        filterable: true,
                        className: "justify-center",
                    },
                    {
                        id:'detail__column',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Detalles">
                                    <IconButton size='small' aria-label="Detalles" onClick={() => {
                                        openDetailModalHandler(row.value);
                                    }}>
                                        <Icon color="action" className="text-20">remove_red_eye</Icon>
                                    </IconButton>
                                </Tooltip>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 60,
                    },
                    // {
                    //     id:'remove_column',
                    //     Header   : "",
                    //     accessor : "",
                    //     Cell     : row => {
                    //         return (
                    //             <Tooltip title="Eliminar">
                    //                 <IconButton size='small' aria-label="Delete" onClick={() => {
                    //                     openDeleteAlertHandler(row.value);
                    //                 }}>
                    //                     <DeleteIcon fontSize="small" />
                    //                 </IconButton>
                    //             </Tooltip>
                    //         );
                    //     },
                    //     className: "justify-center",
                    //     filterable: false,
                    //     sortable : false,
                    //     width    : 60,
                    // },
                ]}
                defaultPageSize={catalog.length === 0 ? 5 : catalog.length}
                noDataText="No hay items para mostrar"
                loading={loading}
                onFetchData={fetchData}
                onFilteredChange={filteredChanged}
                onSortedChange={sortChanged}
            />
        </FuseAnimate>
    );
}

export default HistoriesList;
