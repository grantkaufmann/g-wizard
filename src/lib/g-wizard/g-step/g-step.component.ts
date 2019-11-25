import { Component, OnInit, Input } from '@angular/core';

@Component({
  providers: [],
  selector: 'g-step',
  templateUrl: './g-step.component.html',
  styleUrls: ['./g-step.component.scss']
})
export class GStepComponent implements OnInit {
  @Input() routerLink: string;
  @Input() show: boolean = false;
  constructor() { }

  public ngOnInit(): void {}

  public setShow(value: boolean) {
    this.show = value;
  }

}
