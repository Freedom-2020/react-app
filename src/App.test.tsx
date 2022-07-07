import { render, screen  } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

test('renders app', async () => {
    const renderTest = render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
});
