import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TextField } from "ui/text-field";
import { CurrentUserService } from "../../shared/current-user/current-user.service";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
  selector: "signup",
  template: `
<StackLayout *ngIf="!loading">
<ScrollView>
<StackLayout>
<label text='Signup Component'></label>

<label text='First Name'></label>
<TextField autocorrect="false" autocapitalizationType="none" [(ngModel)]="user.firstName"></TextField>

<label text='Last Name'></label>
<TextField autocorrect="false" autocapitalizationType="none" [(ngModel)]="user.lastName"></TextField>

<label text='Address'></label>
<TextField autocorrect="false" autocapitalizationType="none" [(ngModel)]="user.address"></TextField>

<label text='City'></label>
<TextField autocorrect="false" autocapitalizationType="none" [(ngModel)]="user.city"></TextField>

<label text='Country'></label>
<TextField autocorrect="false" autocapitalizationType="none" [(ngModel)]="user.country"></TextField>

<label text='Zip code'></label>
<TextField keyboardType ="number" [(ngModel)]="user.zip"></TextField>

<label text='Username'></label>
<TextField autocorrect="false" autocapitalizationType="none" [(ngModel)]="user.username"></TextField>

<label text='Password'></label>
<TextField secure = "true" [(ngModel)]="user.password"></TextField>
<Button text="Submit"(tap)="signUp(this.user)"></Button>

 </StackLayout>
 </ScrollView>
 </StackLayout>

 <div class="loading-overlay" *ngIf="loading">
    <label text="Please Wait..."></label>
    <md-progress-bar mode="indeterminate"></md-progress-bar>
 </div>




`,
	providers: [UserService],
})

export class SignupComponent 
{
	user : User;
	loading: boolean = false;

	constructor(private router: Router, private userService: UserService , private currentUserService: CurrentUserService) 
	{
    	this.user = new User(); 
		this.user.firstName= "";
		this.user.lastName= "";
		this.user.address= "";
		this.user.city= "";
		this.user.country= "";
		this.user.zip= "";
		this.user.username= "";
		this.user.password= "";
		this.user.email= "";
		this.user.charterHistory= null;
		this.user.shuttleHistory= null;
	}

	signUp() 
	{
		this.loading = true;

    	this.userService.register(this.user)
      	.subscribe(
        	() => {
          		alert("Your account was successfully created."); 
this.currentUserService.changeUser(this.user);
     			this.currentUserService.toggleLoggedIn(true);

          		this.router.navigate(["/dashboard"]); 
        	},
        	() => {
        		alert("Unfortunately we were unable to create your account.");
        		this.loading = false;
        	}
      );


  	}
}
