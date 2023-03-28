import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactureService } from 'src/app/services/facture.service';
import { UserService } from 'src/app/services/user.service';
import { Facture } from 'src/app/shared/models/Facture';


declare var paypal :any;
@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit{
  @Input()
  facture!:Facture;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;


  constructor(private factureService:FactureService,private userService:UserService,private router:Router,private toastrService:ToastrService){

  }

  ngOnInit(): void {
    this.facture=this.factureService.getFactureFromLocalStorage();
    console.log(this.facture);
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'CAD',
                value: this.facture.prix,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        self.factureService.pay(this.facture).subscribe(
          {
            next: (factureId:any) => {
              this.router.navigateByUrl('/' );
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
              localStorage.removeItem('facture');
            },
            error: (error) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }

}
