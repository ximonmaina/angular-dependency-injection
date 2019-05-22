import {Component, ReflectiveInjector} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-demo',
  templateUrl: './user-demo.component.html',
  styleUrls: ['./user-demo.component.css']
})
export class UserDemoComponent  {
  userName: string;


  // Angular will inject the singleton instance of 'UserService' here.
  // We set it as a property with 'private'.
  constructor(private userService: UserService) {

  }

  signIn(): void {
    // when we sign in, set the user
    // this mimics filling out a login form
    this.userService.setUser({
      name: 'Simon Maina'
    });

    // now **read** the user name from the service
    this.userName = this.userService.getUser().name;
    console.log('User name is: ', this.userName);
  }

}
