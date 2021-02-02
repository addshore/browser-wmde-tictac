var perSheetInterval = null
var appWideInterval = setInterval(function() {
  if (document.querySelector('input.oe_datepicker_container')) {
    clearInterval(appWideInterval);
    onSheetLoad()
     var observer = new MutationObserver(function () {
      onSheetLoad()
    })
    observer.observe(document.querySelector('.oe_loading'), { attributes: true })
  }
}, 100); // check every 100ms

function onSheetLoad() {
  if(perSheetInterval !== null) {
    // Clear interval from pervious sheet if there was one
    clearInterval(perSheetInterval);
  }

  perSheetInterval = setInterval(function() {
    // Keep looking for the date input fields to be in the DOM (only appear in editing mode)
    if (document.querySelector('input.oe_datepicker_container')) {
      clearInterval(perSheetInterval);

      var observer = new MutationObserver(function () {
        if(document.querySelector('.oe_datepicker_root')){
          injectCorrectDateJs()
        }
      })
      observer.observe(document.querySelector('input.oe_datepicker_container').parentElement.parentElement, { attributes: true })
      injectCorrectDateJs()

    }
  }, 200); // check every 200ms
}

function injectCorrectDateJs() {
  var node = document.querySelector('input.oe_datepicker_container')
  var jqueryId = node.getAttribute('id')
  // The code needs access to jquery, so inject it as a snippet into the DOM
  var codeToInject = `// From correctdate.js
var jqueryId = "${ jqueryId }"
var jqueryNode = $("input[id='"  + jqueryId +"']")
var sheetDate = document.querySelector('[data-field="sheet_date"]')
if(sheetDate && jqueryNode.val() !== sheetDate.textContent) {
jqueryNode.datepicker("show")
jqueryNode.datepicker("setDate",new Date(sheetDate))
jqueryNode.datepicker("hide")
}`;

  var script = document.createElement('script');
  script.textContent = codeToInject;
  (document.head||document.documentElement).appendChild(script);
  script.remove();
}