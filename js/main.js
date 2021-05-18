/* global data */
/* exported data */

const $photoUrl = document.querySelector("div.input-container input[name='photoURL']");
const $photoPreview = document.querySelector('.image');
const $formSubmit = document.querySelector('#journal-entry');

$photoUrl.addEventListener('input', function (event) {
  const currentURL = $photoPreview.getAttribute('src');
  if ($photoUrl.value !== currentURL) {
    $photoPreview.setAttribute('src', $photoUrl.value);
  }
});

$formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();

  const newEntry = {
    title: $formSubmit.elements.title.value,
    photoURL: $formSubmit.elements.photoURL.value,
    notes: $formSubmit.elements.notes.value,
    nextEntryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formSubmit.reset();
});

// <li class="entryList">
//   <div class="row">
//     <div class="column-half image-entries-container">
//       <img class="image" src="images/placeholder-image-square.jpg">
//     </div>
//     <div class="column-half text-entries-container">
//       <h3>Title of Journal Entry</h3>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
//     </div>
//   </div>
// </li>

function renderEntries(entries) {
  const entryList = document.createElement('li');
  entryList.setAttribute('class', 'entry-list');

  const divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');

  const divImgContainer = document.createElement('div');
  divImgContainer.classList.add('column-half', 'image-entries-container');

  const imageEntry = document.createElement('img');
  imageEntry.setAttribute('class', 'image');
  imageEntry.setAttribute('src', entries.photoURL);

  const divTextContainer = document.createElement('div');
  divTextContainer.classList.add('column-half', 'text-entries-container');

  const entryTitle = document.createElement('h3');
  entryTitle.textContent = (entries.title);

  const entryText = document.createElement('p');
  entryText.textContent = (entries.notes);

  entryList.append(divRow);
  divRow.append(divImgContainer);
  divImgContainer.append(imageEntry);
  divRow.append(divTextContainer);
  divTextContainer.append(entryTitle);
  divTextContainer.append(entryText);

  return entryList;
}

window.addEventListener('DOMContentLoaded', function (event) {
  // if (data.entries.length === 0) {
  //   const noEntries = document.createElement('p');
  //   noEntries.textContent = ('No entries have been recorded');
  //   $entriesViewList.append(noEntries);
  // }
  for (let i = 0; i < data.entries.length; i++) {
    const singleEntry = renderEntries(data.entries[i]);
    const $entriesViewList = document.querySelector('.entry-view-list');
    $entriesViewList.append(singleEntry);
  }
});
