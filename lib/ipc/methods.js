import process from 'node:process';
import {sendMessage} from './send.js';
import {getOneMessage} from './get-one.js';
import {getEachMessage} from './get-each.js';

// Add promise-based IPC methods in current process
export const addIpcMethods = (subprocess, {ipc}) => {
	Object.assign(subprocess, getIpcMethods(subprocess, false, ipc));
};

// Get promise-based IPC in the subprocess
export const getIpcExport = () => getIpcMethods(process, true, process.channel !== undefined);

// Retrieve the `ipc` shared by both the current process and the subprocess
const getIpcMethods = (anyProcess, isSubprocess, ipc) => ({
	sendMessage: sendMessage.bind(undefined, {
		anyProcess,
		isSubprocess,
		ipc,
	}),
	getOneMessage: getOneMessage.bind(undefined, {
		anyProcess,
		channel: anyProcess.channel,
		isSubprocess,
		ipc,
	}),
	getEachMessage: getEachMessage.bind(undefined, {
		anyProcess,
		channel: anyProcess.channel,
		isSubprocess,
		ipc,
	}),
});
