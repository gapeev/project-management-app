import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "@shared/shared.module";
import { BoardModule } from "./board/board.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BoardModule, CoreModule, AuthModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
