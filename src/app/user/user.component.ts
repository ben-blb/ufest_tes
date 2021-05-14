import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	hasToken = false;
	token: string;
	username: string;

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.fragment.subscribe((fragment: string) => {
			const fragment1 = new URLSearchParams(fragment);
			const [accessToken, tokenType, exp] = [fragment1.get('access_token'), fragment1.get('token_type'), fragment1.get('expires_in')];
			this.token = `${tokenType} ${accessToken}`;
			sessionStorage.setItem('tkn', this.token);

			fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${tokenType} ${accessToken}`
				}
			}).then(result => result.json())
			.then(response => {
				if(response.code == undefined){
					this.hasToken = true;
					this.username = response.username;
				}
			})
			.catch(console.error);
	    });
	}

}
