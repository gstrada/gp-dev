import React, {useEffect, useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import ProductAddressesList from './ProductAddressesList';
import {Redirect} from 'react-router-dom'
import reducer from 'app/main/catalog/store/reducers';

import ProductAddressesDeleteAlert from "./Modals/ProductAddressesDeleteAlert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ProductAddressesCreateModal from "./Modals/ProductAddressesCreateModal";

function ProductAddresses(props)
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);
    const [redirectTo, setRedirectTo] = React.useState(null);

    const product_id = props.match.params.product_id;

    function renderCreateModal() {
        if(openCreateModal){
            return <ProductAddressesCreateModal
                product_id={product_id}
                open={!!openCreateModal}
                closeHandler={() => {
                    setOpenCreateModal(null)
                }}/>
        }
    }

    function renderDeleteAlert() {
        if(!selectedItemToDelete){
            return null;
        }
        return <ProductAddressesDeleteAlert
            item={selectedItemToDelete}
            open={!!selectedItemToDelete}
            closeHandler={() => {
                setSelectedItemToDelete(null)
            }}/>
    }


    if(redirectTo){
        return <Redirect to={redirectTo}/>;
    }

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "h-full",
                    content       : "flex flex-col h-full",
                    header        : "min-h-60 h-60",
                    toolbar: "hidden"
                }}
                header={
                    <div className="flex flex-1 items-center justify-between p-20">
                        <div className="flex flex-col">
                            <h4>Direcciones de Producto</h4>
                        </div>
                        <div>
                            <Button
                                className="normal-case bg-blue-300 text-white mr-2"
                                variant="contained"
                                onClick={() => {
                                    setRedirectTo('/catalog/products/');
                                }}>
                                <Icon className="mr-4">arrow_left</Icon>
                                Volver
                            </Button>
                            <Button
                                className="normal-case bg-green text-white"
                                variant="contained"
                                onClick={() => setOpenCreateModal(true)}>
                                <Icon className="mr-4">add_circle_outline</Icon>
                                Nuevo
                            </Button>
                        </div>
                    </div>
                }
                content={
                    <ProductAddressesList
                        product_id={product_id}
                        openDeleteAlertHandler={(item) => {
                            setSelectedItemToDelete(item)
                        }}/>
                }
                contentToolbar={
                    <div>
                        {renderCreateModal()}
                        {/*{renderDetailModal()}*/}
                        {renderDeleteAlert()}
                    </div>
                }
                innerScroll
                sidebarInner
                ref={pageLayout}
            />
        </React.Fragment>
    );
}

export default withReducer('CatalogApp', reducer)(ProductAddresses);
