import React, {useEffect, useState} from 'react';
import {Typography, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useSelector} from 'react-redux';
import ReactTable from "react-table";

function SalesList({openModalHandler}) {
    const sales = useSelector(({OrderApp}) => OrderApp.sales.entities);
    const searchText = useSelector(({OrderApp}) => OrderApp.sales.searchText);
    const loading = useSelector(({OrderApp}) => OrderApp.sales.loading);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText){
            const arr = Object.keys(entities).map((id) => entities[id]);
            if ( searchText.length === 0 )
            {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if ( sales ) {
            setFilteredData(getFilteredArray(sales, searchText));
        }
    }, [sales, searchText]);

    if (!filteredData || loading ) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    Cargando
                </Typography>
            </div>
        );
    }

    if (filteredData.length === 0 && loading === false) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    No hay pedidos para mostrar
                </Typography>
            </div>
        );
    }

    function handleOpenModal(item) {
        openModalHandler(item);
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2"
                data={filteredData}
                columns={[
                    {
                        Header    : "Producto",
                        accessor  : "retail_part.part.product",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header    : "Marca",
                        accessor  : "part_brand",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header    : "Código",
                        accessor  : "part_code",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header    : "Cliente",
                        filterable: true,
                        accessor  : "buyer.name",
                    },
                    {
                        Header    : "Teléfono",
                        accessor  : "buyer.phone",
                        filterable: true,
                    },
                    {
                        Header    : "Fecha",
                        filterable: true,
                        accessor  : "created_at",
                    },
                    {
                        Header   : "Acciones",
                        accessor : "",
                        Cell     : row => {
                            return (
                                <Button size="small" color="secondary"  onClick={(e) => handleOpenModal(row.original)}>
                                    Ver detalles
                                </Button>
                            );
                        },
                        className: "justify-center",
                        filterable: false,
                        sortable : false,
                        width    : 200,
                    },
                ]}
            />
        </FuseAnimate>
    );
}

export default SalesList;
