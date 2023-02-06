import React, {useEffect} from 'react';
import {Typography, IconButton, Icon, Avatar, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/catalog/store/actions';

function ProductsList({openDeleteAlertHandler, openDetailModalHandler, openInfoModalHandler}) {

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
                    {
                        Header   : "A Pagar",
                        accessor  : "",
                        Cell     : row => {
                            return (
                                <Typography>$ {row.value.internal_price}</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 95,
                    },
                    {
                        Header   : "Descuento",
                        accessor  : "",
                        Cell     : row => {
                            return (
                                <Typography>{row.value.internal_benefit_discount}%</Typography>
                            )
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 95,
                    },
                    // {
                    //     id:'open_addresses',
                    //     Header   : "",
                    //     accessor : "",
                    //     Cell     : row => {
                    //         return (
                    //             <Tooltip title="Direcciones">
                    //                 <IconButton size='small' aria-label="redirect" onClick={() => {
                    //                     setRedirectTo('/catalog/products/addresses/' + row.original.id);
                    //                 }}>
                    //                     <Icon color="action" className="text-20">pin_drop</Icon>
                    //                 </IconButton>
                    //             </Tooltip>
                    //         );
                    //     },
                    //     className: "justify-center",
                    //     filterable: false,
                    //     sortable : false,
                    //     width    : 60,
                    // },
                    {
                        id:'show_column',
                        Header   : "",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Tooltip title="Ver Detalles">
                                    <IconButton size='small' aria-label="Ver Detalles" onClick={() => {
                                        openInfoModalHandler(row.value);
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
