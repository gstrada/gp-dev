import React, {useEffect} from 'react';
import {Typography, IconButton, Avatar, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/catalog/store/actions';

function ProductAddressesList({openDeleteAlertHandler, product_id}) {

    const dispatch = useDispatch();
    const product_address = useSelector(({CatalogApp}) => CatalogApp.product_address.entities);
    const page = useSelector(({CatalogApp}) => CatalogApp.product_address.page);
    const loading = useSelector(({CatalogApp}) => CatalogApp.product_address.loading);

    useEffect(() => {
        dispatch(Actions.loadingProductAddresses(true));
        dispatch(Actions.getProductAddresses(product_id, page));
    }, [product_id]);


    if (!product_address || loading ) {
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
        dispatch(Actions.getProductAddresses(product_id, new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeProductAddressesPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeProductAddressesPage(new_page));
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2"
                data={product_address}
                pages={page.last_page}
                pageSizeOptions={[page.per_page]}
                manual={true}
                columns={[
                    {
                        Header    : "Producto",
                        accessor  : "product.name",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "Provincia",
                        accessor  : "address_with_provider_and_state.state.name",
                        filterable: true,
                        sortable : false,
                        className: "justify-center",
                    },
                    {
                        Header    : "Dirección",
                        accessor  : "address_with_provider_and_state.address",
                        filterable: false,
                        sortable : false,
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
                defaultPageSize={product_address.length === 0 ? 5 : product_address.length}
                noDataText="No hay items para mostrar"
                loading={loading}
                onFetchData={fetchData}
                onFilteredChange={filteredChanged}
                onSortedChange={sortChanged}
            />
        </FuseAnimate>
    );
}

export default ProductAddressesList;
