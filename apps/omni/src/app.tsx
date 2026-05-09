import env from '@miga/env';

export const App = () => {
	return <h1>Your app is running in {env.public.APP_ENV} environment.</h1>;
};
