import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ThemeStoreService } from "../../store/services/theme-store.service/theme-store.service";

@Component({
  selector: "app-popup-confirm",
  templateUrl: "./popup-confirm.component.html",
  styleUrls: ["./popup-confirm.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupConfirmComponent implements OnInit {
  @Input() question: string;
  @Input() info: string;
  @Input() confirm: string;
  @Input() cancel: string;
  @Output() chosen = new EventEmitter<boolean>();

  constructor(private themeStore: ThemeStoreService,
              private cdr: ChangeDetectorRef) { }
  darkTheme: boolean;

  onConfirm(): void {
    this.chosen.emit(true);
  }

  onCancel(): void {
    this.chosen.emit(false);
  }

  ngOnInit(): void {
    this.themeStore.loadThemeInfo().subscribe((theme) => {
      this.darkTheme = theme;
      this.cdr.markForCheck();
    });
  }
}
