
export function buildAddressString(userInformation) {
    let address =  ((userInformation.street_name) ? userInformation.street_name : '') +
        ((userInformation.street_number && userInformation.street_number.length > 0) ? ' ' + userInformation.street_number : '');

    address +=  ((userInformation.city && userInformation.city.length > 0) ? ((address.length > 0 ) ? ', ' : '' ) + userInformation.city : '') +
        ((userInformation.zip_code && userInformation.zip_code.length > 0) ? ' (' + userInformation.zip_code + ')' : '') +
        ((userInformation.state && userInformation.state.length > 0) ? ((address.length > 0 ) ? ', ' : '' ) + userInformation.state : '');
    if(address.length === 0){
        return null;
    }
    return address;
}
