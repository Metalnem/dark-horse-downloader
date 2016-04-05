chrome.runtime.onMessage.addListener(message => {
	if (message.downloadUrl) {
		handleDownload(message.downloadUrl);
	} else if (message.error) {
		handleError(message.error);
	}
});

function handleDownload(downloadUrl) {
	chrome.downloads.download({
		url: downloadUrl
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
