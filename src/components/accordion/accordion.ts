import { Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent {

  accordionExpanded = false;
  @ViewChild('cc') cardContent : any;
  // @Input('name') name:string;
  // @Input('seats') seats:number;
  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  constructor(public render: Renderer) {
  }

  ngOnInit() {
    this.render.setElementStyle(this.expandWrapper.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }

  ngAfterViewInit(){
  //  this.render.setElementStyle(this.expandWrapper.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
    this.render.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + '%');   
  }

  toggleAccordion(){
    if(this.accordionExpanded){
      this.render.setElementStyle(this.cardContent.nativeElement,"max-height","0px")
      this.render.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
      
    }else{
      this.render.setElementStyle(this.cardContent.nativeElement,"max-height","500px")
      this.render.setElementStyle(this.cardContent.nativeElement, "padding", "2px 0px");
  
    }

    this.accordionExpanded = !this.accordionExpanded;    
  }

}
