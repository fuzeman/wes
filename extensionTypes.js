/**
 * Details about the format and quality of an image.
 *
 * @see {@link https://developer.chrome.com/extensions/extensionTypes#type-ImageDetails}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extensionTypes/ImageDetails}
 *
 * @typedef {Object} ImageDetails
 *
 * @property {ImageFormat} [format]  - The format of the resulting image. Default is {@link ImageFormat#PNG}.
 * @property {Number} [quality]      - When the format is {@link ImageFormat#JPEG}, this controls the quality of the resulting image.
 */

/**
 * The format of an image.
 *
 * @see {@link https://developer.chrome.com/extensions/extensionTypes#type-ImageFormat}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extensionTypes/ImageFormat}
 *
 * @enum {String}
 */
export const ImageFormat = {
    JPEG: 'jpeg',
    PNG: 'png'
};

/**
 * The soonest that the JavaScript or CSS will be injected into the tab.
 *
 * @see {@link https://developer.chrome.com/extensions/extensionTypes#type-RunAt}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extensionTypes/RunAt}
 *
 * @enum {String}
 */
export const RunAt = {
    DocumentStart: 'document_start',
    DocumentEnd: 'document_end',
    DocumentIdle: 'document_idle'
};
