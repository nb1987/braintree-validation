# braintree-validation
[Braintree's `HostedFields`](https://developers.braintreepayments.com/guides/hosted-fields/overview/javascript/v3) enable you to easily achieve Payment Card Industry Data Security Standard (PCI DSS) compliance. One disadvantage, though, is that front-end validation libraries won't work with `HostedFields`, forcing you to roll your own validation using the Braintree JavaScript SDK. That's where braintree-validation comes in: it's an adapter enabling use of the venerable [jQuery Validation plugin](https://github.com/jquery-validation/jquery-validation) on the `<form>` containing your hosted fields. braintree-validation is also not limited to `HostedFields`; all other fields in your form will be validated as though you had normally applied the jQuery validation plugin.

Check it out in action at https://codepen.io/nb1987/pen/qmOqpX

Note: If you have very particular validation requirements and want to get your hands dirty, the library also provides convenience methods for retrieving the Braintree field name (or Braintree field) from the `<iframe>`. See details in the Documentation section.

## Getting Started

### Downloading the prebuilt files	

### Downloading the latest changes

### Including it on your page

1. Include jQuery, the jQuery validation plugin, the Braintree SDK's client component, the Braintee SDK's hosted-fields component, and braintree-validation on a page. 
2. Create a Braintree `client` instance.
3. Create a Braintree `HostedFields` instance. 
4. On the `braintree.hostedFields` object, call the `validate()` method, passing to it the Braintree `HostedFields` instance and any options you would pass to the jQuery validation plugin.

A bare-bones example:

```javascript
	<form>
		<div class="form-control" id="card-number"></div>
		<div class="form-control" id="cvv"></div>
		<div class="form-control" id="expiration-month"></div>
		<div class="form-control" id="expiration-year"></div>
		<div class="form-control" id="postal-code"></div>
	</form>
	<script src="https://cdn.jsdelivr.net/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
	<script src="https://js.braintreegateway.com/web/3.12.1/js/client.js"></script>
	<script src="https://js.braintreegateway.com/web/3.12.1/js/hosted-fields.js"></script>
	<script src="https://cdn.jsdelivr.net/braintree-validation/1.0.0/braintree-validation.min.js"></script>
	<script>
		braintree.client.create({
			authorization: 'YOUR_AUTHORIZATION_KEY_HERE'
		}, function (err, clientInstance) {
			braintree.hostedFields.create({
				client: clientInstance,
				fields: {
					number: { selector: '#card-number' },
					cvv: { selector: '#cvv' },
					expirationMonth: { selector: '#expiration-month' },
					expirationYear: { selector: '#expiration-year' },
					postalCode: { selector: '#postal-code' }
				}
			}, function (err, hostedFieldsInstance) {
				braintree.hostedFields.validate(hostedFieldsInstance, {debug: true});
			});
		});
	</script>
```

braintree-validation is also available on the npm and bower registries:

* npm: `npm install braintree-validation`
* bower: `bower install braintree-validation`

braintree-validation supports both CommonJS-style and AMD-style module imports. Use of both is demonstrated in the demo.

### Running the demo 

The demo is very simple to run. Follow the steps below:
1. Open your preferred command-line interface (CLI).
2. Change directory to `$/demo` ($ represents root of the repository clone)
3. Install the dev dependencies: `npm install`
4. Fire up the node `http-server`: `node ./node_modules/http-server/bin/http-server .`
5. Open your web browser to 127.0.0.1:8080/index.html for a demo using globals, to 127.0.0.1:8080/amd.html for a demo using AMD, and 127.0.0.1:8080/commonjs.html for a demo using CommonJS

## Documentation 

### Overview 

Beyond setup (documented in the Getting Started section), the most important thing to be aware of is that many `options` for `validate()` accept callbacks, and those callbacks often contain as a parameter the `element` being validated. In the case of Braintree hosted fields, this element is _not_ the hosted field, but instead the `<iframe>` that contains the hosted field. This library exposes two of its own convenience methods for retrieving either the Braintree `HostedField` object related to the containing `<iframe>` or the name of that property.

### The braintree-validation API

braintree-validation exposes all of the same methods that the jQuery Validation plugin does, except that they're properties on the `braintree.hostedFields` object rather than the jQuery object:

* `validate(hostedFields, [options])` - like the jQuery Validation plugin's method of the same name, `validate` sets the validation behavior for the form (and returns a `$.validator`) and must be called before any other method can be called. However, it differs from the jQuery Validation plugin's corresponding method in that it requires the first argument passed in to be the `hostedFields` instance.
* `valid()` - this returns `true` or `false` indicating whether the form is valid or not.
* `rules()` - reads, adds, or removes rules for an element; see also https://jqueryvalidation.org/rules/ for `rules()` and its two overloads.

braintree-validation additionally exposes two of its own convenience functions which allow you to retrieve a Braintree hosted field object from the `<iframe>` element that contains it:

* `getFieldNameFromFrameElement(frameElement)` - returns the name of the hosted field for the given `frameElement`
* `getFieldFromFrameElement(frameElement)` - returns the actual hosted field object for the given `frameElement`

### `rules` and `messages` 

You can pass in whatever `rules` and `messages` that you'd like; braintree-validation will add its own `rules` and `messages`:

```javascript
rules: {
	"braintree-hosted-field-number": {
		"braintree-hosted-field-number-isRequired": true,
		"braintree-hosted-field-number-isValid": true
	},
	"braintree-hosted-field-cvv": {
		"braintree-hosted-field-cvv-isRequired": true,
		"braintree-hosted-field-cvv-isValid": true
	},
	"braintree-hosted-field-expirationMonth": {
		"braintree-hosted-field-expirationMonth-isRequired": true,
		"braintree-hosted-field-expirationMonth-isValid": true
	},
	"braintree-hosted-field-expirationYear": {
		"braintree-hosted-field-expirationYear-isRequired": true,
		"braintree-hosted-field-expirationYear-isValid": true
	},
	"braintree-hosted-field-postalCode": {
		"braintree-hosted-field-postalCode-isRequired": true,
		"braintree-hosted-field-postalCode-isValid": true
	}
},
messages: {
	"braintree-hosted-field-number": {
		"braintree-hosted-field-number-isRequired": "Card number is required.",
		"braintree-hosted-field-number-isValid": "Please enter a valid card number."
	},
	"braintree-hosted-field-cvv": {
		"braintree-hosted-field-cvv-isRequired": "CVV is required.",
		"braintree-hosted-field-cvv-isValid": "Please enter a valid CVV."
	},
	"braintree-hosted-field-expirationMonth": {
		"braintree-hosted-field-expirationMonth-isRequired": "Expiration month is required.",
		"braintree-hosted-field-expirationMonth-isValid": "Please enter a valid expiration month."
	},
	"braintree-hosted-field-expirationYear": {
		"braintree-hosted-field-expirationYear-isRequired": "Expiration year is required.",
		"braintree-hosted-field-expirationYear-isValid": "Please enter a valid expiration year."
	},
	"braintree-hosted-field-postalCode": {
		"braintree-hosted-field-postalCode-isRequired": "Postal code is required.",
		"braintree-hosted-field-postalCode-isValid": "Please enter a valid postal code."
	}
}
```

You can override these as desired by passing into the `options` your own rule(s) and/or message(s) of the same name(s).

### Overrides 

#### `options.highlight` and `options.unhighlight`
So that hosted fields function identically to other fields, the braintree-validation library modifies the jQuery Validation plugin's default implementations of `options.highlight` and `options.unhighlight`. You may override these with your own implementation(s); if you do so and `options.debug` is `true` you will receive a warning in the console. If you choose to override, it is advisable to reference the source code file to see the braintree-validation library's implementation. 

#### The `required` rule
braintree-validation also overrides the default implementation of the `required` rule. This override is necessary for enabling hosted fields to be eagerly validated before the initial submission attempt. If you choose to override with your own implementation of `required`, it is advisable to reference the source code file to see the braintree-validation library's implementation. 

#### Pseudo-selectors
The jQuery Validation plugin adds in a few custom pseudo-selectors: `:blank`, `:filled`, and `:unchecked`. braintree-validation modifies the first two so that the corresponding `<iframe>` of any blank hosted field will be included in `:blank` and so that the corresponding `<iframe>` of any filled hosted field will be included in `:filled`.

#### `options.ignore`
If you add `iframe` to `options.ignore`, braintree-validation will remove `iframe` from `options.ignore`. If `options.debug` is `true`, you'll receive a warning in the console informing you that this is being done.

### Special note about `options.highlight`, `options.errorClass`, and `options.validClass`

In its default implementation, the jQuery Validation plugin's `options.highlight` function will apply whatever CSS class is defined by your `options.errorClass` if the field input is invalid and whatever CSS class is defined by your `options.validClass` if your field input is valid. In order for this to work for Braintree hosted fields, you _must_ define your errorClass and validClass not only in your CSS but also in the `styles` property of the configuration object passed to `braintree.hostedFields.create`. For example, if your errorClass and validClass are left as the default `error` and `valid`, respectively, then the `styles` property might look something like this:

```javascript
styles: {
	'input': {
		'font-size': '14px',
		'font-family': 'helvetica, tahoma, calibri, sans-serif',
		'color': '#3a3a3a'
	},
	':focus': {
		'color': 'black'
	},
	'.error': {
		'color': 'red'
	},
	'.valid': {
		'color': 'green'
	}
}
```

## License
Copyright © Nick Bagnall

Licensed under the MIT license.