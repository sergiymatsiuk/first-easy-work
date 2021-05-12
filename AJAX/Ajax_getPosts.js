const btn=document.querySelector('.btn-primary');
const btnAddPost=document.querySelector('.btn-danger');
const container=document.querySelector('.container');

function getPosts(cb){
	const xhr= new XMLHttpRequest();
	xhr.open('get', 'https://jsonplaceholder.typicode.com/posts');
	xhr.addEventListener('load', ()=>{
		const response = JSON.parse(xhr.responseText);
		cb(response);
	});
	xhr.addEventListener('error', ()=>{
		console.log('error');
	})

	xhr.send();
};

function createPost(body, cb){
	const xhr= new XMLHttpRequest();
	xhr.open('post', 'https://jsonplaceholder.typicode.com/posts');
	xhr.addEventListener('load', ()=>{
		const response = JSON.parse(xhr.responseText);
		cb(response);
	});

	xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

	xhr.addEventListener('error', ()=>{
		console.log('error');
	})

	xhr.send(JSON.stringify(body));
}

function cardTemplate(post){
	const card=document.createElement('div');
	card.classList.add('card');
	const cardBody=document.createElement('div');
	cardBody.classList.add('card-body');
	const title=document.createElement('h5');
	title.classList.add('card-title');
	title.textContent= post.title;
	const article=document.createElement('p');
	article.classList.add('card-text');
	article.textContent = post.body;
	cardBody.appendChild(title);
	cardBody.appendChild(article);
	card.appendChild(cardBody);

	return card;
}

function renderPosts(response){
	const fragment=document.createDocumentFragment();
		response.forEach(post => {
			const card=cardTemplate(post);
			fragment.appendChild(card);
		})
		container.appendChild(fragment);
}

btn.addEventListener('click', e=>{
	getPosts(renderPosts);
});

btnAddPost.addEventListener('click', e=>{
	const newPost={
		title: 'New Title',
		body: 'New Body',
		userId: 1,
	};
	createPost(newPost, response=>{
		console.log(response);
		const card=cardTemplate(response);
		container.insertAdjacentElement('afterbegin', card);
	});
});

function myHttpRequest({method, url}={}, cb){
	try {
		const xhr= new XMLHttpRequest();
		xhr.open(method, url);
		xhr.addEventListener('load', ()=>{
			if(Math.floor(xhr.status/100)!==2){
				cb(`Error. Status code: ${xhr.status}`, xhr);
				return;
			}
			const response = JSON.parse(xhr.responseText);
			cb(null, response);
		});
		xhr.addEventListener('error', ()=>{
			console.log(`Error. Status code: ${xhr.status}`);
		})

		xhr.send();
	} catch (error){
		cb(error);
	};

};
