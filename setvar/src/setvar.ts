import * as taskLib from 'vsts-task-lib/task';
import * as toolLib from 'vsts-task-tool-lib/tool';
import { fs } from 'mz';
import * as path from 'path';
import { chmod } from 'mz/fs';

async function run() {
    try {
        let v = await version();
        let toolPath: string = toolLib.findLocalTool('setvar', v);

        if (!toolPath) {
            toolPath = await toolLib.cacheDir(path.join(__dirname, '..', 'bin', tool(taskLib.osType())), 'setvar', v);
            await chmod(path.join(toolPath, 'setvar'), 0o777);
        }

        toolLib.prependPath(toolPath);
    }
    catch (error) {
        taskLib.setResult(taskLib.TaskResult.Failed, error.message);
    }
}

run();

export async function version() {
    let info = JSON.parse((await fs.readFile(path.join(__dirname, '..', 'task.json'))).toString());
    return `${info.version.Major}.${info.version.Minor}.${info.version.Patch}`
}

export function tool(os: string) {
    switch (os) {
        case 'Windows_NT':
            return 'windows';
        case 'Darwin':
            return 'darwin';
        case 'Linux':
            return 'linux';
        default:
            throw Error(`Operating system '${os}' not supported`)

    }

}