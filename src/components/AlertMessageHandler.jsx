import React from 'react';
import { MdClose } from 'react-icons/md';

const AlertMessageHandler = ({ alertMessage, setAlertMessage }) => {
	const { text, type } = alertMessage;
	return (
		<>
			<div className='w-[90%] md:w-[50%] rounded-lg py-2 px-3 absolute -top-8 right-0 font-alatsi animate__animated animate__slideInRight bg-white text-black shadow-black shadow-md z-10'>
				<MdClose
					className='absolute right-2 icons hover:text-red-600'
					onClick={() => setAlertMessage(null)}
				/>
				<small className='text-red-500 font-[900]'>Important!</small>
				<p className='uppercase'>{text}</p>
			</div>
		</>
	);
};

export default AlertMessageHandler;
