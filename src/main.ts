import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '@env/environment';
import { AppComponent } from '@app/app.component';
import { APP_ROUTES } from '@app/app-routes';
import { MATERIAL_DEFAULTS_PROVIDER } from '@app/providers';
import { DEFAULT_FORM_ERROR_MESSAGES_MAP, provideErrorMessagesHashMap } from '@app/shared/pipes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(APP_ROUTES),
    ),
    MATERIAL_DEFAULTS_PROVIDER,
    provideErrorMessagesHashMap(DEFAULT_FORM_ERROR_MESSAGES_MAP)
  ]
})
  .then(() => {
    console.log('APP HAS BEEN SUCCESSFULLY BOOTSTRAPPED');
  })
  .catch((error) => {
    console.error('APP BOOTSTRAP ERROR', error);
  });
