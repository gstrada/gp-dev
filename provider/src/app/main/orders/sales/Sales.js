import React, {useEffect, useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import SalesList from './SalesList';

import * as Actions from 'app/main/orders/store/actions';
import reducer from 'app/main/orders/store/reducers';
import SaleDetailModal from "./Modals/SaleDetailModal";


function Sales(props)
{
    const dispatch = useDispatch();

    const pageLayout = useRef(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        dispatch(Actions.loadingSales(true));
        dispatch(Actions.getSales(0, props.match.params.status));
    }, [props.match.params.status]);

    function handleOpenModal(item) {
        setSelectedItem(item);
        setDetailModalOpen(true);
    }

    function handleCloseModal() {
        setDetailModalOpen(false);
    }

    function renderDetailModal() {
        if(!selectedItem){
            return null;
        }
        return <SaleDetailModal item={selectedItem} open={detailModalOpen} closeHandler={handleCloseModal}/>
    }

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "h-full",
                    content       : "flex flex-col h-full",
                    header        : "min-h-60 h-60"
                }}
                header={
                    <div className="p-20"><h4>Pedidos</h4></div>
                }
                content={
                    <div>
                        <SalesList openModalHandler={handleOpenModal}/>
                        { renderDetailModal() }
                    </div>
                }
                innerScroll
                sidebarInner
                ref={pageLayout}
            />
        </React.Fragment>
    )
}

export default withReducer('OrderApp', reducer)(Sales);
