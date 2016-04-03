const idMarker = '/api/v/books/details/';
const idLength = 32;

if (document.getElementsByClassName('product-gallery').length > 0) {
	const elements = document.getElementsByClassName('profile-buy');

	Array.prototype.forEach.call(elements, element => {
		const readUrl = element.children[0].href;
		const div = document.createElement('div');

		div.className = 'download';
		div.innerHTML = '\u2B07';
		element.appendChild(div);

		div.addEventListener('click', () => {
			fetch(readUrl, {
				credentials: 'include'
			}).then(response => response.text()).then(text => {
				const idIndex = text.indexOf(idMarker);

				if (idIndex !== -1) {
					const idStart = idIndex + idMarker.length;
					const idEnd = idStart + idLength;
					const id = text.substring(idStart, idEnd);
					const downloadUrl = 'https://digital.darkhorse.com/api/v6/book/' + id;

					document.location = downloadUrl;
				}
			});
		});
	});
}
