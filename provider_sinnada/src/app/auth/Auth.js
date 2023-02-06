import React, {Component} from 'react';
import {FuseSplashScreen} from '@fuse';
import {connect} from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/store/actions';
import authService from 'app/services/authService';

class Auth extends Component {

    state = {
        waitAuthCheck: true
    };

    componentDidMount()
    {
        return Promise.all([
            this.authCheck()
        ]).then(() => {
            this.setState({waitAuthCheck: false})
        })
    }

    authCheck = () => new Promise(resolve => {
        //this.props.logout();
        authService.on('onAutoLogin', () => {

            //this.props.showMessage({message: 'Logging in with JWT'});

            /**
             * Sign in and retrieve user data from Api
             */
            authService.getProfile()
                .then(user => {
                    this.props.setUserData(user);
                    resolve();
                })
                .catch(error => {
                    console.log('aca');
                    this.props.showMessage({message: error});
                    //resolve();
                    resolve();
                })
        });

        authService.on('onAutoLogout', (message) => {
            if ( message ) {
                this.props.showMessage({message});
            }
            this.props.logout();
            resolve();
        });

        authService.on('onNoAccessToken', () => {
            resolve();
        });

        authService.init();

        return Promise.resolve();
    });

    render()
    {
        console.log(this.state.waitAuthCheck);
        //return <div/>;
        //return this.checkAuth ? <FuseSplashScreen/> : <React.Fragment children={this.props.children}/>;
        return this.state.waitAuthCheck ? <FuseSplashScreen/> : <React.Fragment children={this.props.children}/>;
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            logout             : userActions.logoutUser,
            setUserData        : userActions.setUserData,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
