import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/partials/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TitleComponent,
    HeaderComponent,
    RegisterComponent,
    TextInputComponent,
    InputContainerComponent,
    InputValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
       timeOut:3000,
       positionClass:'toast-bottom-right',
       newestOnTop:false
    }) ,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
