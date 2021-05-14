import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { VoiceComponent } from './voice/voice.component';

const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "admin" },
	{ path: 'admin', component: AdminComponent },
	{ path: "user", component: UserComponent },
	{ path: "voice", component: VoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
