import React from 'react';
import './App.scss';
import Home from './entity/home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';


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
		<ThemeProvider theme={theme}>
			<MyStyleProvider>
				<Home name='hAmed' />
			</MyStyleProvider>
		</ThemeProvider>
	);
}

export default App;
