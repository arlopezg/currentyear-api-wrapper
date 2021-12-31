import type { Config } from "@jest/types";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./tests/setupJest.ts"],
  coverageReporters: ["json-summary", "text", "lcov"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
} as Config.InitialOptions;
