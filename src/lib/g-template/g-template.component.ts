import {AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import {GTemplateDirective} from './g-template.directive';

export class GTemplateComponent implements AfterContentInit {
  @ContentChildren(GTemplateDirective) gTemplates: QueryList<GTemplateDirective>;
  protected POSTFIX: string = 'Template';

  constructor () {}

  public ngAfterContentInit(): void {
    this.gTemplates.forEach(template => {
      const name = template.getName() + this.POSTFIX;
      this[name] = template.getTemplate();
    });
  }

  public getTemplate(input: string) {
    return this[input + this.POSTFIX];
  }
}
