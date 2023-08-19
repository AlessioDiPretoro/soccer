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

  ngOnInit() {
    console.log('maxW', this.maxW, 'maxH', this.maxH);
    // maxW : 100% = posX : x%?
    // x% = 100*posX/maxW
    // maxH : 100% = posY : y%?
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private lavagnaState: LavagnaStateService
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX - this.el.nativeElement.offsetLeft;
    this.initialY = event.clientY - this.el.nativeElement.offsetTop;
    // console.log('Start pos x', this.initialX, ' y:', +this.initialY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const x = event.clientX - this.initialX;
    const y = event.clientY - this.initialY;
    this.initialXperc = (100 * this.initialX) / this.maxW;
    this.initialYperc = (100 * this.initialY) / this.maxH;
    const xEndPerc = (100 * x) / this.maxW;
    const yEndPerc = (100 * y) / (this.maxW / 1.9554);
    //muove con % OK FUNZIONA
    this.renderer.setStyle(this.el.nativeElement, 'left', `${xEndPerc}%`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${yEndPerc}%`);
    console.log('x: ', xEndPerc, ' y: ', yEndPerc);

    //muove con px
    // this.renderer.setStyle(this.el.nativeElement, 'left', `${x}px`);
    // this.renderer.setStyle(this.el.nativeElement, 'top', `${y}px`);
    // console.log('new pos x', this.initialX, ' y:', +this.initialY);
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDragging = false;
    const id = +this.el.nativeElement.getAttribute('data-id');
    this.lavagnaState.updateElementPosition(
      id,
      //invia le %
      this.el.nativeElement.style.left,
      this.el.nativeElement.style.top
      //invia i px
      // parseInt(this.el.nativeElement.style.left, 10),
      // parseInt(this.el.nativeElement.style.top, 10)
    );
  }
}
