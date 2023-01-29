import 'package:flutter/material.dart';
import 'package:pizza_app/models/Ordered_pizza.dart';
import 'package:flutter_svg/svg.dart';

import '../../../models/Cart.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final _cart = Cart.instance;

  void _removeFromCart(OrderedPizza orderedPizza) {
    setState(() {
      _cart.removeFromCart(orderedPizza);
    });
  }

  void _order() async {
    if (_cart.pizzas.isEmpty) return;
    await _cart.order();
    // setState(() {
    // });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your cart'),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: SvgPicture.asset("assets/icons/back.svg"),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      // Consumer + a ChangeNotifier (cart) will ensure that
      // That this portion of the tree rebuilds when Cart.notifyListeners() is called.
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: _cart.pizzas.length,
              itemBuilder: (BuildContext context, int index) {
                final item = _cart.pizzas[index];
                return ListTile(
                  title: Text(item.product.title),
                  subtitle: Text('cost: ${item.product.price.toString()}'),
                  trailing: const Text('tap to remove from cart'),
                  onTap: () => _removeFromCart(item),
                );
              },
            ),
          ),
          const Divider(),
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              // remember, context.select allows you to
              // listen to specific properties, and ignore the rest of a class
              'TOTAL: ${_cart.total}',
              style: Theme.of(context).textTheme.headline3,
            ),
          ),
          SizedBox(
            height: 40.0,
            child: Material(
              borderRadius: BorderRadius.circular(20.0),
              shadowColor: Colors.greenAccent,
              color: Colors.green,
              elevation: 7.0,
              child: GestureDetector(
                onTap: _order,
                child: const Center(
                  child: Text(
                    'Order',
                    style: TextStyle(
                        fontSize: 15.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
