import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { IoIosSend } from 'react-icons/io';
import MessageHandler from './Message';

const Form = ({ handleTranslate, handleChange, text, userInput }) => {
	const inputRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);
	const handleFocus = () => {
		setIsFocused(true);
	};
	const handleBlur = () => {
		setIsFocused(false);
	};

	const focusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => focusInput(), []);

	useEffect(() => {
		const handleEnterKey = async (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();

				// if (!text) return;

				handleTranslate(e);
			}
		};
		window.addEventListener('keydown', handleEnterKey);

		return () => {
			window.removeEventListener('keydown', handleEnterKey);
		};
	}, [handleTranslate, text]);

	return (
		<form
			className='flex flex-col justify-center items-center h-auto gap-4 relative w-full md:w-[80%] mx-auto'
			onSubmit={handleTranslate}
			aria-label='form'
		>
			{!userInput && (
				<p className='text-[18px] md:text-[24px] font-bold font-alatsi'>
					What can I help you with today?
				</p>
			)}
			<div className='flex px-2 w-full mx-auto items-center justify-center gap-2 relative'>
				{isFocused && !text && (
					<MessageHandler
						message={{ text: 'Input field required', type: 'error' }}
						className='-bottom-6 left-4'
					/>
				)}

				<textarea
					ref={inputRef}
					className='w-full min-h-[82px] h-auto border-blue-600 border-2 rounded-xl outline-none focus-visible:border-[3px] pt-2 pl-4 caret-[white] bg-transparent'
					placeholder='Message ChromAi'
					onChange={handleChange}
					value={text}
					onFocus={handleFocus}
					onBlur={handleBlur}
					aria-label={'text input area'}
				/>
				<Button
					text={
						<>
							<IoIosSend className='text-[24px]' />
						</>
					}
					className={
						'h-[48px] w-[50px] flex items-center justify-center rounded-xl bg-[#715fe3] transition hover:bg-[#8576e4] border-none'
					}
					disabled={!text?.length}
					ariaLabel={'send button'}
				/>
			</div>
		</form>
	);
};

export default Form;
