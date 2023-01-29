import 'Product.dart';

class OrderedPizza {
  Product product;
  int quantity;

  OrderedPizza({required this.product, required this.quantity});

  factory OrderedPizza.fromJson(Map<String, dynamic> json) {
    return OrderedPizza(
        product: Product.fromJson(json['pizza']), quantity: json['quantity']);
  }

  Map<String, dynamic> get toJson {
    return {
      'pizzaId': product.id,
      'quantity': quantity,
    };
  }
}
