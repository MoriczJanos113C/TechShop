import React from 'react'
import EditUser from '../pages/EditUser'
import {render, fireEvent, getByText, getByLabelText} from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe("EditUser", () => {
    describe("Valid inputs", () => {
        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const {getByLabelText, getByRole} = render(<EditUser onSubmit={mockOnSubmit}/>)

            await act(async () => {

            
            fireEvent.change(getByLabelText("Felhasználónév *"), {target: {value: "TesztiKöl"}})
            fireEvent.change(getByLabelText("Jelszó *"), {target: {value: "123456789"}})
            fireEvent.change(getByLabelText("Email *"), {target: {value: "teszt@teszt.com"}})
            fireEvent.change(getByLabelText("Jogosúltság *"), {target: {value: "admin"}})
        })
        await act(async () => {
            fireEvent.click(getByRole("button"))
        })

        expect(mockOnSubmit).toHaveBeencalled()
    })
})
})