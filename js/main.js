/* global data */
/* exported data */

const $photoUrl = document.querySelector("div.input-container input[name='photo-url']");
const $photoPreview = document.querySelector('.image');

$photoUrl.addEventListener('input', function (event) {
  const currentURL = $photoPreview.getAttribute('src');
  if ($photoUrl.value !== currentURL) {
    $photoPreview.setAttribute('src', $photoUrl.value);
  }
});
