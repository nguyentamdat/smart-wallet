/*** LIST OF ALL PURPOSE ***/
const allPurpose = [
    {
        id: 1,
        isRevenue: false,
        name: "Mua sắm đồ đạc",
        iconName: "sofa",
        iconType: "MaterialCommunityIcons"
    },
    {
        id: 2,
        isRevenue: false,
        name: "Ăn uống",
        iconName: "hamburger",
        iconType: "MaterialCommunityIcons"
    },
    {
        id: 3,
        isRevenue: false,
        name: "Đi lại",
        iconName: "map-marker",
        iconType: "MaterialCommunityIcons"
    },
    {
        id: 4,
        isRevenue: false,
        name: "Phát triển bản thân",
        iconName: "book-open-page-variant",
        iconType: "MaterialCommunityIcons"
    },
    {
        id: 5,
        isRevenue: false,
        name: "Giao lưu, quan hệ",
        iconName: "handshake-o",
        iconType: "FontAwesome"
    },
    {
        id: 6,
        isRevenue: false,
        name: "Dịch vụ sinh hoạt",
        iconName: "live-tv",
        iconType: "MaterialIcons"
    },
    {
        id: 7,
        isRevenue: false,
        name: "Sức khỏe",
        iconName: "heartbeat",
        iconType: "FontAwesome"
    },
    {
        id: 8,
        isRevenue: false,
        name: "Hưởng thụ",
        iconName: "diamond",
        iconType: "SimpleLineIcons"
    },
    {
        id: 9,
        isRevenue: false,
        name: "Trang phục",
        iconName: "tshirt",
        iconType: "FontAwesome5"
    },
    {
        id: 10,
        isRevenue: false,
        name: "Khác",
        iconName: "minussquare",
        iconType: "AntDesign"
    },
    {
        id: 11,
        isRevenue: true,
        name: "Được cho/tặng",
        iconName: "gift",
        iconType: "AntDesign"
    },
    {
        id: 12,
        isRevenue: true,
        name: "Lương",
        iconName: "hand-holding-usd",
        iconType: "FontAwesome5"
    },
    {
        id: 13,
        isRevenue: true,
        name: "Thưởng",
        iconName: "trophy",
        iconType: "FontAwesome"
    },
    {
        id: 14,
        isRevenue: true,
        name: "Tiền lãi",
        iconName: "percent",
        iconType: "FontAwesome5"
    },
    {
        id: 15,
        isRevenue: true,
        name: "Khác",
        iconName: "plussquare",
        iconType: "AntDesign"
    }
];

export default {
    allPurpose,
    lengthPurpose_E: allPurpose.filter(purpose => purpose.isRevenue === false)
        .length,
    lengthPurpose_R: allPurpose.filter(purpose => purpose.isRevenue === true)
        .length
};
