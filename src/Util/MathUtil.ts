export class MathUtil{
    static toFixed(number, decimals = 3){
        return parseFloat(number.toFixed(decimals));    
    }
}