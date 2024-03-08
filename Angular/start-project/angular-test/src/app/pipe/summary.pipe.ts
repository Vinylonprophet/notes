/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-13 16:40:06
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-13 16:41:55
 * @FilePath: \angular-test\src\app\pipe\summary.pipe.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, limit?: number): string {
    return value.substr(0, limit || 10) + "...";
  }

}
