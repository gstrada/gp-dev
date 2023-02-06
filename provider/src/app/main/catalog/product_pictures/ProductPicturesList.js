import React, {useEffect} from 'react';
import {Typography, IconButton, Avatar, Tooltip, Icon} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from 'app/main/catalog/store/actions';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    picture: {
        width: 'auto',
        height: 150,
    },
}));


function ProductPicturesList({openDeleteAlertHandler, product_id}) {

    const dispatch = useDispatch();
    const product_picture = useSelector(({CatalogApp}) => CatalogApp.product_picture.entities);
    const loading = useSelector(({CatalogApp}) => CatalogApp.product_picture.loading);
    const classes = useStyles();

    useEffect(() => {
        dispatch(Actions.loadingProductPictures(true));
        dispatch(Actions.getProductPictures(product_id));
    }, [product_id]);

    if (!product_picture || loading ) {
        return (
            <div className="flex flex-1 items-center justify-center h-full mt-32">
                <Typography color="textSecondary" variant="h5">
                    Cargando
                </Typography>
            </div>
        );
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full overflow-hidden pl-2 imageTable"
                data={product_picture}
                columns={[
                    {
                        Header  : "Imágen",
                        accessor : "pictureUrl",
                        Cell     : row => (
                            <img src={row.value}  className={classes.picture}  />
                        ),
                        className: "justify-center",
                        sortable : false
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
                noDataText="No hay items para mostrar"
                loading={loading}
            />
        </FuseAnimate>
    );
}

export default ProductPicturesList;
