import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BranchComponent } from './branch/branch.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignUpComponent,
		BranchComponent,
		WelcomeComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		AppRoutingModule,
		ReactiveFormsModule,
        FormsModule,
		HttpClientModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		LaunchNavigator,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
