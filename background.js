chrome.runtime.onMessage.addListener(() => {
	const options = {
		type: 'basic',
		title: 'Download Error',
		message: 'Download link for the comic book could not be found.',
		iconUrl: 'error-64.png'
	};

	chrome.notifications.create(null, options);
});
