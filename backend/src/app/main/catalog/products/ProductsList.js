import React, {useEffect} from 'react';
import {Typography, IconButton, Icon, Avatar, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/catalog/store/actions';

function ProductsList({openDeleteAlertHandler, openDetailModalHandler}) {

    const dispatch = useDispatch();
    const catalog = useSelector(({CatalogApp}) => CatalogApp.product.entities);
    const page = useSelector(({CatalogApp}) => CatalogApp.product.page);
    const loading = useSelector(({CatalogApp}) => CatalogApp.product.loading);

    const [redirectTo, setRedirectTo] = React.useState(null);

    useEffect(() => {
            dispatch(Actions.loadingProducts(true));
            dispatch(Actions.getProducts(page));
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
        dispatch(Actions.getProducts(new_page));
    }

    function filteredChanged(filtered) {
        let new_page = {...page}
        new_page.filters = filtered;
        dispatch(Actions.changeProductsPage(new_page));
    }

    function sortChanged(sort) {
        let new_page = {...page}
        new_page.sort = sort[0];
        dispatch(Actions.changeProductsPage(new_page));
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
                columns={[
                    {
                        accessor : "pictureUrl",
                        Cell     : row => (
                            <Avatar alt={row.original.name} src={row.value} className='w-24 h-24'/>
                        ),
                        className: "justify-center",
                        width    : 50,
                        sortable : false
                    },
                    {
                        Header    : "Prestador",
                        accessor  : "provider.name",
                        filterable: true,
                        sortable : false,
                    },
                    {
                        Header    : "Categoría",
                        accessor  : "category.name",
                        filterable: true,
                        sortable : false,
                        width    : 150,
                    },
                    {
                        Header    : "Nombre",
                        accessor  : "name",
                        filterable: true,
                        sortable : true,
                    },
                    {
                        Header    : "SKU",
                        accessor  : "sku",
                        filterable: true,
                        sortable : true,
                    },
                    // {
                    //     Header    : "Url Amigable",
                    //     accessor  : "friendly_url",
                    //     filterable: true,
                    //     sortable : false,
                    // },
                    {
                        Header    : "Físico",
                        accessor  : "physical_price",
                        filterable: true,
                        sortable : true,
                        width    : 60,
                        className: "justify-center",
                    },
                    {
                        Header    : "Digital",
                        accessor  : "digital_price",
                        filterable: true,
                        sortable : true,
                        width    : 60,
                        className: "justify-center",
                    },
                    {
                        Header    : "Tarjeta",
                        accessor  : "card_price",
                        filterable: true,
                        sortable : true,
                        width    : 60,
                        className: "justify-center",
                    },
                    {
                        Header   : "A la venta",
                        accessor  : "",
                        Cell     : row => {
                            return (
                                <Typography>{row.value.available_for_sale ? 'SI' : 'NO'}</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 80,
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
                        Header   : "Destacado",
                        accessor  : "",
                        Cell     : row => {
                            return (
                                <Typography>{row.value.featured ? 'SI' : 'NO'}</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 80,
                    },

                    {
                        id:'open_images',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (

                                <Tooltip title="Imágenes">
                                    <IconButton size='small' aria-label="redirect" onClick={() => {
                                        setRedirectTo('/catalog/products/pictures/' + row.original.id);
                                    }}>
                                        <Icon color="action" className="text-20">image</Icon>
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
                                        setRedirectTo('/catalog/products/addresses/' + row.original.id);
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

export default ProductsList;
