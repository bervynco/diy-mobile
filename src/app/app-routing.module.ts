import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BranchComponent } from './branch/branch.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MeComponent } from './me/me.component';
import { BranchSummaryComponent } from './branch-summary/branch-summary.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './scan/scan.component';
import { RedeemComponent } from './redeem/redeem.component';

const routes: Routes = [
  	// {
	//     path: '',
	//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
	// },
	{ 
		path: '',   
		redirectTo: '/home', 
		pathMatch: 'full' 
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'me',
		component: MeComponent
	},
	{
		path:'me/login',
		component: LoginComponent
	},
	{
		path: 'me/create-account',
		component: SignUpComponent

	},
	{
		path: 'me/profile-menu',
		component: ProfileMenuComponent
	},
	{
		path: 'branch',
		component: BranchComponent,
		children: [
			{
				path: 'branch-summary',
				component: BranchSummaryComponent
			}
		]
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'welcome',
		component: WelcomeComponent
	},
	{
		path: 'scan',
		component: ScanComponent
	},
	{
		path: 'redeem',
		component: RedeemComponent
	},
	
];
@NgModule({
  imports: [
	// RouterModule.forChild(routes)
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
