import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public mostrarMenu(): boolean {
    return (
      this.router.url != '/usuario/login' &&
      this.router.url != '/usuario/registrar'
    );
  }
}
