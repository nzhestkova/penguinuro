import { TestBed } from "@angular/core/testing";

import { ThemeStoreService } from "./theme-store.service";

describe("ThemeStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ThemeStoreService = TestBed.get(ThemeStoreService);
    expect(service).toBeTruthy();
  });
});
