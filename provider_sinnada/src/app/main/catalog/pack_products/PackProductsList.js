import React, {useEffect} from 'react';
import {Typography, IconButton, Avatar, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/catalog/store/actions';

function PackProductsList({openDeleteAlertHandler, pack_id}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({CatalogApp}) => CatalogApp.pack_product.entities);
    const page = useSelector(({CatalogApp}) => CatalogApp.pack_product.page);
    const loading = useSelector(({CatalogApp}) => CatalogApp.pack_product.loading);

    useEffect(() => {
        dispatch(Actions.loadingPackProducts(true));
        dispatch(Actions.getPackProducts(pack_id, page));
    }, [pack_id]);


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
        dispatch(Actions.getPackProducts(pack_id, new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changePackProductsPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changePackProductsPage(new_page));
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
                        Header    : "Pack",
                        accessor  : "pack.name",
                        filterable: true,
                        sortable : false,
                        width    : 200,
                        className: "justify-center",
                    },
                    {
                        Header    : "Prestador",
                        accessor  : "product_with_provider.provider.name",
                        filterable: false,
                        sortable : false,
                        width    : 200,
                        className: "justify-center",
                    },
                    {
                        Header    : "Producto",
                        accessor  : "product_with_provider.name",
                        filterable: true
                    },
                    {
                        Header    : "Descripción",
                        accessor  : "product_with_provider.short_description",
                        filterable: true
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

export default PackProductsList;
