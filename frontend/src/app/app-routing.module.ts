import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CreateUpdateComponent } from './components/pages/create-update/create-update.component';
import { FactureAdminComponent } from './components/pages/facture-admin/facture-admin.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'facture-admin',component:FactureAdminComponent,canActivate:[AuthGuard]},
  {path:'createUpdate',component:CreateUpdateComponent,canActivate:[AuthGuard]},
  {path:'payment',component:PaymentPageComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
