import React from 'react';
import {Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';

function Error404Page()
{
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <div className="max-w-512 text-center">
                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <Typography variant="h1" color="inherit" className="font-medium mb-16">
                        404
                    </Typography>
                </FuseAnimate>
                <FuseAnimate delay={300}>
                    <Typography variant="h5" color="textSecondary" className="mb-24">
                       La página que buscas no existe
                    </Typography>
                </FuseAnimate>
                <FuseAnimate delay={600}>
                    <Link className="font-medium text-24" to="/">Volver al inicio</Link>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default Error404Page;
