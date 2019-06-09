import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cred: any = {
    email: String,
    pwd: String
  };
  signedIn: Boolean;
  aws: AmplifyService;
  user: any;
  greeting: string;

  constructor(private amplifyService: AmplifyService) {
    this.cred.email = '';
    this.cred.pwd = '';
    this.signedIn = false;
    this.aws = amplifyService;
    this.user = null;
    this.greeting = 'Hello anonymous';
    this.aws.authStateChange$
        .subscribe(authState => {
            this.signedIn = authState.state === 'signedIn';
            if (!authState.user) {
                this.user = null;
            } else {
                this.user = authState.user;
                this.greeting = "Hello " + this.user.username;
            }
    });
  }
  login(): void{
    if(!this.cred.email || !this.cred.pwd){
      alert('no');
    }
  }
}
