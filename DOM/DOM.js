let users=[{
	'id': 'bvsdbvh',
	'isActive': true,
	'name': 'Sergiy Matsiuk',
	'email': 'SergiyMatsiyk@gmail.com',
	'balance': '-1580',
},
{
	'id': 'nknkjnjk',
	'isActive': false,
	'name': 'Nina Matsiuk',
	'email': 'NinaMatsiyk@gmail.com',
	'balance': '3580',
},
{
	'id': 'dvndl',
	'isActive': true,
	'name': 'Taras Matsiuk',
	'email': 'TarasMatsiyk@gmail.com',
	'balance': '982',
}];

const tableSchema = {
	index: '#',
	name: 'Name',
	email: 'Emaile',
	balance: 'Balance',
};
// СТВОРЮЄ ПЕРШИЙ РЯДОК ТАБЛИЦІ
function generateThead(tableSchema){
	const thead=document.createElement('thead');
	const tr=generateTr(tableSchema, 'th');
	thead.appendChild(tr);
	return thead;
};

//ЗАПОВНЮЄ ПЕРШИЙ РЯДОК ТАБЛИЦІ З ОБЄКТА
function generateTr(tableSchema, tagName='td'){
	const tr=document.createElement('tr');
	Object.values(tableSchema).forEach(val => {
		const td=document.createElement(tagName);
		td.textContent=val;
		tr.appendChild(td);
	});
	return tr;
};

function generateTbody(tableSchema, items){
	const tbody=document.createElement('tbody');
	items.forEach((item, index)=>{
		item.index=index+1;
		const itemSchema = generateItemsSchema(tableSchema, item);
		const tr = generateTr(itemSchema, 'td');
		tbody.appendChild(tr);
	});

	return tbody;
}

function generateItemsSchema(tableSchema, item){
	const itemSchema = Object.keys(tableSchema).reduce((acc, key) => {
		if (key in item){
			acc[key]=item[key];
		}
		return acc
	}, {});
	return itemSchema;
}

// СТВОРЮЄ ТАБЛИЦЮ
function generateTableTemplate(){
	const table=document.createElement('table');
	table.classList.add('table');
	return table;
};

//РАХУЄ ФІНАЛЬНИЙ БАЛАНС, СТВОРЮЮЧИ НОВИЙ РЯДОК ЗНИЗУ
function generateTotalBalance(tableSchema, items){
	const total=items.reduce((acc, item)=>acc+parseFloat(item.balance), 0);
	const tr=document.createElement('tr');
	const td=document.createElement('td');
	const columnCounts= Object.keys(tableSchema).length;

	td.insertAdjacentHTML('beforeend', `Total balance: <b>${total}</b>`);
	td.setAttribute('colspan', columnCounts);
	td.setAttribute('align', 'right');

	tr.appendChild(td);

	return tr;
}

// ОСНОВНА ФУНКЦІЯ
function initTable(tableSchema, items){
	const container=document.querySelector('.table-container');
	const table=generateTableTemplate();
	const header=generateThead(tableSchema);
	const tbody=generateTbody(tableSchema, items);
	const balance=generateTotalBalance(tableSchema, items);

	table.appendChild(header);
	table.appendChild(tbody);
	table.appendChild(balance);
	container.appendChild(table);
};

initTable(tableSchema, users);

