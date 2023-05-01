import busModel from "../models/busModel.js";

// Yeni bir otobüs kaydı oluşturur
export const busCreate = async (req, res) => {
  const { bus_plate, bus_seats, bus_full_seats } = req.body;
 // Veritabanında aynı plakaya sahip bir otobüs varsa hata kodu döndürür
  const exist = await busModel.findOne({ bus_plate: bus_plate });

  if (exist) {
    return res.status(409).json({ message: "Araç zaten kayıtlı." });
  }

  try {
    // Yeni otobüs kaydı oluşturur
    const bus = await busModel.create({
      bus_plate: bus_plate,
      bus_seats: bus_seats,
      bus_full_seats: {},
    });
   // Sonuç döndürülür.
    return res.status(201).json({ message: "Araç kaydedildi.", bus });
  } catch (error) {
    // Hata durumunda uygun hata kodu ve mesajı ile birlikte hata yanıtı döndürür
    return res.status(500).json({ message: "Araç kaydedilirken bir hata oluştu.", error });
  }
};
// Kaydedilmiş tüm otobüsleri listeler
export const busList = async (req, res) => {
  try {
    const buses = await busModel.find();
    // Başarılı ise  yanıt döndürür
    return res.status(200).json({ buses });
  } catch (error) {
    // Hata durumunda uygun hata kodu ve mesajı ile birlikte hata yanıtı döndürür
    return res.status(500).json({ message: "Araçlar getirilirken bir hata oluştu.", error });
  }
};
// İstenilen otobüsün detaylarını döndürür.
export const getBusDetail = async (req, res) => {
  const { bus_plate } = req.body;
// Plaka numarası verilmediyse hata kodu döndürür
  if (!bus_plate) {
    return res.status(400).json({ message: "Lütfen bir araç plakası girin." });
  }

  try {
    // Veritabanında istenilen otobüsün ayrıntılarını getirir
    const bus = await busModel.findOne({ bus_plate: bus_plate });
    if (!bus) {
      return res.status(404).json({ message: "Araç bulunamadı." });
    }

    // Otobüsün dolu ve boş koltuk sayılarını hesaplar ve detaylarını döndürür
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
    // Hata durumunda uygun hata kodu ve mesajı ile birlikte hata yanıtı döndürür
    return res.status(500).json({ message: "Araç getirilirken bir hata oluştu.", error });
  }
};


