import '../repositories/pizza_repository.dart';
import 'Order.dart';
import 'Ordered_pizza.dart';
import 'Product.dart';

class Cart {
  static Cart? _instance;
  static Cart get instance {
    _instance ??= Cart();
    return _instance!;
  }

  List<OrderedPizza> pizzas = [];
  List<Order> orders = [];
  final PizzaRepository _pizzaRepository = PizzaRepository.instance;

  double get total {
    double sum = 0;
    pizzas.forEach((orderedPizza) {
      sum += orderedPizza.product.price * orderedPizza.quantity;
    });
    return sum;
  }

  OrderedPizza addToCart(Product product, int quantity) {
    for (int i = 0; i < pizzas.length; i++) {
      var orderedPizza = pizzas[i];
      if (orderedPizza.product.id == product.id) {
        orderedPizza.quantity += quantity;
        return orderedPizza;
      }
    }

    var newPizza = OrderedPizza(product: product, quantity: quantity);
    pizzas.add(newPizza);
    return newPizza;
  }

  void removeFromCart(OrderedPizza orderedPizza) {
    pizzas.removeWhere((op) => op.product.id == orderedPizza.product.id);
  }

  Future<Order?> order() async {
    if (pizzas.isEmpty) return null;

    Order order = await _pizzaRepository.orderPizzas(pizzas);
    orders.add(order);
    pizzas = [];
    return order;
  }
}
