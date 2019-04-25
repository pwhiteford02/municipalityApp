"use strict";

/**
 * Event handling class
 */
export default class EventHandler {

    /**
     * @constructor
     */
    constructor() {
        EventHandler.handleFileUploadButton();
        EventHandler.stopEnterKey();
    }

    /**
     * For disabling enter key
     * @returns {void}
     */
    static stopEnterKey() {
        document.addEventListener('keypress', (evt) => {
            let key = evt.which;
            if (key === 13 || key === 169) {
                evt.preventDefault();
            }
        }
