import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { VoiceComponent } from './voice/voice.component';

@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    AdminComponent,
    UserComponent,
    VoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
