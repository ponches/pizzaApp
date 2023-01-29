class OrderedPizzaDto {
  final String pizzaId;
  final int quantity;

  OrderedPizzaDto({required this.pizzaId, required this.quantity});

  Map<String, dynamic> get toJson {
    return {
      'pizzaId': pizzaId,
      'quantity': quantity,
    };
  }
}
