import { Component } from '@angular/core';
import { FactureService } from 'src/app/services/facture.service';
import { UserService } from 'src/app/services/user.service';
import { Facture } from 'src/app/shared/models/Facture';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  facture:Facture = new Facture();
  constructor(private factureService:FactureService,private userService:UserService,private home:HomeComponent){}

  ngOnInit(){
     this.facture = this.factureService.getFactureFromLocalStorage();

  }

}
