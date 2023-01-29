import 'dart:convert';

import '../models/Tokens.dart';
import 'package:http/http.dart' as http;

class AuthRepository {
  static AuthRepository? _instance;
  static AuthRepository get instance {
    _instance ??= AuthRepository();
    return _instance!;
  }

  bool isLoggedIn = false;
  Tokens? tokens;

  Future<Tokens> logIn(String email, String password) async {
    final recievedTokens = await _sendLogInRequest(email, password);
    tokens = recievedTokens;

    return recievedTokens;
  }

  Future<Tokens> signUp(String email, String password) async {
    final recievedTokens = await _sendSignUpRequest(email, password);
    tokens = recievedTokens;

    return recievedTokens;
  }

  Future<Tokens> _sendLogInRequest(String email, String password) async {
    var uri = Uri.http('localhost:3000', '/auth/login');
    var response =
        await http.post(uri, body: {'email': email, 'password': password});
    final Map<String, dynamic> json = jsonDecode(response.body);
    return Tokens.fromJson(json);
  }

  Future<Tokens> _sendSignUpRequest(String email, String password) async {
    var uri = Uri.http('localhost:3000', '/auth/signup');
    var response =
        await http.post(uri, body: {'email': email, 'password': password});
    final Map<String, dynamic> json = jsonDecode(response.body);
    return Tokens.fromJson(json);
  }
}
