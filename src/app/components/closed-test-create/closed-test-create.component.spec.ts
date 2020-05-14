import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClosedTestCreateComponent } from "./closed-test-create.component";

describe("ClosedTestCreateComponent", () => {
  let component: ClosedTestCreateComponent;
  let fixture: ComponentFixture<ClosedTestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedTestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedTestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
