import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  form: FormGroup = new FormGroup({
    gender: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
