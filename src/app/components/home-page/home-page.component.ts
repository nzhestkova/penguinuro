import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../../model/user";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements DoCheck, OnDestroy {
  constructor(private userStore: UserStoreService,
              private cdr: ChangeDetectorRef) { }
  user: User | {};
  userExist: boolean;
  subscriber: Subscription;

  ngDoCheck(): void {
    this.subscriber = this.userStore.loadUserInfo().subscribe(
      (user) => {
        this.user = user;
        this.userExist = !!Object.keys(user).length;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
