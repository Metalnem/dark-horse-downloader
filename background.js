chrome.runtime.onMessage.addListener(message => {
	if (message.downloadUrl) {
		handleDownload(message.downloadUrl, message.title);
	} else if (message.error) {
		handleError(message.error);
	}
});

function handleDownload(downloadUrl, title) {
	chrome.downloads.download({
		url: downloadUrl,
		filename: getFileName(title)
	});
}

function handleError(error) {
	const options = {
		type: 'basic',
		title: 'Download Error',
		message: error,
		iconUrl: 'error-64.png'
	};

	chrome.notifications.create(null, options);
}

function sanitize(fileName) {
	return fileName
		.replace(/[<>*?]/g, '')
		.replace(/[/\\|]/g, '-')
		.replace('"', '\'')
		.replace(':', ' -');
}

function getFileName(title) {
	return sanitize(title) + '.tar';
}
