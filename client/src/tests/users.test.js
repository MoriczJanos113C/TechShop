import React from 'react'
import UsersPage from '../pages/UsersPage'
import {render, fireEvent, getByText, getByLabelText} from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe("UsersPage", () => {
    describe("Valid inputs", () => {
        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const {getByLabelText, getByRole} = render(<UsersPage onSubmit={mockOnSubmit}/>)

            await act(async () => {

            
            fireEvent.change(getByLabelText("Felhasználók keresése *"), {target: {value: "normal"}})
          
        })
        await act(async () => {
            fireEvent.click(getByRole("button"))
        })

        expect(mockOnSubmit).toHaveBeencalled()
    })
})
})