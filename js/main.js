/* global data */
/* exported data */

const $photoUrl = document.querySelector("div.input-container input[name='photoURL']");
const $photoPreview = document.querySelector('.image');
const $formSubmit = document.querySelector('#journal-entry');
const $navBar = document.querySelector('.nav-bar-container');
const $viewList = document.querySelectorAll('.view');
const $entriesViewList = document.querySelector('.entry-view-list');
const $entryForm = document.querySelector('div[data-view="entry-form"]');
const $entries = document.querySelector('div[data-view="entries"]');
const $noEntry = document.querySelector('.no-entry-text');

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

  $entryForm.className = 'view hidden';
  $entries.className = 'view';
  $noEntry.className = 'hidden no-entry-text';
  $entriesViewList.prepend(renderEntries(newEntry));
  $formSubmit.reset();
});

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
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entry-text';
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      const singleEntry = renderEntries(data.entries[i]);
      $entriesViewList.append(singleEntry);
    }
    $noEntry.className = 'hidden no-entry-text';
  }
});

$navBar.addEventListener('click', function (event) {
  const dataView = event.target.getAttribute('data-view');
  for (let x = 0; x < $viewList.length; x++) {
    if (dataView === $viewList[x].getAttribute('data-view')) {
      $viewList[x].className = 'view';
    } else {
      $viewList[x].className = 'view hidden';
    }
  }
});
