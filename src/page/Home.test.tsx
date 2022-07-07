import { render, fireEvent } from '@testing-library/react';
import Home  from './Home';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'

test('renders navbar', async () => {
  const renderTest = render(
    <Provider store={store}>
        <Router>
            <Home />
        </Router>
    </Provider>
  );

  fireEvent.click(renderTest.getByText('DASHBOARD'))
  expect(renderTest.getByText('hellow word')).toBeInTheDocument()
  
  fireEvent.click(renderTest.getByText('AGENT'))
  expect(renderTest.getByText('ALL')).toBeInTheDocument()
});
