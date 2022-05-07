import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [WelcomePageComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot(),
    MaterialModule,
    FormsModule,
  ],
  exports: [MaterialModule, FooterComponent, HeaderComponent],
  providers: [HttpInterceptors],
})
export class CoreModule {}
