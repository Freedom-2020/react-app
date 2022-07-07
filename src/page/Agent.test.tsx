import { render, waitForElement, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import Agent from './Agent';
import '@testing-library/jest-dom/extend-expect'
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/agents', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData))
  }),
  rest.put('/agents/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('render agent test', () => {

  test('renders delete resource', async () => {
    const agent = render(
      <Provider store={store}>
        <Agent />
      </Provider>
    );

    await waitForElement(() => agent.queryByText('Firefox'))
    fireEvent.click(agent.getByText('Firefox').nextSibling as ChildNode)
    await waitForElementToBeRemoved(() => agent.getByText('Firefox'))
  });

  test('renders add resource', async () => {
    const agent = render(
      <Provider store={store}>
        <Agent />
      </Provider>
    );

    await waitForElement(() => agent.queryByText('Firefox'))
    fireEvent.input(agent.getAllByPlaceholderText('Input value')[0], { target: { value: 'ab' } })
    fireEvent.click(agent.getAllByText('Add Resources')[0])
    
    await waitForElement(() => agent.queryByText('ab'))
    expect(agent.getByText('ab')).toBeInTheDocument()
  });

  test('renders filter agent name', async () => {
    const agent = render(
      <Provider store={store}>
        <Agent />
      </Provider>
    );

    await waitForElement(() => agent.queryByText('Firefox'))
    fireEvent.input(agent.getByTestId('agentName'), { target: { value: 'bjstdmngbdr11.thoughtworks.com' } })
    expect(agent.queryByText('bjstdmngbdr11.thoughtworks.com')).toBeInTheDocument()
    expect(agent.queryByText('bjstdmngbdr22.thoughtworks.com')).not.toBeInTheDocument()
    fireEvent.input(agent.getByTestId('agentName'), { target: { value: '' } })
  });

  test('renders filter agent type', async () => {
    const agent = render(
      <Provider store={store}>
        <Agent />
      </Provider>
    );

    await waitForElement(() => agent.queryByText('Firefox'))
    fireEvent.click(agent.getByText('Physical'))
    expect(agent.queryByText('bjstdmngbdr04.thoughtworks.com')).toBeInTheDocument()
    expect(agent.queryByText('bjstdmngbdr22.thoughtworks.com')).not.toBeInTheDocument()

    fireEvent.click(agent.getByText('Virtual'))
    expect(agent.queryByText('bjstdmngbdr04.thoughtworks.com')).not.toBeInTheDocument()
    expect(agent.queryByText('bjstdmngbdr22.thoughtworks.com')).toBeInTheDocument()

    fireEvent.click(agent.getByText('All'))
    expect(agent.queryByText('bjstdmngbdr04.thoughtworks.com')).toBeInTheDocument()
  });
});


var mockData = [{
  "name": "bjstdmngbdr11.thoughtworks.com",
  "os": "windows",
  "status": "building",
  "type": "virtual",
  "ip": "192.168.1.80",
  "location": "/var/lib/cruise-agent",
  "resources": [
    "Firefox",
    "Safari",
    "Ubuntu",
    "Chrome"
  ],
  "id": 1
},
{
  "name": "bjstdmngbdr04.thoughtworks.com",
  "os": "suse",
  "status": "idle",
  "type": "physical",
  "ip": "192.168.1.113",
  "location": "/var/lib/cruise-agent",
  "resources": [
  ],
  "id": 7
},
{
  "name": "bjstdmngbdr22.thoughtworks.com",
  "os": "centos",
  "status": "idle",
  "type": "virtual",
  "ip": "192.168.1.111",
  "location": "/var/lib/cruise-agent",
  "resources": [
  ],
  "id": 8
},
]
