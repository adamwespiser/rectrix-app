import { Component, OnInit } from "@angular/core";
import { User } from '../../shared/user/user'
import { UserService } from "../../shared/user/user.service";
import { CurrentUserService } from "../../shared/current-user/current-user.service";
import { Router } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: "profile-shuttle-history",
  template: `
<ScrollView>
<StackLayout>
<Label text ="{{currentUser.username}}" class="header" horizontalAlignment="center"></Label> 
</StackLayout>
<GridLayout rows="auto,auto" columns="auto,auto">

 
<Label text ="Name" row="0" col="0" ></Label>
<Label text = "Address" row="1" col="0"></Label>
<Label text = "{{currentUser.firstName + ' ' + currentUser.lastName}}" row="0" col="1"></Label>
<Label text = "{{currentUser.address + ' ' + currentUser.city + ' ' + currentUser.country + ' ' + currentUser.zip }}" row="1" col="1"></Label>
</GridLayout>
<StackLayout>
<Button text="Edit Profile" (tap)="makeChanges()" height="{{buttonH}}" width="{{buttonW}}" horizontalAlignment='center'></Button>
</StackLayout>
</ScrollView>
`,
 styleUrls: ["pages/profileview/profileview.component.css"],
providers: [UserService],
})

export class ProfileViewComponent implements OnInit {
currentUser: User;
 
    subscription1:Subscription;
    platform = require("platform");
screen = this.platform.screen;
    height: number = this.screen.mainScreen.heightDIPs;
    width: number = this.screen.mainScreen.widthDIPs;
    buttonH: number = this.height * .15;
    buttonW: number = this.width * .40;
 

constructor(private router: Router, private userService: UserService, private currentUserService: CurrentUserService){}
ngOnInit() {
        

               this.subscription1 = this.currentUserService.currentUser$.subscribe(currentUser => this.currentUser = currentUser );
        
          




    }  ngOnDestroy() 
    {
    
    this.subscription1.unsubscribe();

    }
makeChanges()
{
this.router.navigate(["/edit"]);

}
}