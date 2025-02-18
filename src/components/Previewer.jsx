import React from 'react';
import Button from './Button';
import Select from './Select';

const Previewer = ({
	userInput,
	translatedContent,
	detectedLang,
	detectedLanguageCode,
	handleTranslate,
	setTranslatedContent,
	handleSummarizeText,
	summarizedText,
	setGeneralMessage,
	isSummarizing,
}) => {
	return (
		<>
			<div className='previewer min-h-[340px] md:min-h-[400px] h-auto w-[90%] mx-auto rounded-xl px-3 md:px-6 py-2'>
				<p className='text-[12px] mb-3 font-bold'>Translated Content Here!</p>
				<p className='text-[12px] md:text-[15px] pt-2'>{userInput}</p>
				{detectedLang && (
					<p className=' my-2'>
						<span className='font-bold text-[#90e0ef]'>Detected language</span>{' '}
						- {detectedLang}
					</p>
				)}
				<div className='mt-4'>
					{userInput && (
						<>
							<p>Translate Language</p>
							<Select
								options={[
									'English',
									'French',
									'Spanish',
									'Russian',
									'Turkish',
									'Portuguese',
								]}
								detectedLang={detectedLanguageCode}
								text={userInput}
								handleTranslate={handleTranslate}
								setTranslatedContent={setTranslatedContent}
								setGeneralMessage={setGeneralMessage}
							/>
						</>
					)}

					{translatedContent && (
						<p className='my-2'>
							<span className='font-bold text-[#90e0ef]'>Translation</span> -{' '}
							<span className='text-gray-300'>{translatedContent}</span>
						</p>
					)}
				</div>

				{userInput?.length > 150 && detectedLang === 'English' && (
					<Button
						text={
							!isSummarizing ? (
								'Summarize'
							) : (
								<>
									<div className='flex gap-2 items-center'>
										Summarizing
										<img
											aria-label='oval-loading'
											className='w-[20px] h-[20px] bg-transparent hover:bg-slate-200'
											src='/loader-rolling.svg'
										/>
									</div>
								</>
							)
						}
						onclick={handleSummarizeText}
						className={
							'py-2 px-5 bg-white text-black border-none mt-2 hover:scale-[1.02] transition-all text-[12px] font-bold disabled:text-white'
						}
						disabled={summarizedText}
					/>
				)}

				<div>
					{summarizedText?.length > 0 && (
						<div>
							<p className='mt-4 mb-2 font-bold text-start text-[#90e0ef]'>
								Text summarized below
							</p>
							<ul className='list-disc max-md:pl-1  pl-4 overflow-hidden text-gray-300'>
								{summarizedText.map((item, index) => (
									<li
										key={index}
										className={`mb-2 animate__animated animate__slideInLeft animate__delay-${index}s `}
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Previewer;
