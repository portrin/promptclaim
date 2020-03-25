// need to add SQL query function for User in order to communicate with the Database.

const dummyUsers = [ // sample return from getUserById();
    {
        id: 1,
        username: "@melon",
        firstname: "Trin",
        lastname: "Sengchareon",
        email: "melonn.qq@gmail.com",
        phoneNo: "0849584475",
        address: [
            {
                houseNo: "60/2",
                street: "Ari 2",
                subDistrict: "Samsen nai",
                district: "Phaya thai",
                province: "Bangkok",
                zipcode: 10400
            },
            {
                houseNo: "342/21",
                street: "Rattanathibet",
                subDistrict: "Bang krasor",
                district: "Muang",
                province: "Nonthaburi",
                zipcode: 11000
            }            
        ],
        birthdate: "1999-05-04",
        gender: "M"
    },
    {
        id: 2,
        username: "Praewpun",
        firstname: "Praew",
        lastname: "Cheevamongkol",
        email: "merrypraeww@gmail.com",
        phoneNo: "0972279898",
        address: [
            {
                houseNo: "599/97",
                street: "Nonsi",
                subDistrict: "Chongnonsi",
                district: "Yannawa",
                province: "Bangkok",
                zipcode: 10200
            }      
        ],
        birthdate: "1999-11-24",
        gender: "F"
    }
];

module.exports = dummyUsers