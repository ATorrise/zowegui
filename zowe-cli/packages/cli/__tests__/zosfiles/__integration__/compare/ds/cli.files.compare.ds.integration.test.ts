/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import * as path from "path";
import { ITestEnvironment, runCliScript } from "@zowe/cli-test-utils";
import { TestEnvironment } from "../../../../../../../__tests__/__src__/environment/TestEnvironment";
import { ITestPropertiesSchema } from "../../../../../../../__tests__/__src__/properties/ITestPropertiesSchema";

// Test Environment populated in the beforeAll();
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;

describe("Compare two data sets", () => {

    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "compare_data_set_integration",
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should display the help", async () => {
        const shellScript = path.join(__dirname, "__scripts__/compare_data_set_help.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT);
        expect(response.status).toBe(0);
        expect(response.stderr.toString()).toBe("");
        expect(response.stdout.toString()).toMatchSnapshot();
    });

    it("should fail due to missing data set name", async () => {
        const shellScript = path.join(__dirname, "__scripts__/compare_data_set.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT, [""]);
        expect(response.status).toBe(1);
        expect(response.stderr.toString()).toContain("Missing Positional Argument");
        expect(response.stderr.toString()).toContain("dataSetName1");
    });

    it("should display an error when command includes an undefined option", () => {
        const response = runCliScript(__dirname + "/__scripts__/bogus_flag.sh", TEST_ENVIRONMENT);
        expect(response.status).toBe(1);
        expect(response.stdout.toString()).toBe("");
        expect(response.stderr.toString()).toContain(
            "Command failed due to improper syntax"
        );
    });

});
