## LojiPer Back-End Test Projesi

Bu dökümantasyon, projenin nasıl kurulacağı ve çalıştırılacağı hakkında bilgi içerir.

##### Kurulum

Projenin kurulumu için aşağıdaki adımları takip ediniz:

1. Proje dosyalarını indirin veya klonlayın.

```git
git clone https://github.com/emreaykin/Lojiper-Otob-s-RESTful-API.git
```

2. İndirilen projenin klasörüne gidin.

```git
cd Lojiper-Otob-s-RESTful-API
```

3. Gerekli bağımlılıkları yükleyin.

```git
npm install
```

4. Projeyi başlatın.

```git
npm start
```

API şimdi http://localhost:5000 adresinde çalışacaktır.

##### API Endpoints

Aşağıda API'nin sunduğu endpoint'ler ve örnek kullanımları verilmiştir:
Her istek JSON formatında gönderilmelidir.

#### 1. Kullanıcı Kaydı

- Yöntem: **POST**
- URL: **/register**
- Parametreler: **name, age, gender, mail, phone, password**

**Örnek**:

```json
{
  "name": "lojiper",
  "age": 25,
  "gender": "Erkek",
  "mail": "mail@lojiper.com",
  "phone": 5059867458,
  "password": "135791"
 
}
```

**Sonuç**:

```json
{
  "message": "Kullanıcı başarıyla kaydedildi.",
  "name": "lojiper",
  "age": 25,
  "gender": "Erkek",
  "mail": "mail@lojiper.com",
  "phone": 5059867458,
  "password": "$2b$10$EVOHNPxHZoab35o1d5EWdeShBeVwMVlPn4sTl21U20Os4E2omeS4m",
  "token": "",
  "tickets": []
}
```

#### 2. Kullanıcı Girişi

- Yöntem: **POST**
- URL: **/login**
- Parametreler: **mail, password**

**Örnek** :

```json
{
  "mail": "mail@lojiper.com",
  "password": "135791"
}
```

**Sonuç**:

```json
{
  "message": "Giriş başarılı",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
}
```

> **Bilgilendirme:** Kullanıcı giriş yaptıktan sonra gelen yanıt içerisindeki token bundan sonraki bütün endpointlerde kullanılması zorunludur aksi taktirde sonuç gelmicektir.

> **Bilgilendirme:** Üretilen tokenin 15 dakika geçerlilik süresi bulunmaktadır süre bitiminde yeniden giriş yapılması gerekmektedir.

> **Bilgilendirme:** Header'da auth "token" şeklinde gönderilmesi gerekmektedir.


#### 3. Kullanıcının biletlerini görüntüleme:

- Yöntem: **/userTickets**
- URL: **/GET**
- Header : `"auth": "<user-token>"`

**Sonuç**:

```json
{
  "message": "Kullanıcının biletleri: ",
  "tickets": [
    {
      "time": "10:00",
      "route": "İstanbul-Ankara",
      "vehicle": "34ADN4556",
      "seat_number": "6",
      "_id": {
        "$oid": "644ff7dc76f5b0c7c3ddc9f9"
      }
    },
    {
      "time": "10:00",
      "route": "İstanbul-Ankara",
      "vehicle": "34ADN4556",
      "seat_number": "7",
      "_id": {
        "$oid": "644ff7dc76f5b0c7c3ddc9fa"
      }
    }
  ],
}
```



#### 4. Otobüs Ekleme

- Yöntem: **POST**
- URL: **/busCreate**
- Parametreler: **bus_plate, bus_seats, bus_full_seats**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:

```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Body**:

```json
{
  "bus_plate": "34ADN4556",
  "bus_seats": 16,
  "bus_full_seats": {}
}
```

**Sonuç**:

```json
{
  "message": "Araç kaydedildi.",
  "bus_plate": "34ADN4556",
  "bus_seats": 16,
  "bus_full_seats": {}
}
```

#### 5. Otobüs Listesi

- Yöntem: **GET**
- URL: **/busList**
- Header : `"auth": "<user-token>"`

  **Sonuç**:

```json
[
  {
    "bus_plate": "34ADN4556",
    "bus_seats": 16,
    "bus_full_seats": {}
  },
  {
    "bus_plate": "34DND4556",
    "bus_seats": 16,
    "bus_full_seats": {}
  }
]
```

#### 6. Otobüs Bilgisi

- Yöntem: **GET**
- URL: **/getBusDetail**
- Parametreler : **bus_plate**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:

```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Body**:

```json
{
  "bus_plate": "34ADN4556"
}
```

**Sonuç**:

```json
{
  "bus": {
    "_id": "644fa1cfde5b1ef3234158c7",
    "bus_plate": "34ADN4556",
    "bus_seats": 16,
    "bus_full_seats": {
      "1": "Kadın",
      "3": "Kadın",
      "6": "Erkek",
      "7": "Erkek"
    },
    "__v": 0
  },
  "empty_seats": [
    "2",
    "4",
    "5",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16"
  ]
}
```

#### 7. Rota Oluşturma

- Yöntem: **POST**
- URL: **/createRoute**
- Parametreler : **route_name, route_time,route_bus,price**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:

```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Body**:

```json
{
  "route_name": "İstanbul-Ankara",
  "route_time": "10:00",
  "route_bus": "34ABC123",
  "price": 20
}
```

**Sonuç**:

```json
{
  "message": "Sefer eklendi",
  "route_name": "İstanbul-Ankara",
  "route_time": "10:00",
  "route_bus": "34ABC123",
  "price": 20
}
```

#### 8. Rota listesi

- Yöntem: **GET**
- URL: **/getRouteList**
- Parametreler : **city**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:

```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Body**:

```json
{
  "city": "İstanbul",
}
```

**Sonuç**:

```json
{
  "message": "Seferler",
  "routes": [
    {
      "_id": "644fa1d1de5b1ef3234158d8",
      "route_name": "İstanbul-Ankara",
      "route_time": "10:00",
      "route_bus": "34ADN4556",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644fa1d1de5b1ef3234158da",
      "route_name": "İstanbul-Ankara",
      "route_time": "11:00",
      "route_bus": "34DND4556",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644fa1d1de5b1ef3234158e0",
      "route_name": "İstanbul-Ankara",
      "route_time": "12:00",
      "route_bus": "16TSK1345",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644fa1d2de5b1ef3234158e6",
      "route_name": "İstanbul-Ankara",
      "route_time": "13:00",
      "route_bus": "19AKT4515",
      "price": 20,
      "__v": 0
    }
  ]
}
```
#### 9. Rota detay

- Yöntem: **GET**
- URL: **/getRouteDetail**
- Parametreler : **route_name,route_bus,price**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:

```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Body**:

```json
{
  "route_name": "İstanbul-Ankara",
  "route_bus": "34ADN4556",

}
```

**Sonuç**:

```json
{
  "message": "Sefer Detayları",
  "route": {
    "_id": "644fa1d1de5b1ef3234158d8",
    "route_name": "İstanbul-Ankara",
    "route_time": "10:00",
    "route_bus": "34ADN4556",
    "price": 20,
    "__v": 0
  },
  "empty_seats": [
    "2",
    "4",
    "5",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16"
  ]
}
```

#### 10. Bilet Satış

- Yöntem: **POST**
- URL: **/sellTicket**
- Parametreler : **route_name, route_bus, seats_number[Array]**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:

```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Body**:

```json
{
 "route_name": "İstanbul-Ankara",
 "route_bus": "34ADN4556",
 "seats_number":["6","7"]
}
```

**Sonuç**:

```json
{
  "message": "Bilet satışı başarılı.",
  "tickets": [
    {
      "time": "10:00",
      "route": "İstanbul-Ankara",
      "vehicle": "34ADN4556",
      "seat_number": "6",
      "_id": "644ff7dc76f5b0c7c3ddc9f9"
    },
    {
      "time": "10:00",
      "route": "İstanbul-Ankara",
      "vehicle": "34ADN4556",
      "seat_number": "7",
      "_id": "644ff7dc76f5b0c7c3ddc9fa"
    }
  ]
}
```

#### 11. Test Data

- Yöntem: **POST**
- URL: **/test**
- Header : `"auth": "<user-token>"`

**Örnek**:

**Header**:
```json
"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
```

**Sonuç**:

```json
{
  "message": "Test verileri eklendi",
  "buses": [
    {
      "_id": "644ff8dadf7ff223b1a2720c",
      "bus_plate": "34ADN4556",
      "bus_seats": 16,
      "bus_full_seats": {
        "1": "Kadın",
        "3": "Kadın",
        "6": "Erkek",
        "7": "Erkek"
      },
      "__v": 0
    },
    {
      "_id": "644ff8dadf7ff223b1a2720e",
      "bus_plate": "34DND4556",
      "bus_seats": 16,
      "bus_full_seats": {
        "9": "Kadın",
        "10": "Kadın",
        "14": "Erkek",
        "15": "Erkek"
      },
      "__v": 0
    },
    {
      "_id": "644ff8dbdf7ff223b1a27210",
      "bus_plate": "40SDD4556",
      "bus_seats": 16,
      "bus_full_seats": {
        "5": "Erkek",
        "8": "Kadın",
        "9": "Kadın",
        "12": "Erkek",
        "15": "Kadın",
        "17": "Erkek"
      },
      "__v": 0
    },
    {
      "_id": "644ff8dbdf7ff223b1a27212",
      "bus_plate": "40JFG4525",
      "bus_seats": 16,
      "bus_full_seats": {},
      "__v": 0
    },
    {
      "_id": "644ff8dbdf7ff223b1a27214",
      "bus_plate": "16TSK1345",
      "bus_seats": 16,
      "bus_full_seats": {},
      "__v": 0
    },
    {
      "_id": "644ff8dbdf7ff223b1a27216",
      "bus_plate": "16BJG1995",
      "bus_seats": 16,
      "bus_full_seats": {},
      "__v": 0
    },
    {
      "_id": "644ff8dbdf7ff223b1a27218",
      "bus_plate": "19ASF1995",
      "bus_seats": 16,
      "bus_full_seats": {},
      "__v": 0
    },
    {
      "_id": "644ff8dbdf7ff223b1a2721a",
      "bus_plate": "19AKT4515",
      "bus_seats": 16,
      "bus_full_seats": {},
      "__v": 0
    }
  ],
  "routes": [
    {
      "_id": "644ff8dcdf7ff223b1a2721e",
      "route_name": "İstanbul-Ankara",
      "route_time": "10:00",
      "route_bus": "34ADN4556",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dcdf7ff223b1a27220",
      "route_name": "İstanbul-Ankara",
      "route_time": "11:00",
      "route_bus": "34DND4556",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dcdf7ff223b1a27222",
      "route_name": "Bursa-Yalova",
      "route_time": "10:00",
      "route_bus": "40SDD4556",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dcdf7ff223b1a27224",
      "route_name": "Bursa-Yalova",
      "route_time": "11:00",
      "route_bus": "40JFG4525",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dcdf7ff223b1a27226",
      "route_name": "İstanbul-Ankara",
      "route_time": "12:00",
      "route_bus": "16TSK1345",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dddf7ff223b1a27228",
      "route_name": "Bursa-Yalova",
      "route_time": "12:00",
      "route_bus": "16BJG1995",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dddf7ff223b1a2722a",
      "route_name": "Bursa-Yalova",
      "route_time": "13:00",
      "route_bus": "19ASF1995",
      "price": 20,
      "__v": 0
    },
    {
      "_id": "644ff8dddf7ff223b1a2722c",
      "route_name": "İstanbul-Ankara",
      "route_time": "13:00",
      "route_bus": "19AKT4515",
      "price": 20,
      "__v": 0
    }
  ],
  "users": [
    {
      "_id": "644ff8dddf7ff223b1a27230",
      "name": "lojiper",
      "age": 25,
      "gender": "Erkek",
      "mail": "mail@lojiper.com",
      "phone": 5059867458,
      "password": "$2b$10$JCbwDzYTdUj8nmn4AIQHaubQHQAcxmEQXGIWtGFvHSOh1CQGzQn56",
      "token": "",
      "tickets": [],
      "__v": 0
    }
  ]
}
```
