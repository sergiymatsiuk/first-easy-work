const apiURL='https://jsonplaceholder.typicode.com';
const usersListEl= document.querySelector('.user-list');
const userInfoEl=document.querySelector('.user-info');
// DOM events
usersListEl.addEventListener('click', onUserClic)

//
function onUserClic (e) {
	e.preventDefault();

	if(e.target.dataset.userId){
		getUsersInfoHTTP(e.target.dataset.userId, onGetUserInfoCallback)
	}
}

function getUsersHTTP(cb){
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `${apiURL}/users`);

	xhr.addEventListener('load', ()=>{
		if(xhr.status!==200){
			console.log('Error', xhr.status);
			return;
		};

		const res=JSON.parse(xhr.response);
		cb(res);
	});
	xhr.send();
};

function getUsersInfoHTTP(id, cb){
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `${apiURL}/users/${id}`);

	xhr.addEventListener('load', ()=>{
		if(xhr.status!==200){
			console.log('Error', xhr.status);
			return;
		};

		const res=JSON.parse(xhr.response);
		cb(res);
	});
	xhr.send();
}

function onGetUserInfoCallback(user){
	if(!user.id){
		console.log('User not found!');
		return;
	};
	renderUserInfo(user);
}

function onGetUsersCallback(users){
	if(!users.length){
		return;
	}
	renderUserList(users);
};

function renderUserList(users){
	const fragment= users.reduce((acc, user)=>
		acc+userListItemTemplate(user), '');
		
	usersListEl.insertAdjacentHTML('afterbegin', fragment);
}

function renderUserInfo(user){
	userInfoEl.innerHTML='';

	const template=userInfoTemplate(user);

	userInfoEl.insertAdjacentHTML('afterbegin', template);
};

function userListItemTemplate(user){
	return `
	<button type="button" class="list-group-item list-group-item-action" data-user-id='${user.id}'>
	${user.name}
	</button>
	`
	;
}

function userInfoTemplate(user){
	return `
	<div class="card border-dark mb-3">
	<div class="card-header">${user.name}</div>
	<div class="car-body text-darc">
		<h5 class="text-title">${user.email}</h5>
		<ul class="list-group list-group-flush">
			<li class="list-group-item"><b>Nickname </b>${user.name}</li>
			<li class="list-group-item"><b>Website </b>${user.website}</li>
			<li class="list-group-item"><b>Company </b>${user.company.name}</li>
			<li class="list-group-item"><b>City </b>${user.address.city}</li>
		</ul>
	</div>
	<div class="card-footer bg-transparent border-dark">Phone: ${user.phone}</div>
</div>	
	`
}

//Init app
getUsersHTTP(onGetUsersCallback);