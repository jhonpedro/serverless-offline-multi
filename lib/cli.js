#!/usr/bin/env node
const concurrently = require('concurrently')
const args = require('minimist')(process.argv.slice(2))
const path = require('path')
const {
	determineArguments,
	prefixColors,
	getInstallPath,
	isServerlessInstalled,
} = require('./helpers')

exports.start = async function () {
	const determinedArgs = await determineArguments(args)
	const installedPath = path.resolve(__dirname, '..', '..')

	const serviceCommands = determinedArgs.map((dir) => {
		const { directory } = dir
		return {
			command: `cd ${path.join(process.cwd(), directory)} && ${path.join(
				installedPath,
				'nodemon',
				'bin',
				'nodemon.js'
			)} --exec "serverless offline" -e "js,ts,yml"`,
			name: directory,
			prefixColor:
				prefixColors[Math.floor(Math.random() * prefixColors.length)],
		}
	})

	// const installResult = await isServerlessInstalled()

	// if (!installResult) {
	//     throw new Error('Serverless does not appear to be installed. This may be a false positive, try re-running with --skipInstallCheck')
	// }

	concurrently(serviceCommands, {
		prefix: 'name',
		killOthers: ['failure', 'success'],
		restartTries: 3,
	}).then(
		() => {
			// success
		},
		() => {
			// failure
		}
	)
}
