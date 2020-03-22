// need to add SQL query function for User in order to communicate with the Database.

const dummyUser = [ // sample return from getUserById();
    {
        id: 1,
        username: "@melon",
        firstname: "Trin",
        lastname: "Sengchareon",
        email: "melonn.qq@gmail.com",
        phoneNo: "0837779292",
        address: [
            {
                houseNo: "52/25",
                street: "Ari 1",
                subDistrict: "Samsen nai",
                district: "Phaya thai",
                province: "Bangkok",
                zipcode: 10400
            },
            {
                houseNo: "66/32",
                street: "Rattanathibet",
                subDistrict: "Bang krasor",
                district: "Muang",
                province: "Nonthaburi",
                zipcode: 11000
            }            
        ],
        birthdate: "1999-05-04",
        gender: "M"
    }
];

const getUser = () => { // sample model function
    return dummyUser; // SQL query
}

module.exports = {
    getUser
};