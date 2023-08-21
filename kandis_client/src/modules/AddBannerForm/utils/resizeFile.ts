import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			1024,
			300,
			"webp",
			100,
			0,
			(file) => {
				resolve(file);
			},
			"file"
		);
	});