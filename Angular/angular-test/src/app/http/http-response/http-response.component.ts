/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-20 15:27:43
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-20 15:30:56
 * @FilePath: \angular-test\src\app\http\http-response\http-response.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-response',
  templateUrl: './http-response.component.html',
  styleUrls: ['./http-response.component.css']
})
export class HttpResponseComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // observe一个可以选择body一个可以选择response
    // reponse表示的是完整的响应体
    this.http.get("http://localhost:7878/users", { observe: "response" }).subscribe(console.log)
  }

}
