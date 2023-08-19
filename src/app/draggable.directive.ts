import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LavagnaStateService } from './lavagna-state.service';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private isDragging = false;
  private initialX!: number;
  private initialY!: number;
  private initialXperc!: number;
  private initialYperc!: number;
  private maxW: number = window.innerWidth;
  private maxH: number = window.innerHeight;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private lavagnaState: LavagnaStateService
  ) {}

  //nuovo con touch

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onStart(event: MouseEvent | TouchEvent) {
    event.preventDefault(); // Evita comportamenti indesiderati del tocco
    this.isDragging = true;

    if (event instanceof MouseEvent) {
      this.initialX = event.clientX - this.el.nativeElement.offsetLeft;
      this.initialY = event.clientY - this.el.nativeElement.offsetTop;
    } else if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.initialX = touch.clientX - this.el.nativeElement.offsetLeft;
      this.initialY = touch.clientY - this.el.nativeElement.offsetTop;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    let x, y;

    if (event instanceof MouseEvent) {
      x = event.clientX - this.initialX;
      y = event.clientY - this.initialY;
    } else if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      x = touch.clientX - this.initialX;
      y = touch.clientY - this.initialY;
    }
    this.initialXperc = (100 * this.initialX) / this.maxW;
    this.initialYperc = (100 * this.initialY) / this.maxH;
    const xEndPerc = (100 * x!) / this.maxW;
    const yEndPerc = (100 * y!) / (this.maxW / 1.9554);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${xEndPerc}%`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${yEndPerc}%`);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  onStop() {
    this.isDragging = false;
    const id = +this.el.nativeElement.getAttribute('data-id');
    this.lavagnaState.updateElementPosition(
      id,
      this.el.nativeElement.style.left,
      this.el.nativeElement.style.top
    );
  }

  //fine nuovo

  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event: MouseEvent) {
  //   this.isDragging = true;
  //   this.initialX = event.clientX - this.el.nativeElement.offsetLeft;
  //   this.initialY = event.clientY - this.el.nativeElement.offsetTop;
  //   // console.log('Start pos x', this.initialX, ' y:', +this.initialY);
  // }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (!this.isDragging) return;

  //   const x = event.clientX - this.initialX;
  //   const y = event.clientY - this.initialY;
  //   this.initialXperc = (100 * this.initialX) / this.maxW;
  //   this.initialYperc = (100 * this.initialY) / this.maxH;
  //   const xEndPerc = (100 * x) / this.maxW;
  //   const yEndPerc = (100 * y) / (this.maxW / 1.9554);
  //   //muove con % OK FUNZIONA
  //   this.renderer.setStyle(this.el.nativeElement, 'left', `${xEndPerc}%`);
  //   this.renderer.setStyle(this.el.nativeElement, 'top', `${yEndPerc}%`);
  //   console.log('x: ', xEndPerc, ' y: ', yEndPerc);

  //   //muove con px
  //   // this.renderer.setStyle(this.el.nativeElement, 'left', `${x}px`);
  //   // this.renderer.setStyle(this.el.nativeElement, 'top', `${y}px`);
  //   // console.log('new pos x', this.initialX, ' y:', +this.initialY);
  // }

  // @HostListener('mouseup')
  // onMouseUp() {
  //   this.isDragging = false;
  //   const id = +this.el.nativeElement.getAttribute('data-id');
  //   this.lavagnaState.updateElementPosition(
  //     id,
  //     //invia le %
  //     this.el.nativeElement.style.left,
  //     this.el.nativeElement.style.top
  //     //invia i px
  //     // parseInt(this.el.nativeElement.style.left, 10),
  //     // parseInt(this.el.nativeElement.style.top, 10)
  //   );
  // }
}
