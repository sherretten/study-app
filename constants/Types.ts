

export type FlashCard = {
	id: number,
	term: string,
	definition: string,
}


export type TextInputSizeChangeEvent = {
	nativeEvent: {
		contentSize: {
			width: number,
			height: number,
		}
	}
}