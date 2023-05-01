import routeModel from "../models/routeModel.js";

const routes = [
  {
    route_name: "İstanbul-Ankara",
    route_time: "10:00",
    route_bus: "34ADN4556",
    price: 20,
  },
  {
    route_name: "İstanbul-Ankara",
    route_time: "11:00",
    route_bus: "34DND4556",
    price: 20,
  },
  {
    route_name: "Bursa-Yalova",
    route_time: "10:00",
    route_bus: "40SDD4556",
    price: 20,
  },
  {
    route_name: "Bursa-Yalova",
    route_time: "11:00",
    route_bus: "40JFG4525",
    price: 20,
  },
  {
    route_name: "İstanbul-Ankara",
    route_time: "12:00",
    route_bus: "16TSK1345",
    price: 20,
  },
  {
    route_name: "Bursa-Yalova",
    route_time: "12:00",
    route_bus: "16BJG1995",
    price: 20,
  },
  {
    route_name: "Bursa-Yalova",
    route_time: "13:00",
    route_bus: "19ASF1995",
    price: 20,
  },
  {
    route_name: "İstanbul-Ankara",
    route_time: "13:00",
    route_bus: "19AKT4515",
    price: 20,
  },
];

export const testAddRoutes = async () => {
  try {
    await routeModel.deleteMany();

    for (let i = 0; i < routes.length; i++) {
      const route = new routeModel(routes[i]);
      await route.save();
    }

    return await routeModel.find();;
  } catch (error) {
    return false;
  }
};
