import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { User } from '../../models/user'
import {  GithubUsers } from '../../providers/github-users/github-users';

@Component({
  selector: 'users-ionic',
  templateUrl: 'users.html'
})
export class UsersPage {
  public users;

  constructor(
    public navCtrl: NavController,
    githubUsers: GithubUsers
  ) {
    githubUsers.getUsersService().subscribe(users => {
      this.users = users;
    })
  }

  ionViewDidLoad() {
    console.log('Hello Users Page');
    console.log(this.users)
  }
}
