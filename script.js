/* ===== Jam Jam site interactions ===== */
(function () {
  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu when a link is tapped
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ: keep it single-open (accordion feel) — optional nicety
  var faq = document.querySelectorAll('.faq details');
  faq.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        faq.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });

  // AJAX form submission to Formspree (stays on page, shows status)
  var form = document.getElementById('requestForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var action = form.getAttribute('action') || '';

      // Guard: not yet wired to a real Formspree form
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        setStatus('Form not connected yet — see README to add your Formspree ID. Meanwhile, email info@jamjamvending.ca.', 'err');
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setStatus('', '');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("Thank you — your request is in. We'll be in touch shortly about a 90-day pilot.", 'ok');
          } else {
            return res.json().then(function (data) {
              var msg = (data && data.errors && data.errors.map(function (x) { return x.message; }).join(', ')) ||
                'Something went wrong. Please email info@jamjamvending.ca.';
              setStatus(msg, 'err');
            });
          }
        })
        .catch(function () {
          setStatus('Network error. Please email info@jamjamvending.ca or call 416-710-4850.', 'err');
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  // Footer year
  // (kept static 2026 in markup; nothing to do)
})();
