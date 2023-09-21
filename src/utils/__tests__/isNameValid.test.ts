import { isNameValid } from "../isNameValid";

describe('isNameValid', () => {
  it('Возвращает false, если пустая строка', () => {
    const result = isNameValid('');
    
    expect(result).toBeFalsy();
  });

  it('возвращает false, если название меньше трех букв', () => {
    const result = isNameValid('ab');

    expect(result).toBeFalsy();
  });

  it('возвращает true, если название больше трех букв', () => {
    const result = isNameValid('пицца');

    expect(result).toBeTruthy();
  });
})