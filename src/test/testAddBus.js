import busModel from "../models/busModel.js";
const buses = [
  {
    bus_plate: "34ADN4556",
    bus_seats: 16,
    bus_full_seats: {
      1: "Kadın",
      3: "Kadın",
      6: "Erkek",
      7: "Erkek",
    },
  },
  {
    bus_plate: "34DND4556",
    bus_seats: 16,
    bus_full_seats: {
      9: "Kadın",
      10: "Kadın",
      14: "Erkek",
      15: "Erkek",
    },
  },
  {
    bus_plate: "40SDD4556",
    bus_seats: 16,
    bus_full_seats: {
      5: "Erkek",
      8: "Kadın",
      9: "Kadın",
      12: "Erkek",
      15: "Kadın",
      17: "Erkek",
    },
  },
  {
    bus_plate: "40JFG4525",
    bus_seats: 16,
    bus_full_seats: {},
  },
  {
    bus_plate: "16TSK1345",
    bus_seats: 16,
    bus_full_seats: {},
  },
  {
    bus_plate: "16BJG1995",
    bus_seats: 16,
    bus_full_seats: {},
  },
  {
    bus_plate: "19ASF1995",
    bus_seats: 16,
    bus_full_seats: {},
  },
  {
    bus_plate: "19AKT4515",
    bus_seats: 16,
    bus_full_seats: {},
  },
];

export const testAddBus = async () => {
  try {
    await busModel.deleteMany();
    for (let i = 0; i < buses.length; i++) {
      const bus = new busModel(buses[i]);
      await bus.save();
    }

    return true;
  } catch (error) {
    return false;
  }
};
