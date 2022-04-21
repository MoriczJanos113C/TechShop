import React from 'react'
import RegisterPage from '../pages/RegisterPage'
import {render, fireEvent, getByText, getByLabelText} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ShoppingCartContext, UserContext } from '../App'
import { AppRouter } from '../AppRouter'
/*
test('rednders form properly', () => {
    const {getByTestId, getByLabelText} = render(<RegisterPage/>);

    const emailLabel = getByText(/Email:/i)

    const usernameLabel = getByText(/Username:/i)
    
    const passwordLabel = getByText(/Password:/i)

    expect(emailLabel).toBeInDocument()
    expect(usernameLabel).toBeInDocument()
    expect(passwordLabel).toBeInDocument()

    const emailInput = getByLabelText(/Email:/i);
    expect(emailInput).toHaveAttribute('type', 'text');

    const userrnameInput = getByLabelText(/Username:/i);
    expect(userrnameInput).toHaveAttribute('type', 'text');

    const passwordInput = getByLabelText(/Pawwsord:/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
})
*/

describe("RegisterPage", () => {
    describe("Valid inputs", () => {
        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const providerTestUser = []
            const providerTestCart = []
            const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < RegisterPage onSubmit = { mockOnSubmit }
                /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

            await act(async () => {

            
            fireEvent.change(getByLableText("Email *"), {target: {value: "eamil@test.com"}})
            fireEvent.change(getByLableText("Felhasználónév *"), {target: {value: "TesztElek"}})
            fireEvent.change(getByLableText("Jelszó *"), {target: {value: "1234567"}})
        })
        await act(async () => {
            fireEvent.click(getByRole("button"))
        })

        expect(mockOnSubmit).toHaveBeencalled()
    })
})
    describe("Invalid email", () => {
        it('renders the email validation error', async () => {
            const mockOnSubmit = jest.fn()
            const providerTestUser = []
            const providerTestCart = []
            const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < RegisterPage onSubmit = { mockOnSubmit }
                /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

            await act(async () => {
                const emailInput = getByLabelText("Email *")
                fireEvent.change(emailInput, {target: {value: "invalid email"}})
                fireEvent.blur(emailInput)
            })

            expect(container.innerHTML).toMatch("Enter a valid email")
        })
        
    })

    describe("Invalid username", () => {
        it('renders the username validation error', async () => {
            const mockOnSubmit = jest.fn()
            const providerTestUser = []
            const providerTestCart = []
            const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < RegisterPage onSubmit = { mockOnSubmit }
                /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

            await act(async () => {
                const usernameInput = getByLabelText("Felhasználónév *")
                fireEvent.change(usernameInput, {target: {value: "asd"}})
                fireEvent.blur(usernameInput)
            })

            expect(container.innerHTML).toMatch("A felhasználónévnek többnek kell lennie mint 5 karakter")
    })
})

    describe("Invalid password", () => {
        it('renders the password validation error', async () => {
            const mockOnSubmit = jest.fn()
            const providerTestUser = []
            const providerTestCart = []
            const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < RegisterPage onSubmit = { mockOnSubmit }
                /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

            await act(async () => {
                const passwordInput = getByLabelText("Jelszó *")
                fireEvent.change(passwordInput, {target: {value: "123"}})
                fireEvent.blur(passwordInput)
            })

            expect(container.innerHTML).toMatch("A jelszónak többnek kell lennie mint 5 karakter")
    })
})
})