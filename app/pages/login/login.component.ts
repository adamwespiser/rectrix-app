import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
  selector: "login",
  template: `
  	<label text='Sign in to Rectrix' horizontalAlignment='center'></label>

	<label text='user name'></label>
	<TextField  autocapitalizationType="none" [(ngModel)]="user.username"></TextField>

	<label text='password'></label>
	<TextField autocapitalizationType="none" secure="true" [(ngModel)]="user.password"></TextField>

	<Button text="Sign in" (tap)="login()" horizontalAlignment='center'></Button>
	`,
	providers: [UserService],
})
export class LoginComponent
{
	user: User;

	constructor(private router: Router, private userService: UserService) 
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

	login() {
    this.userService.login(this.user)
      .subscribe(
        () => {
        	alert("Signed in as "+this.user.username+"!");
        	this.router.navigate(["/dashboard"]); 
        	}, 
        (error) => alert("Unfortunately we could not find your account.")
      );
  }


  	
}