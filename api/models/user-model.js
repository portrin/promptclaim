// need to add SQL query function for User in order to communicate with the Database.

const dummyUser = [ // sample return from getUserById();
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
    }
];

const getUser = () => { // sample model function
    return dummyUser; // SQL query
}

module.exports = {
    getUser
};