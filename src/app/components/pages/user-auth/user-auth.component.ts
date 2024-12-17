import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { login, SingUp } from '../../../data-types';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{

  constructor(private user:UserService){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signup(data:SingUp){
    this.user.userSignup(data)
  }

  login(data:login){
    
  }

}
