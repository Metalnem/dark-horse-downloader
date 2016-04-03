if (document.getElementsByClassName('product-gallery').length > 0) {
	const elements = document.getElementsByClassName('profile-buy');

	Array.prototype.forEach.call(elements, element => {
		const div = document.createElement('div');
		div.className = 'download';
		div.innerHTML = '\u2B07';
		element.appendChild(div);

		div.addEventListener('click', () => {
			alert('Downloading...');
		});
	});
}
