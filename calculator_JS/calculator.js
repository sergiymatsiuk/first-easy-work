document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

const form=document.forms['newsControls'];
const firstNumber=form.elements['first-number'];
const chooseAction=form.elements['choose'];
const secondNumber=form.elements['second-number'];

const container=document.querySelector('.grid-container');


form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const firstNum=parseInt(firstNumber.value);
	const secondNum=parseInt(secondNumber.value);
	const action=chooseAction.value;

	checkNumber(firstNum, secondNum, action);
});

function checkNumber(a, b, action){
	if(!a||!b){
		showEmptyMessage();
		return
	};

	result(a, b, action);
}

function showEmptyMessage(){
	M.toast({html: 'ЗАПИШІТЬ ДВА ЧИСЛА!'});
}

function result(a, b, action){
	let res;
	if(action==='sum'){
		res=a+b;
	} else if(action==='minus'){
		res=a-b;
	} else if(action==='mul'){
		res=a*b;
	} else {
		res=a/b;
	};
	
	addResultInHTML(res);
 };

function addResultInHTML(result){
 	let fragment=`<H1>${result}</H1>`;

 	if(container.children.length){
 		clearContainer(container)
 	}
 	container.insertAdjacentHTML('afterbegin', fragment);
};

//Function clea container
function clearContainer(container){
	// another method = container.innerHTML=''
	let child=container.lastElementChild;

	while(child){
		container.removeChild(child);
		child=container.lastElementChild;
	}
};