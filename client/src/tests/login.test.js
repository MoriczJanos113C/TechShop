import React from 'react'
import LoginPage from '../pages/LoginPage'
import { render, fireEvent, getByText, getByLabelText } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { AppRouter } from '../AppRouter'
import { ShoppingCartContext, UserContext } from '../App'

/*describe("LoginPage", () => {
            describe("Valid inputs", () => {
                it('calls the onSubmit function', async() => {
                    const mockOnSubmit = jest.fn()
                    const providerTestUser = []
                    const providerTestCart = []
                    const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < LoginPage onSubmit = { mockOnSubmit }
                        /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

                    await act(async() => {


                        fireEvent.change(getByLabelText("Felhasználónév *"), { target: { value: "TesztElek" } })
                        fireEvent.change(getByLabelText("Jelszó *"), { target: { value: "1234567" } })
                    })
                    await act(async() => {
                        fireEvent.click(getByRole("button"))
                    })

                    expect(mockOnSubmit).toHaveBeencalled()
                })
            })
            describe("Invalid username", () => {
                    it('renders the username validation error', async() => {
                        const mockOnSubmit = jest.fn()
                        const providerTestUser = []
                        const providerTestCart = []
                        const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < LoginPage onSubmit = { mockOnSubmit }
                            /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

                                await act(async() => {
                                    const usernameInput = getByLabelText("Felhasználónév *")
                                    fireEvent.change(usernameInput, { target: { value: "asd" } })
                                    fireEvent.blur(usernameInput)
                                })

                                expect(container.innerHTML).toMatch("Hibás felhasználónév")
                            })
                    })

                describe("Invalid password", () => {
                    it('renders the password validation error', async() => {
                        const mockOnSubmit = jest.fn()
                        const providerTestUser = []
                        const providerTestCart = []
                        const { getByLabelText, getByRole } = render( < UserContext.Provider value = { providerTestUser } >< ShoppingCartContext.Provider value = { providerTestCart } >< AppRouter > < LoginPage onSubmit = { mockOnSubmit }
                            /></AppRouter ></ShoppingCartContext.Provider ></UserContext.Provider> )

                        await act(async() => {
                            const passwordInput = getByLabelText("Jelszó *")
                            fireEvent.change(passwordInput, { target: { value: "123" } })
                            fireEvent.blur(passwordInput)
                        })

                        expect(container.innerHTML).toMatch("Hibás jelszó")
                    })
                })
            })*/

