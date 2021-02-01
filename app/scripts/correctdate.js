var loadWhenReady = setInterval(function() {
  // Keep looking for the date input fields to be in the DOM (only appear in editing mode)
  if (document.querySelector('input.oe_datepicker_container')) {
    clearInterval(loadWhenReady);

    var observer = new MutationObserver(function () {
      if(document.querySelector('.oe_datepicker_root')){
        injectCorrectDateJs()
      }
    })
    observer.observe(document.querySelector('input.oe_datepicker_container').parentElement.parentElement, { attributes: true })
    injectCorrectDateJs()

  }
}, 200); // check every 200ms

function injectCorrectDateJs() {
  var node = document.querySelector('input.oe_datepicker_container')
  var jqueryId = node.getAttribute('id')
  // The code needs access to jquery, so inject it as a snippet into the DOM
  var codeToInject = `// From correctdate.js
var jqueryId = "${ jqueryId }"
var jqueryNode = $("input[id='"  + jqueryId +"']")
var sheetDate = document.querySelector('[data-field="sheet_date"]').textContent
if(jqueryNode.val() !== sheetDate) {
jqueryNode.datepicker("show")
jqueryNode.datepicker("setDate",new Date(sheetDate))
jqueryNode.datepicker("hide")
}`;

  var script = document.createElement('script');
  script.textContent = codeToInject;
  (document.head||document.documentElement).appendChild(script);
  script.remove();
}