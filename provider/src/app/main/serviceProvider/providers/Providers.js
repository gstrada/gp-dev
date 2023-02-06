import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import ProvidersList from './ProvidersList';

import reducer from 'app/main/serviceProvider/store/reducers';

import ProvidersDeleteAlert from "./Modals/ProvidersDeleteAlert";
import ProvidersDetailModal from "./Modals/ProvidersDetailModal";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ProvidersCreateModal from "./Modals/ProvidersCreateModal";

function Providers()
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);

    function renderCreateModal() {
        if(openCreateModal){
            return <ProvidersCreateModal
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
        return <ProvidersDetailModal
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
        return <ProvidersDeleteAlert
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
                            <h4>Prestadores</h4>
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
                    <ProvidersList
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

export default withReducer('ProviderApp', reducer)(Providers);
