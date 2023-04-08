const tagCantain = document.querySelector('.tag-container');
const tagInput = document.querySelector('.tag-container input');
const clearAll = document.querySelector('#removeBtn');
const copyAll = document.querySelector('#copyBtn');
let tagsDatas = [];
function makeTag(tag) {
	const div = document.createElement('div');
	const span = document.createElement('span');
	const icon = document.createElement('i');
	div.setAttribute('class', 'tags');
	icon.setAttribute('class', 'fa-regular fa-circle-xmark');
	icon.setAttribute('itemDetails', tag);
	span.innerHTML = tag;
	div.appendChild(span);
	div.appendChild(icon);
	return div;
}
function reset() {
	const tagElements = document.querySelectorAll('.tags');
	tagElements.forEach((tag) => {
		tag.parentElement.removeChild(tag);
	});
}

function appendTag() {
	reset();

	tagsDatas
		.slice()
		.reverse()
		.forEach((element) => {
			tagCantain.prepend(makeTag(element));
		});
}

tagInput.addEventListener('keyup', function (event) {
	inputData = tagInput.value.trim();
	if (event.key == 'Enter') {
		if (inputData.includes(',')) {
			commaData = inputData.split(',');
			commaData.forEach((element) => {
				if (element != '') {
					tagsDatas.push(element);
				}
			});
		} else {
			tagsDatas.push(inputData);
		}
		tagsDatas = [...new Set(tagsDatas)];
		tagInput.value = '';
		appendTag();
	}
});
clearAll.addEventListener('click', function () {
	tagsDatas = [];
	reset();
	alert('All Tags Removed');
});
document.addEventListener('click', function (event) {
	if (event.target.tagName == 'I') {
		const data = event.target.getAttribute('itemDetails');
		const remainTag = tagsDatas.filter((tag) => {
			return tag != data;
		});
		tagsDatas = remainTag;
		appendTag();
	}
});

copyAll.addEventListener('click', function () {
	if (tagsDatas.length) {
		navigator.clipboard.writeText(tagsDatas.toString()).then(() => {
			alert('Tags Copied to Clipboard !');
		});
	}
});
