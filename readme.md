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
- Body: **name, age, gender, mail, phone, password**

Örnek:

```json
{
  "name": "lojiper",
  "age": 25,
  "gender": "Erkek",
  "mail": "mail@lojiper.com",
  "phone": 5059867458,
  "password": "135791",
  "token": "",
  "tickets": []
}
```

Sonuç:

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
- Body: **mail, password**

Örnek :

```json
{
  "mail": "mail@lojiper.com",
  "password": "135791"
}
```

Sonuç:

```json
{
  "message": "Giriş başarılı",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWFpbEBsb2ppcGVyLmNvbSIsInBhc3N3b3JkIjoiMTM1NzkxIiwiaWF0IjoxNjgyOTQwNDc3LCJleHAiOjE2ODI5NDQwNzd9.A55sl0fsWrejq2-0zcNcK_7DuQpiQrukuf5LHl8I5uU"
}
```

> **Bilgilendirme:** Kullanıcı giriş yaptıktan sonra gelen yanıt içerisindeki token bundan sonraki bütün endpointlerde kullanılması zorunludur aksi taktirde sonuç gelmicektir.

> **Bilgilendirme:** Üretilen tokenin 15 dakika geçerlilik süresi bulunmaktadır süre bitiminde yeniden giriş yapılması gerekmektedir.

> **Bilgilendirme:** Header'da auth "token" şeklinde gönderilmesi gerekmektedir.

#### 3. Otobüs Ekleme

- Yöntem: **POST**
- URL: **/busCreate**
- Body: **bus_plate, bus_seats, bus_full_seats**
- Header : **auth**

Örnek:

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

#### 4. Otobüs Listesi

- Yöntem: **GET**
- URL: **/busList**
- Header : **aut**
Sonuç:

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
#### 5. Otobüs Bilgisi
- Yöntem: **GET**
- URL: **/getBusDetail**
- Body : **bus_plate**
- Header : **aut**