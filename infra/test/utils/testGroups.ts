import { describe } from 'vitest';

// types set-up
const TestGroups = [
  'ALL',
  'UNIT',
  'INTEGRATION',
  'POLICY',
  'TYPE',
] as const;
type TestGroup = typeof TestGroups[number];

// run all tests -- default behavior
const ALL = TestGroups[0];

// run unit tests
const UNIT = TestGroups[1];

// run tests that validate interoperability of modules
const INTEGRATION = TestGroups[2];

// run tests that enforce conventions
const POLICY = TestGroups[3];

// run tests that validate typescript types.
const TYPE = TestGroups[4];

// boilerplate functions
function isTestGroup(maybeTestGroup: string): maybeTestGroup is TestGroup {
  return TestGroups.some((tg) => tg === maybeTestGroup);
}

const testGroups: TestGroup[] = process.env.TEST_GROUP?.split(',').filter(isTestGroup) || [ALL];
if (testGroups.length === 0) testGroups.push(ALL);

function checkGroups(groups: TestGroup | TestGroup[]): boolean {
  const resolvedGroups = Array.isArray(groups) ? groups : [groups];
  return [...resolvedGroups, ALL].some((g) => testGroups.includes(g));
}

// helper functions (describe, but with in-advance currying to set the test group)
/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the UNIT test group (or none) is selected
 */
export const describeUnitTest = describe.runIf(checkGroups(UNIT));

/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the INTEGRATION test group (or none) is selected
 */
export const describeIntegrationTest = describe.runIf(checkGroups(INTEGRATION));

/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the POLICY test group (or none) is selected
 */
export const describePolicyTest = describe.runIf(checkGroups(POLICY));

/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the TYPE test group (or none) is selected
 */
export const describeTypeTest = describe.runIf(checkGroups(TYPE));
