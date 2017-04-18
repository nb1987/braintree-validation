# braintree-validation
An unofficial adapter for [the jQuery validation plugin](https://github.com/jquery-validation/jquery-validation) to process [Braintree hosted fields](https://developers.braintreepayments.com/guides/hosted-fields/overview/javascript/v3)

Braintree's `HostedFields` enable you to easily achieve Payment Card Industry Data Security Standard (PCI DSS) compliance. One disadvantage, though, is that front-end validation libraries won't work with `HostedFields`, forcing you to roll your own validation using the Braintree JavaScript SDK. That's where braintree-validation comes in: it's an adapter enabling use of the venerable jQuery Validation plugin on the `<form>` containing your hosted fields. braintree-validation is also not limited to `HostedFields`; all other fields in your form will be validated as though you had normally applied the jQuery validation plugin.

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
	<script src="jquery.js"></script>
	<script src="jquery.validate.js"></script>
	<script src="https://js.braintreegateway.com/web/3.12.1/js/client.js"></script>
	<script src="https://js.braintreegateway.com/web/3.12.1/js/hosted-fields.js"></script>
	<script src="https://raw.githubusercontent.com/nb1987/braintree-validation/master/src/core.js"></script>
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

### Running the demo 

## Documentation 

### Overview 

The most important thing to be aware of is that many `options` for `$.validate()` accept callbacks, and those callbacks often contain as a parameter the `element` being validated. In the case of Braintree hosted fields, this element is _not_ the hosted field, but instead the `<iframe>` that contains the hosted field. This library exposes two of its own convenience methods for retrieving either the Braintree `HostedField` object related to the containing `<iframe>` or the name of that property.

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


## License
Copyright © Nick Bagnall

Licensed under the MIT license.