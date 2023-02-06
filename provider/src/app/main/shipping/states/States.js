import React, {useEffect, useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import StatesList from './StatesList';
import {Redirect} from 'react-router-dom'

import reducer from 'app/main/shipping/store/reducers';

import StatesDeleteAlert from "./Modals/StatesDeleteAlert";
import StatesDetailModal from "./Modals/StatesDetailModal";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import StatesCreateModal from "./Modals/StatesCreateModal";

function States(props)
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);
    const [redirectTo, setRedirectTo] = React.useState(null);
    const carrier_id = props.match.params.carrier_id;

    function renderCreateModal() {
        if(openCreateModal){
            return <StatesCreateModal
                carrier_id={carrier_id}
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
        return <StatesDetailModal
            carrier_id={carrier_id}
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
        return <StatesDeleteAlert
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
                            <h4>Provincias</h4>
                        </div>
                        <div>
                            <Button
                                className="normal-case bg-blue-300 text-white mr-2"
                                variant="contained"
                                onClick={() => {
                                    setRedirectTo('/shipping/carriers');
                                }}>
                                <Icon className="mr-4">arrow_left</Icon>
                                Volver
                            </Button>
                            <Button
                                className="normal-case bg-green text-white"
                                variant="contained"
                                onClick={() => setOpenCreateModal(true)}>
                                <Icon className="mr-4">add_circle_outline</Icon>
                                Nueva
                            </Button>
                        </div>
                    </div>
                }
                content={
                    <StatesList
                        carrier_id={carrier_id}
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

export default withReducer('ShippingApp', reducer)(States);
