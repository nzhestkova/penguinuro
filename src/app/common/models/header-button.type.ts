import {TemplateRef} from "@angular/core";

export type ButtonModel = {
	key?: string;
	value?: string;
	active?: boolean;
	template?: TemplateRef<void>;
}
