import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: Http) { }

  getUsers(){
  	return this.http.get('https://demo4314457.mockable.io/getAllUsers')
  	.map(res => res.json());
  }

  getItems(){
        return this.http.get('https://demo4314457.mockable.io/getItems')
  	.map(res => res.json());
  }

}
