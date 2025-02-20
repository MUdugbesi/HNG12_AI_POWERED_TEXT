import React, { useCallback, useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import PageHeader from '../components/PageHeader';
import { handleAiDetectLang, languagesList, summarizeText } from '../utils';
import Previewer from '../components/Previewer';
import Form from '../components/Form';
import MessageHandler from '../components/Message';

const Translate = ({ setUser, generalMessage, setGeneralMessage }) => {
	const [translatedContent, setTranslatedContent] = useState('');
	const [text, setText] = useState('');
	const [userInput, setUserInput] = useState('');
	const [detectedLang, setDetectedLang] = useState('');
	const [detectedLanguageCode, setDetectedLanguageCode] = useState('');
	const [summarizedText, setSummarizedText] = useState([]);
	const [isSummarizing, setIsSummarizing] = useState(false);

	const handleInputChange = ({ target }) => {
		setText(target.value);
	};

	const handleLanguageDetection = useCallback(async () => {
		try {
			const language = await handleAiDetectLang(userInput);
			if (language) {
				const foundLang = languagesList.find((lang) => lang.code === language);
				if (foundLang) {
					setDetectedLanguageCode(foundLang && foundLang.code);
					setDetectedLang(foundLang ? foundLang.lang : language);
					setGeneralMessage({
						text: 'Language detected!',
						type: 'success',
					});
				} else {
					setGeneralMessage({
						text: 'Language detection failed, not found!',
						type: 'error',
					});
					console.log('error');
				}
			} else {
				setGeneralMessage({
					text: 'Error! Language Detector API not available, check browser?',
					type: 'error',
				});
			}
		} catch (e) {
			setGeneralMessage({ text: 'Error detecting language:', type: 'error' });
			return e.message;
		}
	}, [setGeneralMessage, userInput]);

	const handleSummarizeText = async () => {
		setIsSummarizing(true);
		try {
			const result = await summarizeText(userInput);
			if (result) {
				setIsSummarizing(true);
				setSummarizedText(result);
				setGeneralMessage({
					text: 'Completed, summaries generated!',
					type: 'success',
				});
			} else {
				setGeneralMessage({
					text: 'Error!, performing summarizing operation, check browser?',
					type: 'error',
				});
			}
		} catch (e) {
			setGeneralMessage({
				text: 'Error!, performing summarizing operation',
				type: 'error',
			});
			console.error(e);
		} finally {
			setIsSummarizing(false);
		}
	};

	const handleTranslate = useCallback(
		(e) => {
			e.preventDefault();
			if (
				text.length > 0 ||
				userInput.length > 0 ||
				translatedContent ||
				summarizedText
			) {
				setUserInput(text);
				setText('');
				setTranslatedContent('');
				setSummarizedText('');
			}
		},

		[summarizedText, text, translatedContent, userInput.length]
	);

	useEffect(() => {
		if (!userInput.length) return;
		handleLanguageDetection();
	}, [handleLanguageDetection, userInput]);

	const handleBackToHome = () => {
		setUser(null);
	};

	

	return (
		<>
			<div className='md:w-[60%] mx-auto h-auto flex flex-col items-center justify-between mt-5 gap-4 md:gap-10 animate__animated animate__fadeInRight relative'>
				{generalMessage && (
					<MessageHandler
						message={generalMessage}
						className='-top-5 md:-top-6 md:-right-32 right-5 text-[12px] md:text-[16px] md:tracking-wider'
					/>
				)}

				<BiArrowBack
					className='absolute left-2 md:inset-0 text-[20px] md:text-[24px] hover:cursor-pointer'
					onClick={handleBackToHome}
					aria-label='Go back arrow'
				/>

				<div
					className={`w-full h-auto min-h-[90vh] pb-10 flex ${
						!userInput ? 'justify-center items-center' : 'justify-between'
					} flex-col`}
				>
					{userInput && (
						<Previewer
							userInput={userInput}
							translatedContent={translatedContent}
							detectedLang={detectedLang}
							detectedLanguageCode={detectedLanguageCode}
							handleTranslate={handleTranslate}
							setTranslatedContent={setTranslatedContent}
							handleSummarizeText={handleSummarizeText}
							summarizedText={summarizedText}
							setGeneralMessage={setGeneralMessage}
							isSummarizing={isSummarizing}
							setIsSummarizing={setIsSummarizing}
						/>
					)}
					<Form
						handleTranslate={handleTranslate}
						handleChange={handleInputChange}
						text={text}
						userInput={userInput}
					/>
				</div>
			</div>
		</>
	);
};

export default Translate;
