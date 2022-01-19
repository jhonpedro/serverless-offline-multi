const { getInstalledPath } = require('get-installed-path')

const determineArguments = (args) => {
	return new Promise((resolve, reject) => {
		if (args && args.directory) {
			if (typeof args.directory === 'string') {
				resolve([
					{
						directory: args.directory,
					},
				])
			} else if (Array.isArray(args.directory)) {
				const mappedArgs = args.directory.map((dir, index) => {
					if (typeof dir !== 'string') {
						reject('Directory argument missing or not a string')
					}

					return {
						directory: dir,
					}
				})

				resolve(mappedArgs)
			} else {
				reject('Amount of directory arguments must be equal')
			}
		} else {
			reject('Directory argument missing')
		}
	}).catch((err) => {
		throw new Error(`ArgumentValidationError: ${err}`)
	})
}

exports.determineArguments = determineArguments

const prefixColors = [
	'red',
	'blue',
	'green',
	'yellow',
	'magenta',
	'cyan',
	'white',
	'gray',
]

exports.prefixColors = prefixColors

const isServerlessInstalled = () => {
	return getInstalledPath('serverless')
		.then((path) => {
			return true
		})
		.catch((err) => {
			return false
		})
}

exports.isServerlessInstalled = isServerlessInstalled
