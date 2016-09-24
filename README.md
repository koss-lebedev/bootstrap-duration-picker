#bootstrap-duration-picker

Javascript library for selecting duration. It's a refactored version of https://github.com/mjnaderi/jquery-duration-picker updated to use Bootstrap. Target input to which plugin is applied should contain duration in seconds.

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
    formatter: some_function // a function that gets numbers displayed in input and returns a formatted one,
    showSeconds: false // defines whether to show seconds or not 
});
```

##License

Please see [LICENSE](LICENSE) for licensing details.