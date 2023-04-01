interface IEnum {
	enum: Array<string | number>,
	link: string,
};

export const typeViewingEnums: IEnum = {
	enum: [
		"movie",
		"cartoon",
		"series",
		"animated_series",
		"anime",
		"anime_series"
	],
	link: 'type-viewing',
};