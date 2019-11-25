import {
  AfterViewInit, Component, OnDestroy, OnInit, Input,
  QueryList, AfterContentInit, ContentChildren, EventEmitter, Output
} from '@angular/core';
import {GStepComponent} from './g-step/g-step.component';
import {GTemplateComponent} from '../g-template/g-template.component';
import {Router} from '@angular/router';

@Component({
  providers: [],
  selector: 'g-wizard',
  templateUrl: './g-wizard.component.html',
  styleUrls: ['./g-wizard.component.scss']
})

export class GWizardComponent extends GTemplateComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  @Input() debug: boolean = false;
  @Input() steps: Step[] = [];
  @Output() onIndexChange: EventEmitter<{previous: number, value: number}> = new EventEmitter<{previous: number, value: number}>();
  @Output() onStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(GStepComponent) gSteps: QueryList<GStepComponent>;

  public baseUrl: string;
  public gWizard = this;
  public index: number = -1;
  private debugLog: string[] = [];
  private _useRouter: boolean = false;
  private _gSteps: GStepComponent[] = [];

  public constructor(private router: Router) {
    super();
    console.log('router', this.router);
    const split = this.router.url.split('/');
    this.baseUrl = '/' + split[1];
  }

  public ngOnInit(): void {
    console.log('GWizardComponent', this);
    this.addDebug('Wizard Loaded');
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.gSteps.forEach(i => {
      this._gSteps.push(i);
    });
    this._useRouter = this.steps.length > 0 ? true : false;
    if (this.debug || this.getTemplate('start')) {
      this.showStep(-1);
    } else {
      this.start();
    }
  }

  public reset() {
    this.showStep(-1);
  }

  public cancel() {
    this.showStep(-1);
  }

  public start() {
    this.showStep(0);
  }

  public next() {
    this.showStep(this.index + 1);
  }

  public back() {
    this.showStep(this.index - 1);
  }

  public showStep(number: number) {
    if (number <= -1) {
      this.index = -1;
    } else if (number >= this.steps.length) {
      this.submit();
      this.index = -1;
    } else if (number <= 0) {
      this.index = 0;
    } else {
      this.index = number;
    }

    if (this._gSteps[this.index]) {
      this._gSteps.forEach(i => i.show = false);
      this._gSteps[this.index].show = true;
    } else if (this._useRouter && this.index === -1) {
      this.addDebug(`Routing to "${this.baseUrl}", Index:${this.index}`)
      this.router.navigate([this.baseUrl]);
    } else if (this._useRouter) {
      this.addDebug(`Routing to "${this.steps[this.index].route}", Index:${this.index}`);
      this.router.navigate([this.baseUrl, this.steps[this.index].route]);
    }
  }

  public routeTo(index: number) {}

  public getDebugLog() {
    return this.debugLog;
  }

  private submit() {
    this.addDebug('Emitting onSubmit');
    this.onSubmit.emit();
  }

  private addDebug(message: string) {
    if (this.debug) {
      this.debugLog.unshift(`${Date.now()} ${this.debugLog.length}. ${message}`);
    }
  }
}

export interface Step {
  icon: string;
  route: string;  // This needs to be unique and configured as an angular route
  label: string;
  data?: string;
}
