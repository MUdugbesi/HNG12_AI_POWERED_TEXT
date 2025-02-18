import React from 'react';
import Logo from '../assets/translate.png';
import { IoStarOutline } from 'react-icons/io5';

const PageHeader = () => {
	return (
		<>
			<header className='flex h-[48px] w-[75%] text-black justify-between items-center'>
				<img
					src={Logo}
					alt='logo'
					aria-label=''
					className='w-[35px] md:w-[50px]'
				/>

				<p className='font-roadRage text-[24px] md:text-[32px]'>CHROM-AI</p>
				<IoStarOutline className='icons' />
			</header>
		</>
	);
};

export default PageHeader;
