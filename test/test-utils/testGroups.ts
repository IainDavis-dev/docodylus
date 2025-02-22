import { describe } from "vitest";

// types set-up
const TestGroups = [
    'ALL',
    'UNIT',
    'INTEGRATION',
    'POLICY',
] as const;
type TestGroup = typeof TestGroups[number];

const ALL = TestGroups[0];
const UNIT = TestGroups[1]
const INTEGRATION = TestGroups[2];
const POLICY = TestGroups[3];

// boilerplate functions
function isTestGroup(maybeTestGroup: string): maybeTestGroup is TestGroup {
    return TestGroups.some(tg => tg === maybeTestGroup);
}

const testGroups: TestGroup[] = process.env.TEST_GROUP?.split(",").filter(isTestGroup) || [ALL];
if (testGroups.length === 0) testGroups.push(ALL);

function checkGroups(groups: TestGroup | TestGroup[]) {
    const resolvedGroups = Array.isArray(groups) ? groups : [groups]
    return [...resolvedGroups, ALL].some(g => testGroups.includes(g))
}

// helper functions (describe, but with in-advance currying to set the test group)
/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the UNIT test group (or none) is selected
 */
export const describeUnitTest = describe.runIf(checkGroups(UNIT))

/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the INTEGRATION test group (or none) is selected
 */
export const describeIntegrationTest = describe.runIf(checkGroups(INTEGRATION))

/**
 * Supplies the necessary boilerplate to ensure a block of tests runs
 * only when the POLICY test group (or none) is selected
 */
export const describePolicyTest = describe.runIf(checkGroups(POLICY))
