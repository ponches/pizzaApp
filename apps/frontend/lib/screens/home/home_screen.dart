import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:pizza_app/constants.dart';
import 'package:pizza_app/screens/home/components/body.dart';

import '../cart/components/cart_screen.dart';


class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(context),
      body: Body(),
    );
  }

  AppBar buildAppBar(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      leading: IconButton(
        icon: SvgPicture.asset("assets/icons/back.svg"),
        onPressed: () {},
      ),
      actions: [
        IconButton(
          icon: SvgPicture.asset(
            "assets/icons/search.svg",
            // By default our  icon color is white
            color: kTextColor,
          ),
          onPressed: () {},
        ),
        IconButton(
          icon: SvgPicture.asset(
            "assets/icons/cart.svg",
            // By default our  icon color is white
            color: kTextColor,
          ),
          onPressed: () => Navigator.push(
          context, MaterialPageRoute(builder: (context) => const CartScreen())),
        ),
        const SizedBox(width: kDefaultPaddin / 2)
      ],
    );
  }
}
