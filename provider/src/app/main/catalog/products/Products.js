import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import ProductsList from './ProductsList';

import reducer from 'app/main/catalog/store/reducers';

import ProductsDeleteAlert from "./Modals/ProductsDeleteAlert";
import ProductsDetailModal from "./Modals/ProductsDetailModal";
import ProductsInfoModal from "./Modals/ProductsInfoModal";
import ProductsCreateModal from "./Modals/ProductsCreateModal";

function Products()
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [selectedItemForInfo, setSelectedItemForInfo] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);

    function renderCreateModal() {
        if(openCreateModal){
            return <ProductsCreateModal
                open={!!openCreateModal}
                closeHandler={() => {
                    setOpenCreateModal(null)
                }}/>
        }
    }

    function renderDetailModal() {
        if(!selectedItemForDetail){
            return null;
        }
        return <ProductsDetailModal
            item={selectedItemForDetail}
            open={!!selectedItemForDetail}
            closeHandler={() => {
                setSelectedItemForDetail(null)
            }}/>
    }

    function renderInfoModal() {
        if(!selectedItemForInfo){
            return null;
        }
        return <ProductsInfoModal
            item={selectedItemForInfo}
            open={!!selectedItemForInfo}
            closeHandler={() => {
                setSelectedItemForInfo(null)
            }}/>
    }

    function renderDeleteAlert() {
        if(!selectedItemToDelete){
            return null;
        }
        return <ProductsDeleteAlert
            item={selectedItemToDelete}
            open={!!selectedItemToDelete}
            closeHandler={() => {
                setSelectedItemToDelete(null)
            }}/>
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
                            <h4>Productos</h4>
                        </div>
                        {/*<Button*/}
                        {/*    className="normal-case bg-green text-white"*/}
                        {/*    variant="contained"*/}
                        {/*    onClick={() => setOpenCreateModal(true)}>*/}
                        {/*    <Icon className="mr-4">add_circle_outline</Icon>*/}
                        {/*    Nuevo*/}
                        {/*</Button>*/}
                    </div>
                }
                content={
                    <ProductsList
                        openDeleteAlertHandler={(item) => {
                            setSelectedItemToDelete(item)
                        }}
                        openDetailModalHandler={(item) => {
                            setSelectedItemForDetail(item)
                        }}
                        openInfoModalHandler={(item) => {
                            setSelectedItemForInfo(item)
                        }}/>
                }
                contentToolbar={
                    <div>
                        {renderCreateModal()}
                        {renderDetailModal()}
                        {renderInfoModal()}
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

export default withReducer('CatalogApp', reducer)(Products);
