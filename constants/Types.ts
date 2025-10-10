

export type FlashCard = {
	id: number,
	term: string,
	definition: string,
	unknown: boolean,
}


export type TextInputSizeChangeEvent = {
	nativeEvent: {
		contentSize: {
			width: number,
			height: number,
		}
	}
}