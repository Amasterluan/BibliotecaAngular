import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { cart, login, product, SingUp } from '../../../data-types';
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
        this.localCartToRemove();
      }
    })
  };
  openSignup(){
    this.showLogin=false;
  };
  openLogin(){
    this.showLogin=true;
  };

  localCartToRemove(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      

      cartDataList.forEach((product:product, index)=>{
        let cartData: cart={
          ...product, productId:product.id, userId,
        };

        delete cartData.id;
this.product.getCartList(userId);
        setTimeout(() => {
          this.product.AddToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("Dados Salvos no Banco de Dados")
            }
          })
        }, 500);
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }

}
