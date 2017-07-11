/* global document, PDFJS */
const Renderer =	require('../renderer');
const Identifier = 	require('../../enums/identifier');
const MediaTag = 	require('../../core/media-tag');

class PdfRenderer extends Renderer {
	/**
	 * Constructs the object.
	 */
	constructor() {
		super(Identifier.PDF);
	}

	/**
	 * Job to realise to render a pdf with a mediaObject.
	 *
	 * @param      {MediaObject}  mediaObject  The media object
	 */
	process(mediaObject) {
		// Get the pdf url
		const url = mediaObject.getAttribute('src');
        const iframe = document.createElement('iframe');
        var attrs = {
            src: url,
            height: '100vw',
            width: '100%',
            //sandbox: true,
        };

        Object.keys(attrs).forEach(function (k) {
            iframe.setAttribute(k, attrs[k]);
        });

        //mediaObject.utilsSetAllDataAttributes(iframe);
		mediaObject.replaceContents([iframe]);
        MediaTag.processingEngine.return(mediaObject);
        return;
	}
}

module.exports = PdfRenderer;
