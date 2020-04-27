import { TestBed } from "@angular/core/testing";

import { WaitingStoreService } from "./";

describe("WaitingStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: WaitingStoreService = TestBed.get(WaitingStoreService);
    expect(service).toBeTruthy();
  });
});
