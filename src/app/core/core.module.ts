import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import HttpInterceptors from './interceptors';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, SharedModule, HttpClientModule],
  providers: [HttpInterceptors],
})
export class CoreModule {}
