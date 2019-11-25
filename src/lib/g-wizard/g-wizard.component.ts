import {
  AfterViewInit, Component, OnDestroy, OnInit, Input,
  QueryList, AfterContentInit, ContentChildren, EventEmitter, Output, ViewChildren
} from '@angular/core';
import {GStepComponent} from './g-step/g-step.component';
import {GTemplateComponent} from '../g-template/g-template.component';
import {Router} from '@angular/router';

@Component({
  providers: [],
  selector: 'g-wizard',
  queries: {
    theGSteps: new ViewChildren(GStepComponent)
  },
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
  private _debugLog: string[] = [];
  private _useRouter: boolean = false;
  private _gSteps: GStepComponent[] = [];

  public constructor(
    private _router: Router
  ) {
    super();
    console.log('router', this._router.url);
    const split = this._router.url.split('/');
    this.baseUrl = '/' + split[1];
  }

  public ngOnInit(): void {
    console.log('GWizardComponent', this);
    this._addDebug('Wizard Loaded');
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
      this._addDebug('Emitting onSubmit');
      this.onSubmit.emit();
      this.index = -1;
    } else if (number <= 0) {
      this._addDebug('Emitting onStart');
      this.onStart.emit();
      this.index = 0;
    } else {
      this.index = number;
    }

    if (this._gSteps[this.index]) {
      this._gSteps.forEach(i => i.show = false);
      this._gSteps[this.index].show = true;
    } else if (this._useRouter && this.index === -1) {
      this._addDebug(`Routing to "${this.baseUrl}", Index:${this.index}`)
      this._router.navigate([this.baseUrl]);
    } else if (this._useRouter) {
      this._addDebug(`Routing to "${this.steps[this.index].route}", Index:${this.index}`);
      this._router.navigate([this.baseUrl, this.steps[this.index].route]);
    }
  }

  public getDebugLog() {
    return this._debugLog;
  }

  private _addDebug(message: string) {
    if (this.debug) {
      this._debugLog.unshift(`${Date.now()} ${this._debugLog.length}. ${message}`);
    }
  }
}

export interface Step {
  icon: string;
  route: string;  // This needs to be unique and configured as an angular route
  label: string;
  data?: string;
}
