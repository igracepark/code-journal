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

function imagePreview(event) {
  const currentURL = $photoPreview.getAttribute('src');
  if ($photoUrl.value !== currentURL) {
    $photoPreview.setAttribute('src', $photoUrl.value);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  if (data.editing != null) {
    handleEdit();

  } else {
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
  }
}

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

  const divTitleContainer = document.createElement('div');
  divTitleContainer.setAttribute('class', 'title-render');

  const entryTitle = document.createElement('h3');
  entryTitle.textContent = (entries.title);

  const editIcon = document.createElement('img');
  editIcon.setAttribute('src', 'images/outline_edit_black_24dp.png');
  editIcon.setAttribute('class', 'edit-icon');
  editIcon.setAttribute('data-entry-id', entries.nextEntryId);

  const divNotesContainer = document.createElement('div');

  const entryText = document.createElement('p');
  entryText.textContent = (entries.notes);

  entryList.append(divRow);
  divRow.append(divImgContainer);
  divImgContainer.append(imageEntry);
  divRow.append(divTextContainer);
  divTextContainer.append(divTitleContainer);
  divTitleContainer.append(entryTitle);
  divTitleContainer.append(editIcon);
  divTextContainer.append(divNotesContainer);
  divTextContainer.append(entryText);
  return entryList;
}

function handleOnLoad(event) {
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entry-text';
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      const singleEntry = renderEntries(data.entries[i]);
      $entriesViewList.append(singleEntry);
    }
    $noEntry.className = 'hidden no-entry-text';
  }
}

function navLinks(event) {
  const dataView = event.target.getAttribute('data-view');
  for (let x = 0; x < $viewList.length; x++) {
    if (dataView === $viewList[x].getAttribute('data-view')) {
      $viewList[x].className = 'view';
    } else {
      $viewList[x].className = 'view hidden';
    }
  }
}

function editIconClick(event) {
  const currentClass = event.target.getAttribute('class');
  const currentId = JSON.parse(event.target.getAttribute('data-entry-id'));
  // console.log('currentId', currentId);

  if (currentClass === 'edit-icon') {
    $entryForm.className = 'view';
    $entries.className = 'view hidden';
  }

  for (let y = 0; y < data.entries.length; y++) {
    if (currentId === data.entries[y].nextEntryId) {
    // console.log('it matches', currentId, data.entries[y].nextEntryId);
      data.editing = data.entries[y];
    }
  }
  $formSubmit.elements.title.value = data.editing.title;
  $formSubmit.elements.photoURL.value = data.editing.photoURL;
  $formSubmit.elements.notes.value = data.editing.notes;
  $photoPreview.setAttribute('src', data.editing.photoURL);
}

function handleEdit(entry) {
  // const editIndex = data.entries.indexOf(data.editing)

  // const editedEntry = {
  //   title: $formSubmit.elements.title.value,
  //   photoURL: $formSubmit.elements.photoURL.value,
  //   notes: $formSubmit.elements.notes.value,
  //   nextEntryId: data.editing.nextEntryId
  // };

  // const replaceEntry = data.entries.splice(editIndex, 1, editedEntry);

  // console.log('data.entries', data.entries);

  $entryForm.className = 'view hidden';
  $entries.className = 'view';
  $noEntry.className = 'hidden no-entry-text';

  // $entriesViewList.remove();
  // for (let z = 0; z < data.entries.length; z++) {
  //   $entriesViewList.append(renderEntries(data.entries[z]));
  // }

  data.editing = null;
  // $formSubmit.reset();

}

window.addEventListener('DOMContentLoaded', handleOnLoad);
$photoUrl.addEventListener('input', imagePreview);
$entriesViewList.addEventListener('click', editIconClick);
$navBar.addEventListener('click', navLinks);
$formSubmit.addEventListener('submit', handleSubmit);
