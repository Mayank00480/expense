import { screen , render } from "@testing-library/react";
import Home from "./component/Home/Home";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword";
import ExpenseForm from "./component/expenseForm/ExpenseForm";
test("First Test Case" , () => {
    render(<ExpenseForm/>);
    const element = screen.getByText(/Expense Item/i)
    expect(element).toBeInTheDocument();
})
test("Second Test Case" , () => {
    render(<ExpenseForm/>);
    const element = screen.getByText(/Expense Description/i)
    expect(element).toBeInTheDocument();
})
test("Third Test Case" , () => {
    render(<ExpenseForm/>);
    const element = screen.getByText(/Expense Price/i)
    expect(element).toBeInTheDocument();
})