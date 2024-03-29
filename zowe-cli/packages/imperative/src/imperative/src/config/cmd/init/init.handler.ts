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

import { ICommandHandler, IHandlerParameters } from "../../../../../cmd";
import { ImperativeConfig, ProcessUtils, TextUtils } from "../../../../../utilities";
import { Config, ConfigConstants, ConfigSchema, IConfig } from "../../../../../config";
import { IProfileProperty } from "../../../../../profiles";
import { ConfigBuilder } from "../../../../../config/src/ConfigBuilder";
import { IConfigBuilderOpts } from "../../../../../config/src/doc/IConfigBuilderOpts";
import { ConfigUtils } from "../../../../../config/src/ConfigUtils";
import { OverridesLoader } from "../../../OverridesLoader";
import * as JSONC from "comment-json";
import * as lodash from "lodash";
import { diff } from "jest-diff";
import stripAnsi = require("strip-ansi");
import express = require('express');

/**
 * Init config
 */
export default class InitHandler implements ICommandHandler {
    private params: IHandlerParameters;

    /**
     * List of property names that have been prompted for.
     */
    private promptProps: string[];

    // public async startWebSocketServer() {
    //     return new Promise((resolve, reject) => {
    //         const wss = new WebSocket.Server({ port: 8080 });

    //         wss.on('connection', (ws: { on: (arg0: string, arg1: { (message: any): void; (error: any): void; }) => void; }) => {
    //             ws.on('message', (message: any) => {
    //                 this.params.response.console.log('Received from Tauri:', message);
    //                 resolve(message); // Resolve the promise with the received message
    //             });

    //             ws.on('error', (error: any) => {
    //                 reject(error); // Reject the promise if there's an error
    //             });

    //         });
    //     });
    // }
    //     public startWebSocketServer() {
    //     const ws = new WebSocket('ws://localhost:8080');

    //     ws.on('open', function open() {
    //         this.params.response.console.log('Connected to the server');
    //         ws.send('Hello Server');
    //     });
    //     ws.on('message', function incoming(data: any) {
    //         this.params.response.console.log('Received back:', data);
    //     });
    // }

    /**
     * Process the command and input.
     *
     * @param {IHandlerParameters} params Parameters supplied by yargs
     *
     * @throws {ImperativeError}
     */
    public async process(params: IHandlerParameters): Promise<void> {
        this.params = params;
        this.promptProps = [];

        //*************************************************************************/
        //TEST CODE START->//
        // this.params.response.console.log(Object.keys(myNeonProject).join(', '));
        // myNeonProject.launch();

        const { spawn } = require('child_process');

        const app = express();
        const port = 3000;

        app.use(express.json());

        app.post('/data', (req, res) => {
            try {
                this.params.response.console.log('Received data:', req.body);
                // Process request...
                res.json({ status: 'success', message: 'Data received' });
            } catch (error) {
                this.params.response.console.log('Error processing request:', error);
                res.status(500).json({ status: 'error', message: 'Internal server error' });
            }
        });

        app.listen(port, () => {
            this.params.response.console.log(`Server listening at http://localhost:${port}`);
        });

        const tauriProcess =
        spawn('C:/Users/at895452/Desktop/repos/innovations/zoweGUI2/tauriApp/src-tauri/target/release/zowegui.exe');
        // const WebSocket = require('ws');

        // const wss = new WebSocket.Server({ port: 8080 });

        // wss.on('connection', function connection(ws: any) {
        //     ws.on('message', function incoming(message: String) {
        //         this.params.response.console.log('received: %s', message);
        //     });
        // });



        // this.params.response.console.log('TESTING 123')
        // //data FROM tauri
        // tauriProcess.stdout.on("data", (data: any) => {
        //     this.params.response.console.log(`Tauri: ${data.toString()}`);
        // });

        // tauriProcess.on('close', (code: any) => {
        //     this.params.response.console.log(`Child process exited with code ${code}`);
        // });

        // tauriProcess.on('error', (err: any) => {
        //     this.params.response.console.log('Failed to start process:', err);
        // });

        // //*Listen for data/errors sent back from the Tauri app
        // child.stdout.on('data', (data: any) => {
        //     this.params.response.console.log(`Received from Tauri: ${data}`);
        // });

        // child.stderr.on('data', (data: any) => {
        //     this.params.response.console.log(`Error from Tauri: ${data}`);
        // });
        // //*

        process.exit();

        //<-TEST CODE END//
        //*************************************************************************/

        // // Load the config and set the active layer according to user options
        // await OverridesLoader.ensureCredentialManagerLoaded();
        // const config = ImperativeConfig.instance.config;
        // const configDir = params.arguments.globalConfig ? null : process.cwd();
        // config.api.layers.activate(params.arguments.userConfig, params.arguments.globalConfig, configDir);
        // const layer = config.api.layers.get();

        // // Do a dry run if dryRun flag is present. Otherwise, initialize or overwrite the config
        // if (params.arguments.dryRun && params.arguments.dryRun === true) {
        //     let dryRun = await this.initForDryRun(config, params.arguments.userConfig);

        //     // Merge and display, do not save
        //     // Handle if the file doesn't actually exist
        //     let original: any = layer;
        //     let originalProperties: any;

        //     if (original.exists === false) {
        //         originalProperties = {};
        //     } else {
        //         originalProperties = JSONC.parse(JSONC.stringify(original.properties, null, ConfigConstants.INDENT));

        //         // Hide secure stuff
        //         for (const secureProp of ImperativeConfig.instance.config.api.secure.secureFields(original)) {
        //             if (lodash.has(originalProperties, secureProp)) {
        //                 lodash.unset(originalProperties, secureProp);
        //             }
        //         }
        //     }

        //     const dryRunProperties = JSONC.parse(JSONC.stringify(dryRun.properties, null, ConfigConstants.INDENT));

        //     // Hide secure stuff
        //     for (const secureProp of ImperativeConfig.instance.config.api.secure.findSecure(dryRun.properties.profiles, "profiles")) {
        //         if (lodash.has(dryRunProperties, secureProp)) {
        //             lodash.unset(dryRunProperties, secureProp);
        //         }
        //     }

        //     original = JSONC.stringify(originalProperties, null, ConfigConstants.INDENT);
        //     dryRun = JSONC.stringify(dryRunProperties, null, ConfigConstants.INDENT);

        //     let jsonDiff = diff(original, dryRun, {
        //         aAnnotation: "Removed",
        //         bAnnotation: "Added",
        //         aColor: TextUtils.chalk.red,
        //         bColor: TextUtils.chalk.green
        //     });

        //     if (stripAnsi(jsonDiff) === "Compared values have no visual difference.") {
        //         jsonDiff = dryRun;
        //     }

        //     params.response.console.log(jsonDiff);
        //     params.response.data.setObj(jsonDiff);
        // } else {
        //     await this.initWithSchema(config, params.arguments.userConfig, params.arguments.overwrite && params.arguments.forSure);

        //     if (params.arguments.prompt !== false && config.api.secure.loadFailed && config.api.secure.secureFields().length > 0) {
        //         const warning = ConfigUtils.secureSaveError();
        //         params.response.console.log(TextUtils.chalk.yellow("Warning:\n") +
        //             `${warning.message} Skipped prompting for credentials.\n\n${warning.additionalDetails}\n`);
        //     }

        //     // Write the active created/updated config layer
        //     await config.save();
        //     params.response.console.log(`Saved config template to ${layer.path}`);

        //     if (params.arguments.edit && params.arguments.edit === true) {
        //         await ProcessUtils.openInEditor(ImperativeConfig.instance.config.api.layers.get().path);
        //     }
        // }
    }

    /**
     * Creates JSON template for config. Also creates a schema file in the same
     * folder alongside the config.
     * @param config Config object to be populated
     * @param user If true, properties will be left empty for user config
     */
    private async initWithSchema(config: Config, user: boolean, overwrite: boolean): Promise<void> {
        const opts: IConfigBuilderOpts = {};
        if (!user) {
            opts.populateProperties = true;
            opts.getValueBack = this.promptForProp.bind(this);
        }

        // Build new config and merge with existing layer or overwrite it if overwrite & forSure options are present
        const newConfig: IConfig = await ConfigBuilder.build(ImperativeConfig.instance.loadedConfig, opts);
        if (overwrite) {
            config.api.layers.set(newConfig);
        } else {
            const oldConfig = config.layerActive().properties;
            if (oldConfig.profiles.base?.properties != null) {
                // Remove values that should be overwritten from old base profile
                for (const propName of Object.keys(oldConfig.profiles.base.properties)) {
                    const newPropValue = newConfig.profiles.base.properties[propName];
                    if (this.promptProps.includes(propName) && newPropValue != null && newPropValue !== "") {
                        delete oldConfig.profiles.base.properties[propName];
                    }
                }
            }
            config.api.layers.merge(newConfig);
        }

        // Build the schema and write it to disk
        ConfigSchema.updateSchema();
    }

    /**
     * Do a dry run of creating JSON template for config.
     * Also create a schema file in the same folder alongside the config.
     * @param config Config object to be populated
     * @param user If true, properties will be left empty for user config
     */
    private async initForDryRun(config: Config, user: boolean): Promise<any> {
        const opts: IConfigBuilderOpts = {};
        if (!user) {
            opts.populateProperties = true;
        }

        // Build new config and merge with existing layer
        const newConfig: IConfig = await ConfigBuilder.build(ImperativeConfig.instance.loadedConfig, opts);
        return config.api.layers.merge(newConfig, true);
    }

    /**
     * Prompts for the value of a property on the CLI. Returns null if `--prompt false`
     * argument is passed, or prompt times out, or a blank value is entered.
     * @param propName The name of the property
     * @param property The profile property definition
     */
    private async promptForProp(propName: string, property: IProfileProperty): Promise<any> {
        // skip prompting in CI environment
        if (this.params.arguments.prompt === false || ImperativeConfig.instance.config.api.secure.loadFailed) {
            return null;
        }

        // get the summary and value
        let propDesc = propName;
        if ((property as any).optionDefinition?.description != null) {
            propDesc += ` (${(property as any).optionDefinition.description})`;
        }

        this.promptProps.push(propName);
        const propValue: any = await this.params.response.console.prompt(
            `Enter ${propDesc} ${ConfigConstants.SKIP_PROMPT}`, { hideText: property.secure });

        // coerce to correct type
        if (propValue && propValue.trim().length > 0) {
            return ConfigUtils.coercePropValue(propValue);
        }

        return propValue || null;
    }
}
