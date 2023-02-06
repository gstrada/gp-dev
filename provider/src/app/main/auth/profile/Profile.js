import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import ProfileMenu from "./views/ProfileMenu/ProfileMenu";
import EmailModal from "./Modals/EmailModal";
import PasswordModal from "./Modals/PasswordModal";
import NameModal from "./Modals/NameModal";
import PhoneModal from "./Modals/PhoneModal";
import WebsiteModal from "./Modals/WebsiteModal";
import AddressModal from "./Modals/AddressModal";
import LastNameModal from "./Modals/LastNameModal";

class Profile extends Component {

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
        const {emailModalOpen, passwordModalOpen, nameModalOpen,lastNameModalOpen, phoneModalOpen, websiteModalOpen, addressModalOpen} = this.state.modals;
        const {user} = this.props;
        return (
            <FusePageSimple
                classes={{
                    contentWrapper: "h-full",
                    content       : "flex flex-col h-full",
                    header        : "min-h-60 h-60"
                }}
                header={
                    <div className="p-20"><h4>Tu cuenta</h4></div>
                }
                content={
                    <div className="flex flex-col items-center justify-center w-full  p-32">
                        <ProfileMenu user={user} menuItemClick={this.handleListItemClick.bind(this)}/>
                        <EmailModal user={user} open={emailModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
                        <PasswordModal user={user} open={passwordModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
                        <NameModal user={user} open={nameModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
                        <LastNameModal user={user} open={lastNameModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
                        <AddressModal user={user} open={addressModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
                        <PhoneModal user={user} open={phoneModalOpen} closeHandler={this.handleCloseModals.bind(this)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

