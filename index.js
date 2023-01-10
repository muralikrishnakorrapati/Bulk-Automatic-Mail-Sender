const express = require("express");
const PORT = 8000;
const app = express();

const nodemailer = require("nodemailer");
const User = require("./User.json");
const people = require("./people.json");
const getContent = require("./Content.js");

app.get("/", function (req, res) {
	res.send(`Welcome`);
});

app.get("/send", (req, res) => {
	let status = ["Mail Successfully Sent to :"];

	people.map(async (person) => {
		let transporter = nodemailer.createTransport({
			// host: "smtp.gmail.email",
			// port: 587,
			// secure: false, // true for 465, false for other ports
			service: "gmail",
			auth: {
				user: User[0].mailId, // generated ethereal user
				pass: User[0].password, // generated ethereal password
			},
		});

		const { Subject, Body } = getContent(person.name);

		const info = await transporter
			.sendMail({
				from: `"${User[0].name}" <${User[0].mailId}>`, // sender address
				to: person.mailId, // list of receivers
				subject: Subject,
				text: Body,
			})
			.then(
				(status = [
					...status,
					`${status.length}. Mail Id : ${person.mailId}  Name : ${person.name}`,
				])
			);
	});
	res.send(status);
});

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
