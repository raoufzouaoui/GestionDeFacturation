import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FactureAdminComponent } from './components/pages/facture-admin/facture-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './components/pages/dialog/dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { CreateUpdateComponent } from './components/pages/create-update/create-update.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { ContactComponent } from './components/pages/contact/contact.component';



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
    InputValidationComponent,
    FactureAdminComponent,
    DialogComponent,
    CreateUpdateComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot({
       timeOut:3000,
       positionClass:'toast-bottom-right',
       newestOnTop:false
    }) ,
    BrowserAnimationsModule,
    NgbModule

  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true },HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
