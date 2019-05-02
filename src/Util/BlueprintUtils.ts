export class BlueprintUtil {
  static repeat(
    times: number,
    item: any,
    transform: (item, index?: number, times?: number) => any
  ) {
    const result = [];
    for (let i = 0; i < times; i++) {
      result.push(transform(item, i, times));
    }
    console.log(result);
    return result;
  }
}
