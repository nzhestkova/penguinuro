import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MistakesStructureComponent } from "./mistakes-structure.component";

describe("MistakesStructureComponent", () => {
  let component: MistakesStructureComponent;
  let fixture: ComponentFixture<MistakesStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MistakesStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MistakesStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
