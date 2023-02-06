import React from 'react';
import {AppBar, Avatar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root  : {
        '&.user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    }
}));

function UserNavbarHeader(props)
{
    const user = useSelector(({auth}) => auth.user);

    const classes = useStyles();

    return (
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            classes={{root: classes.root}}
            className="user relative flex flex-col items-center justify-center pt-8 pb-32 mb-32 z-0"
        >
            <Typography className="username text-16 whitespace-no-wrap" color="inherit">{user.name}</Typography>
            <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user.email}</Typography>
        </AppBar>
    );
}

export default UserNavbarHeader;
