import 'package:flutter/material.dart';
import 'package:pizza_app/constants.dart';
import 'package:pizza_app/models/Product.dart';
import 'package:pizza_app/screens/details/details_screen.dart';

import '../../../repositories/pizza_repository.dart';
import 'categorries.dart';
import 'item_card.dart';

class Body extends StatefulWidget {
  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final _pizzaRepo = PizzaRepository.instance;
  List<Product> pizzas = [];

  @override
  void initState() {
    super.initState();
    getPizzas();
  }

  void getPizzas() async {
    var recievedPizzas = await _pizzaRepo.getPizzas();
    setState(() {
      pizzas = recievedPizzas;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
          child: Text(
            "Pizza",
            style: Theme.of(context)
                .textTheme
                .headline5!
                .copyWith(fontWeight: FontWeight.bold),
          ),
        ),
        Categories(),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
            child: GridView.builder(
                itemCount: pizzas.length,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: kDefaultPaddin,
                  crossAxisSpacing: kDefaultPaddin,
                  childAspectRatio: 0.75,
                ),
                itemBuilder: (context, index) => ItemCard(
                      product: pizzas[index],
                      press: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => DetailsScreen(
                              product: pizzas[index],
                            ),
                          )),
                    )),
          ),
        ),
      ],
    );
  }
}
