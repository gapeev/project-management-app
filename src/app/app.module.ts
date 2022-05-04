import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "@shared/shared.module";
import { BoardModule } from "./board/board.module";
import { StoreModule } from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BoardModule, CoreModule, AuthModule, SharedModule, BrowserAnimationsModule,
  StoreModule.forRoot({}, {
    runtimeChecks: {
      strictActionImmutability: true,
      strictActionSerializability: true,
      strictActionTypeUniqueness: true,
      strictActionWithinNgZone: true,
      strictStateImmutability: true,
      strictStateSerializability: true
    }
  })],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
