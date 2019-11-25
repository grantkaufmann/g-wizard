import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GTemplateModule} from '../g-template';
import {GFormModule} from '../g-form';
import {GWizardComponent} from './g-wizard.component';
import {GStepModule} from './g-step';

@NgModule({
  imports: [
    GTemplateModule,
    RouterModule,
    CommonModule,
    GStepModule,
    GFormModule
  ],
  exports: [
    GTemplateModule,
    GWizardComponent,
    GStepModule,
    GFormModule
  ],
  declarations: [
    GWizardComponent
  ]
})
export class GWizardModule { }
