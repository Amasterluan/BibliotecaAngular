import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../../services/seller.service';
import { Router } from '@angular/router';
import { SingUp } from '../../../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService){}
  showLogin=false
  authError: string ="";
 
  ngOnInit():void{
    this.seller.reloadSeller();
  };

  login(data:SingUp):void{
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=> {
      if(isError){
        this.authError="Email ou Senha não corresponde!"
      }
    })
  };

  signUp(data:SingUp):void{
    console.warn(data)
    this.seller.userSignUp(data)
    };

  openLogin(){
    this.showLogin=false;
  }
  openSignUp(){
    this.showLogin=true;
  }
  }

