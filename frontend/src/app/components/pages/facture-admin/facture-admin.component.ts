import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FactureService } from 'src/app/services/facture.service';
import { UserService } from 'src/app/services/user.service';
import { Facture } from 'src/app/shared/models/Facture';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-admin',
  templateUrl: './facture-admin.component.html',
  styleUrls: ['./facture-admin.component.css']
})
export class FactureAdminComponent {
   factures:Facture[];
constructor(private router:Router,private dialog : MatDialog,private factureService:FactureService,private userService:UserService){}

ngOnInit(){
  this.userService.setAdmin();
  this.factureService.getAllFacture().subscribe((data:any) => {
    this.factures=data;
  },error =>{
    console.log(error);
  })
}

newFacture(event:any){
  event.preventDefault();
  this.factureService.setter(new Facture());
  this.router.navigate(['/createUpdate']);
}

edit(facture:Facture){
  this.factureService.setter(facture);
  this.router.navigate(['/createUpdate']);
}

supprimer(facture:Facture){
  this.factureService.deleteFacture(facture.id).subscribe(
    (data:any) => {
    this.factures.splice(this.factures.indexOf(facture),1);
  },error =>{
    console.log(error);
  })

}


openDialog() {
  this.dialog.open(DialogComponent, {
    width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val === 'save' ){
      this.factureService.getAllFacture();
    }
  })
}

}
