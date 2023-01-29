import 'package:flutter/material.dart';

class Product {
  final String image, title, description, id, size;
  final double price;
  final Color color;

  Product({
    required this.id,
    required this.image,
    required this.title,
    required this.price,
    required this.description,
    required this.size,
    required this.color,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
        id: json['id'],
        image: '123',
        title: json['name'],
        price: json['price'],
        description: '',
        size: json['size'],
        color: const Color(0xFFE6B398));
  }
}

List<Product> products = [
  Product(
      id: '1',
      title: "Amore",
      price: 20,
      size: '30',
      description: dummyText,
      image: "assets/images/pizza_1.png",
      color: Color(0xFF3D82AE)),
  Product(
      id: '2',
      title: "Bellissima",
      price: 22,
      size: '30',
      description: dummyText,
      image: "assets/images/pizza_2.png",
      color: Color(0xFFD3A984)),
  Product(
      id: '3',
      title: "Primavera",
      price: 23,
      size: '30',
      description: dummyText,
      image: "assets/images/pizza_3.png",
      color: Color(0xFF989493)),
  Product(
      id: '4',
      title: "Fresca",
      price: 19,
      size: '30',
      description: dummyText,
      image: "assets/images/pizza_4.png",
      color: Color(0xFFE6B398)),
  Product(
      id: '5',
      title: "Especiale",
      price: 25,
      size: '30',
      description: dummyText,
      image: "assets/images/pizza_5.png",
      color: Color(0xFFFB7883)),
];

String dummyText =
    "Delicious Italian pizza on thin crust with authentic mozarella cheese, baked in a wood oven with Love and Care";
