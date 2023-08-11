import '@testing-library/jest-dom';
import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { MainPageContainer } from '..';
import { sendAnalytics } from '../../../utils/sendAnalytics';
import { getCurrentTime } from '../../../utils/getCurrentTime';

jest.mock('../../../utils/getCurrentTime');
jest.mock('../../../utils/sendAnalytics');

describe('MainPageContainer', () => {
  it('Проверяем, что кнопка доступна, если пользователь ввел имя', async () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('CreateButton')).toBeDisabled();

    await userEvent.type(getByTestId('NameInput'), 'супер пицца')
    
    expect(getByTestId('CreateButton')).not.toBeDisabled();
  })

  it('Проверяем, что по нажатию на "Создать", форма очищается и появляется новый элемент', async () => {
    const { getByTestId, getByText } = renderComponent();

    await userEvent.type(getByTestId('NameInput'), 'супер пицца')
    await userEvent.click(getByTestId('CreateButton'));

    expect(getByTestId('NameInput')).toHaveValue('');
    expect(getByText('Супер пицца')).toBeInTheDocument();
  })

  it('Проверяем, что аналитика получается верные данные', async () => {
    (getCurrentTime as jest.Mock).mockReturnValue(111);
    const { getByTestId } = renderComponent();

    await userEvent.type(getByTestId('NameInput'), 'супер пицца')
    await userEvent.click(getByTestId('CreateButton'));

    expect(sendAnalytics).toBeCalledWith({
      pizza: {
        dough: 'толстое',
        id: 1,
        ingredients: [],
        name: 'супер пицца',
        size: 10,
      },
      time: 111,
    });
  })
});



const renderComponent = () => {
  return render(<MainPageContainer />);
}