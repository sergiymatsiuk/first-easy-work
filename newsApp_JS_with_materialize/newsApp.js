
function customHttp(){
	return {
		get (url, cb){
			try {
			const xhr= new XMLHttpRequest();
			xhr.open('GET', url);
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
			},
		post (url, body, headers, cb){
			try {
			const xhr= new XMLHttpRequest();
			xhr.open('POST', url);
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

			if(headers){
				Object.entries(headers).forEach(([key, value])=>{
					xhr.setRequestHeader(key, value)
					}
				)
			}

				xhr.send(JSON.stringify(body));
			} catch (error){
				cb(error);
			};
		}
	}
}

const http=customHttp();

const newsService = (function(){
	const apiKey='67ae254be79eeca3ecf52bc7954df556';
				
	const apiUrl='https://gnews.io/api/v4';

	return {
		topHeadlines(country='ua', cb){
			http.get(`${apiUrl}/top-headlines?country=${country}&token=${apiKey}`, cb);
		},
		everything(query, cb){
			http.get(`${apiUrl}/search?q=${query}&token=${apiKey}`, cb);
		}
	}
})();

//Elements
const form = document.forms['newsControls'];
const countrySelect=form.elements['country'];
const searchInput=form.elements['search'];

form.addEventListener('submit', e=>{
	e.preventDefault();
	loadNews();
})

document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    loadNews();
});

//LOAD NEWS FUNCTION
function loadNews() {
	showLoader();

	const country=countrySelect.value;
	const searchText=searchInput.value;

	if(!searchText){
		newsService.topHeadlines(country, onGetResponse);
	} else {
		newsService.everything(searchText, onGetResponse);
	}
};

//Function on get response on server
function onGetResponse(err, res){
	removePreloader();
	if(err){
		showAlert(err, 'error-msg');
		return;
	};
	if(!res.articles.length){
		showEmptyMessage();
	}
	renderNews(res.articles);
}

//Function render news
function renderNews(news){
	const newsContainer=document.querySelector('.news-container .row');

	if(newsContainer.children.length){
		clearContainer(newsContainer);
	}
	let fragment='';

	news.forEach(newsItem=>{
		const el=newsTemplate(newsItem);
		fragment+=el;
	});

	newsContainer.insertAdjacentHTML('afterbegin', fragment);
};

// News item template function
function newsTemplate({image, title, url, description }){
	return `
	<div class="col s12">
        <div class="card">
            <div class="card-image">
            	<img src="${image}"">
            	<span class="card-title">${title||''}</span>
            </div>
            <div class="card-content">
            	<p>${description}</p>
            </div>
            <div class="card-action">
            	<a href="${url}">Read more</a>
            </div>
        </div>
    </div>
	`
}

function showAlert(msg, type= 'success'){
	M.toast({html: msg, classes: type});
}

function showEmptyMessage(){
	M.toast({html: 'nothing found! try another keyword!'});
}

//Function clea container
function clearContainer(container){
	// another method = container.innerHTML=''
	let child=container.lastElementChild;

	while(child){
		container.removeChild(child);
		child=container.lastElementChild;
	}
}

function showLoader(){
	document.body.insertAdjacentHTML('afterbegin', `
		 	<div class="progress">
    	  		<div class="indeterminate"></div>
	 		</div>
		`,
	);
}

function removePreloader(){
	const loader=document.querySelector('.progress');
	if(loader){
		loader.remove();
	}
}