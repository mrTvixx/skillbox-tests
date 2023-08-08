import { IPizza } from '../../types/pizza';
import './styles.css';

interface IProps {
  pizzasList: IPizza[];
}

export const PizzasList = ({ pizzasList }: IProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Размер</th>
          <th>Калорийность</th>
          <th>Ингредиенты</th>
        </tr>
      </thead>
      <tbody>
        {pizzasList.map((pizza) => (
          <tr key={pizza.id} className="list">
            <td>
              {pizza.name}
            </td>
            <td>
              {pizza.size}
            </td>
            <td>
              {pizza.ingredients.reduce((acc, item) => acc + item.kcal, 0)}
            </td>
            <td>
              <ul>
                {pizza.ingredients.map((item) => (
                  <li key={item.id}>{`${item.name} (ккал ${item.kcal})`}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};
