import { render, fireEvent } from '@testing-library/react';
import Popup from './popup';
import { store } from '../app/store';
import { Provider } from 'react-redux';

describe('render popup test', () => {
  test('renders popup show', async () => {
    const renderTest = render(
      <Provider store={store}>
        <Popup resources={['firefox', 'chrome']} addResource={() => { }} />
      </Provider>
    );

    fireEvent.click(renderTest.getByTestId('popupBox').previousSibling as ChildNode)
    expect(renderTest.getByTestId('popupBox')).not.toHaveClass('hide')

    fireEvent.click(renderTest.getByText('Add Resources'))
    expect(renderTest.getByTestId('popupBox')).not.toHaveClass('hide')

    fireEvent.input(renderTest.getByPlaceholderText('Input value'), { target: { value: 'ab' } })
    fireEvent.click(renderTest.getByText('Add Resources'))
    expect(renderTest.getByTestId('popupBox')).toHaveClass('hide')
  });

  test('renders hide popup when click outside', async () => {
    const renderTest = render(
      <Provider store={store}>
        <Popup resources={['a']} addResource={() => { }} />
      </Provider>
    );

    fireEvent.click(renderTest.getByText('For test'))
    expect(renderTest.getByTestId('popupBox')).toHaveClass('hide')
  });

  test('renders popup error msg', async () => {
    const renderTest = render(
      <Provider store={store}>
        <Popup resources={['firefox', 'chrome']} addResource={() => { }} />
      </Provider>
    );

    fireEvent.click(renderTest.getByTestId('popupBox').previousSibling as ChildNode)

    fireEvent.change(renderTest.getByPlaceholderText('Input value'), { target: { value: 'safair,firefox' } })
    expect(renderTest.getByText('Duplicate resource name')).not.toHaveClass('hidden')

    fireEvent.change(renderTest.getByPlaceholderText('Input value'), { target: { value: 'safair,safair' } })
    expect(renderTest.getByText('Duplicate resource name')).not.toHaveClass('hidden')

    fireEvent.input(renderTest.getByPlaceholderText('Input value'), { target: { value: 'safair' } })
    expect(renderTest.getByText('Duplicate resource name')).toHaveClass('hidden')
  });

  test('renders popup value', async () => {
    const renderTest = render(
      <Provider store={store}>
        <Popup resources={['firefox', 'chrome']} addResource={() => { }} />
      </Provider>
    );

    fireEvent.click(renderTest.getByTestId('popupBox').previousSibling as ChildNode)

    fireEvent.change(renderTest.getByPlaceholderText('Input value'), { target: { value: ',,' } })
    expect(renderTest.queryByDisplayValue(',,')).not.toBeInTheDocument()
    expect(renderTest.getByDisplayValue(',')).toBeInTheDocument()

    fireEvent.input(renderTest.getByPlaceholderText('Input value'), { target: { value: 'firefox, ' } })
    expect(renderTest.queryByDisplayValue('firefox, ')).not.toBeInTheDocument()
    expect(renderTest.getByDisplayValue('firefox,')).toBeInTheDocument()
  });
});



