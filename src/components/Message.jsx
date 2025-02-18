import React from 'react';

const MessageHandler = ({ message, className }) => {
	return (
		<p
			className={`absolute font-alatsi ${
				message?.type === 'error'
					? 'text-red-500'
					: 'text-green-600 top-0 right-0'
			} ${className}`}
		>
			{message?.text}
		</p>
	);
};

export default MessageHandler;
