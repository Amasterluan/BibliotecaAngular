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
            alert("Produto Cadastrado com Sucesso.")
          }
        })
      }
    }
  }
  removeToCart(productId:number){
    this.product.removeItemFromCart(productId);
    this.removeCart=false;
  }
}
