const body = document.body;
const gameContainer = createNode('div', ['nonogram-creator']);
const fieldCont = createNode('div', ['nonogram-creator__playboard']);
const navigationBar = createNode('div', ['nonogram-creator__navbar']);
const generateButton = createNode(
	'button',
	['nonogram-creator__button'],
	{ type: 'button' },
	'GET ARRAY'
);
const form = createNode('form', ['nonogram-creator__form']);
body.append(gameContainer);
gameContainer.append(fieldCont, navigationBar);
navigationBar.append(generateButton, form);
const inputs = [5, 10, 15].map((size, i) => {
	const inputField = createNode('div', ['nonogram-creator__form-field']);
	const input = createNode('input', ['nonogram-creator__radio'], {
		type: 'radio',
		id: `size-${size}`,
		value: size,
		name: 'level',
	});
	if (i === 0) input.checked = true;
	const label = createNode(
		'label',
		['nonogram-creator__label'],
		{ for: `size-${size}` },
		size + ' x ' + size
	);
	inputField.append(input, label);
	return inputField;
});
form.append(...inputs);
const inputEmptyCellLabel = createNode('label', ['nonogram-creator__text'],{},"Light cell:");
const inputEmptyCell = createNode('input', ['nonogram-creator__input'], {
	type: 'text',
	placeholder: 'Light cell placeholder',
	value: 0
});
const inputFilledCellLabel = createNode('label', ['nonogram-creator__text'],{},'Dark cell:');
const inputFilledCell = createNode('input', ['nonogram-creator__input'], {
	type: 'text',
	placeholder: 'Dark cell placeholder',
	value: 1
});
navigationBar.append(inputEmptyCellLabel,inputEmptyCell,inputFilledCellLabel,inputFilledCell)




function createNode(type, classlist, attrlist, content) {
	let node;
	if (type) {
		node = document.createElement(type);
	}
	if (classlist) {
		node.classList.add(...classlist);
	}
	if (attrlist) {
		if (Object.keys(attrlist)) {
			for (let key in attrlist) {
				node.setAttribute(key, attrlist[key]);
			}
		}
	}
	if (content) {
		node.append(...content);
	}
	return node;
}

function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}