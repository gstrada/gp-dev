import React, {useEffect, useRef} from 'react';
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
import Divider from "@material-ui/core/Divider";

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

function ModifyCardView() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const card = useSelector(({CardApp}) => CardApp.card_edit.card);
    const cards = useSelector(({CardApp}) => CardApp.card_edit.cards);

    const searching = useSelector(({CardApp}) => CardApp.card_edit.searching);
    const saving = useSelector(({CardApp}) => CardApp.card_edit.saving);
    const saved = useSelector(({CardApp}) => CardApp.card_edit.saved);

    const [code, setCode] = React.useState('');
    const [order, setOrder] = React.useState('');

    const [values, setValues] = React.useState();

    const [cardValues, setCardValues] = React.useState();

    useEffect(() => {
        setValues(card);
    }, [card]);

    useEffect(() => {
        setCardValues(cards);
    }, [cards]);

    const handleInputChange = e => {
        const {value} = e.target;
        setCode(value);
    };
    const handleOrderInputChange = e => {
        const {value} = e.target;
        setOrder(value);
    };

    const onEnterPressCode = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSearchCode();
        }
    };

    const onEnterPressOrder = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSearchOrder();
        }
    };

    function handleSearchCode() {
        dispatch(Actions.getCardByNumber(code));
    }

    function handleSearchOrder() {
        dispatch(Actions.getCardsByOrderId(order));
    }

    function handleModify(card_id) {
        dispatch(Actions.modify(card_id, values));
    }

    function handleModifyOrder(cardItem) {
        cardValues.map(obj => {
            if(obj.id === cardItem.id){
                dispatch(Actions.modify(cardItem.id, cardItem));
            }
        });
    }

    function handleBack() {
        setCode('');
        setOrder('');
        dispatch(Actions.clear());
    }

    const handleFormChange = e => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            if(values){
                value = values[name] === 1 ? 0 : 1;
            }else{
                value = 1;
            }
        }
        setValues({...values, [name]: value})
    };


    const handleFormOrderChange = (itm, e) => {
        let {name, value} = e.target;
        if(e.target.type === 'checkbox' || e.target.type === 'radio') {
            if(values){
                value = values[name] === 1 ? 0 : 1;
            }else{
                value = 1;
            }
        }
        let newValues = cardValues.map(obj => {
            if(obj.id === itm.id){
                obj[name] = value;
                return obj
            }else{
                return obj
            }
        });
        setCardValues(newValues);
    };

    function renderForm() {
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className={"w-full max-w-xl"}>
                <div className={"w-full max-w-xl"}>
                    <Typography variant="h6" className="mb-16 text-left">
                        Búscar Código
                    </Typography>
                    <Card className="w-full max-w-xl">
                        <CardContent className="flex flex-col mt-1">
                            <TextField
                                className="mt-16"
                                id="code"
                                name="code"
                                label="Código de Tarjeta"
                                value={code ? code : ''}
                                type="text"
                                fullWidth
                                autoFocus
                                onChange={handleInputChange}
                                onKeyDown={onEnterPressCode}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon color="action">card_giftcard</Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" color="secondary" className="mt-20" onClick={handleSearchCode}  disabled={code.length === 0 || searching}>
                                Búscar Código
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full max-w-xl">
                    <Typography variant="h6" className="mb-16 text-left pt-32">
                        Búscar ID de Pedido
                    </Typography>
                    <Card className="w-full max-w-xl">
                        <CardContent className="flex flex-col mt-1">
                            <TextField
                                className="mt-16"
                                id="order"
                                name="order"
                                label="ID de Pedido"
                                value={order ? order : ''}
                                type="text"
                                fullWidth
                                autoFocus
                                onChange={handleOrderInputChange}
                                onKeyDown={onEnterPressOrder}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon color="action">insert_drive_file</Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" color="secondary" className="mt-20" onClick={handleSearchOrder}  disabled={order.length === 0 || searching}>
                                Búscar Pedido
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </FuseAnimate>
    }

    function renderCard() {
        if(!card || !card.order_item){
            return null;
        }
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className="w-full max-w-xl">
                <Card className="w-full max-w-xl">
                    <CardContent className="flex flex-col p-32 mt-1">

                                    <div className="flex flex-col">
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <Typography
                                                    variant="button"
                                                    className="block"
                                                    color="textPrimary"
                                                >
                                                    ID de Pedido: {card.order_item ? card.order_item.order_id : ''}
                                                </Typography>
                                            </div>
                                            <div className="w-1/2">
                                                <Typography
                                                    variant="button"
                                                    className="block text-right"
                                                    color="textPrimary"
                                                >
                                                    ID de Item dentro del Pedido: {card.order_item ? card.order_item.id : ''}
                                                </Typography>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-1/2">
                                                <Typography
                                                    variant="button"
                                                    className="block"
                                                    color="textPrimary"
                                                >
                                                    Activado: {card.activated ? 'SI' : 'NO'}
                                                </Typography>
                                                <Typography
                                                    variant="button"
                                                    className="block"
                                                    color="textPrimary"
                                                >
                                                    Utilizado: {card.used ? 'SI' : 'NO'}
                                                </Typography>
                                            </div>
                                            <div className="w-1/2">
                                                { (card.order_item && card.order_item.pack) ? (
                                                    <Typography
                                                        variant="h6"
                                                        className="block text-right"
                                                        color="textPrimary"
                                                    >
                                                        Pack: { card.order_item.pack.name } { ' ' }
                                                        <small>
                                                        { card.order_item.delivery_type === 'digital' ? 'Digital' : ''}
                                                        { card.order_item.delivery_type === 'physical' ? 'Físico' : ''}
                                                        { card.order_item.delivery_type === 'card' ? 'Físico con Tarjeta' : ''}
                                                        </small>
                                                    </Typography>
                                                ) : null}
                                                { (card.order_item && card.order_item.product) ? (
                                                    <Typography
                                                        variant="h6"
                                                        className="block text-right"
                                                        color="textPrimary"
                                                    >
                                                        Pack: { card.order_item.product.name } { ' ' }
                                                        <small>
                                                        { card.order_item.delivery_type === 'digital' ? 'Digital' : ''}
                                                        { card.order_item.delivery_type === 'physical' ? 'Físico' : ''}
                                                        { card.order_item.delivery_type === 'card' ? 'Físico con Tarjeta' : ''}
                                                        </small>
                                                    </Typography>
                                                ) : null}
                                            </div>
                                        </div>


                                        <Divider className="mt-12 mb-12"/>

                                        <Typography
                                            variant="h6"
                                            className="block mt-3 mb-2"
                                            color="textPrimary"
                                        >
                                            Código: {card.number}
                                        </Typography>

                                        <div className="flex">
                                            <div className="w-1/2">
                                                <TextField
                                                    margin="dense"
                                                    id="custom_number"
                                                    name="custom_number"
                                                    label="Código Alternativo"
                                                    value={(values.custom_number) ? values.custom_number : ''}
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <TextField
                                                    margin="dense"
                                                    id="cvv"
                                                    name="cvv"
                                                    label="CVV"
                                                    value={(values.cvv) ? values.cvv : ''}
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-1/2">
                                                <TextField
                                                    margin="dense"
                                                    id="name"
                                                    name="name"
                                                    label="Nombre"
                                                    value={(values.name) ? values.name : ''}
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <TextField
                                                    margin="dense"
                                                    id="lastname"
                                                    name="lastname"
                                                    label="Apellido"
                                                    value={(values.lastname) ? values.lastname : ''}
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-1/2">
                                                <TextField
                                                    margin="dense"
                                                    id="valid_from"
                                                    name="valid_from"
                                                    label="Válida desde"
                                                    value={(values.valid_from) ? values.valid_from : ''}
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormChange}
                                                />

                                            </div>
                                            <div className="w-1/2">
                                                <TextField
                                                    margin="dense"
                                                    id="valid_thru"
                                                    name="valid_thru"
                                                    label="Válida hasta"
                                                    value={(values.valid_thru) ? values.valid_thru : ''}
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                        </div>










                                        <Button variant="contained" color="secondary" disabled={saving} className="mt-20" fullWidth onClick={() => {
                                            handleModify(card.id);
                                        }}>
                                            Modificar
                                        </Button>
                                    </div>

                        <Button variant="contained" color="primary" className="mt-20" fullWidth onClick={handleBack}>
                            volver
                        </Button>
                    </CardContent>

                </Card>
            </div>
        </FuseAnimate>
    }

    function renderCards() {
        if(!cardValues || cardValues.length === 0){
            return null;
        }
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className="w-full max-w-xl">
                <Card className="w-full max-w-xl">
                    <CardContent className="flex flex-col p-24">
                        <div className="flex flex-col">
                            <Typography
                                variant="h6"
                                className="block"
                                color="textPrimary"
                            >
                                ID de Pedido: {order }
                            </Typography>
                            <Button variant="contained" color="primary" className="mt-20" fullWidth onClick={handleBack} >
                                volver
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full max-w-xl mt-16">
                { cardValues.map((card_item, index) => {
                    if(!card_item || (card_item && !card_item.order_item)){
                        return  null;
                    }
                    if(!card_item.order_item.pack && !card_item.order_item.product){
                        return  null;
                    }
                    return  <CardContent className="flex flex-col p-32 mt-1" key={'card_itms' + card_item.id}>
                            <div className="flex flex-col">
                                { card_item.order_item.pack ? (
                                        <Typography
                                            variant="h6"
                                            className="block"
                                            color="textPrimary"
                                        >
                                            Pack: { card_item.order_item.pack.name } { ' ' }
                                            <small>
                                            { card_item.order_item.delivery_type === 'digital' ? 'Digital' : ''}
                                            { card_item.order_item.delivery_type === 'physical' ? 'Físico' : ''}
                                            { card_item.order_item.delivery_type === 'card' ? 'Físico con Tarjeta' : ''}
                                            </small>
                                        </Typography>
                                ) : null}
                                { card_item.order_item.product ? (
                                    <Typography
                                        variant="h6"
                                        className="block"
                                        color="textPrimary"
                                    >
                                        Pack: { card_item.order_item.product.name } { ' ' }
                                        <small>
                                        { card_item.order_item.delivery_type === 'digital' ? 'Digital' : ''}
                                        { card_item.order_item.delivery_type === 'physical' ? 'Físico' : ''}
                                        { card_item.order_item.delivery_type === 'card' ? 'Físico con Tarjeta' : ''}
                                        </small>
                                    </Typography>
                                ) : null}

                                <div className="flex">
                                    <div className="w-1/2">
                                        <Typography
                                            variant="button"
                                            className="block"
                                            color="textPrimary"
                                        >
                                            Código: { card_item.number }
                                        </Typography>
                                    </div>
                                    <div className="w-1/2">
                                        <Typography
                                            variant="button"
                                            className="block text-right"
                                            color="textPrimary"
                                        >
                                            Activado: {card_item.activated ? 'SI' : 'NO'}
                                        </Typography>
                                        <Typography
                                            variant="button"
                                            className="block text-right"
                                            color="textPrimary"
                                        >
                                            Utilizado: {card_item.used ? 'SI' : 'NO'}
                                        </Typography>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/2">
                                        <TextField
                                            margin="dense"
                                            id={"cards_custom_number" + card_item.id}
                                            name="custom_number"
                                            label="Código Alternativo"
                                            // idRef={card_item.id}
                                            value={(card_item.custom_number) ? card_item.custom_number : ''}
                                            type="text"
                                            fullWidth
                                            onChange={(e) => handleFormOrderChange(card_item, e)}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <TextField
                                            margin="dense"
                                            name="cvv"
                                            id={"cards_cvv" + card_item.id}
                                            label="CVV"
                                            value={(card_item.cvv) ? card_item.cvv : ''}
                                            type="text"
                                            fullWidth
                                            onChange={(e) => handleFormOrderChange(card_item, e)}
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/2">
                                        <TextField
                                            margin="dense"

                                            id={"cards_name" + card_item.id}
                                            name="name"
                                            label="Nombre"
                                            value={(card_item.name) ? card_item.name : ''}
                                            type="text"
                                            fullWidth
                                            onChange={(e) => handleFormOrderChange(card_item, e)}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <TextField
                                            margin="dense"
                                            id={"cards_lastname" + card_item.id}
                                            name="lastname"
                                            label="Apellido"
                                            value={(card_item.lastname) ? card_item.lastname : ''}
                                            type="text"
                                            fullWidth
                                            onChange={(e) => handleFormOrderChange(card_item, e)}
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/2">
                                        <TextField
                                            margin="dense"
                                            id={"cards_valid_from" + card_item.id}
                                            name="valid_from"
                                            label="Válida desde"
                                            value={(card_item.valid_from) ? card_item.valid_from : ''}
                                            type="text"
                                            fullWidth
                                            onChange={(e) => handleFormOrderChange(card_item, e)}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <TextField
                                            margin="dense"
                                            id={"cards_valid_thru" + card_item.id}
                                            name="valid_thru"
                                            label="Válida hasta"
                                            value={(card_item.valid_thru) ? card_item.valid_thru : ''}
                                            type="text"
                                            fullWidth
                                            onChange={(e) => handleFormOrderChange(card_item, e)}
                                        />
                                    </div>
                                </div>

                                <Button variant="contained" color="secondary" disabled={saving} className="mt-20" fullWidth onClick={() => {
                                    handleModifyOrder(card_item);
                                }}>
                                    Modificar
                                </Button>
                                <Button variant="outlined"  className="mt-20" fullWidth onClick={handleBack} >
                                    volver
                                </Button>
                            </div>
                        <Divider/>
                        </CardContent>
                }) }
                </Card>

                <Card className="w-full max-w-xl mt-16">
                    <CardContent className="flex flex-col p-24">
                        <div className="flex flex-col">
                            <Button variant="contained" color="primary" className="mt-20" fullWidth onClick={handleBack} >
                                volver
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </FuseAnimate>
    }

    function renderExchangedForm() {
        return <FuseAnimate animation="transition.fadeIn" delay={300}>
            <div className="w-full max-w-xl items-center content-center justify-center">
                <Typography variant="h6" className="mb-32 text-left text-green">
                    ¡La tarjeta fue modificada correctamente!
                </Typography>
                <Button variant="contained" color="secondary" className="mt-20" fullWidth onClick={handleBack} disabled={code.length === 0 || searching}>
                    volver
                </Button>
            </div>
        </FuseAnimate>
    }

    if(cards.length > 0){
        return renderCards();
    }else{
        if(saved){
            return renderExchangedForm();
        }
    }

    if(values){
        return renderCard();
    }
    return renderForm();

}

export default withReducer('CardApp', reducer)(ModifyCardView);
