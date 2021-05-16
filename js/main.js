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
