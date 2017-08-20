import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  cartItems = [];
  total : number;
  grandTotal : number;

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
        this.grandTotal = +(this.total + (this.total * 0.20)).toFixed(2);
        
    }
  }

}
