import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FactureService } from 'src/app/services/facture.service';
import { Facture } from 'src/app/shared/models/Facture';
import ObjectId from "bson-objectid";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  facture:Facture = new Facture();
  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  factureForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private toastrService: ToastrService,private formBuilder : FormBuilder,
     private factureService:FactureService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
      private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.factureForm = this.formBuilder.group({
      clientName :['',Validators.required],
      Reference :['',Validators.required],
      Quantite :['',Validators.required],
      Prix :['',Validators.required],
      dateDebut :['',Validators.required],
      dateFin :['',Validators.required],
      emailclient :['',Validators.required],
    })

    if(this.editData){
      this.actionBtn= "Update";
      this.factureForm.controls['clientName'].setValue(this.editData.clientName);
      this.factureForm.controls['Reference'].setValue(this.editData.Reference);
      this.factureForm.controls['Quantite'].setValue(this.editData.Quantite);
      this.factureForm.controls['Prix'].setValue(this.editData.Prix);
      this.factureForm.controls['dateDebut'].setValue(this.editData.dateDebut);
      this.factureForm.controls['dateFin'].setValue(this.editData.dateFin);
      this.factureForm.controls['emailclient'].setValue(this.editData.emailclient);
      this.factureForm.controls['action'].setValue(this.editData.action);
     }
  }

addfacture(){
  if(!this.editData){
    if(this.factureForm.valid){
      this.facture=this.factureForm.value;
      this.factureService.createFacture(this.facture)
        .subscribe({
          next:(res)=>{
            alert("Facture added successfully")
            this.factureForm.reset();
            this.dialogRef.close('save');
          },
          error:(errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Facture');
          }
          // error:()=>{
          //   alert(Error);
          //   alert("Error while adding the facture")
          // }
        })
    }
  }else{
    this.UpdateFacture();
  }
}

UpdateFacture(){
  this.factureService.updateFacture(this.factureForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Product updated Successfully");
      this.factureForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the record")
    }
  })
}



}
