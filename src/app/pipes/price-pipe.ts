import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "price",
    standalone: false
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    /*
    if (price >= 1000 * 1000 * 10) {
      return (price / 1000 / 1000).toFixed(0) + "M"
    }
    if (price >= 1000 * 1000) {
      return (price / 1000 / 1000).toFixed(1).replace(/.0$/, "") + "M"
    }
    if (price >= 1000 * 10) {
      return (price / 1000).toFixed(0) + "k"
    }
    if (price >= 1000) {
      return (price / 1000).toFixed(0) + "k"
    }
    */
    if (price >= 1000 && price % 1000 === 0) {
      return (price / 1000).toFixed(3).replace("\.000", "") + "k"
    }
    if (price >= 1000 && price % 1000 !== 0 && price % 100 === 0) {
      return (price / 1000).toFixed(1).replace("/.0$/", "") + "k"
    }
    return price.toFixed(0)
  }

}
