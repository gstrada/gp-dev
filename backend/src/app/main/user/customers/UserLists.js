import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import UserList from './UserList';

import reducer from 'app/main/user/store/reducers';
import {Button, DialogActions} from "@material-ui/core";
import * as Actions from "../../catalog/store/actions/category.actions";
import Icon from "@material-ui/core/Icon";

// import CardHistoriesDeleteAlert from "./Modals/CardHistoriesDeleteAlert";
// import CardHistoriesDetailModal from "./Modals/CardHistoriesDetailModal";
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// import CardHistoriesCreateModal from "./Modals/CardHistoriesCreateModal";

function UserLists()
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);

    function renderCreateModal() {
        // if(openCreateModal){
        //     return <CardHistoriesCreateModal
        //         open={!!openCreateModal}
        //         closeHandler={() => {
        //             setOpenCreateModal(null)
        //         }}/>
        // }
    }

    function renderDetailModal() {
        // if(!selectedItemForDetail){
        //     return null;
        // }
        // return <CardHistoriesDetailModal
        //     item={selectedItemForDetail}
        //     open={!!selectedItemForDetail}
        //     closeHandler={() => {
        //         setSelectedItemForDetail(null)
        //     }}/>
    }

    function renderDeleteAlert() {
        // if(!selectedItemToDelete){
        //     return null;
        // }
        // return <CardHistoriesDeleteAlert
        //     item={selectedItemToDelete}
        //     open={!!selectedItemToDelete}
        //     closeHandler={() => {
        //         setSelectedItemToDelete(null)
        //     }}/>
    }

    function handleDownload() {
        console.log('download')
        // dispatch(Actions.loadingProductAddressCreate(true));
        // dispatch(Actions.createProductAddress(values));
        // closeHandler();
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
                            <h4>Listado de Clientes</h4>
                        </div>

                        <a href={'https://goldenpack.com.ar/api/backend/download/65a4sd6f54162534465a4sdf65a4sdf6542163454516235446a5sd4f321hha654asd65f4as6d54f'}>
                            <Button
                                className="normal-case bg-green text-white"
                                variant="contained"
                            >
                                <Icon className="mr-4">cloud_download</Icon>
                                Descargar Listado
                            </Button>
                        </a>
                    </div>
                }
                content={
                    <UserList
                        openDeleteAlertHandler={(item) => {
                            setSelectedItemToDelete(item)
                        }}
                        openDetailModalHandler={(item) => {
                            setSelectedItemForDetail(item)
                        }}/>
                }
                contentToolbar={
                    <div>

                        {/*{renderCreateModal()}*/}
                        {/*{renderDetailModal()}*/}
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

export default withReducer('CardApp', reducer)(UserLists);
