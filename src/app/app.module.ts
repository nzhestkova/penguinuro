import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { PopupConfirmComponent } from "./components/popup-confirm/popup-confirm.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { ChangeImageDirective } from "./directives/change-image/change-image.directive";
import { SetStatusDirective } from "./directives/set-status/set-status.directive";
import { ShowPasswordDirective } from "./directives/show-password/show-password.directive";
import { UserService } from "./services/user-service/user.service";
import { appReducers } from "./store/reducers/app.reducers";
import { ThemeStoreService } from "./store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "./store/services/user-store.service/user-store.service";
import { WaitingStoreService } from "./store/services/waiting-store.service/waiting-store.service";

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
  ],
  providers: [
    UserService,
    UserStoreService,
    ThemeStoreService,
    WaitingStoreService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
