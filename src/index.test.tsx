// import React from 'react';
import { act } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import Home from './page/Home';
// jest.mock('./App', () => ({
//     __esmodule: true,
//     default: () => <div data-testid="mocked-app"></div>
// }))
describe('render root', () => {
    beforeEach(() => {
        const div = document.createElement('div');
        div.id = 'root';
        document.body.appendChild(div);
        act(() => {
            require('./index');
        })       
    })
   
    test('renders index', async () => {
        //expect(screen.queryByTestId('mocked-app')).not.toBeNull();
    })
});
