"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Providers",
      [
        {
          name: "alltel",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "sms.alltelwireless.com"
        },
        {
          name: "at&t",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "txt.att.net"
        },
        {
          name: "boost",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "sms.myboostmobile.com"
        },
        {
          name: "cricket",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "mms.cricketwireless.net"
        },
        {
          name: "metropcs",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "mymetropcs.com"
        },
        {
          name: "republic",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "text.republicwireless.com"
        },
        {
          name: "sprint",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "messaging.sprintpcs.com"
        },
        {
          name: "t-mobile",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "tmomail.net"
        },
        {
          name: "uscellular",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "email.uscc.net"
        },
        {
          name: "verizon",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "vtext.com"
        },
        {
          name: "virgin",
          createdAt: new Date(),
          updatedAt: new Date(),
          domain: "vmobl.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Providers", null, {});
  }
};
