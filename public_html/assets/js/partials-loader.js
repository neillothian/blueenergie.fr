/* Loader de partials — blueenergie.fr */
(function () {
  let pending = 0;
  function inject(targetId, partialPath) {
    const target = document.getElementById(targetId);
    if (!target) return;
    pending++;
    fetch(partialPath)
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(html => { target.innerHTML = html; })
      .catch(err => console.error('Partial load failed:', partialPath, err))
      .finally(() => {
        pending--;
        if (pending === 0) document.dispatchEvent(new Event('partialsReady'));
      });
  }
  inject('site-header', '/partials/header.html');
  inject('site-footer', '/partials/footer.html');
})();
