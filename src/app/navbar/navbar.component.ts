import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wsa-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  homeFlag = false;
  serviceFlag = false;
  productsFlag = false;
  aboutusFlag = false;

  constructor() { }

  ngOnInit() {
  }

  homeButton(){
    this.homeFlag = true;
    this.serviceFlag = false;
    this.productsFlag = false;
    this.aboutusFlag = false;
  }

  ServiceButton(){
    this.homeFlag = false;
    this.serviceFlag = true;
    this.productsFlag = false;
    this.aboutusFlag = false;
  }
  productsButton(){
    this.homeFlag = false;
    this.serviceFlag = false;
    this.productsFlag = true;
    this.aboutusFlag = false;
  }
  aboutUsButton(){
    this.homeFlag = false;
    this.serviceFlag = false;
    this.productsFlag = false;
    this.aboutusFlag = true;
  }
  link(e:any){
    alert("link clicked");
  }

}
