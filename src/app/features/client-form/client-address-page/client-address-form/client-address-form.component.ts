import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

import { Subject, takeUntil } from 'rxjs';

import { Country, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city/lib/interface';

import { AddressModel } from '@app/models';
import { ControlsOf } from '@app/features/client-form/types';
import { MapperPipe, MapperPipeFn, FormErrorMessagePipe } from '@app/shared/pipes';

@Component({
  selector: 'app-client-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormErrorMessagePipe,
    MapperPipe
  ],
  templateUrl: './client-address-form.component.html',
  styleUrls: [
    './client-address-form.component.scss',
    '../../client-form.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ClientAddressFormComponent implements OnInit, OnDestroy {
  private _destroyed: Subject<void> = new Subject<void>();

  @Input() addressFormGroup!: FormGroup<ControlsOf<AddressModel>>;

  countries: ICountry[] = Country.getAllCountries();

  state: IState[] = [];

  cities: ICity[] = [];

  getCountryNameFn: MapperPipeFn<string, string> =
    (isoCode, args) => Country.getCountryByCode(isoCode)?.name as string;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  cdkVirtualScrollViewPort!: CdkVirtualScrollViewport;

  constructor() { }

  ngOnInit(): void {
    this.addressFormGroup.controls.country.valueChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe((isoCode) => {
        this.cities = City.getCitiesOfCountry(isoCode) as ICity[];
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  onCitiesSelectOpenedChange(event: boolean) {
    if (event) {
      this.cdkVirtualScrollViewPort.scrollToIndex(0);
      this.cdkVirtualScrollViewPort.checkViewportSize();
    }
  }
}
