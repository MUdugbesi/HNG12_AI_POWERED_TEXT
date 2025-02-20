import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import Translate from './pages/Translate';
import AlertMessageHandler from './components/AlertMessageHandler';
import PageHeader from './components/PageHeader';

const App = () => {
	const [user, setUser] = useState(false);

	const [alertMessage, setAlertMessage] = useState(null);
	const [generalMessage, setGeneralMessage] = useState({});

	useEffect(() => {
		let alertTimeout;
		let generalTimeout;

		if (alertMessage) {
			alertTimeout = setTimeout(() => {
				setAlertMessage(null);
				setGeneralMessage(null);
			}, 8000);
		}

		if (generalMessage) {
			generalTimeout = setTimeout(() => {
				setGeneralMessage(null);
			}, 4000);
		}

		return () => {
			if (alertTimeout) clearTimeout(alertTimeout);
			if (generalTimeout) clearTimeout(generalTimeout);
		};
	}, [alertMessage, generalMessage]);

	const getBrowserAgent = () => {
		const userAgent = navigator.userAgent;

		if (!userAgent.includes('Chrome')) {
			return;
		}
		return true;
	};
	const handleClick = () => {
		const isRightBrowser = getBrowserAgent();
		if (isRightBrowser !== undefined) {
			setUser(true);
		} else {
			setAlertMessage({
				text: 'Sorry: AI not available in your browser, Open in chrome / chrome canary for full AI functionality',
			});
		}
	};

	return (
		<>
			<main className='relative h-auto min-h-[100vh] w-[100vw] flex flex-col items-center justify-center'>
				{alertMessage && (
					<AlertMessageHandler
						alertMessage={alertMessage}
						setAlertMessage={setAlertMessage}
					/>
				)}
				<div className='w-full relative'>
					{!user ? (
						<WelcomePage handleClick={handleClick} />
					) : (
						<>
							<PageHeader />
							<Translate
								setUser={setUser}
								generalMessage={generalMessage}
								setGeneralMessage={setGeneralMessage}
							/>
						</>
					)}
				</div>
			</main>
		</>
	);
};

export default App;
