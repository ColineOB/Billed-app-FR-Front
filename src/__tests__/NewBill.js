/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("I cannot send an empty new bill", () => {
      $.fn.modal = jest.fn()
      document.body.innerHTML = NewBillUI()
      const formNewBill = screen.getAllByTestId('form-new-bill')
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const testingNewBills = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: null,
      })
      
      const handleSubmit = jest.fn(
        testingNewBills.handleSubmit()
      );
      formNewBill.addEventListener("submit", handleSubmit);
      userEvent.click(formNewBill)
      console.log(formNewBill);
    })
  })
})
