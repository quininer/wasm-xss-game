
                (function() {
                    var wasm;
                    const __exports = {};
                    

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null ||
        cachegetUint8Memory.buffer !== wasm.memory.buffer)
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

__exports.__wbg_f_alert_alert_n = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    alert(varg0);
}

const __wbg_f_log_log_n_target = console.log;

__exports.__wbg_f_log_log_n = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_f_log_log_n_target(varg0);
}

const __wbg_f_error_error_n_target = console.error;

__exports.__wbg_f_error_error_n = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_f_error_error_n_target(varg0);
}

let cachedEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null ||
        cachegetUint32Memory.buffer !== wasm.memory.buffer)
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachegetUint32Memory;
}

__exports.__wbg_f_eval_eval_n = function(ret, arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    const [retptr, retlen] = passStringToWasm(eval(varg0));
    const mem = getUint32Memory();
                    mem[ret / 4] = retptr;
                    mem[ret / 4 + 1] = retlen;

}

__exports.foo = function(arg0, arg1, arg2) {
    const [ptr1, len1] = passStringToWasm(arg1);
    try {
        return wasm.foo(arg0, ptr1, len1, arg2);
    } finally {
        wasm.__wbindgen_free(ptr1, len1 * 1);
    }
}

__exports.foo2 = function(arg0, arg1) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return wasm.foo2(ptr0, len0, arg1);
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}

__exports.__wbindgen_throw = function(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

                    function init(wasm_path) {
                        return fetch(wasm_path)
                            .then(response => response.arrayBuffer())
                            .then(buffer => WebAssembly.instantiate(buffer, { './wasm_xss_game': __exports }))
                            .then(({instance}) => {
                                wasm = init.wasm = instance.exports;
                                return;
                            });
                    };
                    self.wasm_bindgen = Object.assign(init, __exports);
                })();
            