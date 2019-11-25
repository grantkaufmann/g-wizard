import {Directive, ElementRef, Input, TemplateRef, OnInit} from '@angular/core';

@Directive({
  selector: '[gTemplate]',
  exportAs: 'gTemplate'
})
export class GTemplateDirective implements OnInit {
  @Input() set gTemplate(value: string) {
    this.name = value;
  }
  private name: string;
  private template: TemplateRef<ElementRef>;
  constructor(
    private templateRef: TemplateRef<ElementRef>,
  ) {
    this.template = this.templateRef;
  }

  public ngOnInit() {}

  public getName(): string {
    return this.name;
  }
  public getTemplate(): TemplateRef<ElementRef> {
    return this.template;
  }
}
