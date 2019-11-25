import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GFormComponent} from './g-form.component';
import {GTemplateModule} from '../g-template';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GTemplateModule
  ],
  exports: [
    GFormComponent,
    GTemplateModule
  ],
  declarations: [
    GFormComponent
  ],
  providers: []
})
export class GFormModule {}
