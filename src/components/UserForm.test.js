import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // 1. Render the component

  render(<UserForm />);

  // 2. Manipulate the component or find an element in it

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // 3. Assertion - make sure the component is doing what we expected it to do

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  const mock = jest.fn();
  // Try to render my component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // Simulate typing in a name
  user.click(nameInput); // simulates clicking on the provided element = nameInput
  user.keyboard("johanna"); // simulates typing 'johanna'
  // user.keyboard('{Enter}'); //simulates pressing the Enter key

  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard("johanna@gmail.com");

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({name: 'johanna', email: 'johanna@gmail.com'})
});
