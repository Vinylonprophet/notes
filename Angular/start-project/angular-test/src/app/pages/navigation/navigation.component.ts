/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-16 00:15:02
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-16 21:17:58
 * @FilePath: \angular-test\src\app\pages\navigation\navigation.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // 获取路由参数，查询参数
    // this.route.queryParamMap.subscribe(query => {
    //   console.log(query.get("name"));
    // })

    // 获取路由参数，动态参数
    this.route.paramMap.subscribe(query => {
      console.log(query.get("name"));
    })
  }

}
