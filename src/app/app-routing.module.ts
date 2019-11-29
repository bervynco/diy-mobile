import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BranchComponent } from './branch/branch.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  	// {
	//     path: '',
	//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
	// },
	{
		path: 'login',
		component: LoginComponent

	},
	{
		path: 'create-account',
		component: SignUpComponent

	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'branch',
		component: BranchComponent
	},
	{
		path: 'welcome',
		component: WelcomeComponent
	}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
