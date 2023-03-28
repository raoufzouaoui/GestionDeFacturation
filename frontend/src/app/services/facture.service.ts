import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CREATE_FACTURE_URL, DELETE_FACTURE_URL, EDIT_FACTURE_URL, GET_ALL_FACTURE_FOR_CURRENT_USER_URL, GET_ALL_FACTURE_URL, PAY_FACTURE, UPDATE_FACTURE_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IFacture } from '../shared/interfaces/IFacture';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Facture } from '../shared/models/Facture';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private factureSubject = new BehaviorSubject<Facture>(this.getFactureFromLocalStorage());
  public factureObservable:Observable<Facture> | undefined ;

  facturesSelected : Facture = new Facture();

  private facture:Facture = new Facture();

  constructor(private http:HttpClient,private userService:UserService) {
    this.factureObservable = this.factureSubject.asObservable();
  }

  createFacture(facture:Facture){
      return this.http.post(CREATE_FACTURE_URL,facture);
  }

  getFacture(id:any): Observable<Facture>{
    return this.http.get<Facture>("http://localhost:5000/api/factures/facture/"+id);
  }

  getFactureByUser(email:any): Observable<Facture>{
    return this.http.get<Facture>("http://localhost:5000/api/factures/"+email);
  }

  getAllFacture(): Observable<Facture[]>{
      return this.http.get<Facture[]>(GET_ALL_FACTURE_URL);
  }

  deleteFacture(id:any){
    return this.http.delete(DELETE_FACTURE_URL+id)
  }

  updateFacture(id:any,facture:Facture){
    return this.http.patch(UPDATE_FACTURE_URL+id,facture);
  }

  editFacture(id:any,facture:Facture){
    return this.http.put(EDIT_FACTURE_URL+id,facture);
  }

  setter(facture:Facture){
    this.facture=facture;
  }

  getter(){
    return this.facture;
  }

  pay(facture:Facture): Observable<string>{
    return this.http.post<string>(PAY_FACTURE,facture);
  }

  public setFactureToLocalStorage(facture:Facture){
    localStorage.setItem('facture', JSON.stringify(facture));
}

public getFactureFromLocalStorage():Facture{
    const factureJson = localStorage.getItem('facture');
    if(factureJson) return JSON.parse(factureJson) as Facture;
    return new Facture();
}



}
