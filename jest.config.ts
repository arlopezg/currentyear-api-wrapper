import type { Config } from "@jest/types";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./tests/setupJest.ts"],
} as Config.InitialOptions;
