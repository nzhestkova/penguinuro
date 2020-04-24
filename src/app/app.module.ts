import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { UserService } from "./services/user-service/user.service";
import { appReducers } from "./store/reducers/app.reducers";
import { ThemeStoreService } from "./store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "./store/services/user-store.service/user-store.service";

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent,
    HomePageComponent,
    ProfileComponent,
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
