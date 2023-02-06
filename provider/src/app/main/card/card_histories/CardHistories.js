import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import CardHistoriesList from './CardHistoriesList';

import reducer from 'app/main/card/store/reducers';

import CardHistoriesDeleteAlert from "./Modals/CardHistoriesDeleteAlert";
import CardHistoriesDetailModal from "./Modals/CardHistoriesDetailModal";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CardHistoriesCreateModal from "./Modals/CardHistoriesCreateModal";

function CardHistories()
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);

    function renderCreateModal() {
        if(openCreateModal){
            return <CardHistoriesCreateModal
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
        return <CardHistoriesDetailModal
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
        return <CardHistoriesDeleteAlert
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
                            <h4>Historial de Tarjetas</h4>
                        </div>
                    </div>
                }
                content={
                    <CardHistoriesList
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

export default withReducer('CardApp', reducer)(CardHistories);
