import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import App from './App';

test('App component initially renders with fetching data', async() => {
    const { getByText } = render(
        <App/>
    )
    
    // Check to see if fetching data while <!show> renders
    getByText(/fetching data.../i);

    // Check to see if App component renders after fetching data
    await wait(() => {
        getByText(/select a season/i);
    })
})

test('Drop down works on click', async() => {
    const { getByText } = render(
        <App/>
    )

    await wait(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    getByText(/season 1/i);
})

test('Season 1 displays after selecting from drop down', async() => {
    const { getByText } = render(
        <App/>
    )

    await wait(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    const select = getByText(/season 1/i);
    fireEvent.mouseDown(select);

    // Assert that episodes are displaying for season one
    expect(getByText(/chapter one/i)).toHaveTextContent(/the vanishing of will byers/i);
})