import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShoppingCartPageComponent } from './components/shopping-cart-page/shopping-cart-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

import { DataService } from './services/data.service';

import { RouterModule, Routes } from '@angular/router';
import { SearchFilterPipe } from './search-filter.pipe';

      
const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'shopping-cart', component: ShoppingCartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ShoppingCartPageComponent,
    CheckoutPageComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
