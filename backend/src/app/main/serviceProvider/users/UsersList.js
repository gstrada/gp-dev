import React, {useEffect} from 'react';
import {Typography, IconButton, Avatar, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/serviceProvider/store/actions';

function UsersList({openDeleteAlertHandler, provider_id}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({ProviderApp}) => ProviderApp.user.entities);
    const page = useSelector(({ProviderApp}) => ProviderApp.user.page);
    const loading = useSelector(({ProviderApp}) => ProviderApp.user.loading);

    useEffect(() => {
        dispatch(Actions.loadingUsers(true));
        dispatch(Actions.getUsers(provider_id, page));
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
        dispatch(Actions.getUsers(provider_id, new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeUsersPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeUsersPage(new_page));
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2"
                data={catalog}
                pages={page.last_page}
                pageSizeOptions={[page.per_page]}
                manual={true}
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
                        Header    : "Nombre",
                        accessor  : "name",
                        filterable: true
                    },
                    {
                        Header    : "Apellido",
                        accessor  : "lastname",
                        filterable: true
                    },
                    {
                        Header    : "Email",
                        accessor  : "email",
                        filterable: true,
                        className: "justify-center",
                    },
                    {
                        Header   : "Rol",
                        accessor  : "",
                        Cell     : row => {
                            if(row.value.provider_role === 'admin'){
                                return (
                                    <Typography>Adminsitrador</Typography>
                                )
                            }
                            if(row.value.provider_role === 'editor'){
                                return (
                                    <Typography>Editor</Typography>
                                )
                            }
                            if(row.value.provider_role === 'verifier'){
                                return (
                                    <Typography>Verificador</Typography>
                                )
                            }
                            if(row.value.provider_role === 'accountant'){
                                return (
                                    <Typography>Contador</Typography>
                                )
                            }
                            return (
                                <Typography>Sin Asignar</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
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

export default UsersList;
