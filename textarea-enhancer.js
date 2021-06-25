console.log('Textarea enhancer running \nbeep boop')
document.querySelectorAll('textarea')
	.forEach(textarea => {
		const keymap = {
			'<': {
				value: '<>',
				pos: 1
			},
			'(': {
				value: '()',
				pos: 1
			},
			'{': {
				value: '{}',
				pos: 1
			},
			'[': {
				value: '[]',
				pos: 1
			},
			'\'': {
				value: '\'\'',
				pos: 1
			},
			'"': {
				value: '""',
				pos: 1
			},
			'“': {
				value: '“”',
				pos: 1
			},
			'`': {
				value: '``',
				pos: 1
			},
			'‘': {
				value: '‘’',
				pos: 1
			},
			'«': {
				value: '«»',
				pos: 1
			},
			'「': {
				value: '「」',
				pos: 1
			},
			'*': {
				value: '**',
				pos: 1
			},
			'_': {
				value: '__',
				pos: 1
			},
			'>': {
				value: '> ',
				pos: 2
			},
			'~': {
				value: '~~',
				pos: 1
			}
		};
		const snipmap = {
			// These make no sense but I'll add them for completeness
			'1#': '# ',
			'2#': '## ',

			// These make sense
			'3#': '### ',
			'4#': '#### ',
			'5#': '##### ',
			'6#': '###### ',

			// Lorem ipsum
			'Lorem': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!',

			// Might be a good idea to add a snippet for a tables sometime.
		};

		function getWord(text, caretPos) {
			let preText = text.substring(0, caretPos);
			let split = preText.split(/\s/);
			return split[split.length - 1].trim();
		}

		//>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>

		textarea.addEventListener('keydown', function (event) {
			const pos = textarea.selectionStart;
			if (keymap[event.key]) {
				event.preventDefault();
				textarea.value =
					textarea.value.slice(0, pos) +
					keymap[event.key].value +
					textarea.value.slice(textarea.selectionEnd);

				textarea.selectionStart = textarea
					.selectionEnd =
					pos + keymap[event.key].pos;
			}

			if (event.key === 'Tab') {
				const word = getWord(textarea.value, textarea
					.selectionStart);
				if (word && snipmap[word]) {
					event.preventDefault();
					const pos = editing.selectionStart;
					editing.value = editing.value.slice(0, pos -
							word.length) +
						snipmap[word] +
						editing.value.slice(editing
							.selectionEnd);

					editing.selectionStart = editing
						.selectionEnd =
						pos + (snipmap[word].length - 1);
				} else {
					event.preventDefault();
					textarea.value = textarea.value.slice(0,
							pos) +
						'	' + textarea.value.slice(textarea
							.selectionEnd);

					textarea.selectionStart = textarea
						.selectionEnd = pos + 1;
				}
			}
		});
	})
