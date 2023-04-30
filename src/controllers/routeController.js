import routeModel from "../models/routeModel.js";

export const createRoute = async (req, res) => {
  const { route_name, route_time, route_bus } = req.body;

  /*const exist = await routeModel.findOne({ route_name: route_name });

  if (exist) {
    return res.status(500).json({ message: "Bu rota mevcut" });
  }*/

  const route = await routeModel.create({
    route_name: route_name,
    route_time: route_time,
    route_bus: route_bus,
  });

  return res.status(200).json({ message: "Rota eklendi", route });
};

export const getRouteList = async (req, res) => {
    const { city } = req.body;
  
    const routes = await routeModel.find({ route_name: { $regex: city, $options: 'i' }});
  
    res.status(200).json({ message: "Rotalar", routes });
  };
  