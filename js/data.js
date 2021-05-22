/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previousEntries = localStorage.getItem('journal-local-storage');
if (previousEntries != null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', function (event) {
  const newEntriesString = JSON.stringify(data);
  this.localStorage.setItem('journal-local-storage', newEntriesString);
  this.localStorage.clear('journal-local-storage');
});
