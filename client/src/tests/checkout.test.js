import React from 'react'
import {CheckOutPage} from '../pages/CheckOutPage'
import {AppRouter} from '../AppRouter'
import {render, fireEvent, getByText, getByLabelText} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ShoppingCartContext, UserContext } from '../App'


describe("CheckOutPage", () => {
    describe("Valid inputs", () => {
        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const providerTestCart = []
            const providerTestUser = []
             render (<UserContext.Provider value={providerTestUser}><ShoppingCartContext.Provider value={providerTestCart}><AppRouter><CheckOutPage onSubmit={mockOnSubmit}/></AppRouter></ShoppingCartContext.Provider></UserContext.Provider>)
             
            await act(async () => {

            
            fireEvent.change(getByLabelText("Vezetéknév *"), {target: {value: "Kiss"}})
            fireEvent.change(getByLabelText("Kersztnév *"), {target: {value: "Attila"}})
            fireEvent.change(getByLabelText("Lakcím *"), {target: {value: "teszt u. 7."}})
            fireEvent.change(getByLabelText("Kártya szám *"), {target: {value: "1457-1458-2586-5852"}})
        })
        await act(async () => {
            fireEvent.click(getByRole("button"))
        })

        expect(mockOnSubmit).toHaveBeencalled()
    })
})

describe("Hibás vezetéknév", () => {
    it('Ki írja ha hibás a vetéknév', async () => {
        render(<CheckOutPage/>)

        await act(async () => {
            const firstnameInput = getByLabelText("Vezetéknév *")
            fireEvent.change(firstnameInput, {target: {value: "As"}})
            fireEvent.blur(firstnameInput)
        })

        expect(container.innerHTML).toMatch("A vezetéknévnek legalább 3 karakterből kell állnia.")
})
})

describe("Hibás keresztnév", () => {
    it('Ki írja ha hibás a keresztnév', async () => {
        const {getByLabelText, container} = render(<CheckOutPage/>)

        await act(async () => {
            const lastnameInput = getByLabelText("Keresztnév *")
            fireEvent.change(lastnameInput, {target: {value: "At"}})
            fireEvent.blur(lastnameInput)
        })

        expect(container.innerHTML).toMatch("A keresztnévnek legalább 3 karakterből kell állnia.")
})
})

describe("Hibás lakcím", () => {
    it('Ki írja ha hibás a lakcím', async () => {
        const {getByLabelText, container} = render(<CheckOutPage/>)

        await act(async () => {
            const addressInput = getByLabelText("Lakcím *")
            fireEvent.change(addressInput, {target: {value: "Níregháza teszt u, 7"}})
            fireEvent.blur(addressInput)
        })

        expect(container.innerHTML).toMatch("A lakcímnek érvényesnek kell lennie.")
})
})

describe("Hibás kártya szám", () => {
    it('Ki írja ha hibás a kártya szám', async () => {
        const {getByLabelText, container} = render(<CheckOutPage/>)

        await act(async () => {
            const cardnumberInput = getByLabelText("Kártya szám *")
            fireEvent.change(cardnumberInput, {target: {value: "145-18573-748952-885496"}})
            fireEvent.blur(cardnumberInput)
        })

        expect(container.innerHTML).toMatch("A kártya számnak érvényesnek kell lennie")
})
})
})
