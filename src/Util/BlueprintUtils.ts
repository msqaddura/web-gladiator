export class BlueprintUtil {
  static repeat(
    times: number,
    item: any,
    transform: (item, index?: number, times?: number) => any,
    lazy = false
  ): any {
    if (lazy) {
      return () => BlueprintUtil.repeat(times, item, transform);
    }

    const result = [];
    for (let i = 0; i < times; i++) {
      result.push(transform(item, i, times));
    }
    return result;
  }

  clone(blueprint) {
    return JSON.parse(JSON.stringify(blueprint));
  }
}
