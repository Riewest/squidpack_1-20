ServerEvents.recipes(event => {
	//Remove recipes
	event.remove({ output: 'minecraft:end_portal_frame'})
	//Adds
	event.recipes.createCompacting('minecraft:end_portal_frame', [
		Fluid.of('minecraft:lava', 1000),
		'compressium:diamond_2',
		'compressium:iron_2',
		'compressium:gold_2',
		'compressium:copper_2',
		'compressium:redstone_2',
		'minecraft:nether_star',
		'compressium:lapis_2',
		'compressium:cobblestone_6'
	]).superheated()

    })