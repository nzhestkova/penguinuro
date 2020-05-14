import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EducationComponent } from "./components/education/education.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";


const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "register", component: SignUpFormComponent },
  { path: "login", component: SignInFormComponent },
  { path: "profile", component: ProfileComponent, children: [
      { path: "settings", component: SettingsComponent },
      { path: "education", component: EducationComponent },
      { path: "notifications", component: NotificationsComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
