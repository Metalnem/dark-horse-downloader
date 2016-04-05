const idMarker = '/api/v/books/details/';
const idLength = 32;

if (document.getElementsByClassName('product-gallery').length > 0) {
	const elements = document.getElementsByClassName('profile-buy');

	Array.prototype.forEach.call(elements, element => {
		const readUrl = element.children[0].href;

		const background = document.createElement('div');
		background.className = 'background';

		const content = document.createElement('div');
		content.className = 'download';
		content.innerHTML = '\u2B07';

		background.appendChild(content);
		element.appendChild(background);

		background.addEventListener('click', () => {
			content.className = 'spinner';
			content.innerHTML = null;

			fetch(readUrl, {
				credentials: 'include'
			}).then(response => response.text()).then(text => {
				const idIndex = text.indexOf(idMarker);

				if (idIndex === -1) {
					throw new Error('Download link for the comic book could not be found.');
				}

				const idStart = idIndex + idMarker.length;
				const idEnd = idStart + idLength;
				const id = text.substring(idStart, idEnd);
				const downloadUrl = 'https://digital.darkhorse.com/api/v6/book/' + id;

				return downloadUrl;
			}).then(downloadUrl => {
				chrome.runtime.sendMessage({
					downloadUrl: downloadUrl
				});
			}).catch(error => {
				chrome.runtime.sendMessage({
					error: error.message
				});
			}).then(() => {
				content.className = 'download';
				content.innerHTML = '\u2B07';
			});
		});
	});
}
