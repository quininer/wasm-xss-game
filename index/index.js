const { foo } = wasm_bindgen;

function run() {
	let input = document.getElementById("input");
	let submit = document.getElementById("submit");

	submit.addEventListener("click", () => {
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
