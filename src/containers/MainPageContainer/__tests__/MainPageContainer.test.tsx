import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react"
import { MainPageContainer } from '..';
import { sendAnalytics } from '../../../utils/sendAnalytics';
import { getCurrentTime } from '../../../utils/getCurrentTime';

jest.mock('../../../utils/getCurrentTime');
jest.mock('../../../utils/sendAnalytics');

describe('MainPageContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Проверяем, что компонент рендерится', async () => {
    render(<MainPageContainer />)
  })

  it('Проверяем, что состояние кнопки меняется при вводе корректного названия', async () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('CreateButton')).toBeDisabled();

    await fireEvent.change(getByTestId('NameInput'), { target: { value: 'супер пицца' }})
    
    expect(getByTestId('CreateButton')).not.toBeDisabled();
  })

  it('Проверяем, что аналитика получается верные данные', async () => {
    (getCurrentTime as jest.Mock).mockReturnValue(111);
    const { getByTestId } = renderComponent();

    await fireEvent.input(getByTestId('NameInput'), { target: { value: 'супер пицца' }})
    await fireEvent.click(getByTestId('CreateButton'));

    expect(sendAnalytics).toBeCalledWith({
      page: "Main",
      type: 'desktop',
      pizza: {
        dough: 'толстое',
        id: expect.anything(),
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