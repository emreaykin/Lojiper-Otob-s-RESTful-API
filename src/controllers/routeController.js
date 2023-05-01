import busModel from "../models/busModel.js";
import routeModel from "../models/routeModel.js";

export const createRoute = async (req, res) => {
  try {
    const { route_name, route_time, route_bus } = req.body;

    const route = await routeModel.create({
      route_name: route_name.toLowerCase(),
      route_time: route_time,
      route_bus: route_bus,
    });

    return res.status(200).json({ message: "Sefer eklendi", route });
  } catch (error) {
    return res.status(500).json({ message: "Sefer eklenirken hata oluştu", error });
  }
};

export const getRouteList = async (req, res) => {
  try {
    const { city } = req.body;

    const routes = await routeModel.find({
      route_name: { $regex: new RegExp(city, "i") },
    });
    console.log(routes);
    if (routes.length == 0) {
      return res.status(404).json({ message: `${city} için sefer bulunamadı.` });
    }

    return res.status(200).json({ message: "Seferler", routes });
  } catch (error) {
    return res.status(500).json({ message: "Hata oluştu", error });
  }
};

export const getRouteDetail = async (req, res) => {
  try {
    const { route_name, route_bus } = req.body;

    const route = await routeModel.findOne({
      route_name: route_name,
      route_bus: route_bus,
    });
    if (!route) {
      return res.status(404).json({ message: "Sefer bulunamadı" });
    }
    const bus = await busModel.findOne({ bus_plate: route_bus });
    if (!bus) {
      return res.status(404).json({ message: "Araç bulunamadı" });
    }

    const totalSeats = bus.bus_seats;
    const fullSeats = [...bus.bus_full_seats.keys()].map(Number);
    const emptySeats = Array.from(
      { length: totalSeats },
      (_, i) => i + 1
    ).filter((seatNumber) => !fullSeats.includes(seatNumber));

    return res.status(200).json({
      message: "Sefer Detayları",
      route: route,
      empty_seats: emptySeats.map((seatNumber) => seatNumber.toString()),
    });
  } catch (error) {
    return res.status(500).json({ message: "Hata oluştu", error });
  }
};
