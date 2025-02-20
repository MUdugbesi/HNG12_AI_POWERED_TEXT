import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { handleTranslateText, languagesList } from '../utils';
import Button from './Button';
import MessageHandler from './Message';

const Select = ({
	options = [],
	detectedLang,
	text,
	setTranslatedContent,
	setGeneralMessage,
	ariaLabel,
}) => {
	const [open, setOpen] = useState(null);
	const [message, setMessage] = useState({});
	const [canTranslate, setCanTranslate] = useState(false);
	const [isTranslating, setIsTranslating] = useState(false);
	const dropdownRef = useRef();

	const handleSelectLanguage = (opt) => {
		const languageObj = languagesList.find(
			(language) => language.code === detectedLang
		);
		setTranslateLanguage(opt);
		setOpen(false);

		if (languageObj.lang !== opt) {
			setCanTranslate(true);
		} else {
			setMessage({
				text: 'Same language detected!',
				type: 'error',
			});
			setCanTranslate(false);
		}
	};

	const [translateLanguage, setTranslateLanguage] =
		useState('Select a language');

	useEffect(() => {
		const handleClickEvt = (evt) => {
			if (dropdownRef.current && !dropdownRef.current.contains(evt.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickEvt);
		return () => {
			document.removeEventListener('mousedown', handleClickEvt);
		};
	}, []);

	useEffect(() => {
		if (message !== null) {
			const timeout = setTimeout(() => setMessage(null), 3000);
			return () => clearTimeout(timeout);
		}
	}, [message]);

	useEffect(() => {
		if (canTranslate) {
			setCanTranslate((prev) => !prev);
		}
	}, [text]);

	const handleOpenSelect = () => {
		if (!text) {
			setMessage({
				text: 'Text field required to use this functionality',
				type: 'error',
			});
			return;
		}
		setOpen(!open);
	};

	const handleTranslate = async (selectedLanguage) => {
		setIsTranslating(true);
		const languageObj = languagesList.find(
			(language) => language.lang === selectedLanguage
		);

		if (!languageObj) {
			setGeneralMessage({
				text: `Language "${selectedLanguage}" not found in list.`,
				type: 'error',
			});

			return;
		}

		if (languageObj.code === detectedLang) {
			setGeneralMessage({
				text: 'Similar language detected',
				type: 'error',
			});
		}

		if (!detectedLang || !text) {
			setGeneralMessage({
				text: 'Missing detected language or text to translate.',
				type: 'error',
			});
			return;
		}

		try {
			const translated = await handleTranslateText(
				detectedLang,
				languageObj.code,
				text
			);
			if (translated) {
				setTranslatedContent(translated);
				setGeneralMessage({
					text: 'Language Translation process completed!',
					type: 'success',
				});
			} else {
				setGeneralMessage({
					text: 'Unable to create translator for the given source and target language.',
					type: 'error',
				});
			}
		} catch (error) {
			setGeneralMessage({ text: 'Translation failed:', type: 'error' });
			console.error(error);
		} finally {
			setIsTranslating(false);
		}
	};

	return (
		<>
			<div className='relative w-full' ref={dropdownRef}>
				<div
					className='w-full border border-[#224e84] bg-transparent h-[44px] rounded-lg pl-2 flex items-center justify-between cursor-pointer relative'
					onClick={handleOpenSelect}
					aria-label={ariaLabel}
				>
					<span>{translateLanguage}</span>
					<span className='pr-2'>
						{!open ? (
							<IoIosArrowDown aria-label='arrow-down' />
						) : (
							<IoIosArrowUp aria-label='arrow-up' />
						)}
					</span>
					<MessageHandler
						message={message}
						className=' -bottom-4 md:-bottom-5 right-0 text-[10px] md:text-[12px]'
					/>
				</div>
				{open && (
					<ul
						className={`absolute left-0 w-full bg-[#0e1f34] border border-[#224e84] rounded-lg mt-1 shadow-lg z-10`}
					>
						{options.map((option, index) => (
							<li
								key={index}
								className='px-4 py-2 cursor-pointer hover:bg-[#07373F] hover:text-white'
								onClick={() => handleSelectLanguage(option)}
							>
								{option}
							</li>
						))}
					</ul>
				)}

				<Button
					text={`${!isTranslating ? 'Translate' : 'Translating...'}`}
					className={
						'w-auto min-w-[100px] py-2 px-5 bg-[#0e1f34] border-[#224e84] border mt-4 hover:bg-gray-800 transition-all text-[12px] font-bold'
					}
					disabled={!canTranslate}
					onclick={() => handleTranslate(translateLanguage)}
					ariaLabel={'Translate Button'}
				/>
			</div>
		</>
	);
};

export default Select;
