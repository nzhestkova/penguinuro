import { TestBed } from "@angular/core/testing";

import { OnEditTasksStoreService } from "./on-edit-tasks-store.service";

describe("OnEditTasksStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OnEditTasksStoreService = TestBed.get(OnEditTasksStoreService);
    expect(service).toBeTruthy();
  });
});
