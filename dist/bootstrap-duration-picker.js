'use strict';
!(function(a) {
  var n = {
    en: {
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      seconds: 'seconds',
    },
  };
  a.fn.durationPicker = function(s) {
    var t = { lang: 'en', showSeconds: !1 }, e = a.extend({}, t, s);
    this.each(function(s, t) {
      function d(s, t, d) {
        var o = a('<input>', {
          class: 'form-control input-sm',
          type: 'number',
          min: 0,
          value: 0,
          disabled: v,
        }).change(l);
        d && o.attr('max', d), (u[s] = o);
        var r = a('<div>', { id: 'bdp-' + s + '-label', text: n[e.lang][s] });
        return (c[
          s
        ] = r), a('<div>', { class: 'bdp-block ' + (t ? 'hidden' : ''), html: [o, r] });
      }
      function o(a, s) {
        var t = 1 === a ? s.substring(0, s.length - 1) : s;
        c[s].text(n[e.lang][t]);
      }
      function r() {
        var a = b + 60 * p + 60 * m * 60 + 24 * f * 60 * 60;
        t.val(
          a
        ), t.change(), o(f, 'days'), o(m, 'hours'), o(p, 'minutes'), o(b, 'seconds'), u.days.val(f), u.hours.val(m), u.minutes.val(p), u.seconds.val(b), 'function' == typeof e.onChanged && e.onChanged(t.val());
      }
      function i() {
        '' === t.val() && t.val(0);
        var a = parseInt(t.val(), 10);
        (b = a %
          60), (a = Math.floor(a / 60)), (p = a % 60), (a = Math.floor(a / 60)), (m = a % 24), (f = Math.floor(a / 24)), r();
      }
      function l() {
        (f = parseInt(u.days.val(), 10) ||
          0), (m = parseInt(u.hours.val(), 10) || 0), (p = parseInt(u.minutes.val(), 10) || 0), (b = parseInt(u.seconds.val(), 10) || 0), r();
      }
      if (((t = a(t)), '1' !== t.data('bdp'))) {
        var u = [],
          c = [],
          v = t.hasClass('disabled') || 'disabled' === t.attr('disabled'),
          h = a('<div>', {
            class: 'bdp-input',
            html: [
              d('days', !1),
              d('hours', !1, 23),
              d('minutes', !1, 59),
              d('seconds', !e.showSeconds, 59),
            ],
          });
        t.after(h).hide().data('bdp', '1');
        var f = 0, m = 0, p = 0, b = 0;
        i();
      }
    });
  };
})(jQuery);
