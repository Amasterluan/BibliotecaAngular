import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: ['./header-p.component.css']
})
export class HeaderPComponent implements OnInit {
  menuType: string = 'default';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        const sellerStore = localStorage.getItem('seller');
        if (sellerStore && val.url.includes('seller')) {
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
}
