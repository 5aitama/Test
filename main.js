/**
 * @type {HTMLTextAreaElement}
 * 
 * The input text area element.
 */
const inputTextElement = document.querySelector("#input");

/**
 * @type {HTMLTextAreaElement}
 * 
 * The output text area element.
 */
const outputTextElement = document.querySelector("#output");

/**
 * The valid ascii characters range (min is included, max is excluded)
 */
const asciiRange = { min: 32, max: 127 };

/**
 * Encode a text using Cesar encryption.
 * @param {string} text The text to encode.
 * @param {number} shift The shift to use.
 */
function cesarEncode(text, shift) {
    const bytes = new TextEncoder().encode(text);
    let result_bytes = new Uint8Array(bytes.length);

    for(let i = 0; i < bytes.length; i++) {
        let code = bytes[i];
        let new_code = (code - asciiRange.min + shift) % asciiRange.max + asciiRange.min;

        result_bytes[i] = new_code;
    }

    return new TextDecoder().decode(result_bytes);
}

/**
 * Decode a text encoded with Cesar encryption.
 * @param {string} text The text to decode.
 * @param {number} shift The shift used.
 * 
 * @returns {string}
 */
function cesarDecode(text, shift) {
    const bytes = new TextEncoder().encode(text);
    let result_bytes = new Uint8Array(bytes.length);

    for(let i = 0; i < bytes.length; i++) {
        let code = bytes[i];
        let new_code = (code - asciiRange.min - shift) + asciiRange.min;

        result_bytes[i] = new_code;
    }

    return new TextDecoder().decode(result_bytes);
}

document.querySelector("#decode").addEventListener("click", (_) => {
    outputTextElement.value = cesarDecode(inputTextElement.value, 4);
});

document.querySelector("#encode").addEventListener("click", (_) => {
    outputTextElement.value = cesarEncode(inputTextElement.value, 4);
});