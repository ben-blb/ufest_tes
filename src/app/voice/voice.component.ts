import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent implements OnInit, OnDestroy {
	debugMsg: string;
	gateWay: string = '';
	socket: WebSocket;
	heartbeat: any;
	token: string;
	hasIdentified: boolean = false;

	constructor() { }

	debug(str: string): void{
		this.debugMsg += '<br>' + str;
	}

	ngOnInit(): void {
			this.token = sessionStorage.getItem('tkn').split(' ')[1];
			this.debug('got Token');
			this.debug(this.token);

			fetch('https://discord.com/api/gateway').then(result => result.json())
			.then(response => {
				this.gateWay = response.url;
				this.connect();
				this.debug("Got gateWey");
				this.debug(response.url);
			})
			.catch(console.error);

	}

	ngOnDestroy(): void{
		if (this.heartbeat) {
			this.mogumogu();
			clearInterval(this.heartbeat);
		}
	}

	connect(): void{
		this.debug("Connecting gateway");
		this.socket = new WebSocket(this.gateWay + '?v=9&encoding=json');
		this.socket.onopen = (e) => {
			this.debug("Gateway connection established!");
		};

		this.socket.onmessage = (event) => {
			this.debug('Got message');
			this.debug(event.data);
			this.debug('<hr>');
			let evData = JSON.parse(event.data);
			switch (evData.op) {
				case 10:
					this.handleWelcome(evData);
					break;
				case 11:
					this.debug('Recieved <3');
					this.debug(event.data);
					if(!this.hasIdentified) this.identify();
					break;
				case 9:
					this.debug('Invalid session!');
					this.mogumogu();
				break;
			}
		};
		let checker = setInterval(() => {
			console.log(this.socket.readyState);
		}, 500);

	}

	handleWelcome(data: any): void{
		this.heartbeat = setInterval(() => {
			this.debug("sending <3");
			let payload = {
				'op': 1,
				'd': null,
				's': null,
				't': null
			};
			console.log(JSON.stringify(payload));
			this.socket.send(JSON.stringify(payload));
		}, data.d.heartbeat_interval);
	}

	identify(): void{
		this.debug("IDENTIFYING");
		let opCode2 = {
			op: 2,
			s: null,
			t: null, 
			d: {
				'token': 'ODMzNDk1MDM1Nzg1Mzc5ODYw.YHzKvg.aa9Pju40HILw721SslKRB3V5XQk',
				'intents': 513,
				'properties': {
					"$os": "windows",
					"$browser": "chrome",
					"$device": "angular"
				}
			}
		};
		console.log(JSON.stringify(opCode2))
		this.socket.send(JSON.stringify(opCode2));


		this.hasIdentified = true;
	}

	mogumogu(): void{
		this.debug('Killed conn');
		this.socket.close();
		clearInterval(this.heartbeat);
	}
}
