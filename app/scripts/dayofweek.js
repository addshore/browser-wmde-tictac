var loadWhenReady = setInterval(function() {
  if (document.querySelector('.oe_datepicker_root')) {
    clearInterval(loadWhenReady);
     showDayOfWeek()
     var observer = new MutationObserver(function () {
      if(document.querySelector('.oe_datepicker_root')){
        showDayOfWeek()
      }
    })
    observer.observe(document.querySelector('.oe_loading'), { attributes: true })
  }
}, 100); // check every 100ms

function showDayOfWeek () {
  /* Show the date of the week and highlight weekends */
  var timestring = document.querySelectorAll('.oe_datepicker_root')[1].textContent
  var element = document.querySelector('.oe_datepicker_root')
  var date = new Date(Date.parse(timestring))
  if (isNaN(date) || date.getFullYear() < 2020) {
    return
  }
  if (date.getDay() === 0) {
    element.style.color = '#E00'
    element.style.fontWeight = 'bold'
  } else if (date.getDay() === 6) {
    element.style.color = ''
    element.style.fontWeight = 'bold'
  } else {
    element.style.color = ''
    element.style.fontWeight = ''
  }
  element.textContent = date.toLocaleDateString([], { dateStyle: 'full' })
}