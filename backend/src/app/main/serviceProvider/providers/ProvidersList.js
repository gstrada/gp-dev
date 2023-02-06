import React, {useEffect} from 'react';
import {Typography, IconButton, Icon, Avatar, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/serviceProvider/store/actions';

function ProvidersList({openDeleteAlertHandler, openDetailModalHandler}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({ProviderApp}) => ProviderApp.provider.entities);
    const page = useSelector(({ProviderApp}) => ProviderApp.provider.page);
    const loading = useSelector(({ProviderApp}) => ProviderApp.provider.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
            dispatch(Actions.loadingProviders(true));
            dispatch(Actions.getProviders(page));
    }, []);

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
        dispatch(Actions.getProviders(new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeProvidersPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeProvidersPage(new_page));
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
                //         if(col.id !== 'remove_column' && col.id !== 'edit_column' ){
                //             if ( row ) {
                //                setRedirectTo('/service_provider/states/' + row.original.id);
                //             }
                //         }
                //     }
                // })}
                columns={[
                    {
                        accessor : "logoUrl",
                        Cell     : row => (
                            <Avatar alt={row.original.name} src={row.value} className='w-24 h-24'/>
                        ),
                        className: "justify-center",
                        width    : 50,
                        sortable : false
                    },
                    {
                        Header    : "Nombre",
                        accessor  : "name",
                        filterable: true,
                        sortable : true,
                        width    : 250,
                    },
                    {
                        Header    : "Nombre de Contacto",
                        accessor  : "internal_contact_name",
                        filterable: true,
                        sortable : true,
                    },
                    {
                        Header    : "Email de Contacto",
                        accessor  : "internal_contact_email",
                        filterable: true,
                        sortable : true,
                    },
                    {
                        Header    : "Teléfono de Contacto",
                        accessor  : "internal_contact_phone",
                        filterable: true,
                        sortable : true,
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
                        id:'users',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Usuarios">
                                    <IconButton size='small' aria-label="redirect" onClick={() => {
                                        setRedirectTo('/service-provider/users/' + row.original.id);
                                    }}>
                                        <Icon color="action" className="text-20">supervised_user_circle</Icon>
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
                        id:'open_addresses',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Direcciones">
                                    <IconButton size='small' aria-label="redirect" onClick={() => {
                                        setRedirectTo('/service-provider/addresses/' + row.original.id);
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

export default ProvidersList;
