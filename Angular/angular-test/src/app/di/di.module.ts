/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 15:23:54
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 15:45:00
 * @FilePath: \angular-test\src\app\di\di.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule, ReflectiveInjector } from '@angular/core';
import { CommonModule } from '@angular/common';

// DI框架有四个核心概念
// 1.Dependecy：组件要依赖的实例对象，服务实例对象
// 2.Token：获取服务实例对象的标识————（其实就是类的名字）
// 3.Injector：注入器，负责创建维护服务类的实例对象并向组件中注入服务实例对象
// 4.Provider：配置注入器的对象，指定创建服务实例对象的服务类和获取实例对象的标识


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DiModule { }

// 服务类
class MailService { }

// -------------------- 注入器 Injectors --------------------
// 1.创建注入器，接收服务类作为参数
const injector1 = ReflectiveInjector.resolveAndCreate([MailService])

// 2.通过注入器方法得到一个实对象
// 3.服务实例对象为单例模式，注入器在创建服务实例之后会对其进行缓存
const mailService1 = injector1.get(MailService)
const mailService2 = injector1.get(MailService)

// 3.angular可以在服务之间共享数据，就是因为服务实例对象为单例模式，注入器在创建服务实例后会对其进行缓存，返回true加以验证
console.log("验证服务实例对象为单例模式，为true?", mailService1 === mailService2);

// 4.创建子级注入器，不同的注入器返回不同的服务实例对象
const childInjector1 = injector1.resolveAndCreateChild([MailService]);
const mailService3 = childInjector1.get(MailService);
console.log("验证不同注入器返回不同的服务实例对象，为false?", mailService1 === mailService3);

// 5.服务实例的查找类似函数作用域链，当前级别可以找到就使用当前级别，当前级别找不到就去父级查找
const childInjector2 = injector1.resolveAndCreateChild([]);
const mailService4 = childInjector2.get(MailService);
console.log("服务实例的查找是否去父级进行查找，为true?", mailService1 === mailService4);

// -------------------- 提供者 Provider --------------------
const injector2 = ReflectiveInjector.resolveAndCreate([
  // 上述是简写，完整写法可以如下：
  { provide: "mail", useClass: MailService }
])

// 这样做的好处是将实例对象和外部的引用建立了松耦合关系，外部通过标识获取实习对象，只要标识保持不变，内部代码怎么变都不会影响到外部
const mailService5 = injector2.get("mail");
console.log(mailService5);

// -------------------- useValue --------------------
const injector3 = ReflectiveInjector.resolveAndCreate([
  {
    provide: "config",
    // 冻结，只能在外部获取，不能修改
    useValue: Object.freeze({
      APIKET: "API1234567890",
      APISCRET: "500-400-300"
    })
  }
])

const mailService6 = injector3.get("config");
console.log(mailService6);
// 如果不进行以上冻结，是可以进行更改的
mailService6.APIKET = "API0987654321";
console.log(mailService6);
