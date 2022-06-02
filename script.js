// ******* constants ******* //
const BASE_URL = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD`;
const DEFAULT_LIMIT = 10;

// ******* app state ******* //
let limit;
let borough;

// ******* cached elements ******* //
const formEl = document.querySelector('form');
const inputEl = document.querySelector('#number');
const listEl = document.querySelector('.complaints-list');

// ******* event listeners ******* //
formEl.addEventListener('click', function (event) {
	event.preventDefault();
	if (event.target.tagName === 'BUTTON') {
		borough = event.target.innerText;
		limit = inputEl.value;
		const requestURL = `${BASE_URL}&borough=${borough}&$limit=${
			limit || DEFAULT_LIMIT
		}`;

		fetch(requestURL)
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				render(data);
				inputEl.value = '';
			});
	}
});

listEl.addEventListener('click', function (event) {
	if (event.target.tagName === 'BUTTON') {
		event.target.nextElementSibling.classList.toggle('hidden');
	}
});

// ******* functions ******* //
function render(data) {
	// clear out list of old data
	listEl.innerHTML = '';
	// loop through data
	// const listItemsHTML = data
	// 	.map(function (complaint) {
	// 		return `<li>${complaint.complaint_type} <button class="complaints-list-item-button">What did the police do?</button><span class="resolution hidden">${complaint.resolution_description}</span></li>`;
	// 	})
	// 	.join('');
	// listEl.innerHTML = listItemsHTML;
	for (let i = 0; i < data.length; i++) {
		// for each data element, create an li
		const listItem = document.createElement('li');
		// build out the innerHTML for the li, include the button, include the resolution text
		const listHTML = `${data[i].complaint_type} <button class="complaints-list-item-button">What did the police do?</button><span class="resolution hidden">${data[i].resolution_description}</span>`;
		listItem.innerHTML = listHTML;
		// append to the unordered list
		listEl.appendChild(listItem);
	}
}
