import React, {useEffect, useRef} from 'react';
import {Button, Card, CardContent, Divider, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from 'react-redux';

import {AUTH_CONFIG} from "../../../fuse-configs/serverConfig";
import * as authActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'url("../../assets/images/backgrounds/background-01.jpg")',
        backgroundColor: theme.palette.primary.light,
        backgroundSize : 'cover',
        color     : theme.palette.primary.contrastText
    },
    wrapperBox:{
        backdropColor: 'red',
        display: 'block',
        width: '100%',
        height: 'auto',
        marginTop: 12,
    },
    wrapper: {
        position: 'relative',
        paddingTop: '56.25%'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }

}));

function Login() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const formRef = useRef(null);

    useEffect(() => {
        if ( login.error) {
            dispatch(Actions.showMessage({message: login.error, variant: 'error'}));
        }
    });

    function handleSubmit(model) {
        dispatch(authActions.submitLogin(model));
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>
            <div className="flex flex-col items-center justify-center w-full">
                <FuseAnimate animation="transition.expandIn">
                    <Card className="w-full max-w-512">
                        <CardContent className="flex flex-col items-center justify-center p-32">
                            <img className="w-128 mt-32 ml-32 mr-32 mb-24" src="assets/images/logos/logo-dark.png" alt="logo"/>
                            <Formsy
                                onSubmit={handleSubmit}
                                ref={formRef}
                                className="flex flex-col justify-center w-full"
                            >
                                <TextFieldFormsy
                                    className="mb-16"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextFieldFormsy
                                    className="mb-16"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button
                                    variant="contained" color="secondary"
                                    className="w-224 mx-auto mt-16 mb-16"
                                    aria-label="LOG IN"
                                    type="submit"
                                >
                                    Ingresá
                                </Button>

                                <div className="flex items-center justify-center">
                                    <a href={ AUTH_CONFIG.url + '/password/reset'} rel="noopener noreferrer" className="font-medium mb-16" target="_blank">
                                        Olvidaste tu clave?
                                    </a>
                                </div>
                            </Formsy>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default Login;