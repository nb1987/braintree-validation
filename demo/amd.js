require.config({
	paths: {
		braintreeClient: 'https://js.braintreegateway.com/web/3.12.1/js/client.min',
		validatedHostedFields: 'https://cdn.jsdelivr.net/braintree-validation/1.0.0/braintree-validation.min'
	}
});

require(['braintreeClient', 'validatedHostedFields'], function(client, validatedHostedFields) {	
	client.create({
		authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b'
	}, function (err, clientInstance) {
		if (err) {
			console.error(err);
			return;
		}

		validatedHostedFields.create({
			client: clientInstance,
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
			},
			fields: {
				number: {
					selector: '#card-number',
					placeholder: '4111 1111 1111 1111'
				},
				cvv: {
					selector: '#cvv',
					placeholder: '123'
				},
				expirationMonth: {
					selector: '#expiration-month',
					placeholder: 'MM'
				},
				expirationYear: {
					selector: '#expiration-year',
					placeholder: 'YY'
				},
				postalCode: {
					selector: '#postal-code',
					placeholder: '90210'
				}
			}
		}, function (err, hostedFieldsInstance) {
			if (err) {
				console.error(err);
				return;
			}

			var options = {
				submitHandler: function(form) {
					alert('Braintree phone home! (NB: This is where you might call tokenize() if you are not already doing that elsewhere in your code.)');
				},
				success: function(label) {
					label.addClass('valid').text('Ok!');
				},
				debug: true
			};

			var validator = validatedHostedFields.validate(hostedFieldsInstance, options);
		});
	});
});

