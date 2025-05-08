import "./database";
import Customer from "./app/models/Customer";

class Playground {
  static async play() {
    const customer = await Customer.create({
      name: "SupermercadoZaZa",
      email: "contatoZaza@gmail.com",
    });

    console.log(JSON.stringify(customer, null, 2));
  }
}
Playground.play();
