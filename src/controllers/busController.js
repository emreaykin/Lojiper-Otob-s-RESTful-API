import busModel from "../models/busModel.js";

export const busCreate = async (req, res) => {
  const { bus_plate, bus_seats, bus_full_seats } = req.body;

  const exist = await busModel.findOne({ bus_plate: bus_plate });

  if (exist) {
    return res.status(409).json({ message: "Araç zaten kayıtlı." });
  }

  try {
    const bus = await busModel.create({
      bus_plate: bus_plate,
      bus_seats: bus_seats,
      bus_full_seats: {},
    });

    return res.status(201).json({ message: "Araç kaydedildi.", bus });
  } catch (error) {
    return res.status(500).json({ message: "Araç kaydedilirken bir hata oluştu.", error });
  }
};

export const busList = async (req, res) => {
  try {
    const buses = await busModel.find();
    return res.status(200).json({ buses });
  } catch (error) {
    return res.status(500).json({ message: "Araçlar getirilirken bir hata oluştu.", error });
  }
};

export const getBusDetail = async (req, res) => {
  const { bus_plate } = req.body;

  if (!bus_plate) {
    return res.status(400).json({ message: "Lütfen bir araç plakası girin." });
  }

  try {
    const bus = await busModel.findOne({ bus_plate: bus_plate });
    if (!bus) {
      return res.status(404).json({ message: "Araç bulunamadı." });
    }

    const totalSeats = bus.bus_seats;
    const fullSeats = [...bus.bus_full_seats.keys()].map(Number);
    const emptySeats = Array.from(
      { length: totalSeats },
      (_, i) => i + 1
    ).filter((seatNumber) => !fullSeats.includes(seatNumber));

    return res.status(200).json({
      bus,
      empty_seats: emptySeats.map((seatNumber) => seatNumber.toString()),
    });
  } catch (error) {
    return res.status(500).json({ message: "Araç getirilirken bir hata oluştu.", error });
  }
};


