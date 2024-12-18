import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { login, SingUp } from '../../../data-types';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{
  showLogin:boolean=true;
  authError:string="";

  constructor(private user:UserService, private product:ProductsService){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signup(data:SingUp){
    this.user.userSignup(data);
  }

  login(data:login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn(result);
      if(result){
        this.authError="Usuário não encontrado!"
      }else{

      }
    })
  };
  openSignup(){
    this.showLogin=false;
  };
  openLogin(){
    this.showLogin=true;
  };

}
