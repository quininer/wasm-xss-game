#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#![feature(global_allocator)]

extern crate wee_alloc;
extern crate wasm_bindgen;
extern crate base64;

use wee_alloc::WeeAlloc;
use wasm_bindgen::prelude::*;


#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(msg: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn error(msg: &str);

    fn eval(code: &str) -> String;
}

trait Handle {
    fn handle(&self, msg: &str);
}

macro_rules! handle_impl {
    ( $ty:ident, $name:ident ) => {
        pub struct $ty;

        impl Handle for $ty {
            #[inline(never)]
            fn handle(&self, msg: &str) {
                $name(msg)
            }
        }
    }
}

handle_impl!(Alert, alert);
handle_impl!(Log, log);
handle_impl!(Error, error);

pub struct Alert2;

impl Handle for Alert2 {
    #[inline(never)]
    fn handle(&self, msg: &str) {
        alert(&format!("{} - {}", msg, eval("navigator.userAgent")));
    }
}

#[inline(never)]
fn base64_decode(a: &str) -> Vec<u8> {
    base64::decode(a).unwrap()
}

#[inline(never)]
fn pop(a: &mut Vec<u8>) -> u8 {
    a.pop().unwrap()
}

#[inline(never)]
fn from_utf8_lossy(buf: &[u8]) -> String {
    String::from_utf8_lossy(buf).into_owned()
}

#[wasm_bindgen]
pub fn foo(ty: usize, msg: &str, index: usize) {
    let logs = [
        Box::new(Log) as Box<dyn Handle>,
        Box::new(Error) as Box<dyn Handle>
    ];
    let mut buf = [0xff; 32];
    let mut msg = base64_decode(msg);

    for i in (index..index + msg.len()).rev() {
        unsafe {
            *buf.get_unchecked_mut(i) = pop(&mut msg);
        }
    }

    logs[ty].handle(&from_utf8_lossy(&buf));
}

#[wasm_bindgen]
pub fn foo2(msg: &str, ty: usize) {
    let handler = match ty {
        0 => Box::new(Alert) as Box<dyn Handle>,
        1 => Box::new(Alert2) as Box<dyn Handle>,
        _ => panic!()
    };

    handler.handle(msg);
}
