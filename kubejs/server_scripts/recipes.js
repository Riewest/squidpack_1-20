// priority: 0

// settings.logAddedRecipes = true
// settings.logRemovedRecipes = true
// settings.logSkippedRecipes = false
// settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

ServerEvents.recipes(event => {

	//Remove recipes
	event.remove({ output: 'botania:livingrock' })
	event.remove({ id: 'botania:pure_daisy/livingwood' })
	event.remove({ type: 'botania:pure_daisy', input: 'minecraft:end_stone' })
	event.remove({ output: 'minecraft:end_portal_frame'})

	//Shapeless
	event.shapeless(
		Item.of('minecraft:clay_ball', 4), // arg 1: output
		[ 
		  'minecraft:clay'
		]
	  )

	//Botania
	event.recipes.botania.pure_daisy("botania:livingrock", "minecraft:end_stone")
	event.recipes.botania.pure_daisy("botania:livingwood_log", "minecraft:warped_stem")
	event.recipes.botania.pure_daisy("botania:livingwood_log", "minecraft:crimson_stem")
	event.recipes.botania.pure_daisy("minecraft:cobbled_deepslate", "minecraft:stone")

	//Mechanical Crafting
	event.recipes.createMechanicalCrafting('kubejs:kilo_processor', [
		'LEC',
		'LEC',
		'LEC'
	], {
		L: 'ae2:logic_processor',
		E: 'ae2:engineering_processor',
		C: 'ae2:calculation_processor'
	})
	event.recipes.createMechanicalCrafting('kubejs:mega_processor', [
		'KKK',
		'KKK',
		'KKK'
	], {
		K: 'kubejs:kilo_processor',
	})
	event.recipes.createMechanicalCrafting('kubejs:giga_processor', [
		'MMM',
		'MMM',
		'MMM'
	], {
		M: 'kubejs:mega_processor',
	})


	event.recipes.createMechanicalCrafting('kubejs:squid_god_tribute', [
		'  C C  ',
		'  iGd  ',
		'CBPTPsC',
		' cEFTS ',
		'CNPEPDC',
		'  ILI  ',
		'  C C  '
	  ], {
		C: 'compressium:cobblestone_7',
		i: 'compressium:iron_5',
		G: 'compressium:gold_5',
		d: 'compressium:diamond_5',
		P: 'kubejs:giga_processor',
		E: 'botania:elementium_block',
		T: 'botania:terrasteel_block',
		L: Item.of('botania:laputa_shard', '{level:19}'),
		S: 'ae2:singularity',
		F: 'minecraft:pufferfish_bucket',
		B: 'minecraft:experience_bottle',
		D: 'minecraft:dragon_breath',
		N: 'minecraft:nether_star',
		s: 'minecraft:amethyst_shard',
		I: 'minecraft:glow_ink_sac',
		c: 'computercraft:computer_advanced'
	  })
})