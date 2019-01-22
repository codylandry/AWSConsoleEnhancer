const observer = new MutationObserver(function(mutations) {

  // prettifies json in sqs message modal
  const pre = document.querySelector('pre')
  if (pre) {
    pre.innerHTML = `<code>${JSON.stringify(JSON.parse(pre.innerText), null, 2)}</code>`
    pre.classList = [...pre.classList, 'language-json']
    pre.parentElement.style.overflow = 'auto'
  }

});
observer.observe(document.body, {childList: true})
