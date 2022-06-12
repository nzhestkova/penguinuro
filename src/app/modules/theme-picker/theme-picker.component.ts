import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModel} from "../../common/models/header-button.type";

@Component({
	selector: 'app-theme-picker',
	templateUrl: './theme-picker.component.html',
	styleUrls: ['./theme-picker.component.less']
})
export class ThemePickerComponent {
	@Input() value: ButtonModel;
	@Input() items: ButtonModel[];

	public _listVisible: boolean = false;

	@Output() valueChange: EventEmitter<ButtonModel> = new EventEmitter();

	_onThemePickerClick(): void {
		this._listVisible = !this._listVisible;
	}

	_onPickTheme(chosenItem: ButtonModel): void {
		this.items = this.items.map((item: ButtonModel) => ({
			...item,
			key: item.value + (item.value === chosenItem.value ? '-active' : '')
		}));
		this.valueChange.emit({
			...chosenItem,
			key: chosenItem.value + '-active'
		});
	}
}
