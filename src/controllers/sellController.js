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
    let user = users;
    let gender = users.gender;
    let bus_full_seats = bus.bus_full_seats;
    let validSeats = []; // Uygun koltukları saklamak için bir dizi oluşturun

    if (currentVehicleTicketCount + seats_number.length > 5) {
      return res
        .status(400)
        .json({ message: "Aynı araçtan en fazla 5 bilet alabilirsiniz." });
    } else {
      seats_number.map((number) => {
        if (bus_full_seats.has(number)) {
          return res.status(400).json({ message: `Koltuk ${number} dolu.` });
        } else {
          seats_number.forEach((number) => {
            if (number < 1 || number > 16) {
              return res.status(400).json({
                message: `Koltuk numarası ${number} geçersiz. Koltuk numarası 1 ila 16 arasında olmalıdır.`,
              });
            } else {
              let prewNumber = parseInt(number) - 1;
              let nextNumber = parseInt(number) + 1;
              let prewSeats = bus_full_seats.get(prewNumber.toString());
              let nextSeats = bus_full_seats.get(nextNumber.toString());

              if (
                (prewSeats === undefined || prewSeats === gender) &&
                (nextSeats === undefined || nextSeats === gender)
              ) {
                validSeats.push(number); // Uygun koltukları validSeats dizisine ekleyin
              }
            }
          });
        }
      });

      if (validSeats.length === seats_number.length) {
        validSeats.forEach((seat) => {
          user.tickets.push({
            route: route.route_name,
            vehicle: route.route_bus,
            time: route.route_time,
            seat_number: seat,
          });
        });

        // Dolu koltukları busModel'de güncelle
        validSeats.forEach((seat) => {
          bus_full_seats.set(seat.toString(), gender);
        });

        // Kullanıcı ve otobüs modellerini güncelle
        await users.save();
        await bus.save();

        return res.status(200).json({ message: "Bilet satışı başarılı." });
      } else {
        return res
          .status(400)
          .json({ message: "Tüm koltuklar uygun değil. İşlem yapılamaz." });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Bilet satışı sırasında bir hata oluştu.", error });
  }
};
