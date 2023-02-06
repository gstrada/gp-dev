import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import ModifyCardView from "./views/ModifyCardView/ModifyCardView";
import WebsiteModal from "./Modals/WebsiteModal";

class ModifyCard extends Component {

    initialModalStates = {
        emailModalOpen:false,
        passwordModalOpen:false,
        nameModalOpen: false,
        lastNameModalOpen: false,
        phoneModalOpen: false,
        websiteModalOpen: false,
        addressModalOpen: false,
    };

    state = {
        modals: this.initialModalStates,
    };

    handleListItemClick (item) {
        switch (item) {
            case 'email':
                this.setState({modals: {...this.initialModalStates, emailModalOpen : true}});
                break;
            case 'password':
                this.setState({modals: {...this.initialModalStates, passwordModalOpen : true}});
                break;
            case 'name':
                this.setState({modals: {...this.initialModalStates, nameModalOpen : true}});
                break;
            case 'lastname':
                this.setState({modals: {...this.initialModalStates, lastNameModalOpen : true}});
                break;
            case 'address':
                this.setState({modals: {...this.initialModalStates, addressModalOpen : true}});
                break;
            case 'phone':
                this.setState({modals: {...this.initialModalStates, phoneModalOpen : true}});
                break;
            case 'website':
                this.setState({modals: {...this.initialModalStates, websiteModalOpen : true}});
                break;
            default:
                break;
        }
    };

    handleCloseModals(){
        this.setState({ modals:this.initialModalStates });
    }

    render()
    {
        const {websiteModalOpen} = this.state.modals;
        const {user} = this.props;
        return (
            <FusePageSimple
                classes={{
                    contentWrapper: "h-full",
                    content       : "flex flex-col h-full",
                    header        : "min-h-60 h-60"
                }}
                header={
                    <div className="p-20"><h4>Búscar Código</h4></div>
                }
                content={
                    <div className="flex flex-col items-center justify-center w-full  p-32">
                        <ModifyCardView/>
                        <WebsiteModal user={user} open={websiteModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
                    </div>
                }
                innerScroll
                sidebarInner
            />
        )
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({

    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        user : auth.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyCard);

