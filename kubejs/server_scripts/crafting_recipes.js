ServerEvents.recipes(event => {
	//Shapeless
	event.shapeless(
		Item.of('minecraft:clay_ball', 4), // arg 1: output
		[
			'minecraft:clay'
		]
    )
})