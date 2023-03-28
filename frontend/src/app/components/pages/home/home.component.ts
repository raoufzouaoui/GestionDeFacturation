import { Component } from '@angular/core';
import { FactureService } from 'src/app/services/facture.service';
import { UserService } from 'src/app/services/user.service';
import { Facture } from 'src/app/shared/models/Facture';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public factureSelected:Facture[];
  factures:Facture[];
  constructor(private factureService:FactureService,private userService:UserService){}

  ngOnInit(){
    this.factureService.getFactureByUser(this.userService.currentUser.email).subscribe((data:any)=> {
     this.factures=data;
   },
   error => {
     console.log(error);
   })
  }

  payer(id:any){
    this.factureService.getFacture(id).subscribe((data:any)=>{
      this.factureSelected=data;
      this.factureService.setFactureToLocalStorage(data);
      //  console.log(this.factureSelected)
      console.log(this.factureService.getFactureFromLocalStorage())
    })
  }
}
