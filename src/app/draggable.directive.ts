import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LavagnaStateService } from './lavagna-state.service';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private isDragging = false;
  private initialX!: number;
  private initialY!: number;

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

    this.renderer.setStyle(this.el.nativeElement, 'left', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${y}px`);
    // console.log('new pos x', this.initialX, ' y:', +this.initialY);
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDragging = false;
    const id = +this.el.nativeElement.getAttribute('data-id');
    this.lavagnaState.updateElementPosition(
      id,
      parseInt(this.el.nativeElement.style.left, 10),
      parseInt(this.el.nativeElement.style.top, 10)
    );
  }
}
