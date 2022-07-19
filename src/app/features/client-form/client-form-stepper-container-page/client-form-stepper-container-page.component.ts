import { Component, OnDestroy, OnInit, TrackByFunction, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterModule,
  Routes
} from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper, MatStepperModule, } from '@angular/material/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { ClientFormService } from '../client-form.service';
import { IClientCreateFormStep, IClientCreateFormStepRouteData } from '../types';

@Component({
  standalone: true,
  selector: 'app-client-form-stepper-container-page',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './client-form-stepper-container-page.component.html',
  styleUrls: ['./client-form-stepper-container-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientFormStepperContainerPageComponent implements OnInit, OnDestroy {
  private _destroyed: Subject<void> = new Subject<void>();

  steps!: IClientCreateFormStep[];

  selectedStep!: IClientCreateFormStep;

  selectedStepIndex!: number;

  selectedStepControl!: FormGroup;

  stepperOrientation$!: Observable<StepperOrientation>;

  stepComponentLoading: boolean = false;

  trackByFn: TrackByFunction<IClientCreateFormStep> = (index, item) => item.stepId;

  @ViewChild('clientFormStepper') clientFormStepper!: MatStepper;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private matSnackBar: MatSnackBar,
    private clientFormService: ClientFormService,
  ) {
    this.stepperOrientation$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(
        map(({ matches }) => (!matches ? 'horizontal' : 'vertical') as StepperOrientation)
      );

    this.steps = (this.route.snapshot.routeConfig?.children as Routes).map((child) => {
      const stepRouteData = child.data as IClientCreateFormStepRouteData;
      return {
        stepId: stepRouteData.stepId,
        stepLabel: stepRouteData.stepLabel,
        stepRoutePath: child.path as string
      };
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route.snapshot.firstChild?.data as IClientCreateFormStepRouteData),
      takeUntil(this._destroyed)
    )
      .subscribe((activeStepRouteData) => {
        this.selectedStep = this.steps.find((step) => activeStepRouteData.stepId === step.stepId) as IClientCreateFormStep;
        this.selectedStepIndex = this.steps.findIndex((step) => activeStepRouteData.stepId === step.stepId);
        this.selectedStepControl = this.clientFormService.getClientStepFormById(this.selectedStep.stepId);
      });

    this.router.events
      .pipe(takeUntil(this._destroyed))
      .subscribe((event) => {
        if (event instanceof RouteConfigLoadStart) {
          this.stepComponentLoading = true;
        }
        if (event instanceof RouteConfigLoadEnd) {
          this.stepComponentLoading = false;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this.clientFormService.reset();
  }

  onStepperSelectionChange(event: StepperSelectionEvent) {
    const selectedStep = this.steps[event.selectedIndex];

    this.router.navigate([selectedStep.stepRoutePath], {
      relativeTo: this.route
    });
  }

  onBackBtnClick() {
    this.clientFormStepper.previous();
  }

  onNextBtnClick() {
    if (this.selectedStepControl.invalid) {
      this.selectedStepControl.markAllAsTouched();
      return;
    }
    if (this.selectedStepIndex < this.steps.length - 1) {
      this.clientFormStepper.next();
      return;
    }

    // is last step
    if (this.selectedStepIndex === this.steps.length - 1) {
      this._showSnackbarAndNavigateToCreatedClientPage();
    }

  }

  onStepperAnimationDone() {}

  private _showSnackbarAndNavigateToCreatedClientPage() {
    this.matSnackBar.open(
      'You have successfully completed your profile creation',
      'Nice',
      { duration: 1000 }
    )
      .afterDismissed()
      .pipe(
        switchMap(() =>
          this.router.navigate(['/created-client'], {
            replaceUrl: true,
            state: { clientData: this.clientFormService.getValue() }
          })
        )
      )
      .subscribe();
  }
}
