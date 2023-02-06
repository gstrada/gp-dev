import React, {useEffect} from 'react';
import {Typography, IconButton, Avatar, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/serviceProvider/store/actions';

function AddressesList({openDeleteAlertHandler, openDetailModalHandler, provider_id}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({ProviderApp}) => ProviderApp.address.entities);
    const page = useSelector(({ProviderApp}) => ProviderApp.address.page);
    const loading = useSelector(({ProviderApp}) => ProviderApp.address.loading);

    useEffect(() => {
        dispatch(Actions.loadingAddresses(true));
        dispatch(Actions.getAddresses(provider_id, page));
    }, [provider_id]);


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
        dispatch(Actions.getAddresses(provider_id, new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeAddressesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeAddressesPage(new_page));
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
                        filterable: false,
                        sortable : false,
                        width    : 200,
                        className: "justify-center",
                    },
                    {
                        Header    : "Provincia",
                        accessor  : "state.name",
                        filterable: true
                    },
                    {
                        Header    : "Ciudad",
                        accessor  : "city.name",
                        filterable: true
                    },
                    {
                        Header    : "Dirección",
                        accessor  : "address",
                        filterable: true
                    },
                    {
                        Header    : "Teléfono",
                        accessor  : "phone",
                        filterable: true,
                        className: "justify-center",
                    },
                    {
                        Header    : "Email",
                        accessor  : "email",
                        filterable: true,
                        className: "justify-center",
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

export default AddressesList;
