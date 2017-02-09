#bootstrap-duration-picker

Javascript library for selecting duration. It's a refactored version of https://github.com/mjnaderi/jquery-duration-picker updated to use Bootstrap. Target input to which plugin is applied should contain duration in seconds.

[![Code Climate](https://codeclimate.com/github/koss-lebedev/bootstrap-duration-picker/badges/gpa.svg)](https://codeclimate.com/github/koss-lebedev/bootstrap-duration-picker)

##Example

![Bootstrap-Duration-Picker](demo.png)

##Dependencies

- jQuery 1.*
- Bootstrap 3.* (used for popovers)

##Usage

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" crossorigin="anonymous"></script>

<link rel="stylesheet" href="../src/jquery-duration-picker.css">
<script src="../src/jquery-duration-picker.js"></script>
```

```js
$('.duration-picker').durationPicker();

// or

$('.duration-picker').durationPicker({
    lang: 'en',

    // defines whether to show seconds or not
    showSeconds: false,

    // a function that gets a number to be displayed in input and returns a formatted one
    formatter: function (num) {
        if (!+num)
            return num;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
});
```

##License

Please see [LICENSE](LICENSE) for licensing details.