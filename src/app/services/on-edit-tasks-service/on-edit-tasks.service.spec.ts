import { TestBed } from "@angular/core/testing";

import { OnEditTasksService } from "./on-edit-tasks.service";

describe("OnEditTasksService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OnEditTasksService = TestBed.get(OnEditTasksService);
    expect(service).toBeTruthy();
  });
});
