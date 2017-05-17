'use strict';

(function iife($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.durationPicker = function durationPicker(options) {
    var defaults = {
      translations: {
        day: 'day',
        hour: 'hour',
        minute: 'minute',
        second: 'second',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds'
      },
      showSeconds: false,
      showDays: true
    };
    var settings = $.extend({}, defaults, options);

    this.each(function (i, mainElement) {
      var mainInput = $(mainElement);

      if (mainInput.data('bdp') === '1') return;

      var inputs = [];
      var labels = [];
      var disabled = mainInput.hasClass('disabled') || mainInput.attr('disabled') === 'disabled';

      function translate(key) {
        return settings.translations[key];
      }

      function buildDisplayBlock(id, hidden, max) {
        var input = $('<input>', {
          class: 'form-control input-sm',
          type: 'number',
          min: 0,
          value: 0,
          disabled: disabled
        }).change(durationPickerChanged);

        if (max) {
          input.attr('max', max);
        }
        inputs[id] = input;

        var label = $('<div>', {
          id: 'bdp-' + id + '-label',
          text: translate(id)
        });
        labels[id] = label;

        return $('<div>', {
          class: 'bdp-block ' + (hidden ? 'hidden' : ''),
          html: [input, label]
        });
      }

      var mainInputReplacer = $('<div>', {
        class: 'bdp-input',
        html: [buildDisplayBlock('days', !settings.showDays), buildDisplayBlock('hours', false, settings.showDays ? 23 : 99999), buildDisplayBlock('minutes', false, 59), buildDisplayBlock('seconds', !settings.showSeconds, 59)]
      });

      mainInput.after(mainInputReplacer).hide().data('bdp', '1');

      var days = 0;
      var hours = 0;
      var minutes = 0;
      var seconds = 0;

      function updateWordLabel(value, label) {
        var text = value === 1 ? label.substring(0, label.length - 1) : label;
        labels[label].text(translate(text));
      }

      function updateUI() {
        var total = seconds + minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60;
        mainInput.val(total);
        mainInput.change();

        updateWordLabel(days, 'days');
        updateWordLabel(hours, 'hours');
        updateWordLabel(minutes, 'minutes');
        updateWordLabel(seconds, 'seconds');

        inputs.days.val(days);
        inputs.hours.val(hours);
        inputs.minutes.val(minutes);
        inputs.seconds.val(seconds);

        if (typeof settings.onChanged === 'function') {
          settings.onChanged(mainInput.val());
        }
      }

      function init() {
        if (mainInput.val() === '') mainInput.val(0);

        var total = parseInt(mainInput.val(), 10);
        seconds = total % 60;
        total = Math.floor(total / 60);
        minutes = total % 60;
        total = Math.floor(total / 60);

        if (settings.showDays) {
          hours = total % 24;
          days = Math.floor(total / 24);
        } else {
          hours = total;
          days = 0;
        }

        updateUI();
      }

      function durationPickerChanged() {
        days = parseInt(inputs.days.val(), 10) || 0;
        hours = parseInt(inputs.hours.val(), 10) || 0;
        minutes = parseInt(inputs.minutes.val(), 10) || 0;
        seconds = parseInt(inputs.seconds.val(), 10) || 0;
        updateUI();
      }

      init();
    });
  };
})(jQuery); // eslint-disable-line no-undef