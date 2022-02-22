export class Helper {
  static addHours(date: any, hours: number): number {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result.getTime();
  }

  static sortDate(a: Array<number>, b: Array<number>): number {
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1
    }
    return 0;
  }
}
