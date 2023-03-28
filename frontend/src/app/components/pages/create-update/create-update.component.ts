import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { UserService } from 'src/app/services/user.service';
import { Facture } from 'src/app/shared/models/Facture';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent {
   facture:Facture ;
   id:any;
  constructor(private factureService:FactureService,private router:Router,private userService:UserService){

  }

  ngOnInit(){
    // this.id=this.userService.currentUser.id;
    this.facture=this.factureService.getter();
  }

  createOrUpdate(){
    if(this.facture.id===undefined){
      this.factureService.createFacture(this.facture).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/facture-admin']);
        },
        error => {
          console.log(error);
        }
      )
    }else{
      this.factureService.updateFacture(this.facture.id,this.facture).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/facture-admin']);
        },
        error => {
          console.log(error);
        }
      )
    }

  }






}
