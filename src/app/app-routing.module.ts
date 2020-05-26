import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EducationComponent } from "./components/education/education.component";
import { MaterialsComponent } from "./components/education/materials/materials.component";
import { ProgressComponent } from "./components/education/progress/progress.component";
import { TasksComponent } from "./components/education/tasks/tasks.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { TaskCreatorComponent } from "./components/task-creator/task-creator.component";
import { TestTaskComponent } from "./components/test-task/test-task.component";


const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "register", component: SignUpFormComponent },
  { path: "login", component: SignInFormComponent },
  { path: "profile", component: ProfileComponent },
  { path: "settings", component: SettingsComponent },
  { path: "education", component: EducationComponent, children: [
      { path: "materials", component: MaterialsComponent },
      { path: "tasks", component: TasksComponent },
      { path: "progress", component: ProgressComponent },
    ] },
  { path: "create", component: TaskCreatorComponent, children: [
      { path: "test", component: TestTaskComponent },
    ] },
  { path: "notifications", component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
