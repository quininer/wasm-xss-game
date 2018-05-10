# Simple WebAssembly StackOverflow XSS Game

from [WebAssembly StackOverflow](https://quininer.github.io/?wasm-stack-overflow).

build
-----

```bash
cargo build --target wasm32-unknown-unknown --release
wasm-bindgen target/wasm32-unknown-unknown/release/wasm_xss_game.wasm --out-dir index/ --no-modules
```
