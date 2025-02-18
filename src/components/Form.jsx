import React, { useState } from 'react';
import Button from './Button';
import { IoIosSend } from 'react-icons/io';
import MessageHandler from './Message';

const Form = ({ handleTranslate, handleChange, text }) => {
	const [isFocused, setIsFocused] = useState(false);
	const handleFocus = () => {
		setIsFocused(true);
	};
	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<form
			className='flex flex-col justify-center items-center w-full h-auto gap-4 relative'
			onSubmit={handleTranslate}
		>
			{isFocused && !text && (
				<MessageHandler
					message={{ text: 'Input field required', type: 'error' }}
					className='bottom-[50px] md:left-8 left-4'
				/>
			)}
			<textarea
				className='w-[90%] min-h-[20vh] md:min-h-[20vh] h-auto text-black border-blue-600 border-2 rounded-xl outline-none focus-visible:border-[3px] pt-2 pl-4 caret-[blue] bg-transparent'
				placeholder='Enter text here'
				onChange={handleChange}
				value={text}
				onFocus={handleFocus}
				onBlur={handleBlur}
			></textarea>
			<Button
				text={
					<>
						<IoIosSend className='text-[24px]' />
					</>
				}
				className={
					'w-[60%] mt-2 h-[48px] flex items-center justify-center rounded-xl bg-[#715fe3] transition hover:bg-[#8576e4]'
				}
				disabled={!text?.length}
			/>
		</form>
	);
};

export default Form;
