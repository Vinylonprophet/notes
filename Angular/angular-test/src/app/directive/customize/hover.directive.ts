/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-13 15:49:32
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-13 15:52:16
 * @FilePath: \angular-test\src\app\directive\customize\hover.directive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private elementRef: ElementRef) { }

}
