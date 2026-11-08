import { defineConfig } from "vitest/config";
import path from "node:path";
import os from "node:os";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname) } },
  // Tests write to a throw-away folder, never to the real ./data
  test: { include: ["tests/**/*.test.ts"], env: { DATA_DIR: path.join(os.tmpdir(), `mj-test-${Date.now()}`) } },
});
