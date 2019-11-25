import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GTemplateModule} from '../../g-template';
import {GStepComponent} from './g-step.component';

@NgModule({
  imports: [
    GTemplateModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    GTemplateModule,
    GStepComponent,
    GTemplateModule
  ],
  declarations: [
    GStepComponent
  ]
})
export class GStepModule {}
