import React, {useRef, useState} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import CardPaymentHistoriesList from './CardPaymentHistoriesList';
import reducer from 'app/main/card/store/reducers';






function CardPaymentHistories()
{

    const pageLayout = useRef(null);

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "h-full",
                    content       : "flex flex-col h-full",
                    header        : "min-h-60 h-60",
                    contentToolbar: 'mt-32 mb-32 pt-32 pb-32',

                }}
                header={
                    <div className="flex flex-1 items-center justify-between p-20">
                        <div className="flex flex-col">
                            <h4>Historial de Pago</h4>
                        </div>
                    </div>
                }
                content={
                    <CardPaymentHistoriesList/>
                }
                innerScroll
                sidebarInner
                ref={pageLayout}
            />
        </React.Fragment>
    );
}

export default withReducer('CardApp', reducer)(CardPaymentHistories);
