import { Component, OnInit } from '@angular/core';

import { CartService } from '@core/services/cart/cart.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showMenu = false;
  public countProducts: number;
  public animation: boolean;

  constructor(
    private cartService: CartService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.auth.loggedIn);
    this.cartService.cart$.subscribe(response => {
        // console.log(response);
        this.countProducts = this.cartService.cart.length;
        this.animation = true;
        setTimeout(() => {
          this.animation = false;
        }, 800);
    });
  }
}
