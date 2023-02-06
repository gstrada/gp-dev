import React from 'react';
import {Button, Card, CardContent, Divider, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useForm} from '@fuse/hooks';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'url("../../assets/images/backgrounds/background-01.jpg")',
        backgroundColor: theme.palette.primary.light,
        backgroundSize : 'cover',
        color     : theme.palette.primary.contrastText
    }
}));

function Register()
{

    const classes = useStyles();

    const {form, handleChange, resetForm} = useForm({
        name                 : '',
        email                : '',
        password             : '',
        passwordConfirm      : '',
    });

    function handleSubmit(ev)
    {
        ev.preventDefault();
        resetForm();
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className="w-full max-w-512">

                        <CardContent className="flex flex-col items-center justify-center p-32">
                            <img className="w-128 mt-32 ml-32 mr-32" src="assets/images/logos/goldenpack-b-c.svg" alt="logo"/>
                            <Typography variant="body1" className="mt-16 mb-32 text-center">CREÁ TU CUENTA DE BUSCAPARTES</Typography>
                            <form
                                name="registerForm"
                                noValidate
                                className="flex flex-col justify-center w-full"
                                onSubmit={handleSubmit}
                            >

                                <TextField
                                    className="mb-16"
                                    label="Nombre de la Casa de repuestos"
                                    autoFocus
                                    type="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    className="mb-16"
                                    label="CUIT (Solo números)"
                                    type="number"
                                    name="social_number"
                                    value={form.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    className="mb-16"
                                    label="Teléfono *"
                                    type="text"
                                    name="phone"
                                    value={form.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />



                                <TextField
                                    className="mb-16"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    className="mb-16"
                                    label="Clave"
                                    type="new-password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    className="mb-16"
                                    label="Clave (Confirmación)"
                                    type="new-password"
                                    name="password_confirmation"
                                    value={form.passwordConfirm}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />


                                <Typography className="text-xs mt-8 mb-16 text-blue">
                                    Si fue atendido por un vendedor, ingresé su codígo
                                </Typography>

                                <TextField
                                    className="mb-16"
                                    label="Código de Vendedor ( Opcional )"
                                    type="text"
                                    name="seller_code"
                                    value={form.passwordConfirm}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />

                                <Typography variant="caption" className="text-13 mt-16">
                                    Al crear una cuenta, se aceptan los términos, condiciones y políticas de privacidad.
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="w-224 mx-auto mt-16"
                                    aria-label="Register"
                                    type="submit"
                                >
                                    Creá tu cuenta
                                </Button>

                            </form>


                            <div className="my-24 flex items-center justify-center">
                                <Divider className="w-32"/>
                                <span className="mx-8 font-bold text-center">SI YA TENES UNA CUENTA DE BUSCAPARTES</span>
                                <Divider className="w-32"/>
                            </div>
                            <div className="flex items-center justify-center">
                                <Link to="/login">
                                    <Button variant="contained" color="primary"
                                            className="w-224 mx-auto mb-16"
                                            aria-label="LOG IN">
                                        INGRESÁ DESDE ACÁ
                                    </Button>
                                </Link>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default Register;
