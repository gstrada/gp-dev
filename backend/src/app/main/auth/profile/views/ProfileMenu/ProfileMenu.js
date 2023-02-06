import React, {useRef} from 'react';
import {Card, CardContent, Divider, List, ListItem, ListItemIcon, Icon, Typography, Switch, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import _ from '@lodash';
import ListItemMenu from "./ListItemMenu";
import {buildAddressString} from "../../../../../helpers/helpers";

const useStyles = makeStyles(theme => ({
    root: {
        color     : theme.palette.primary.contrastText
    },
    logoInput : {
        display: 'none'
    },
    logoButton: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    logoIcon: {
        marginLeft: theme.spacing(1),
    },
    logoMini: {
        width: '3rem',
        height: '3rem',
        overflow: 'hidden',
        borderRadius: '3rem',
    },
}));

function ProfileMenu({user, menuItemClick}) {

    function getAddressString() {
        let address = buildAddressString(user);
        if(address){
            return address;
        }
        return 'No completada';
    }

    return (
        <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className={"w-full max-w-xl"}>
                <Typography variant="h6" className="mb-32 text-left">
                    Datos de mi Cuenta
                </Typography>
                <Card className="w-full max-w-xl">
                    <CardContent className="flex flex-col p-32 mt-1">
                        <List component="nav">
                            <ListItemMenu title='Tu email' icon='email' value={user.email} target='email' menuItemClick={menuItemClick}/>
                            <ListItemMenu title='Tu clave' icon='lock' value='********' target='password' menuItemClick={menuItemClick}/>
                        </List>
                    </CardContent>
                </Card>

                <Typography variant="h6" className="mb-32 text-left mt-32">
                    Información de Contacto
                </Typography>
                <Card className="w-full max-w-xl">
                    <CardContent className="flex flex-col p-32 mt-1">
                        <List component="nav">

                            <ListItemMenu title='Razón Social' icon='insert_drive_file' value={user.name} target='name' menuItemClick={menuItemClick}/>
                            <ListItemMenu title='Dirección' icon='location_on' value={getAddressString()} target='address' menuItemClick={menuItemClick}/>
                            <ListItemMenu title='Teléfono' icon='phone' value={user.phone} target='phone' menuItemClick={menuItemClick}/>
                            <ListItemMenu title='Sitio Web' icon='website' value={user.website} target='web' menuItemClick={menuItemClick} divider={false}/>
                        </List>
                    </CardContent>
                </Card>
            </div>
        </FuseAnimate>
    );
}

export default ProfileMenu;