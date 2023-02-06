import React, {useEffect, useState} from 'react';
import {Avatar, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useSelector} from 'react-redux';
import ReactTable from "react-table";

function ClientsList() {
    const clients = useSelector(({OrderApp}) => OrderApp.clients.entities);
    const searchText = useSelector(({OrderApp}) => OrderApp.clients.searchText);
    const loading = useSelector(({OrderApp}) => OrderApp.clients.loading);

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

        if ( clients )
        {
            setFilteredData(getFilteredArray(clients, searchText));
        }
    }, [clients, searchText]);


    if (!filteredData || loading ) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    Cargando
                </Typography>
            </div>
        );
    }

    if ( filteredData.length === 0 && loading === false) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    No hay clientes para mostrar
                </Typography>
            </div>
        );
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden"
                data={filteredData}
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
                        className : "font-bold"
                    },
                    {
                        Header    : "Email",
                        accessor  : "email",
                        filterable: true
                    },
                    {
                        Header    : "Teléfono",
                        accessor  : "phone",
                        filterable: true,
                    },
                    {
                        Header    : "Provincia",
                        accessor  : "information.state",
                        filterable: true,
                    },
                    {
                        Header    : "Ciudad",
                        accessor  : "information.city",
                        filterable: true,
                    },
                    {
                        Header    : "Dirección",
                        filterable: true,
                        Cell     : row => (
                            <Typography variant="body1">
                                {row.original.information.street_name + ' ' + row.original.information.street_number}
                            </Typography>
                        ),
                    },
                    {
                        Header    : "Pedidos",
                        accessor  : "orders",
                        filterable: false,
                        sortable: false,
                        className : "font-bold  justify-center",
                        width    : 72,
                    }
                ]}
            />
        </FuseAnimate>
    );
}

export default ClientsList;
