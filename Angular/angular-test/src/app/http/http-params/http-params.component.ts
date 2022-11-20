/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-20 15:12:38
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-20 15:13:44
 * @FilePath: \angular-test\src\app\http\http-params\http-params.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-params',
  templateUrl: './http-params.component.html',
  styleUrls: ['./http-params.component.css']
})
export class HttpParamsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let params = new HttpParams({
      // object
      fromObject: {
        appID: "4",
        appName: "Insomnia",
        userName: "Vinylon",
        userAge: "20"
      },
      // string
      // fromString: "id=4"
    })
    // params = params.append("appName", "Insomnia")
    // 带参请求
    // fromObject
    this.http.get("http://localhost:7878/templateSwitchGetParams", { params }).subscribe(console.log)

    // fromString，由于此条url的返回结果是一样的，所以此时可以查看chrome中的network
    // this.http.get("http://localhost:7878/users", { params }).subscribe(console.log)
  }

}
