import React, { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import Translate from './components/Translate';
import AlertMessageHandler from './components/AlertMessageHandler';

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
			}, 10000);
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
			<main className='relative'>
				{alertMessage && (
					<AlertMessageHandler
						alertMessage={alertMessage}
						setAlertMessage={setAlertMessage}
					/>
				)}
				<div>
					{!user ? (
						<WelcomePage
							handleClick={handleClick}
							setAlertMessage={setAlertMessage}
						/>
					) : (
						<Translate
							setUser={setUser}
							generalMessage={generalMessage}
							setGeneralMessage={setGeneralMessage}
						/>
					)}
				</div>
			</main>
		</>
	);
};

export default App;
