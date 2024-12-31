
import React from 'react';
import './Cards.css';


const Cards = () => {
    const doctors = [

            {
            "firstname": "James",
            "lastname": "Smith",
            "email": "james.smith@example.com",
            "password": "James1234",
            "phoneNumber": "1234567890",
            "age": 45,
            "role": "doctor",
            "gender": "male",
            "specialization": "Cardiology",
            "experience": 15,
            "fees": 200
          },
          {
            "firstname": "Emma",
            "lastname": "Johnson",
            "email": "emma.johnson@example.com",
            "password": "Emma1234",
            "phoneNumber": "2345678901",
            "age": 38,
            "role": "doctor",
            "gender": "female",
            "specialization": "Pediatrics",
            "experience": 10,
            "fees": 150
          },
          {
            "firstname": "Michael",
            "lastname": "Williams",
            "email": "michael.williams@example.com",
            "password": "Michael1234",
            "phoneNumber": "3456789012",
            "age": 52,
            "role": "doctor",
            "gender": "male",
            "specialization": "Orthopedics",
            "experience": 20,
            "fees": 250
          },
          {
            "firstname": "Sarah",
            "lastname": "Brown",
            "email": "sarah.brown@example.com",
            "password": "Sarah1234",
            "phoneNumber": "4567890123",
            "age": 41,
            "role": "doctor",
            "gender": "female",
            "specialization": "Dermatology",
            "experience": 12,
            "fees": 180
          },
          {
            "firstname": "David",
            "lastname": "Jones",
            "email": "david.jones@example.com",
            "password": "David1234",
            "phoneNumber": "5678901234",
            "age": 47,
            "role": "doctor",
            "gender": "male",
            "specialization": "Neurology",
            "experience": 18,
            "fees": 300
          },
          {
            "firstname": "Lisa",
            "lastname": "Garcia",
            "email": "lisa.garcia@example.com",
            "password": "Lisa1234",
            "phoneNumber": "6789012345",
            "age": 36,
            "role": "doctor",
            "gender": "female",
            "specialization": "Gynecology",
            "experience": 8,
            "fees": 170
          },
          {
            "firstname": "Robert",
            "lastname": "Miller",
            "email": "robert.miller@example.com",
            "password": "Robert1234",
            "phoneNumber": "7890123456",
            "age": 55,
            "role": "doctor",
            "gender": "male",
            "specialization": "Psychiatry",
            "experience": 25,
            "fees": 220
          },
          {
            "firstname": "Jennifer",
            "lastname": "Davis",
            "email": "jennifer.davis@example.com",
            "password": "Jennifer1234",
            "phoneNumber": "8901234567",
            "age": 39,
            "role": "doctor",
            "gender": "female",
            "specialization": "Endocrinology",
            "experience": 11,
            "fees": 190
          },
          {
            "firstname": "William",
            "lastname": "Rodriguez",
            "email": "william.rodriguez@example.com",
            "password": "William1234",
            "phoneNumber": "9012345678",
            "age": 43,
            "role": "doctor",
            "gender": "male",
            "specialization": "Cardiology",
            "experience": 14,
            "fees": 210
          },
          {
            "firstname": "Maria",
            "lastname": "Martinez",
            "email": "maria.martinez@example.com",
            "password": "Maria1234",
            "phoneNumber": "0123456789",
            "age": 37,
            "role": "doctor",
            "gender": "female",
            "specialization": "Pediatrics",
            "experience": 9,
            "fees": 160
          },
          {
            "firstname": "John",
            "lastname": "Anderson",
            "email": "john.anderson@example.com",
            "password": "John1234",
            "phoneNumber": "1122334455",
            "age": 50,
            "role": "doctor",
            "gender": "male",
            "specialization": "Orthopedics",
            "experience": 19,
            "fees": 240
          },
          {
            "firstname": "Patricia",
            "lastname": "Taylor",
            "email": "patricia.taylor@example.com",
            "password": "Patricia1234",
            "phoneNumber": "2233445566",
            "age": 42,
            "role": "doctor",
            "gender": "female",
            "specialization": "Dermatology",
            "experience": 13,
            "fees": 175
          },
          {
            "firstname": "Joseph",
            "lastname": "Thomas",
            "email": "joseph.thomas@example.com",
            "password": "Joseph1234",
            "phoneNumber": "3344556677",
            "age": 48,
            "role": "doctor",
            "gender": "male",
            "specialization": "Neurology",
            "experience": 17,
            "fees": 280
          },
          {
            "firstname": "Nancy",
            "lastname": "Moore",
            "email": "nancy.moore@example.com",
            "password": "Nancy1234",
            "phoneNumber": "4455667788",
            "age": 35,
            "role": "doctor",
            "gender": "female",
            "specialization": "Gynecology",
            "experience": 7,
            "fees": 165
          },
          {
            "firstname": "Christopher",
            "lastname": "Jackson",
            "email": "christopher.jackson@example.com",
            "password": "Christopher1234",
            "phoneNumber": "5566778899",
            "age": 53,
            "role": "doctor",
            "gender": "male",
            "specialization": "Psychiatry",
            "experience": 22,
            "fees": 230
          },
          {
            "firstname": "Elizabeth",
            "lastname": "Martin",
            "email": "elizabeth.martin@example.com",
            "password": "Elizabeth1234",
            "phoneNumber": "6677889900",
            "age": 40,
            "role": "doctor",
            "gender": "female",
            "specialization": "Endocrinology",
            "experience": 12,
            "fees": 195
          },
          {
            "firstname": "Daniel",
            "lastname": "Lee",
            "email": "daniel.lee@example.com",
            "password": "Daniel1234",
            "phoneNumber": "7788990011",
            "age": 44,
            "role": "doctor",
            "gender": "male",
            "specialization": "Cardiology",
            "experience": 16,
            "fees": 215
          },
          {
            "firstname": "Margaret",
            "lastname": "Perez",
            "email": "margaret.perez@example.com",
            "password": "Margaret1234",
            "phoneNumber": "8899001122",
            "age": 38,
            "role": "doctor",
            "gender": "female",
            "specialization": "Pediatrics",
            "experience": 10,
            "fees": 155
          },
          {
            "firstname": "Kevin",
            "lastname": "Thompson",
            "email": "kevin.thompson@example.com",
            "password": "Kevin1234",
            "phoneNumber": "9900112233",
            "age": 51,
            "role": "doctor",
            "gender": "male",
            "specialization": "Orthopedics",
            "experience": 21,
            "fees": 260
          },
          {
            "firstname": "Sandra",
            "lastname": "White",
            "email": "sandra.white@example.com",
            "password": "Sandra1234",
            "phoneNumber": "0011223344",
            "age": 43,
            "role": "doctor",
            "gender": "female",
            "specialization": "Dermatology",
            "experience": 14,
            "fees": 185
          },
        //   {
        //     "firstname": "Alice",
        //     "lastname": "Cooper",
        //     "email": "alice.cooper@example.com",
        //     "password": "Alice1234",
        //     "phoneNumber": "1231231234",
        //     "age": 28,
        //     "role": "patient",
        //     "gender": "female"
        //   },
        //   {
        //     "firstname": "Bob",
        //     "lastname": "Wilson",
        //     "email": "bob.wilson@example.com",
        //     "password": "Bob1234",
        //     "phoneNumber": "2342342345",
        //     "age": 35,
        //     "role": "patient",
        //     "gender": "male"
        //   },
        //   {
        //     "firstname": "Carol",
        //     "lastname": "Harris",
        //     "email": "carol.harris@example.com",
        //     "password": "Carol1234",
        //     "phoneNumber": "3453453456",
        //     "age": 42,
        //     "role": "patient",
        //     "gender": "female"
        //   },
        //   {
        //     "firstname": "Dean",
        //     "lastname": "Clark",
        //     "email": "dean.clark@example.com",
        //     "password": "Dean1234",
        //     "phoneNumber": "4564564567",
        //     "age": 31,
        //     "role": "patient",
        //     "gender": "male"
        //   },
        //   {
        //     "firstname": "Eve",
        //     "lastname": "Lewis",
        //     "email": "eve.lewis@example.com",
        //     "password": "Eve1234",
        //     "phoneNumber": "5675675678",
        //     "age": 27,
        //     "role": "patient",
        //     "gender": "female"
        //   },
        //   {
        //     "firstname": "Frank",
        //     "lastname": "Young",
        //     "email": "frank.young@example.com",
        //     "password": "Frank1234",
        //     "phoneNumber": "6786786789",
        //     "age": 45,
        //     "role": "patient",
        //     "gender": "male"
        //   },
        //   {
        //     "firstname": "Grace",
        //     "lastname": "Walker",
        //     "email": "grace.walker@example.com",
        //     "password": "Grace1234",
        //     "phoneNumber": "7897897890",
        //     "age": 33,
        //     "role": "patient",
        //     "gender": "female"
        //   },
        //   {
        //     "firstname": "Henry",
        //     "lastname": "Hall",
        //     "email": "henry.hall@example.com",
        //     "password": "Henry1234",
        //     "phoneNumber": "8908908901",
        //     "age": 39,
        //     "role": "patient",
        //     "gender": "male"
        //   },
        //   {
        //     "firstname": "Iris",
        //     "lastname": "Allen",
        //     "email": "iris.allen@example.com",
        //     "password": "Iris1234",
        //     "phoneNumber": "9019019012",
        //     "age": 29,
        //     "role": "patient",
        //     "gender": "female"
        //   },
        //   {
        //     "firstname": "Jack",
        //     "lastname": "King",
        //     "email": "jack.king@example.com",
        //     "password": "Jack1234",
        //     "phoneNumber": "0120120123",
        //     "age": 36,
        //     "role": "patient",
        //     "gender": "male"
        //   }
          
       
    ];

    return (
        <div className="doctors-container" >
            <h1>Our Doctors</h1>
            <div className="cards">
                {doctors.map((doctor, index) => (
                    <div key={index} className={`card ${doctor.color}`}>
                        <div className="profile-pic"><i class="ri-account-circle-fill"></i></div>
                        <h2>{doctor.firstname}</h2>
                        <p><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p><strong>Experience:</strong> {doctor.experience}</p>
                        <p><strong>Fees per consultation:</strong> {doctor.fees}</p>
                        <p><strong>Phone:</strong> {doctor.phoneNumber|| "N/A"}</p>
                        <p><strong>age:</strong> {doctor.age}</p>
                        <p><strong>gender:</strong> {doctor.gender}</p>
                        <button className="btn">Book Appointment</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;