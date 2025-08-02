module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/*.module.ts",
    "!src/main.ts",
    "!src/polyfills.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text-summary", "lcov"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!.*\\.mjs$|@angular|@ngrx|ngx-toastr)",
  ],
};
