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
			<section className='welcome-page page animate__animated animate__fadeIn animate__slow flex flex-col justify-evenly items-center relative'>
				<div className='w-full md:w-[80%] mx-auto pt-10'>
					<img src={WelcomeImg} />
				</div>
				<div className='w-full'>
					<h1 className='text-center font-bold text-[24px] md:text-[48px] font-alatsi w-[90%] md:w-[70%] mx-auto '>
						Translate, Summarize and Detect
					</h1>
					<p className='text-center italic text-[12px]'>
						From one language to another
					</p>
				</div>

				<div className='btn-ctn w-full flex items-center justify-end pr-10 animate__animated  animate__slideInRight transition-all '>
					<Button
						text={
							<>
								<HiOutlineArrowLongRight className='icons' />
							</>
						}
						className={
							'w-[58px] h-[43px] bg-white flex items-center justify-center rounded-xl hover:scale-[1.04] transition-scale'
						}
						onclick={handleClick}
					/>
				</div>
			</section>
		</>
	);
};

export default WelcomePage;
