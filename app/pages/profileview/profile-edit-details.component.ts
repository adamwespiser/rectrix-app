import { Component, OnInit } from "@angular/core";
import { User } from '../../shared/user/user'
import { NativeScriptRouterModule } from "nativescript-angular/router";
//import { routes } from "./app.routes";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { UserService } from "../../shared/user/user.service";
import { CurrentUserService } from "../../shared/current-user/current-user.service"

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: "edit",
  template: `
<ScrollView>
<label text ='{{user.username}}' class='header'></label> 
<TextField hint="First name" keyboardType="email" autocorrect="false" autocapitalizationType="words"></TextField>
<TextField hint="Last name" keyboardType="email" autocorrect="false" autocapitalizationType="words"></TextField>
<TextField hint="Street Address" keyboardType="email" autocorrect="false" autocapitalizationType="words"></TextField>
<TextField hint="City" keyboardType="email" autocorrect="false" autocapitalizationType="words"></TextField>
<TextField hint="Country" keyboardType="email" autocorrect="false" autocapitalizationType="words"></TextField>
<TextField hint="Zip" keyboardType="number" autocorrect="false" autocapitalizationType="none"></TextField>
"<Label text='Name'></Label>"
"<Label text='Street Address'></Label>"
"<Label text='City'></Label>"
"<Label text='Country'></Label>"
"<Label text='Zip'></Label>"
<Button text="Save Changes" row="0" col="0" 		(tap)="change()" height="{{buttonH}}" width="{{buttonW}}" horizontalAlignment='center'></Button>
</ScrollView>
`,
 styleUrls: ["pages/profileview/profile-edit-details.component.css"],
providers: [UserService],
})

export class ProfileEditDetailsComponent implements OnInit
{
    user: User;
    platform = require("platform");
    screen = this.platform.screen;
    height: number = this.screen.mainScreen.heightDIPs;
    width: number = this.screen.mainScreen.widthDIPs;
    buttonH: number = this.height * .15;
    buttonW: number = this.width * .40;

    loggedIn: boolean;

    subscription1:Subscription;
    subscription2:Subscription;
 

constructor(private router: Router, private userService: UserService, private currentUserService: CurrentUserService)
{
       this.user = new User();
}

ngOnInit() 
{
  this.subscription1 = this.currentUserService.loggedIn$.subscribe(loggedIn => this.loggedIn = loggedIn );
  this.subscription2 = this.currentUserService.currentUser$.subscribe(currentUser => this.user = currentUser );

  if(!this.loggedIn)
    this.router.navigate(["/dashboard"]);
}  

ngOnDestroy() 
{
    
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
}

change()
{
   this.currentUserService.changeUser(this.user);
    alert("Changes saved");
}
}