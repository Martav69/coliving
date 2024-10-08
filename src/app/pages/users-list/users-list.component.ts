import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/User.entity';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  users: User[]

  async ngOnInit(): Promise<void> {
    this.users = await this.usersService.list()
  }

  onClickShowConversation(user: User){
    this.router.navigate(["/conversation"], {queryParams: {
      s: this.usersService.userJWT.id,
      r: user.id
      
    }})
  }

}
