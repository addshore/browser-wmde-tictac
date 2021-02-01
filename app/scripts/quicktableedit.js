var loadWhenReady = setInterval(function() {
  if (document.querySelector('.oe_button.oe_form_button_edit')) {
    clearInterval(loadWhenReady);
    quickEdit()
     var observer = new MutationObserver(function () {
      if(document.querySelector('.oe_button.oe_form_button_edit')){
        quickEdit()
      }
    })
    observer.observe(document.querySelector('.oe_loading'), { attributes: true })
  }
}, 100); // check every 100ms

function quickEdit () {
  /* Go into edit mode if user clicks on table */
  var table = document.querySelector('#notebook_page_14')
  // Disabling the current action seems to be not necessary
  // $(table).off('click')
  if (table !== null) {
    table.onclick = function () { document.querySelector('.oe_button.oe_form_button_edit').click() }
  }
}