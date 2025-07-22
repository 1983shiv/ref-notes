import TaxCalculator from "../interface/TaxCalculator"

export default class TaxCalculator2025 implements TaxCalculator {
    calculateTax(totalIncome: number): number {
        return totalIncome*0.4;
    }
     
}