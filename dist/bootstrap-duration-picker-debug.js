'use strict';

(function iife($) {

  $.DurationPicker = function DurationPicker(mainElement, options) {

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

    var plugin = this;

    plugin.settings = {};

    var mainInput = $(mainElement);

    plugin.init = function init() {
      plugin.settings = $.extend({}, defaults, options);

      var mainInputReplacer = $('<div>', {
        class: 'bdp-input',
        html: [buildDisplayBlock('days', !plugin.settings.showDays), buildDisplayBlock('hours', false, plugin.settings.showDays ? 23 : 99999), buildDisplayBlock('minutes', false, 59), buildDisplayBlock('seconds', !plugin.settings.showSeconds, 59)]
      });

      mainInput.after(mainInputReplacer).hide();

      if (mainInput.val() === '') mainInput.val(0);
      setValue(mainInput.val(), true);
    };

    var inputs = [];
    var labels = [];
    var disabled = mainInput.hasClass('disabled') || mainInput.attr('disabled') === 'disabled';

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    //
    // private methods
    //
    function translate(key) {
      return plugin.settings.translations[key];
    }

    function updateWordLabel(value, label) {
      var text = value === 1 ? label.substring(0, label.length - 1) : label;
      labels[label].text(translate(text));
    }

    function updateUI() {
      var isInitializing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

      if (typeof plugin.settings.onChanged === 'function') {
        plugin.settings.onChanged(mainInput.val(), isInitializing);
      }
    }

    function durationPickerChanged() {
      days = parseInt(inputs.days.val(), 10) || 0;
      hours = parseInt(inputs.hours.val(), 10) || 0;
      minutes = parseInt(inputs.minutes.val(), 10) || 0;
      seconds = parseInt(inputs.seconds.val(), 10) || 0;
      updateUI();
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

    function setValue(value, isInitializing) {
      mainInput.val(value);

      var total = parseInt(value, 10);
      seconds = total % 60;
      total = Math.floor(total / 60);
      minutes = total % 60;
      total = Math.floor(total / 60);

      if (plugin.settings.showDays) {
        hours = total % 24;
        days = Math.floor(total / 24);
      } else {
        hours = total;
        days = 0;
      }

      updateUI(isInitializing);
    }

    //
    // public methods
    //
    plugin.setValue = function (value) {
      setValue(value, true);
    };

    plugin.destroy = function () {
      mainInput.next('.bdp-input').remove();
      mainInput.data('durationPicker', null).show();
    };

    plugin.init();
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.durationPicker = function durationPicker(options) {
    return this.each(function () {
      if (undefined === $(this).data('durationPicker')) {
        var plugin = new $.DurationPicker(this, options);
        $(this).data('durationPicker', plugin);
      }
    });
  };
})(jQuery); // eslint-disable-line no-undef