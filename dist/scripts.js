console.log("This is the main app js file");

import Header from 'mod/Header';
const head = new Head;
const heading = head.heading();

console.log(heading);
export Head {
	const heading = () => {
		console.log("This is the heading function");
	}
}