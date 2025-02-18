import React, { useCallback, useEffect, useState } from 'react';
import Button from './Button';
import { BiArrowBack, BiSend } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import PageHeader from './PageHeader';
import { handleAiDetectLang, languagesList, summarizeText } from '../utils';
import Select from './Select';
import Previewer from './Previewer';
import Form from './Form';
import MessageHandler from './Message';

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
				}
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
			} else {
				setGeneralMessage({
					text: 'Error!, performing summarizing operation',
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
			setGeneralMessage({
				text: 'Completed, summaries generated',
				type: 'success',
			});
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
			<div className='translatePage page flex flex-col items-center justify-between pt-4 relative gap-4 md:gap-10 animate__animated animate__fadeInRight'>
				{generalMessage && (
					<MessageHandler
						message={generalMessage}
						className='top-16 md:top-20 right-5 text-[12px] md:text-[12px] '
					/>
				)}
				<PageHeader />
				<BiArrowBack
					className='text-black absolute top-5 left-2 text-[22px] hover:cursor-pointer'
					onClick={handleBackToHome}
				/>
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
				<Form
					handleTranslate={handleTranslate}
					handleChange={handleInputChange}
					text={text}
				/>
			</div>
		</>
	);
};

export default Translate;
