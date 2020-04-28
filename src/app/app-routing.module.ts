import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { PopupConfirmComponent } from "./components/popup-confirm/popup-confirm.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";


const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "register", component: SignUpFormComponent },
  { path: "login", component: SignInFormComponent },
  { path: "profile", component: ProfileComponent },
  { path: "debug", component: PopupConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
