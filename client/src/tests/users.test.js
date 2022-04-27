import React from "react";
import UsersPage from "../pages/UsersPage";
import {
    render,
    fireEvent,
    getByText,
    getByLabelText,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ShoppingCartContext, UserContext } from "../App";
import { AppRouter } from "../AppRouter";
describe("UsersPage", () => {
    describe("Valid inputs", () => {
        it("calls the onSubmit function", async () => {
            const mockOnSubmit = jest.fn();
            const providerTestUser = [];
            const providerTestCart = [];
            const { getByLabelText, getByRole } = render(
                <UserContext.Provider value={providerTestUser}>
                    <ShoppingCartContext.Provider value={providerTestCart}>
                        <AppRouter>
                            {" "}
                            <UsersPage onSubmit={mockOnSubmit} />
                        </AppRouter>
                    </ShoppingCartContext.Provider>
                </UserContext.Provider>
            );

            await act(async () => {
                fireEvent.change(getByLabelText("Felhasználók keresése *"), {
                    target: { value: "normal" },
                });
            });
            await act(async () => {
                fireEvent.click(getByRole("button"));
            });

            expect(mockOnSubmit).toHaveBeencalled();
        });
    });
});
