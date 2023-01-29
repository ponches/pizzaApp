import 'package:flutter/material.dart';

import '../../../constants.dart';

class CartCounter extends StatelessWidget {
  final int quantity;
  final void Function() onQuantityUp;
  final void Function() onQuantityDown;

  const CartCounter(
      {super.key,
      required this.quantity,
      required this.onQuantityUp,
      required this.onQuantityDown});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        buildOutlineButton(
          icon: Icons.remove,
          press: () {
            if (quantity > 1) {
              onQuantityDown();
            }
          },
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin / 2),
          child: Text(
            // if our item is less  then 10 then  it shows 01 02 like that
            quantity.toString().padLeft(2, "0"),
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
        buildOutlineButton(
            icon: Icons.add,
            press: () {
              onQuantityUp();
            }),
      ],
    );
  }

  SizedBox buildOutlineButton(
      {required IconData icon, required Function press}) {
    return SizedBox(
      width: 40,
      height: 32,
      child: OutlinedButton(
        style: OutlinedButton.styleFrom(
          padding: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(13),
          ),
        ),
        onPressed: () => press(),
        child: Icon(icon),
      ),
    );
  }
}
