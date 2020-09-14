import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartService } from '@core/services/cart/cart.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public installEvent = null;

  public total$: Observable<number>;

  public showMenu = false;
  public countProducts: number;
  public animation: boolean;

  constructor(
    private cartService: CartService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.animationCart();
    // Para ocultar el menu al cambiar de ruta
    this.router.events.subscribe(_ => this.showMenu = false);
  }

  animationCart(): void {
    this.cartService.cart$.subscribe(_ => {
      this.countProducts = this.cartService.cart.length;
      this.animation = true;
      setTimeout(() => {
        this.animation = false;
      }, 800);
  });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event): void {
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser(): void {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice
        .then(response => {
          console.log(response);
        });
    }
  }

}
