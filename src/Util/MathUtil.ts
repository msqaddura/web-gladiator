export class MathUtil {
  static DEG_TO_RADIAN = 0.017453292519943295;
  static toFixed(number, decimals = 3) {
    return parseFloat(number.toFixed(decimals));
  }

  static degToRadian(degree: number) {
    return degree * this.DEG_TO_RADIAN;
  }
}
