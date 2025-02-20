const handleDetectLanguage = async () => {
	try {
		const languageDetectorCapabilities =
			await self.ai.languageDetector.capabilities();
		const canDetect = languageDetectorCapabilities.capabilities;

		let detector;
		if (canDetect === 'no') {
			// The language detector isn't usable.
			return;
		}
		if (canDetect === 'readily') {
			// The language detector can immediately be used.
			detector = await self.ai.languageDetector.create();
		} else {
			// The language detector can be used after model download.
			detector = await self.ai.languageDetector.create({
				monitor(m) {
					m.addEventListener('downloadprogress', (e) => {
						return `Downloaded ${e.loaded} of ${e.total} bytes.`;
					});
				},
			});
			await detector.ready;
		}
		return detector;
	} catch (e) {
		console.error('Detection error! ', e);
	}
};

export const handleAiDetectLang = async (userInput) => {
	try {
		const detector = await handleDetectLanguage();
		const results = await detector.detect(userInput);
		if (results.length > 0) {
			// Find the result with the highest confidence score
			const bestMatch = results.reduce((max, result) =>
				result.confidence > max.confidence ? result : max
			);

			return bestMatch.detectedLanguage; // Return the most confident language
		} else {
			console.error('No language detected.');
			return null; // Handle empty results
		}
	} catch (e) {
		console.error('Error performing language detection! ', e);
	}
};

export const handleTranslateText = async (source, target, text) => {
	try {
		const translator = await self.ai.translator.create({
			sourceLanguage: source,
			targetLanguage: target,
		});

		const translated = await translator.translate(text);
		return translated;
	} catch (e) {
		// console.error('Translation error:', e);
		return;
	}
};
const handleAiSummarizeText = async () => {
	try {
		const options = {
			sharedContext: 'This is a article',
			type: 'key-points',
			format: 'markdown',
			length: 'medium',
		};

		const available = (await self.ai.summarizer.capabilities()).available;

		let summarizer;
		if (available === 'no') {
			// The Summarizer API isn't usable.
			console.error("API isn't usable");
			return;
		}
		if (available === 'readily') {
			// The Summarizer API can be used immediately .
			summarizer = await self.ai.summarizer.create(options);
		} else {
			// The Summarizer API can be used after the model is downloaded.
			summarizer = await self.ai.summarizer.create(options);
			summarizer.addEventListener('downloadprogress', (e) => {
				console.log(e.loaded, e.total);
			});
			await summarizer.ready;
		}
		return summarizer;
	} catch (e) {
		console.error('Unable to perform summarizing operation! ', e);
	}
};

export const summarizeText = async (
	text,
	context = 'This is a random article'
) => {
	const summarizer = await handleAiSummarizeText();
	const summaryStream = await summarizer.summarize(text, {
		context: context,
	});

	// return summaryStream;
	const summaryBulletPoints = summaryStream
		.split('*')
		.map((item) => item.trim())
		.filter((item) => item);

	return summaryBulletPoints;
};

export const languagesList = [
	{ lang: 'Afrikaans', code: 'af' },
	{ lang: 'Albanian', code: 'sq' },
	{ lang: 'Amharic', code: 'am' },
	{ lang: 'Arabic', code: 'ar' },
	{ lang: 'Armenian', code: 'hy' },
	{ lang: 'Basque', code: 'eu' },
	{ lang: 'Bengali', code: 'bn' },
	{ lang: 'Bosnian', code: 'bs' },
	{ lang: 'Bulgarian', code: 'bg' },
	{ lang: 'Catalan', code: 'ca' },
	{ lang: 'Chinese', code: 'zh' },
	{ lang: 'Croatian', code: 'hr' },
	{ lang: 'Czech', code: 'cs' },
	{ lang: 'Danish', code: 'da' },
	{ lang: 'Dutch', code: 'nl' },
	{ lang: 'English', code: 'en' },
	{ lang: 'Estonian', code: 'et' },
	{ lang: 'Finnish', code: 'fi' },
	{ lang: 'French', code: 'fr' },
	{ lang: 'Georgian', code: 'ka' },
	{ lang: 'German', code: 'de' },
	{ lang: 'Greek', code: 'el' },
	{ lang: 'Gujarati', code: 'gu' },
	{ lang: 'Haitian Creole', code: 'ht' },
	{ lang: 'Hebrew', code: 'he' },
	{ lang: 'Hindi', code: 'hi' },
	{ lang: 'Hungarian', code: 'hu' },
	{ lang: 'Icelandic', code: 'is' },
	{ lang: 'Indonesian', code: 'id' },
	{ lang: 'Irish', code: 'ga' },
	{ lang: 'Italian', code: 'it' },
	{ lang: 'Japanese', code: 'ja' },
	{ lang: 'Javanese', code: 'jv' },
	{ lang: 'Kannada', code: 'kn' },
	{ lang: 'Kazakh', code: 'kk' },
	{ lang: 'Khmer', code: 'km' },
	{ lang: 'Korean', code: 'ko' },
	{ lang: 'Kurdish', code: 'ku' },
	{ lang: 'Latvian', code: 'lv' },
	{ lang: 'Lithuanian', code: 'lt' },
	{ lang: 'Macedonian', code: 'mk' },
	{ lang: 'Malay', code: 'ms' },
	{ lang: 'Malayalam', code: 'ml' },
	{ lang: 'Marathi', code: 'mr' },
	{ lang: 'Mongolian', code: 'mn' },
	{ lang: 'Nepali', code: 'ne' },
	{ lang: 'Norwegian', code: 'no' },
	{ lang: 'Pashto', code: 'ps' },
	{ lang: 'Persian', code: 'fa' },
	{ lang: 'Polish', code: 'pl' },
	{ lang: 'Portuguese', code: 'pt' },
	{ lang: 'Punjabi', code: 'pa' },
	{ lang: 'Romanian', code: 'ro' },
	{ lang: 'Russian', code: 'ru' },
	{ lang: 'Serbian', code: 'sr' },
	{ lang: 'Slovak', code: 'sk' },
	{ lang: 'Slovene', code: 'sl' },
	{ lang: 'Spanish', code: 'es' },
	{ lang: 'Swahili', code: 'sw' },
	{ lang: 'Swedish', code: 'sv' },
	{ lang: 'Tamil', code: 'ta' },
	{ lang: 'Telugu', code: 'te' },
	{ lang: 'Thai', code: 'th' },
	{ lang: 'Turkish', code: 'tr' },
	{ lang: 'Ukrainian', code: 'uk' },
	{ lang: 'Urdu', code: 'ur' },
	{ lang: 'Uzbek', code: 'uz' },
	{ lang: 'Vietnamese', code: 'vi' },
	{ lang: 'Welsh', code: 'cy' },
	{ lang: 'Xhosa', code: 'xh' },
	{ lang: 'Yiddish', code: 'yi' },
	{ lang: 'Yoruba', code: 'yo' },
	{ lang: 'Zulu', code: 'zu' },
];
