const Content = {
	getContent: (name) => {
		const Subject = `Subject`;
		const Body = `Dear ${name},
            Body        
        `;

		return { Subject, Body };
	},
};

module.exports = Content.getContent;
