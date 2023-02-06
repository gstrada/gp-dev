import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import UsersList from './UsersList';

import reducer from 'app/main/serviceProvider/store/reducers';
import {Redirect} from 'react-router-dom'
import UsersDeleteAlert from "./Modals/UsersDeleteAlert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import UsersCreateModal from "./Modals/UsersCreateModal";

function Users(props)
{
    const pageLayout = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(null);
    const [redirectTo, setRedirectTo] = React.useState(null);
    const provider_id = props.match.params.provider_id;

    function renderCreateModal() {
        if(openCreateModal){
            return <UsersCreateModal
                provider_id={provider_id}
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
        return <UsersDeleteAlert
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
                            <h4>Usuarios</h4>
                        </div>
                        <div>
                            <Button
                                className="normal-case bg-blue-300 text-white mr-2"
                                variant="contained"
                                onClick={() => {
                                    setRedirectTo('/service-provider/providers');
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
                    <UsersList
                        provider_id={provider_id}
                        openDeleteAlertHandler={(item) => {
                            setSelectedItemToDelete(item)
                        }}
                    />
                }
                contentToolbar={
                    <div>
                        {renderCreateModal()}
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

export default withReducer('ProviderApp', reducer)(Users);
