import React, {useEffect, useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import PackProductsList from './PackProductsList';

import reducer from 'app/main/catalog/store/reducers';
import {Redirect} from 'react-router-dom'
import PackProductsDeleteAlert from "./Modals/PackProductsDeleteAlert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PackProductsCreateModal from "./Modals/PackProductsCreateModal";

function PackProducts(props)
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [redirectTo, setRedirectTo] = React.useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);
    const pack_id = props.match.params.pack_id;

    function renderCreateModal() {
        if(openCreateModal){
            return <PackProductsCreateModal
                pack_id={pack_id}
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
        return <PackProductsDeleteAlert
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
                            <h4>Productos del Pack</h4>
                        </div>
                        <div>
                            <Button
                                className="normal-case bg-blue-300 text-white mr-2"
                                variant="contained"
                                onClick={() => {
                                    setRedirectTo('/catalog/packs/');
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
                    <PackProductsList
                        pack_id={pack_id}
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

export default withReducer('CatalogApp', reducer)(PackProducts);
