const contacts = [
    { id: 1, first_name: "David", last_name: "Cohen", nickname: "Dado", phone_numbers: ["0525381648", "031234567"], address: "Balfur 87,Holon", photo: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" },
    { id: 2, first_name: "Gila", last_name: "Ronen", nickname: "Gili", phone_numbers: ["0525381647"], address: "Herzal 85,Haifa", photo: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png" },
    { id: 3, first_name: "Roza", last_name: "Danon", nickname: null, phone_numbers: ["031234565", "0525381658", "0525381667"], address: "Hazit 3,Oranit", photo: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png" },
    { id: 4, first_name: "Ron", last_name: "Roni", nickname: "Ronron", phone_numbers: ["0541234562"], address: "Golani 53,Tel Aviv", photo: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" },
    { id: 5, first_name: "Ronen", last_name: "Dav", nickname: "Roni", phone_numbers: ["0525384685"], address: "Ali Cohen 2,Bat Yam", photo: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" },
    { id: 6, first_name: "Gal", last_name: "Cohen", nickname: "Gali", phone_numbers: ["0505384448", "031456567"], address: "Ben Gurion 48,Tel Aviv", photo: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png" },
    { id: 7, first_name: "Dorit", last_name: "Mer", nickname: "Dora", phone_numbers: ["0525381712", "041234578"], address: "Danin 15,Holon", photo: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png" },
    { id: 8, first_name: "Dima", last_name: "Bilan", nickname: "Dimitri", phone_numbers: ["0545321667", "0525358667"], address: "Havered 12,Rehovot", photo: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" }
]


export const getContacts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(contacts), 1000)
    })

}