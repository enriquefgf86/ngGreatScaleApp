import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageModule } from './pages/page.module';
import { PAGES_ROUTES_ROOT } from './app-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// import { SettingsService } from './services/settings/settings.service';
import { ServiceModuleModule } from './services/service-module.module';
import { HttpClientModule } from '@angular/common/http';
// import { IncrementerComponent } from './components/incrementer/incrementer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // IncrementerComponent,
  ],
  imports: [
    BrowserModule,
    PAGES_ROUTES_ROOT,
    PageModule,
    FormsModule,
    ServiceModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
