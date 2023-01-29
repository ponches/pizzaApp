import 'dart:convert';
import 'dart:io';
import 'dart:ui';

import 'package:http/http.dart' as http;
import '../models/Order.dart';
import '../models/Ordered_pizza.dart';
import '../models/Product.dart';
import 'auth_repository.dart';

class PizzaRepository {
  static PizzaRepository? _instance;
  static PizzaRepository get instance {
    _instance ??= PizzaRepository();
    return _instance!;
  }

  final _authRepo = AuthRepository.instance;

  List<Product> _pizzas = [];

  Future<List<Product>> getPizzas() async {
    if (_pizzas.isNotEmpty) return _pizzas;
    final recievedPizzas = await _sendGetAllPizzasRequest();
    _pizzas = recievedPizzas;
    return recievedPizzas;
  }

  Future<Order> orderPizzas(List<OrderedPizza> orderedPizzas) {
    return _sendOrderPizzasRequest(orderedPizzas);
  }

  Future<List<Product>> _sendGetAllPizzasRequest() async {
    String accesToken = _authRepo.tokens!.accessToken;
    var uri = Uri.http('localhost:3000', '/pizza');
    var response = await http.get(uri,
        headers: {HttpHeaders.authorizationHeader: 'Bearer $accesToken'});
    final List<dynamic> json = jsonDecode(response.body);
    return List<Product>.from(json.map((pizzaJson) => Product(
          id: pizzaJson['id'],
          title: pizzaJson['name'],
          size: pizzaJson['size'],
          price: pizzaJson['price'],
          description: '',
          image: pizzaJson['imageUrl'],
          color: const Color(0xFFE6B398),
        )));
  }

  Future<Order> _sendOrderPizzasRequest(
      List<OrderedPizza> orderedPizzas) async {
    String accesToken = _authRepo.tokens!.accessToken;
    var uri = Uri.http('localhost:3000', '/pizza/order');
    var body =
        List<Map<String, dynamic>>.from(orderedPizzas.map((op) => op.toJson));
    var encodedBody = jsonEncode(body);
    print(encodedBody);
    var response = await http.post(
      uri,
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer $accesToken',
        HttpHeaders.contentTypeHeader: 'application/json'
      },
      body: jsonEncode(body),
    );
    final Map<String, dynamic> json = jsonDecode(response.body);
    return Order.fromJson(json);
  }
}
