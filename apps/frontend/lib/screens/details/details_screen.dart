import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:pizza_app/constants.dart';
import 'package:pizza_app/models/Product.dart';
import 'package:pizza_app/screens/details/components/body.dart';

import '../../models/Cart.dart';
import '../cart/components/cart_screen.dart';

class DetailsScreen extends StatefulWidget {
  final Product product;

  const DetailsScreen({Key? key, required this.product}) : super(key: key);

  @override
  State<DetailsScreen> createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  final Cart cart = Cart.instance;
  int quantity = 1;
  void onQuantityUp() {
    setState(() {
      quantity++;
    });
  }

  void onQuantityDown() {
    if (quantity == 1) return;
    setState(() {
      quantity--;
    });
  }

  void onAddToCart() {
    cart.addToCart(widget.product, quantity);
    print('TOTAL');
    print(cart.total);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // each product have a color
      backgroundColor: widget.product.color,
      appBar: buildAppBar(context),
      body: Body(
        product: widget.product,
        quantity: quantity,
        onQuantityUp: onQuantityUp,
        onQuantityDown: onQuantityDown,
        onAddToCart: onAddToCart,
      ),
    );
  }

  AppBar buildAppBar(BuildContext context) {
    return AppBar(
      backgroundColor: widget.product.color,
      elevation: 0,
      leading: IconButton(
        icon: SvgPicture.asset(
          'assets/icons/back.svg',
          color: Colors.white,
        ),
        onPressed: () => Navigator.pop(context),
      ),
      actions: [
        IconButton(
          icon: SvgPicture.asset("assets/icons/search.svg"),
          onPressed: () {},
        ),
        IconButton(
          icon: SvgPicture.asset("assets/icons/cart.svg"),
          onPressed: () => Navigator.push(
          context, MaterialPageRoute(builder: (context) => const CartScreen())),
        ),
        const SizedBox(width: kDefaultPaddin / 2)
      ],
    );
  }
}
