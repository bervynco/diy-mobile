import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BranchComponent } from './branch/branch.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MeComponent } from './me/me.component';
import { BranchSummaryComponent } from './branch-summary/branch-summary.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { ScanComponent } from './scan/scan.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Interceptor } from './interceptor';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignUpComponent,
		BranchComponent,
		WelcomeComponent,
		MeComponent,
		BranchSummaryComponent,
		ProfileMenuComponent,
		HomeComponent,
		ScanComponent,
		RedeemComponent,
		ChangePasswordComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		AppRoutingModule,
		ReactiveFormsModule,
        FormsModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		NgxBarcode6Module
	],
	providers: [
		StatusBar,
		SplashScreen,
		LaunchNavigator,
		QRScanner,
		Geolocation,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }  
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
