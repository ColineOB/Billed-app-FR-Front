/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, render} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes";
import { localStorageMock } from "../__mocks__/localStorage.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("I cannot send an empty new bill", async () => {
      // const mockFunction = jest.fn();
      document.body.innerHTML = NewBillUI();
      const formNewBill = screen.getByTestId('form-new-bill');
      // const onNavigate = (pathname) => {
      //   document.body.innerHTML = ROUTES({ pathname })
      // }
      
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Admin'
      }))

      // const testingNewBills = new NewBill({
      //   document,
      //   onNavigate,
      //   store: null,
      //   localStorage: window.localStorage,
      // });

      const handleSubmit = jest.fn((e) => e.preventDefault());
      formNewBill.addEventListener("submit", handleSubmit);
      fireEvent.submit(formNewBill);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
