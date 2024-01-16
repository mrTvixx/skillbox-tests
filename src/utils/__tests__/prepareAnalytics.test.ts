import { getCurrentTime } from "../getCurrentTime";
import { prepareAnalytics } from "../prepareAnalytics";

jest.mock("../getCurrentTime");

describe('prepareAnalytics', () => {
  it('Возвращает false, если пустая строка', () => {
    (getCurrentTime as jest.Mock).mockReturnValue(111);

    const result = prepareAnalytics({
      id: 1,
      name: 'pizza',
      dough: 'толстое',
      ingredients: [],
      size: 15,
    });
    
    expect(result).toEqual({
      page: 'Main',
      type: 'desktop',
      time: 111,
      pizza: {
        id: 1,
        name: 'pizza',
        dough: 'толстое',
        ingredients: [],
        size: 15,
      }
    });
  });
})