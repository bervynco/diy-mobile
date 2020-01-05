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
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AppRoutingModule } from './app-routing.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { Interceptor } from './interceptor';
import { AuthService } from './auth.service';


@NgModule({
	declarations: [
		AppComponent,
		IntroComponent,
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
		ChangePasswordComponent,
		ResetPasswordComponent,
		ContactUsComponent
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
		NgxQRCodeModule,
		AutoCompleteModule
		
	],
	providers: [
		StatusBar,
		SplashScreen,
		LaunchNavigator,
		QRScanner,
		BarcodeScanner,
		Geolocation,
		AuthService,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }  
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
