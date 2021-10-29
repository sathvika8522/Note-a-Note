import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsComponent } from './products/products.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { TreesComponent } from './trees/trees.component';
import { BirdsComponent } from './birds/birds.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeproductdetailsComponent } from './homeproductdetails/homeproductdetails.component';
import { SamtestComponent } from './samtest/samtest.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ContactUsComponent,
    ProductsComponent,
    MobilesComponent,
    TreesComponent,
    BirdsComponent,
    PagenotfoundComponent,
    ProductDetailsComponent,
    HomeproductdetailsComponent,
    SamtestComponent,
    UserdetailsComponent,
    UserNotesComponent,
    ViewNotesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }