export function currencyId(currency) {
    if (currency.isNative)
        return 'ETH';
    if (currency.isToken)
        return currency.address;
    throw new Error('invalid currency');
}
