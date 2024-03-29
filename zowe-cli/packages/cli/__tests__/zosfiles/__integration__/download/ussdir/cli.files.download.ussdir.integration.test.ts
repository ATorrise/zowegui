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

describe("Download USS Directory", () => {

    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "download_uss_dir",
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should display the help", () => {
        const shellScript = path.join(__dirname, "__scripts__", "command_download_ussdir_help.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT);

        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });

    it("should fail due to missing directory positional", async () => {
        const shellScript = path.join(__dirname, "__scripts__", "command", "command_download_ussdir.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT, [""]);
        expect(response.status).toBe(1);
        expect(response.stderr.toString()).toContain("ussDirName");
        expect(response.stderr.toString()).toContain("Missing Positional");
    });

    it("should fail due to specifying both binary and attributes", async () => {
        const shellScript = path.join(__dirname, "__scripts__", "command", "command_download_ussdir.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT, ["test", "--binary", "--attributes fakefile.txt"]);
        expect(response.status).toBe(1);
        expect(response.stderr.toString()).toContain("following options conflict");
        expect(response.stderr.toString()).toContain("--attributes");
        expect(response.stderr.toString()).toContain("--binary");
    });

    it("should fail due to specifying an attributes file that does not exist", async () => {
        const shellScript = path.join(__dirname, "__scripts__", "command", "command_download_ussdir.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT, ["test", "--attributes", "fakefile.txt"]);
        expect(response.status).toBe(1);
        expect(response.stderr.toString()).toContain("does not exist");
    });

    it("should fail due to specifying an invalid type filter", async () => {
        const shellScript = path.join(__dirname, "__scripts__", "command", "command_download_ussdir.sh");
        const response = runCliScript(shellScript, TEST_ENVIRONMENT, ["test", "--type", "a"]);
        expect(response.status).toBe(1);
        expect(response.stderr.toString()).toContain("Invalid value specified for option");
    });
});
