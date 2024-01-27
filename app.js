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

class Field {
	constructor(size) {
		this.cells = [];
		this.size = size;
    this.mousedown = false;
	}

	drawField() {
		for (let i = 0; i < this.size; i++) {
			const row = [];
			for (let j = 0; j < this.size; j++) {
				const newCell = createNode('button', ['cell'], { id: `${j}-${i}`});
				row.push(newCell);
			}
			this.cells.push(row);
		}
		const nonogramField = createNode('div', ['nonogram']);
		const nonogramPicture = createNode('div', ['container']);
		nonogramField.append(nonogramPicture);
		const rows = this.cells.map((row) => {
			const newrow = createNode('div', ['row']);
			newrow.append(...row);
			return newrow;
		});
		nonogramPicture.append(...rows);
		fieldCont.append(nonogramPicture);
    nonogramPicture.addEventListener('click', (e) => {
      e.target.classList.toggle('black');
    });
    addEventListener('mousedown', () => {
      this.mousedown = !this.mousedown;
    })
    addEventListener('mouseup', () => {
      this.mousedown = !this.mousedown;
    })
    addEventListener("mouseover", (e) => {
      if (this.mousedown && e.target.classList.contains('cell')) e.target.classList.add('black');
    });
	}
	// Тут можно изменить формат и содержание данных, получаемым при клике на кнопку GET MATRIX
  getMatrix(){
    let black = inputFilledCell.value;
    let white = inputEmptyCell.value;
    const isNumber = (str) => {
      return [...str].every((char) => '0123456789'.includes(char));
    }
    if (isNumber(black) && isNumber(white)) {
      black = black * 1;
      white = white * 1;
    }
    let matrix = this.cells.map((row) => row.map((cell) => cell.classList.contains('black') ? black : white));
    navigator.clipboard.writeText(JSON.stringify(matrix));
    console.log('Матрица скопирована в буфер обмена', matrix);
		const message = createNode('div',['nonogram-creator__message', 'fade-in-out']);
		message.textContent = 'Matrix copied to clipboard!'
		navigationBar.append(message);
		setTimeout(() => {
			message.remove();
		}, 1000);
  }
}



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

form.oninput = (e) => {
	clearNode(fieldCont);
	const newField = new Field(e.target.value);
	newField.drawField();
  generateButton.onclick = () => {
		newField.getMatrix();
  }
};


clearNode(fieldCont);
const newField = new Field(5);
newField.drawField();
generateButton.onclick = () => {
  newField.getMatrix();
}