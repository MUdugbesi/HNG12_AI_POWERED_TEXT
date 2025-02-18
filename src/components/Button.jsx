import React from 'react';

const Button = ({ text, className, onclick, disabled }) => {
	return (
		<button
			className={`border rounded-md  disabled:bg-gray-500 disabled:border-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:hover:cursor-not-allowed  ${
				className ? className : 'h-[48px] flex-1 w-[200px]'
			}`}
			onClick={onclick}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
