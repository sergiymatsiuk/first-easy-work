const tasks = [
{
	_id: '177',
	completed: true,
	body: 'Learn CSS',
	title: 'CSS',
},
{
	_id:'100',
	completed: true,
	body: 'Learn HTML',
	title: 'HTML',
},
{
	_id: '555',
	completed: false,
	body: 'Learn Node.js',
	title: 'Node.js',
},
{
	_id: '444',
	completed: true,
	body: 'Learn Vue.js',
	title: 'Vue.js',
},
{
	_id: '323',
	completed: false,
	body: 'Learn JS',
	title: 'JS'
},
];

const theme={
	default: {
	'--header-bg':'#526e2d'},
	dark: {
	'--header-bg':'#33362f'},
	light: {
	'--header-bg':'#c8e0a8'},
};

(function(arrOfTasks){
	const objOfTasks=arrOfTasks.reduce((acc, task)=>{
		acc[task._id]=task;
		return acc;
	}, {});

	let lastSelectedTheme=localStorage.getItem('app_theme')||'default';

	//Elements UI
	const listContainer = document.querySelector('.tasks-list-section .list-group');

	const form=document.forms['addTask'];
	const inputTitle=form.elements['title'];
	const inputBody=form.elements['body'];
	const themeSelect=document.getElementById('themeSelect')
	
	// Events
	setTheme(lastSelectedTheme);
	renderAllTasks(objOfTasks);

	form.addEventListener('submit', onFormSubmitHandler);
	listContainer.addEventListener('click', onDeleteHandler)
	themeSelect.addEventListener('change', onThemeSelectHandler)

	function renderAllTasks(tasksList){
		if(!tasksList){
			console.error('Передайте список завдань!')
			return;
		};

		const fragment=document.createDocumentFragment();
		Object.values(tasksList).forEach(task=> {
			const li=listItemTemplate(task);
			fragment.appendChild(li);
		});
		listContainer.appendChild(fragment);
	};

	function listItemTemplate({_id, title, body}={}) {
		const li = document.createElement('li');
		li.classList.add(
			'list-group-item', 
			'd-flex', 
			'align-items-center', 
			'flex-wrap', 
			'mt-2');
		li.setAttribute('data-task-id', _id);
		
		const span = document.createElement('span');
		span.textContent=title;
		span.style.fontWeight='bold';

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent='Delete task';
		deleteBtn.classList.add('btn', 'btn-danger', 'm1-auto', 'delete-btn');

		const article= document.createElement('p');
		article.textContent=body;
		article.classList.add('mt-2', 'w-100');

		li.appendChild(span);
		li.appendChild(deleteBtn);
		li.appendChild(article);

		return li;
	};

	function onFormSubmitHandler(e){
		e.preventDefault();
		const titleValue=inputTitle.value;
		const bodyValue=body.value;
		
		if(!titleValue||!bodyValue){
			alert('Заповніть форму!');
			return;
		}
		const task = createNewTask(titleValue, bodyValue);
		const listItem = listItemTemplate(task);
		listContainer.insertAdjacentElement('afterbegin', listItem);
		form.reset();
	}

	function createNewTask(title, body){
		const newTask={
			title,
			body,
			completed: false,
			_id: Math.random(),
		}

		objOfTasks[newTask._id]=newTask;

		return {...newTask};

	};

	function deleteTask(id){
		const {title}=objOfTasks[id];
		const isConfirm = confirm(`Точно видалити ${title}!?`);
		if (!isConfirm) return isConfirm;
		delete objOfTasks[id];
		return isConfirm;
	}

	function deleteTaskFromHtml(confirmed, el){
		if(!confirmed) return;
		el.remove();
	}

	function onDeleteHandler({target}){
		if (target.classList.contains('delete-btn')){
			const parent=target.closest('[data-task-id]');
			const id=parent.dataset.taskId;
			const confirmed = deleteTask(id);
			deleteTaskFromHtml(confirmed, parent);
		}
	}

	function onThemeSelectHandler(e){
		const selectedTheme=themeSelect.value;
		const confirmed=confirm(`Ви справді хочете поміняти тему на ${selectedTheme} ?`);
		if(!confirmed) {
			themeSelect.value=lastSelectedTheme; 
			return;};
		setTheme(selectedTheme);
		lastSelectedTheme=selectedTheme;
		localStorage.setItem('app_theme', selectedTheme)
	}

	function setTheme(name){
		const selectedThemObj=theme[name];
		Object.entries(selectedThemObj).forEach(([key, value])=>{
			document.documentElement.style.setProperty(key, value)
		})
	}
})(tasks);

const child=document.querySelector('.row');
const father=document.querySelector('.form-sectionmt-5');
//ПРОСТЕ РІШЕННЯ ЩОБ ЗНАЙТИ БАТЬКА
// function getParent(child, father){
// 	return father===child.parentElement;
// }

//ШУКАЄ ВСІ ДІВИ І СТВОРЮЄ НОВІ КЛАСИ В НИХ!
// var divs=[...document.querySelectorAll('div')];
// divs.forEach((item, id)=>id%2===0?item.classList.add('win!'):item.classList.add('lost!'));
// console.log(divs);

// ШУКАЄ В ДОКУМЕНТІ КЛАСИ ТА ІД! ЗАМІНЮЄ ЇХ!
// let h2=document.querySelector('h2');
// h2.classList.add('win');
// h2.setAttribute('id', 'newId');
// console.log(h2);

// ВІДБУЛИСЯ МАНІПУЛЯЦІЇ З LI!
// let ul=document.querySelector('.list-group');
// let counts=5;
// let totalCounts=ul.children.length+counts;
// for (let i=ul.children.length; i<totalCounts; i++){
// 	const li=document.createElement('li');
// 	li.classList.add('new-item');
// 	li.textContent=`item ${i+1}`;
// 	ul.appendChild(li);
// }