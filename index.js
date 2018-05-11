const { foo } = wasm_bindgen;

function run() {
	const DEFAULT = `{ "type": 0, "message": "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=", "start": 0 }`;

	let input = document.getElementById("input");
	let submit = document.getElementById("submit");
	let hash = location.hash;

	if (hash.length == 0) {
		input.value = DEFAULT;
	} else {
		input.value = atob(hash.substr(1));
	}

	submit.addEventListener("click", () => {
		location.hash = btoa(input.value);

		for (let line of input.value.split('\n')) {
			if (line.startsWith("//")) {
				continue
			}

			try {
				let { type, message, start } = JSON.parse(line);
				foo(type, message, start);
			} catch(e) {
				continue
			}
		}
	})
}

wasm_bindgen('wasm_xss_game_bg.wasm').then(run);
