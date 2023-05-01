import busModel from "../models/busModel.js";
import routeModel from "../models/routeModel.js";
import userModel from "../models/userModel.js";

const countTicketsForVehicle = (tickets, vehicle) => {
  return tickets.filter((ticket) => ticket.vehicle === vehicle).length;
};

export const sellTicket = async (req, res) => {
  try {
    const decoded = req.user;
    const { route_name, route_bus, seats_number } = req.body;
    const users = await userModel.findOne({ mail: decoded.mail });
    const route = await routeModel.findOne({
      route_name: route_name,
      route_bus: route_bus,
    });

    if (!route) {
      return res.status(404).json({ message: "Sefer bulunamadı" });
    }

    const bus = await busModel.findOne({ bus_plate: route_bus });
    const currentVehicleTicketCount = countTicketsForVehicle(
      users.tickets,
      route_bus
    );

    if (currentVehicleTicketCount + seats_number.length > 5) {
      return res
        .status(400)
        .json({ message: "Aynı araçtan en fazla 5 bilet alabilirsiniz." });
    }

    let errorMessage = "";
    let validSeats = [];

    for (const number of seats_number) {
      if (bus.bus_full_seats.has(number)) {
        errorMessage = `Koltuk ${number} dolu.`;
        break;
      } else if (number < 1 || number > 16) {
        errorMessage = `Koltuk numarası ${number} geçersiz. Koltuk numarası 1 ila 16 arasında olmalıdır.`;
        break;
      } else {
        let prewNumber = parseInt(number) - 1;
        let nextNumber = parseInt(number) + 1;
        let prewSeats = bus.bus_full_seats.get(prewNumber.toString());
        let nextSeats = bus.bus_full_seats.get(nextNumber.toString());

        if (
          (prewSeats === undefined || prewSeats === users.gender) &&
          (nextSeats === undefined || nextSeats === users.gender)
        ) {
          validSeats.push(number);
        } else {
          errorMessage = "Tüm koltuklar uygun değil. İşlem yapılamaz.";
          break;
        }
      }
    }

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    validSeats.forEach((seat) => {
      users.tickets.push({
        route: route.route_name,
        vehicle: route.route_bus,
        time: route.route_time,
        seat_number: seat,
      });
    });

    validSeats.forEach((seat) => {
      bus.bus_full_seats.set(seat.toString(), users.gender);
    });

    await users.save();
    await bus.save();

    return res.status(200).json({ message: "Bilet satışı başarılı.", tickets:users.tickets });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Bilet satışı sırasında bir hata oluştu.", error });
  }
};
