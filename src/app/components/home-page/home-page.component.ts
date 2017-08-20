import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service' ;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],

})
export class HomePageComponent implements OnInit {

  items: Item[];
  filteredItems: Item[];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(typeof localStorage.getItem('user') == 'undefined' || localStorage.getItem('user') == null){
        this.router.navigate(['/login']);
    }
    this.dataService.getItems().subscribe(items => {
        this.items = items;
        this.filteredItems = items;
    });

  }

  addToCart(event, item){
    var qty = $('#qty-' + item.itemId).val();
    var data = {};
    if(typeof localStorage.getItem('cart') == 'undefined' || localStorage.getItem('cart') == null){
        localStorage.setItem("cart", JSON.stringify(data));
    } else {
        data = JSON.parse(localStorage.getItem('cart'));
    }
   
    if(typeof data[item.itemId] == 'undefined'){
        data[item.itemId] = [];
        data[item.itemId] = {
            qty: qty,
            id: item.itemId,
            name: item.itemName,
            price: item.itemPrice,
            desc: item.itemDesc,
            img: item.itemImage
        };
    } else {
        data[item.itemId].qty = Number(qty) + Number(data[item.itemId].qty);
    }

    localStorage.setItem("cart", JSON.stringify(data));
    this.router.navigate(['/shopping-cart']);
  }

  searchItems(event){
    var searchTxt = $('#search').val().toString().toLowerCase().trim();
    this.filteredItems = [];
    if(searchTxt.length > 0){
        for (var j=0; j < this.items.length; j++) {
            if (JSON.stringify(this.items[j]).toLowerCase().match(searchTxt)){
                this.filteredItems.push(this.items[j]);
            }
        }
    } else {
        this.filteredItems = this.items;
    }
    
  }

}

interface Item{
    itemId: number,
    itemName: string,
    itemImage: string,
    itemDesc: string,
    itemPrice: number
}
