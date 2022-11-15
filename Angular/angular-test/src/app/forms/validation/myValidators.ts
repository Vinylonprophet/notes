/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-15 10:48:39
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-15 11:21:03
 * @FilePath: \angular-test\src\app\forms\validation\myValidators.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MyValidators {
  // 必须是静态方法，AbstractControl是FormControl实例的类型
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if (/\s/.test(control.value)) {
      return {
        // 属性和方法的名字保持一致
        cannotContainSpace: true
      }
    }
    return null
  }

  // 异步的自定义验证器
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    // 无论验证是否通过，都要调用resolve方法
    return new Promise (function(resolve){
      setTimeout(function(){
        if(control.value === "admin"){
          resolve({shouldBeUnique: true})
        } else {
          resolve(null);
        }
      }, 2000)
    })
  }
}
