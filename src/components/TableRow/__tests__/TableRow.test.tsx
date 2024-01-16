import { render } from '@testing-library/react';
import { TableRow } from '../TableRow';
import { IPizza } from '../../../types/pizza';

describe('Тест компонента TableRow', () => {
  test('Проверка корректного рендеринга элемента списка', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  })

  it('Корретно рендерит имя по умолчанию, если в объкте пиццы нет имени', () => {
    const { getByText } = renderComponent({ pizza: {
      ...defaultProps.pizza,
      name: undefined,
    }});
    
    // привести пример с findByText, рассказать про асинхронный поиск
    const defaultName = getByText('Вкусная пицца ❤️');

    expect(defaultName).toBeTruthy();
  })

  it('Проверка корректного подсчета общей калорийности', () => {
    const { getByTestId } = renderComponent();
    
    const totalKcalValue = getByTestId('TotalKcal');

    expect(totalKcalValue.textContent).toBe("850");
  })
})

const defaultProps = {
  onPizzaDelete: () => {},
  pizza: {
    id: 1,
    name: 'Вкусная пицца',
    dough: 'тонкое',
    size: 15,
    ingredients: [
      {
        id: 2,
        name: 'бекон',
        kcal: 350,
      },
      { 
        id: 3,
        name: 'сыр',
        kcal: 500,
      }
    ]
  } as IPizza,
};

const renderComponent = (props = {}) => {
  return render(
    <table>
      <tbody>
        <TableRow {...defaultProps} {...props} />
      </tbody>
    </table>)
}