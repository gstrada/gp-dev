import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import PacksList from './PacksList';

import reducer from 'app/main/catalog/store/reducers';

import PacksDeleteAlert from "./Modals/PacksDeleteAlert";
import PacksDetailModal from "./Modals/PacksDetailModal";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PacksCreateModal from "./Modals/PacksCreateModal";

function Packs()
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);

    function renderCreateModal() {
        if(openCreateModal){
            return <PacksCreateModal
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
        return <PacksDetailModal
            item={selectedItemForDetail}
            open={!!selectedItemForDetail}
            closeHandler={() => {
                setSelectedItemForDetail(null)
            }}/>
    }

    function renderDeleteAlert() {
        if(!selectedItemToDelete){
            return null;
        }
        return <PacksDeleteAlert
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
                            <h4>Packs</h4>
                        </div>
                        <Button
                            className="normal-case bg-green text-white"
                            variant="contained"
                            onClick={() => setOpenCreateModal(true)}>
                            <Icon className="mr-4">add_circle_outline</Icon>
                            Nuevo
                        </Button>
                    </div>
                }
                content={
                    <PacksList
                        openDeleteAlertHandler={(item) => {
                            setSelectedItemToDelete(item)
                        }}
                        openDetailModalHandler={(item) => {
                            setSelectedItemForDetail(item)
                        }}/>
                }
                contentToolbar={
                    <div>
                        {renderCreateModal()}
                        {renderDetailModal()}
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

export default withReducer('CatalogApp', reducer)(Packs);
