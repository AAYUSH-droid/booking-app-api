const { db } = require("../utils/admin");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./env.js");
const mailgen = require("mailgen");

//Get request -- get all users
exports.users = async (req, res) => {
  const usersRef = db.collection("bookings");
  try {
    usersRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //   console.log(data);
      return res.status(201).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

//booking request
exports.bookingDetails = async (req, res) => {
  try {
    const { name, email, phone, date, time, TeacherMentor, Message } = req.body; // assuming the request body contains name, email, and password fields
    const newUser = await db
      .collection("bookings")
      .add({ name, email, phone, date, time, TeacherMentor, Message }); // add the new user to the database
    res.status(201).json({
      id: newUser.id,
      name,
      email,
      phone,
      date,
      time,
      TeacherMentor,
      Message,
    }); // return the new user's id, name, and email in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong, please try again" }); // handle any errors that occur
  }
};

//sending test email
exports.sendTestMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Succesfully registered with us", // plain text body
    html: "<b>Succesfully registered with us</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should recieve a message",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
};

//sending gmail to users
exports.sendGmail = async (req, res) => {
  const { email, time, date, TeacherMentor } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "Booking confirmation",
      intro: "You mail is here",
    },
    table: {
      data: [
        {
          item: "Nodemailer Stack Book",
          description: "A Backend application",
          price: "$10.99",
        },
      ],
    },
    outro: "Looking forward to do more business",
  };
  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email, //user email
    subject: "Your Booking is confirmed on",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
