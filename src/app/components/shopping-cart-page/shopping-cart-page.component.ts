import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css']
})
export class ShoppingCartPageComponent implements OnInit {
  cartItems = [];
  total : number;
 
  constructor(private router: Router) { }

  ngOnInit() {
    this.total = 0;
    if(typeof localStorage.getItem('user') == 'undefined' || localStorage.getItem('user') == null){
        this.router.navigate(['/login']);
    }
    if(typeof(Storage) !== "undefined" || localStorage.getItem('cart') != null) {
        var data = JSON.parse(localStorage.getItem('cart'));
        var _this = this;
        $.each(data, function(key, value){
            _this.cartItems.push(value);
            _this.total  = parseInt(value.qty) * parseFloat(value.price) + _this.total;
        });

        this.total = +this.total.toFixed(2);
        
    }
  }

  removeItem(itemNo){
    this.cartItems.splice(itemNo, 1);
    this.total = 0;
    var _this = this;
    var data = {};
    $.each(this.cartItems, function(key, value){
        _this.total  = parseInt(value.qty) * parseFloat(value.price) + _this.total;
        data[value.id] = value;
    });
    localStorage.setItem("cart", JSON.stringify(data));
  }

  updateItem(itemNo, itemQty){

    this.total = 0;
    var _this = this;
    var data = {};
    $.each(this.cartItems, function(key, value){
        if(key == itemNo){
            value.qty = itemQty;
        }
        
        _this.total  = parseInt(value.qty) * parseFloat(value.price) + _this.total;
        data[value.id] = value;
    });

    this.total = +this.total.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(data));

  }
}
