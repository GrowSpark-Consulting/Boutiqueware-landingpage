/* BoutiqueWare — site scripts. */

/* Pricing: monthly / annual billing toggle.
   Each price element carries its own copy in data-monthly / data-annual, so the
   markup stays the single source of truth for the numbers. */
(function () {
    var toggle = document.getElementById('billingToggle');
    var grid = document.getElementById('plansGrid');
    if (!toggle || !grid) return;

    var indicator = toggle.querySelector('.bt-indicator');
    var options = [].slice.call(toggle.querySelectorAll('.bt-option'));
    var values = [].slice.call(grid.querySelectorAll('[data-monthly][data-annual]'));
    if (!options.length) return;

    var billingCycle = 'monthly';

    /* Park the pill over the active option. Called on init, on switch, and
       whenever the toggle changes size (breakpoints, webfont swap). */
    function moveIndicator() {
        var active = toggle.querySelector('.bt-option.is-active') || options[0];
        if (!indicator || !active) return;
        indicator.style.width = active.offsetWidth + 'px';
        indicator.style.transform = 'translateX(' + active.offsetLeft + 'px)';
    }

    function setBilling(cycle) {
        if (cycle === billingCycle) return;
        billingCycle = cycle;

        options.forEach(function (btn) {
            var on = btn.dataset.billing === billingCycle;
            btn.classList.toggle('is-active', on);
            btn.setAttribute('aria-pressed', String(on));
        });
        moveIndicator();

        /* Fade the prices out, swap the text, fade back in. */
        grid.classList.add('is-switching');
        window.setTimeout(function () {
            values.forEach(function (el) {
                el.textContent = billingCycle === 'annual' ? el.dataset.annual : el.dataset.monthly;
            });
            grid.classList.remove('is-switching');
        }, 200);
    }

    options.forEach(function (btn) {
        btn.addEventListener('click', function () {
            setBilling(btn.dataset.billing);
        });
    });

    /* Position before the first paint so the pill does not slide in from zero. */
    moveIndicator();
    requestAnimationFrame(function () {
        toggle.classList.add('is-ready');
    });

    if (window.ResizeObserver) {
        new ResizeObserver(moveIndicator).observe(toggle);
    } else {
        window.addEventListener('resize', moveIndicator);
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(moveIndicator);
    }
})();
