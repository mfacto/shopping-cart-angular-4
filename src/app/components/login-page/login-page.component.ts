import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorMsg: string;
  hasError: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private dataService: DataService, private router: Router) { 
  	this.errorMsg = "";
        this.hasError = false;
  }

  ngOnInit() {
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
  }

  doLogin(event){
  	var username = event.target.username.value;
	  var password = event.target.password.value;
    var data = {
      username: username,
      password: password
    };
    var validateUser = false;

  	if(username.trim() == "" || password.trim() == "") {
  		this.errorMsg = "Please enter the required fields.";
  		this.hasError = true;
  	} else {
	  	
	  	this.dataService.getUsers().subscribe(users => {
          validateUser = this.checkIfUserExists(data, users);
          if(validateUser){
            this.errorMsg = "";
            this.hasError = false;
            this.isLoggedIn = true;
            localStorage.setItem("user", username);
            this.router.navigate(['/']);
            
          } else {
            this.errorMsg = "Username/password is incorrect";
            this.hasError = true;
          }
      });
  	}
  	return false;
  }

  checkIfUserExists(data, users){
    var userExists = false;
    for (var i = 0; i < users.length; i++) {
        
        if (users[i].username == data.username && users[i].password == data.password){
          userExists = true;
        }   
    }
    return userExists;
  }

}

