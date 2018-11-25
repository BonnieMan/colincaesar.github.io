
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

//Only add if entry has content, and it hasn't already been added to the list
function inputIsValid(){
	console.log(ul.children.length);
	if (input.value.length > 0)
	{
		for (i = 0, len = ul.children.length; i < len; i++) {			
			// <li><span>Notebook</span><button class="Delete">Delete</li>
			// ul.children[i] = selected list item (textContent for above example = "Notebook Delete", so inspect span tag only)
			// ul.children[i].children[0] = span tag of the selected list item			
			var entry = ul.children[i].children[0].textContent.toLowerCase().trim();
		    if (input.value.toLowerCase().trim() === entry) {
		    	return false //don't add duplicate item
			}
		}
		console.log("isValid");
		return true;
	}
	return false;
}

//Functions triggered by events
function selectItemToggle() {
	console.log("toggle");
	this.children[0].classList.toggle("done"); //apply class to span element. Applying to li doesn't affect text
}
function deleteListElement() {		
	ul.removeChild(this.parentElement);
}
function createListElement() {
	var li = document.createElement("li");
	var span = document.createElement("span");
	var btnDelete = document.createElement("button");
	
	//<li><span>Candles Cake</span><button class="Delete">Delete</li>
	span.appendChild(document.createTextNode(input.value));
	btnDelete.classList.toggle("Delete");
	btnDelete.textContent = "Delete";
	btnDelete.addEventListener("click", deleteListElement);
	li.appendChild(span);
	li.appendChild(btnDelete);
	ul.appendChild(li);
	input.value = "";	
}


//Events
function addListAfterClick() {
	if (inputIsValid()) {
		createListElement();
	}
}
function addListAfterKeypress(event) {
	if (inputIsValid() && event.keyCode === 13) {
		createListElement();
	}
}

// Add event listeners to controls
button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

//add event listener to each list item
const items = document.querySelectorAll('li');
for (let i = 0; i < items.length; i ++) {    
	items[i].addEventListener("click", selectItemToggle)
  }

//add event listener to each list item's delete button
const deleteButtons = document.querySelectorAll('.Delete');
for (i=0; i < deleteButtons.length; i++) {
	deleteButtons[i].addEventListener("click", deleteListElement)
}