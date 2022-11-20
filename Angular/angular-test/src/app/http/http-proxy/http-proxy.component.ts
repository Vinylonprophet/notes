/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-20 16:26:19
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-20 16:33:56
 * @FilePath: \angular-test\src\app\http\http-proxy\http-proxy.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-proxy',
  templateUrl: './http-proxy.component.html',
  styleUrls: ['./http-proxy.component.css']
})
export class HttpProxyComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("/api/hello").subscribe(console.log)
  }

}
