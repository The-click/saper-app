function getRandomPos(sizeX: number, sizeY: number) {
	return { x: Math.floor(Math.random() * sizeX), y: Math.floor(Math.random() * sizeY) };
}

export default getRandomPos;
