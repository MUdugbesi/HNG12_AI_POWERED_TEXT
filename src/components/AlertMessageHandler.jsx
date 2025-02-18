import React from 'react';

const AlertMessageHandler = ({ alertMessage }) => {
	const { text, type } = alertMessage;
	return (
		<>
			<div className='w-[90%] md:w-[50%] rounded-lg py-2 px-3 absolute -top-8 right-0 font-alatsi animate__animated animate__slideInRight bg-white text-black shadow-black shadow-md z-10'>
				<small className='text-red-500 font-[900]'>Important!</small>
				<p className='uppercase'>{text}</p>
			</div>
		</>
	);
};

export default AlertMessageHandler;
