import React from 'react'
import OrdersPage from '../pages/OrdersPage'
import { render, fireEvent, getByText, getByLabelText } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { AppRouter } from '../AppRouter'
import { ShoppingCartContext, UserContext } from '../App'

describe("OrdersPage", () => {
    describe("Valid inputs", () => {
        it('calls the onSubmit function', async() => {
            const mockOnSubmit = jest.fn()
            const providerTestUser = []
            const providerTestCart = []
            const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } > < ShoppingCartContext.Provider value = { providerTestCart } > < AppRouter > < OrdersPage onSubmit = { mockOnSubmit }
                /></AppRouter > < /ShoppingCartContext.Provider ></UserContext.Provider > )

            await act(async() => {


                fireEvent.change(getByLabelText("Rendelés keresése felhasználónév szerint *"), { target: { value: "normal" } })

            })
            await act(async() => {
                fireEvent.click(getByRole("button"))
            })

            expect(mockOnSubmit).toHaveBeencalled()
        })
    })
})