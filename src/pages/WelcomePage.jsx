import React, { useEffect } from 'react';
import WelcomeImg from '../assets/welcome.png';
import Button from '../components/Button';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

const WelcomePage = ({ handleClick, setAlertMessage }) => {
	useEffect(() => {
		setAlertMessage({
			text: 'Note: Open in chrome browser for full Ai functionality',
		});
	}, []);
	return (
		<>
			<section className='h-[700px] my-auto animate__animated animate__fadeIn animate__slow flex flex-col justify-evenly items-center relative'>
				<div className='w-[80%] md:w-[30%] mx-auto'>
					<img src={WelcomeImg} />
				</div>
				<div className='w-full'>
					<h1 className='text-center font-bold text-[24px] md:text-[48px] font-alatsi w-[60%] md:w-[70%] mx-auto '>
						Translate, Summarize and Detect
					</h1>
					<p className='text-center italic mt-4 text-[12px] md:text-[14px]'>
						From one language to another
					</p>
				</div>

				<div className=' w-[200px] mx-auto flex items-center justify-center animate__animated  animate__slideInRight transition-all '>
					<Button
						text={
							<>
								<HiOutlineArrowLongRight className='icons text-black' />
							</>
						}
						className={
							'w-full mt-4 h-[43px] bg-white flex items-center justify-center rounded-xl hover:scale-[1.04] transition-scale'
						}
						onclick={handleClick}
						ariaLabel={'Get started button'}
					/>
				</div>
			</section>
		</>
	);
};

export default WelcomePage;
