import React from 'react';
import './App.scss';
import { Main } from './entity/main/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { store } from './core/_helpers';
import { LocalizeProvider } from 'react-localize-redux'
import { Provider } from 'react-redux';


const theme = createMuiTheme({
	direction: 'rtl',
	typography: {
		fontFamily: [
			'IRANSans',
			'"IRANSans"',
			'Nunito',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif'
		].join(',')
	}
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function MyStyleProvider(props) {
	return (
		<StylesProvider jss={jss}>
			{props.children}
		</StylesProvider>
	);
}
function App() {
	return (
		<LocalizeProvider>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<MyStyleProvider>
						<Main name='hAmed' />
					</MyStyleProvider>
				</ThemeProvider>
			</Provider>
		</LocalizeProvider>
	);
}

export default App;
