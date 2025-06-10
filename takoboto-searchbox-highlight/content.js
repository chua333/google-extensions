window.addEventListener('load', function () {
  const searchBox = document.getElementById('SearchBoxInput');

  if (searchBox) {
    // remove the existing onkeydown handler if possible
    searchBox.removeAttribute('onkeydown');

    // function to manually trigger the select behavior of the search box
    function triggerFocusAndSelect() {
      searchBox.focus();
      searchBox.select();
      console.log("Text selected in search box");
    }

    // listen for keydown event (especially the Enter key)
    searchBox.addEventListener('keydown', function (event) {
      // console.log("Key pressed:", event.key);
      if (event.key === 'Enter') {
        // trigger the focus and select after Enter is pressed
        setTimeout(triggerFocusAndSelect, 100);
      }
    });
  } else {
    console.log('Search box not found');
  }
});
