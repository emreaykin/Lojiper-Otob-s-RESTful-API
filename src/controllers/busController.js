import busModel from "../models/busModel.js";

export const busCreate = async (req, res) => {
  const { bus_plate, bus_seats, bus_full_seats } = req.body;

  const exist = await busModel.findOne({
    bus_plate: bus_plate,
  });
  console.log(exist);
  if (exist) {
    return res.status(500).json({ message: "Araç kayıtlı" });
  }

  const bus = await busModel.create({
    bus_plate: bus_plate,
    bus_seats: bus_seats,
    bus_full_seats: [],
  });

  return res.status(200).json({ message: "Araç kaydedildi", bus });
};

export const busList = async (req, res) => {
  const bus = await busModel.find();
  return res.status(200).json({ bus });
};
export const getBus = async (req, res) => {
  const { bus_plate } = req.body;

  const exist = await busModel.findOne({ bus_plate: bus_plate });
  if (!exist) {
    return res.status(500).json({ message: "Araç bulunamadı" });
  }

  return res.status(200).json(exist)
};
