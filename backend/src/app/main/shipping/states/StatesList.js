import React, {useEffect} from 'react';
import {Typography, IconButton, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/shipping/store/actions';

function StatesList({openDeleteAlertHandler, openDetailModalHandler, carrier_id}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({ShippingApp}) => ShippingApp.state.entities);
    const page = useSelector(({ShippingApp}) => ShippingApp.state.page);
    const loading = useSelector(({ShippingApp}) => ShippingApp.state.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
        dispatch(Actions.loadingStates(true));
        dispatch(Actions.getStates(carrier_id, page));
    }, [carrier_id]);


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
        dispatch(Actions.getStates(carrier_id, new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeStatesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeStatesPage(new_page));
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
                        Header    : "Método de envío",
                        accessor  : "carrier.name",
                        filterable: false,
                        sortable:false,
                        width    : 200,
                        className: "justify-center",
                    },
                    {
                        Header    : "Provincia",
                        accessor  : "state.name",
                        filterable: true
                    },
                    {
                        Header    : "Precio",
                        accessor  : "price",
                        filterable: false,
                        className: "justify-center",
                        width    : 100,
                    },
                    {
                        id:'free_if_order_above',
                        Header    : "Gratis desde",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Typography>{row.value.free_if_order_above ? row.value.free_if_order_above : 'Sin Asignar'}</Typography>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 100,
                    },
                    {
                        id:'enabled_for_all_subitems',
                        Header    : "Habilitado para Todas las Ciudades",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Typography>{row.value.enabled_for_all_subitems ? 'SI' : 'NO'}</Typography>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 300,
                    },
                    {
                        Header   : "Habilitado",
                        accessor  : "",
                        Cell     : row => {
                            return (
                                <Typography>{row.value.enabled ? 'SI' : 'NO'}</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 80,
                    },
                    {
                        id:'open_addresses',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Ciudades">
                                    <IconButton size='small' aria-label="redirect" onClick={() => {
                                        setRedirectTo('/shipping/cities/' + row.original.carrier_id + '/'+ row.original.id);
                                    }}>
                                        <Icon color="action" className="text-20">pin_drop</Icon>
                                    </IconButton>
                                </Tooltip>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 60,
                    },
                    {
                        id:'edit_column',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Editar">
                                    <IconButton size='small' aria-label="Edit" onClick={() => {
                                        openDetailModalHandler(row.value);
                                    }}>
                                        <Icon color="action" className="text-20">edit</Icon>
                                    </IconButton>
                                </Tooltip>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 60,
                    },
                    {
                        id:'remove_column',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Eliminar">
                                    <IconButton size='small' aria-label="Delete" onClick={() => {
                                        openDeleteAlertHandler(row.value);
                                    }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 60,
                    },
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

export default StatesList;
