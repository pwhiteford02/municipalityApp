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
     * @returns {void}
     */
    static handleFileUploadButton() {
        document.getElementById('uploadFileButton').addEventListener('click', async () => {
            document.getElementById(`resultText`).innerText = await EventHandler.performFetch();
            setTimeout(() => {
                document.getElementById(`resultText`).innerText = '\u00A0'; //inserts a text space so element doesn't roll up
            }, 1000);
        });
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
        });
    }

    /**
     * @async
     * @returns {Promise<string>}
     */
    static async performFetch() {
        let file = document.getElementById('fileUpload');
        let data = new FormData();
        data.append('file', file.files[0]);
        try {
            const response = await fetch(document.url, {
                method: 'POST',
                body: data,
                headers: {
                    'x-requested-with': 'fetch.0'
                }
            });
            return await response.text();
        } catch(error) {
            console.log(`ERROR: ${error}`);
        }
    }
}