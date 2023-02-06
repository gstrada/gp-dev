import React, {useRef} from 'react';
import {
    Card,
    CardContent,
    Icon,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from 'app/main/card/store/actions';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/card/store/reducers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        paddingTop: 15,
    },
}));

function ValidateView() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const products = useSelector(({CardApp}) => CardApp.validate.products);
    const validating = useSelector(({CardApp}) => CardApp.validate.validating);
    const exchanging = useSelector(({CardApp}) => CardApp.validate.exchanging);
    const exchanged = useSelector(({CardApp}) => CardApp.validate.exchanged);

    const [code, setCode] = React.useState('');
    const [cvv, setCvv] = React.useState('');

    const handleInputChange = e => {
        const {value} = e.target;
        setCode(value);
    };
    const handleCvvInputChange = e => {
        const {value} = e.target;
        setCvv(value);
    };

    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleVerify();
        }
    };

    function handleVerify() {
        dispatch(Actions.validate(code, cvv));
    }


    function handleExchange(product_id) {
        dispatch(Actions.exchange(code, cvv, product_id));
    }

    function handleBack() {
        setCode('');
        setCvv('');
        dispatch(Actions.clear());
    }

    function renderValidateForm() {
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className={"w-full max-w-xl"}>
                <Typography variant="h6" className="mb-32 text-left">
                    Validar Código
                </Typography>
                <Card className="w-full max-w-xl">
                    <CardContent className="flex flex-col p-32 mt-1">
                        <TextField
                            className="mt-32"
                            id="code"
                            name="code"
                            label="Código de Tarjeta"
                            value={code ? code : ''}
                            type="text"
                            fullWidth
                            autoFocus
                            onChange={handleInputChange}
                            onKeyDown={onEnterPress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon color="action">card_giftcard</Icon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className="mt-32"
                            id="cvv"
                            name="cvv"
                            label="CVV (Código de seguridad)"
                            value={cvv ? cvv : ''}
                            type="text"
                            placeholder='SOLO PARA TARJETAS FISICAS'
                            fullWidth
                            onChange={handleCvvInputChange}
                            onKeyDown={onEnterPress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon color="action">lock</Icon>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button variant="contained" color="secondary" className="mt-20" onClick={handleVerify}  disabled={code.length === 0 || validating}>
                            Validar Código
                        </Button>
                    </CardContent>
                </Card>
                <Typography variant="body1" className="mb-32 text-center mt-32">
                    Ingresá el código de la tarjeta física, pack, o código digital y solicite el codigo CVV para verificar
                </Typography>
                <Typography variant="body1" className="mb-32 text-center mt-32">
                    Si la tarjeta no posee código de verificación CVV, deje el campo en blanco
                </Typography>
            </div>
        </FuseAnimate>
    }

    function renderExchangeForm() {
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className="w-full max-w-xl">
                <Typography variant="h6" className="mb-32 text-left text-green">
                    La tarjeta es Valida para ser utilizada
                </Typography>
                <Typography variant="body1" className="mb-32 text-center mt-32">
                    Seleccioná el producto por el cual se canjeará esta tarjeta
                </Typography>
                <Card className="w-full max-w-xl">
                    <CardContent className="flex flex-col p-32 mt-1">

                        <List className={classes.root}>

                            {products.map((product, index) => {
                                return <ListItem alignItems="center" key={product.id}>
                                    <ListItemAvatar>
                                        <Avatar alt={product.name} src={product.pictureUrl} />
                                    </ListItemAvatar>
                                    <div className="flex flex-col">
                                        <Typography

                                            variant="body2"
                                            className="block"
                                            color="textPrimary"
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="mt-5"
                                            color="textPrimary"
                                        >
                                            Qué ofrece?:
                                        </Typography>
                                        <span className="text-blue" dangerouslySetInnerHTML={{ __html: product.details }}/>
                                        <Button variant="contained" color="secondary" disabled={exchanging} className="mt-20" fullWidth onClick={() => {
                                            handleExchange(product.id);
                                        }}>
                                            Canjear
                                        </Button>
                                    </div>
                                    <Divider/>
                                </ListItem>
                            })}
                        </List>
                        <Button variant="contained" color="primary" className="mt-20" fullWidth onClick={handleBack} disabled={code.length === 0 || validating}>
                            volver
                        </Button>
                    </CardContent>

                </Card>
            </div>
        </FuseAnimate>
    }

    function renderExchangedForm() {
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className="w-full max-w-xl items-center content-center justify-center">
                <Typography variant="h6" className="mb-32 text-left text-green">
                    ¡La tarjeta fue canjeada correctamente!
                </Typography>
                <Button variant="contained" color="secondary" className="mt-20" fullWidth onClick={handleBack} disabled={code.length === 0 || validating}>
                    volver
                </Button>
            </div>
        </FuseAnimate>
    }

    if(exchanged){
        return renderExchangedForm();
    }

    if(products.length > 0){
        return renderExchangeForm();
    }
    return renderValidateForm();

}

export default withReducer('CardApp', reducer)(ValidateView);
