import {NgModule} from '@angular/core';
import {GWizardComponent} from './g-wizard.component';
import {GStepComponent} from './g-step/g-step.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GTemplateModule} from '../g-template/g-template.module';

@NgModule({
  imports: [
    GTemplateModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    GTemplateModule,
    GWizardComponent,
    GStepComponent
  ],
  declarations: [
    GWizardComponent,
    GStepComponent
  ]
})
export class GWizardModule { }
