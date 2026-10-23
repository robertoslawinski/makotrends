import test from "node:test";
import assert from "node:assert/strict";
import { evaluateComparison } from "../src/services/automaticResolutionService.js";

test("gte resolves yes at the threshold", () => {
  assert.equal(evaluateComparison({ value: 82000, operator: "gte", threshold: 82000 }), "yes");
});

test("gt resolves no at the threshold", () => {
  assert.equal(evaluateComparison({ value: 82000, operator: "gt", threshold: 82000 }), "no");
});

test("lte and lt resolve both sides correctly", () => {
  assert.equal(evaluateComparison({ value: 9, operator: "lte", threshold: 10 }), "yes");
  assert.equal(evaluateComparison({ value: 10, operator: "lt", threshold: 10 }), "no");
});

test("invalid operators are rejected", () => {
  assert.throws(
    () => evaluateComparison({ value: 1, operator: "equals", threshold: 1 }),
    /Unsupported comparison operator/
  );
});
