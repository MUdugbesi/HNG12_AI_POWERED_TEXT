import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import Translate from './pages/Translate';
import AlertMessageHandler from './components/AlertMessageHandler';
import PageHeader from './components/PageHeader';

const App = () => {
	const [user, setUser] = useState(false);
	const handleClick = () => {
		setUser(true);
	};
	const [alertMessage, setAlertMessage] = useState({});
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
						<WelcomePage
							handleClick={handleClick}
							setAlertMessage={setAlertMessage}
						/>
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
