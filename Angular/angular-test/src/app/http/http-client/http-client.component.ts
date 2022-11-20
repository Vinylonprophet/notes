/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-18 18:16:01
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-20 15:09:31
 * @FilePath: \angular-test\src\app\http\http-client\http-client.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {

  // 注入实例
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // 请求方法有get，post，delete，put
    this.http.get("http://localhost:7878/users").subscribe(console.log)

  }

}
