import { formatName } from "../formatName"


describe('formatName', () => {
  it('возвращает текст по умолчанию, если был передан скрипт', () => {
    const result = formatName('<script>alert("хочу взломать ваш супер сервис")</script>');

    expect(result).toBe('Вкусная пицца ❤️')
  })

  it('возвращает отформатированный текст', () => {
    const result = formatName('супер пицца');

    expect(result).toBe('Супер пицца');
  })
})