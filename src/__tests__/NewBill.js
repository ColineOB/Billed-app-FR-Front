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
    test("handleSubmit have be called", async () => {
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
    test("I cannot send an empty new bill", async () => {
      document.body.innerHTML = NewBillUI();

      const nameExpense = screen.getByTestId("expense-name");
      expect(nameExpense.value).toBe("");

      const date = screen.getByTestId("datepicker");
      expect(date.value).toBe("");

      const amount = screen.getByTestId("amount");
      expect(amount.value).toBe("");
      
      const vat = screen.getByTestId("vat");
      expect(vat.value).toBe("");

      const pct = screen.getByTestId("pct");
      expect(pct.value).toBe("");

      const commentary = screen.getByTestId("commentary");
      expect(commentary.value).toBe("");
      
      const file = screen.getByTestId("file");
      expect(file.value).toBe("");

      const formNewBill = screen.getByTestId('form-new-bill');
      const handleSubmit = jest.fn((e) => e.preventDefault());

      formNewBill.addEventListener("submit", handleSubmit);
      fireEvent.submit(formNewBill);

      expect(screen.getByTestId('form-new-bill')).toBeTruthy();
    });

    test("I can send a completed invoice", async () => {
      document.body.innerHTML = NewBillUI();
      const inputData = {
        "name": "encore",
        "date": "2004-04-04",
        "amount": "400",
        "vat": "80",
        "pct": "20",
        "commentary": "séminaire billed",
        "id": "47qAXb6fIm2zOKkLzMro",
        "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        "type": "Hôtel et logement",
        "fileName": "preview-facture-free-201801-pdf-1.jpg",
        "date": "2004-04-04",
        "email": "a@a",
      };
      
      const nameExpense = screen.getByTestId("expense-name");
      fireEvent.change(nameExpense, { target: { value: inputData.name } });
      expect(nameExpense.value).toBe(inputData.name);
      
      const date = screen.getByTestId("datepicker");
      fireEvent.change(date, { target: { value: inputData.date } });
      expect(date.value).toBe(inputData.date);
      
      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: inputData.amount } });
      expect(amount.value).toBe(inputData.amount);

      const vat = screen.getByTestId("vat");
      fireEvent.change(vat, { target: { value: inputData.vat } });
      expect(vat.value).toBe(inputData.vat);
      
      const pct = screen.getByTestId("pct");
      fireEvent.change(pct, { target: { value: inputData.pct } });
      expect(pct.value).toBe(inputData.pct);
      
      const commentary = screen.getByTestId("commentary");
      fireEvent.change(commentary, { target: { value: inputData.commentary } });
      expect(commentary.value).toBe(inputData.commentary);

      const formNewBill = screen.getByTestId('form-new-bill');

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      const user = JSON.stringify({
        type: 'Employee'
      })

      const handleSubmit = jest.fn((e) => e.preventDefault());
      formNewBill.addEventListener("submit", handleSubmit);
      fireEvent.submit(formNewBill);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
