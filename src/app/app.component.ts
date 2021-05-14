import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'discordTest';
	token: string;
	guildName: string;
	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		/*this.route.fragment.subscribe((fragment: string) => {
			const fragment1 = new URLSearchParams(fragment);
			const [accessToken, tokenType, exp] = [fragment1.get('access_token'), fragment1.get('token_type'), fragment1.get('expires_in')];
			this.token = `${tokenType} ${accessToken}`;
			fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${tokenType} ${accessToken}`
				}
			}).then(result => result.json())
			.then(response => {
				console.log(response);
			})
			.catch(console.error);

			fetch('https://discord.com/api/oauth2/@me', {
				headers: {
					authorization: `${tokenType} ${accessToken}`
				}
			}).then(result => result.json())
			.then(response => {
				console.log(response);
			})
			.catch(console.error);

	    });*/
  	}

  	createGuild(){
  		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'https://discord.com/api/guilds',
			data: {name: this.guildName},
			headers: {
				"Authorization": this.token
			},
			success: function(data){
				console.log(data);
			},
			error: console.log
		})
  	}
}
