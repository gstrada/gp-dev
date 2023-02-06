import React, {useEffect, useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import HistoriesList from './HistoriesList';
import {Redirect} from 'react-router-dom'

import reducer from 'app/main/card/store/reducers';

import HistoryDetailModal from "./Modals/HistoryDetailModal";


function Histories(props)
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);
    const [redirectTo, setRedirectTo] = React.useState(null);

    // function renderCreateModal() {
    //     if(openCreateModal){
    //         return <CitiesCreateModal
    //             payment_method_id={payment_method_id}
    //             payment_method_state_id={payment_method_state_id}
    //             open={!!openCreateModal}
    //             closeHandler={() => {
    //                 setOpenCreateModal(null)
    //             }}/>
    //     }
    // }
    //
    function renderDetailModal() {
        if(!selectedItemForDetail){
            return null;
        }
        return <HistoryDetailModal
            item={selectedItemForDetail}
            open={!!selectedItemForDetail}
            closeHandler={() => {
                setSelectedItemForDetail(null)
            }}/>
    }
    //
    // function renderDeleteAlert() {
    //     if(!selectedItemToDelete){
    //         return null;
    //     }
    //     return <CitiesDeleteAlert
    //         item={selectedItemToDelete}
    //         open={!!selectedItemToDelete}
    //         closeHandler={() => {
    //             setSelectedItemToDelete(null)
    //         }}/>
    // }

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
                            <h4>Historial de Pagos</h4>
                        </div>
                    </div>
                }
                content={
                    <HistoriesList
                        openDeleteAlertHandler={(item) => {
                            setSelectedItemToDelete(item)
                        }}
                        openDetailModalHandler={(item) => {
                            setSelectedItemForDetail(item)
                        }}
                        status={props.match.params.status}
                    />
                }
                contentToolbar={
                    <div>
                        {renderDetailModal()}
                        {/*{renderDeleteAlert()}*/}
                    </div>
                }
                innerScroll
                sidebarInner
                ref={pageLayout}
            />
        </React.Fragment>
    );
}

export default withReducer('CardApp', reducer)(Histories);
