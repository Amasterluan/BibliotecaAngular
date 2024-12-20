import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../../../data-types';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productData:undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  removeCart = false;
  cartData:product|undefined;
  
  constructor(private ActiveRoute:ActivatedRoute, private product:ProductsService) {}

  ngOnInit(): void {
    let productId=this.ActiveRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData=result

      let cartData=localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId==item.id.toString())
        if(items.length){
          this.removeCart=true;
        }else{
          this.removeCart=false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user&& JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>
            productId?.toString()===item.productId?.toString()
          );

          if(item.length){
            this.cartData=item[0];
            this.removeCart=true;
          }
        })
      }
      
    })
  }

  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }else{
        let user = localStorage.getItem('user');
        let userId = user&& JSON.parse(user).id;
        let cartData:cart={
          ...this.productData, userId, productId:this.productData.id
        }
        delete cartData.id;

        this.product.AddToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true;
          }
        })
      }
    }
  }
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){  
    this.product.removeItemFromCart(productId);
    }else{
      this.cartData&&this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId = user&& JSON.parse(user).id;
        this.product.getCartList(userId);
      })
      this.removeCart=false;

    }
  }
}
