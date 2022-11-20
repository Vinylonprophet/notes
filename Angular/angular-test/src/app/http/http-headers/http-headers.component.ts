/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-20 15:20:13
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-20 15:24:28
 * @FilePath: \angular-test\src\app\http\http-headers\http-headers.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-headers',
  templateUrl: './http-headers.component.html',
  styleUrls: ['./http-headers.component.css']
})
export class HttpHeadersComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let headers = new HttpHeaders({
      name: "Vinylon"
    })

    // mock没设置请求头，但是发送请求的例子没什么问题
    this.http.get("http://localhost:7878/users", { headers }).subscribe(console.log)
  }

}
