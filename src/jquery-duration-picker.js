(function ($) {

    var langs = {
        en: {
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            second: 'second',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds'
        }
    };

    $.fn.durationPicker = function (options) {

        var defaults = {
            lang: 'en',
            formatter: function (s) {
                return s;
            },
            showSeconds: false
        };
        var settings = $.extend( {}, defaults, options );

        this.each(function (i, mainInput) {

            mainInput = $(mainInput);

            if (mainInput.data('bdp') === '1')
                return;

            function buildDisplayBlock(id, hidden) {
                return '<div class="bdp-block '+ (hidden ? 'hidden' : '') + '">' +
                            '<span id="bdp-'+ id +'"></span><br>' +
                            '<span class="bdp-label" id="' + id + '_label"></span>' +
                        '</div>';
            }

            var mainInputReplacer = $('<div class="bdp-input">' +
                buildDisplayBlock('days') +
                buildDisplayBlock('hours') +
                buildDisplayBlock('minutes') +
                buildDisplayBlock('seconds', !settings.showSeconds) +
            '</div>');

            mainInput.after(mainInputReplacer).hide().data('bdp', '1');

            var days = 0;
            var hours = 0;
            var minutes = 0;
            var seconds = 0;

            var inputs = [];

            var disabled = false;
            if (mainInput.hasClass('disabled') || mainInput.attr('disabled')=='disabled') {
                disabled = true;
                mainInputReplacer.addClass('disabled');
            }

            function updateMainInput() {
                var total = seconds + minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60;
                mainInput.val(total);
                mainInput.change();
            }

            function updateMainInputReplacer() {
                mainInputReplacer.find('#bdp-days').text(settings.formatter(days));
                mainInputReplacer.find('#bdp-hours').text(settings.formatter(hours));
                mainInputReplacer.find('#bdp-minutes').text(settings.formatter(minutes));
                mainInputReplacer.find('#bdp-seconds').text(settings.formatter(seconds));

                mainInputReplacer.find('#days_label').text(langs[settings.lang][days == 1 ? 'day' : 'days']);
                mainInputReplacer.find('#hours_label').text(langs[settings.lang][hours == 1 ? 'hour' : 'hours']);
                mainInputReplacer.find('#minutes_label').text(langs[settings.lang][minutes == 1 ? 'minute' : 'minutes']);
                mainInputReplacer.find('#seconds_label').text(langs[settings.lang][seconds == 1 ? 'second' : 'seconds']);
            }

            function updatePicker() {
                if (disabled)
                    return;
                inputs['days'].val(days);
                inputs['hours'].val(hours);
                inputs['minutes'].val(minutes);
                inputs['seconds'].val(seconds);
            }

            function init() {
                if (mainInput.val() === '')
                    mainInput.val(0);
                var total = parseInt(mainInput.val(), 10);
                seconds = total % 60;
                total = Math.floor(total/60);
                minutes = total % 60;
                total = Math.floor(total/60);
                hours = total % 24;
                days = Math.floor(total/24);
                updateMainInputReplacer();
                updatePicker();
            }

            function picker_changed() {
                days = parseInt(inputs['days'].val());
                hours = parseInt(inputs['hours'].val());
                minutes = parseInt(inputs['minutes'].val());
                seconds = parseInt(inputs['seconds'].val());
                updateMainInput();
                updateMainInputReplacer();
            }

            function buildNumericInput(label, hidden, max) {
                var input = $('<input class="form-control input-sm" type="number" min="0" value="0">')
                    .change(picker_changed);
                if (max) {
                    input.attr('max', max);
                }
                inputs[label] = input;
                var ctrl = $('<div> ' + langs[settings.lang][label] + '</div>');
                if (hidden) {
                    ctrl.addClass('hidden');
                }
                return ctrl.prepend(input);
            }

            if (!disabled) {
                var picker = $('<div class="bdp-popover"></div>');
                buildNumericInput('days', false).appendTo(picker);
                buildNumericInput('hours', false, 23).appendTo(picker);
                buildNumericInput('minutes', false, 59).appendTo(picker);
                buildNumericInput('seconds', !settings.showSeconds, 59).appendTo(picker);

                mainInputReplacer.popover({
                    placement: 'bottom',
                    trigger: 'click',
                    html: true,
                    content: picker
                });
            }
            init();
            mainInput.change(init);
        });

    };

}(jQuery));