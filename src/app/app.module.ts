import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClosedTestCreateComponent } from "./components/closed-test-create/closed-test-create.component";
import { EducationComponent } from "./components/education/education.component";
import { MaterialsComponent } from "./components/education/materials/materials.component";
import { TasksComponent } from "./components/education/tasks/tasks.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { PopupConfirmComponent } from "./components/popup-confirm/popup-confirm.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { TaskCreatorComponent } from './components/task-creator/task-creator.component';
import { TestCreatorComponent } from "./components/test-creator/test-creator.component";
import { ChangeImageDirective } from "./directives/change-image/change-image.directive";
import { ClearInputTipsDirective } from "./directives/clear-input-tips/clear-input-tips.directive";
import { SetStatusDirective } from "./directives/set-status/set-status.directive";
import { ShowPasswordDirective } from "./directives/show-password/show-password.directive";
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";
import { MaterialService } from "./services/material-service/material.service";
import { UserService } from "./services/user-service/user.service";
import { appReducers } from "./store/reducers/app.reducers";
import { ThemeStoreService } from "./store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "./store/services/user-store.service/user-store.service";
import { WaitingStoreService } from "./store/services/waiting-store.service/waiting-store.service";
import { ProgressComponent } from './components/education/progress/progress.component';
import { TestTaskComponent } from './components/test-task/test-task.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent,
    HomePageComponent,
    ProfileComponent,
    ShowPasswordDirective,
    ChangeImageDirective,
    SetStatusDirective,
    PopupConfirmComponent,
    SettingsComponent,
    TestCreatorComponent,
    ClosedTestCreateComponent,
    ClearInputTipsDirective,
    TooltipDirective,
    EducationComponent,
    NotificationsComponent,
    TaskCreatorComponent,
    MaterialsComponent,
    TasksComponent,
    ProgressComponent,
    TestTaskComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot(appReducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        FormsModule,
    ],
  providers: [
    UserService,
    UserStoreService,
    ThemeStoreService,
    WaitingStoreService,
    MaterialService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
