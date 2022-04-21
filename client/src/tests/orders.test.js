import React from 'react'
import OrdersPage from '../pages/OrdersPage'
import {render, fireEvent, getByText, getByLabelText} from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe("OrdersPage", () => {
    describe("Valid inputs", () => {
        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const {getByLabelText, getByRole} = render(<OrdersPage onSubmit={mockOnSubmit}/>)

            await act(async () => {

            
            fireEvent.change(getByLabelText("Rendelés keresése felhasználónév szerint *"), {target: {value: "normal"}})
          
        })
        await act(async () => {
            fireEvent.click(getByRole("button"))
        })

        expect(mockOnSubmit).toHaveBeencalled()
    })
})
})