import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	guildName: string;
	guildInv: string;

	constructor() { }

	ngOnInit(): void {

	}

	createGuild(): void{
		$.post('http://localhost:3000/guild', {name: this.guildName}, (data) =>{
			this.guildInv = data;
		});
	}

}
