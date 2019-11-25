import {Component, OnInit, AfterContentInit, Input, AfterViewInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GTemplateComponent} from '../g-template';

@Component({
  providers: [],
  selector: 'g-form',
  templateUrl: './g-form.component.html',
  styleUrls: ['./g-form.component.scss'],
})

export class GFormComponent extends GTemplateComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @Input() form: FormGroup = this.fb.group({});
  @Input() changeValidation: boolean = true;
  private defaultData: object;

  constructor (public fb: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    if (this.changeValidation) {
      this.form.setValidators((group: FormGroup) => this.validateUniqueValues(group));
      this.form.updateValueAndValidity();
    }
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {
    this.defaultData = Object.assign({}, this.form.value);
  }

  public validateUniqueValues(group: FormGroup): any {
    let result = {notMatching: true};
    if (!this.defaultData) {
      return result;
    }
    Object.keys(group.value).forEach(key => {
      if (this.defaultData[key] !== group.value[key]) {
        result = null;
      }
    });
    return result;
  }
}
