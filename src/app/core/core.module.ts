import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import HttpInterceptors from './interceptors';

import reducers from '@store/reducers';
import { environment } from '../../environments/environment';
import UserEffects from '@store/effects/user.effects';
import BoardEffects from '@store/effects/board.effects';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects, BoardEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [HttpInterceptors],
})
export class CoreModule {}
