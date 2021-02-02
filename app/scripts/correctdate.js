var intervals = [];

var generalInterval = setInterval(function() {
  // Wait for the loading element to set an observer on
  if (document.querySelector('.oe_loading')) {
    clearInterval(generalInterval);
    onSheetLoad()
     var observer = new MutationObserver(function () {
      onSheetLoad()
    })
    // And load every time the loading element changes
    observer.observe(document.querySelector('.oe_loading'), { attributes: true })
  }
}, 100); // check every 100ms

function onSheetLoad() {
  clearIntervals()

  var newInterval = setInterval(function() {
    // Keep looking for the date input fields to be in the DOM (only appear in editing mode)
    var datepickerDom = document.querySelector('input.oe_datepicker_container')
    if (datepickerDom) {
      clearIntervals()
      // Only create an observer for a date picker that doesn't already have one
      if(!datepickerDom.hasAttribute("data-is-observed-by-correctdate")){
        var observer = new MutationObserver(function () {
          console.log("observed inner")
          if(document.querySelector('input.oe_datepicker_container')){
            console.log("inject called")
            injectCorrectDateJs()
          }
        })
        datepickerDom.setAttribute("data-is-observed-by-correctdate","1")
        observer.observe(document.querySelector('.oe_list_editable'), { attributes: true })
        injectCorrectDateJs()
      }
    }
    intervals.push(newInterval)
  }, 200); // check every 200ms
}

function clearIntervals() {
  intervals.forEach(function (item, index, object) {
    clearInterval(item);
    object.splice(index, 1);
  })
}

function injectCorrectDateJs() {
  // The code needs access to jquery, so inject it as a snippet into the DOM
  var codeToInject = `// From correctdate.js
var node = document.querySelector('input.oe_datepicker_container')
var jqueryId = node.getAttribute('id')
var jqueryNode = $("input[id='"  + jqueryId +"']")
var sheetDate = document.querySelector('[data-field="sheet_date"]')
// If we have a sheetDate, and the current date looks different to the sheetDate
console.log(jqueryNode.val())
if(sheetDate && (new Date(jqueryNode.val())).getTime() != (new Date(sheetDate.textContent)).getTime()) {
// Set the date to the sheetDate
jqueryNode.datepicker("show")
jqueryNode.datepicker("setDate",new Date(sheetDate.textContent))
jqueryNode.datepicker("hide")
}`;

  var script = document.createElement('script');
  script.textContent = codeToInject;
  (document.head||document.documentElement).appendChild(script);
  script.remove();
}