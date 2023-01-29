import 'Ordered_pizza.dart';

class Order {
  final String id;
  final double price;
  final List<OrderedPizza> orderedPizzas;
  final DateTime createdAt;

  Order(
      {required this.id,
      required this.price,
      required this.orderedPizzas,
      required this.createdAt});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
        id: json['id'],
        price: json['price'],
        orderedPizzas: List<OrderedPizza>.from(json['orderedPizzas'].map((opJson) => OrderedPizza.fromJson(opJson))),
        createdAt: DateTime.parse(json['createdAt']));
  }
}
