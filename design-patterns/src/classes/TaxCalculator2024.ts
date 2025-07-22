import TaxCalculator from "../interface/TaxCalculator"

export default class TaxCalculator2024 implements TaxCalculator {
    calculateTax(totalIncome: number): number {
        return totalIncome*0.3;
    }
    calculateInsurance(InsuredAmt: number): number{
        return InsuredAmt*.121;
    }
}