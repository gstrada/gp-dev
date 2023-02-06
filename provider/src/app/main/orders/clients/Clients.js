import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import ClientsList from './ClientsList';

import * as Actions from 'app/main/orders/store/actions';
import reducer from 'app/main/orders/store/reducers';

function Clients(props)
{
    const dispatch = useDispatch();

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.loadingClients(true));
        dispatch(Actions.getClients(props.match.params));
    }, []);

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "h-full",
                    content       : "flex flex-col h-full",
                    header        : "min-h-60 h-60"
                }}
                header={
                    <div className="p-20"><h4>Tus clientes</h4></div>
                }
                content={
                    <ClientsList/>
                }
                innerScroll
                sidebarInner
                ref={pageLayout}
            />
        </React.Fragment>
    )
}

export default withReducer('OrderApp', reducer)(Clients);
