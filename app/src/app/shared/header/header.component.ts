import { Component, OnInit, HostListener } from '@angular/core';

import { CartService } from '@core/services/cart/cart.service';
import { AuthService } from '@core/services/auth/auth.service';
import { Observable } from 'rxjs';

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
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(response => {
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
