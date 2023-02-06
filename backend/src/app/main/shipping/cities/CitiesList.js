import React, {useEffect} from 'react';
import {Typography, IconButton, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/shipping/store/actions';

function CitiesList({openDeleteAlertHandler, openDetailModalHandler, carrier_state_id}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({ShippingApp}) => ShippingApp.city.entities);
    const page = useSelector(({ShippingApp}) => ShippingApp.city.page);
    const loading = useSelector(({ShippingApp}) => ShippingApp.city.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
        dispatch(Actions.loadingCities(true));
        dispatch(Actions.getCities(carrier_state_id, page));
    }, [carrier_state_id]);


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
        dispatch(Actions.getCities(carrier_state_id, new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeCitiesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeCitiesPage(new_page));
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
                        accessor  : "city_with_state.state.name",
                        filterable: false,
                        sortable:false,
                    },
                    {
                        Header    : "Ciudad",
                        accessor  : "city_with_state.name",
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

export default CitiesList;
