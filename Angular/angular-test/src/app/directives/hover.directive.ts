import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

interface Options {
  bgColor?: string;
}

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements AfterViewInit{

  @Input("appHover") appHover: Options = {}

  element: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    console.log("appHover", this.elementRef.nativeElement);
    this.element.style.backgroundColor = this.appHover.bgColor || "skyblue";
  }

  @HostListener('mouseenter') enter() {
    this.element.style.backgroundColor = "pink";
  }

  @HostListener('mouseleave') leave() {
    this.element.style.backgroundColor = "red";
  }
}
