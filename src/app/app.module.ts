import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageModule } from './pages/page.module';
import { PAGES_ROUTES_ROOT } from './app-routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, PAGES_ROUTES_ROOT, PageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
