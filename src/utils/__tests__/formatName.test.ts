import { formatName } from "../formatName"


describe('formatName', () => {
  it('возвращает текст по умолчанию, если не передано название', () => {
    const result = formatName('');

    expect(result).toBe('Вкусная пицца ❤️')
  })

  it('возвращает отформатированный текст', () => {
    const result = formatName('супер пицца');

    expect(result).toBe('Супер пицца');
  })
})