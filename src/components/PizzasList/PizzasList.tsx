import { IPizza } from '../../types/pizza';
import { ListItem } from '../ListItem';
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
        {pizzasList.map((pizza) => <ListItem key={pizza.id} pizza={pizza} />)}
      </tbody>
    </table>
  )
};
