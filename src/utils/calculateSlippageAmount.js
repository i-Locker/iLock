import { Fraction } from '@uniswap/sdk-core';
export function calculateSlippageAmount(value, slippage) {
    const userSlippage = slippage > 0 ? slippage : 1;
    const fraction = new Fraction(userSlippage, 100)
        .multiply(new Fraction(value, 1))
        .divide(new Fraction(100, 1))
        .subtract(new Fraction(value, 1));
    const removeSign = Math.abs(parseFloat(fraction.toFixed(0).toString()));
    return fraction.quotient.toString().split('-')[1];
}
