import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import DiscountsList from './DiscountsList';

import reducer from 'app/main/catalog/store/reducers';

import DiscountsDeleteAlert from "./Modals/DiscountsDeleteAlert";
import DiscountsDetailModal from "./Modals/DiscountsDetailModal";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DiscountsCreateModal from "./Modals/DiscountsCreateModal";

function Discounts()
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);

    function renderCreateModal() {
        if(openCreateModal){
            return <DiscountsCreateModal
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
        return <DiscountsDetailModal
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
        return <DiscountsDeleteAlert
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
                            <h4>Descuentos</h4>
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
                    <DiscountsList
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

export default withReducer('CatalogApp', reducer)(Discounts);
