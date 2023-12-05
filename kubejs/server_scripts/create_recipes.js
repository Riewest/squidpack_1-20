// priority: 0

// settings.logAddedRecipes = true
// settings.logRemovedRecipes = true
// settings.logSkippedRecipes = false
// settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

ServerEvents.recipes(event => {
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
		E: 'minecraft:apple',
		T: 'minecraft:stick',
		L: 'minecraft:egg',
		S: 'ae2:singularity',
		F: 'minecraft:pufferfish_bucket',
		B: 'minecraft:experience_bottle',
		D: 'minecraft:dragon_breath',
		N: 'minecraft:nether_star',
		s: 'minecraft:amethyst_shard',
		I: 'minecraft:glow_ink_sac',
		c: 'computercraft:computer_advanced'
	})

	//Compacting Recipes
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

	event.recipes.createCompacting(Item.of('4x ae2:silicon').withChance(0.75), [
		Fluid.of('minecraft:water', 250),
		'minecraft:purpur_block'
	]).heated()

	event.recipes.createCutting(Item.of('3x ae2:printed_silicon'), 'ae2:silcon').processingTime(50)
	event.recipes.createCutting(Item.of('3x ae2:printed_logic_processor'), 'minecraft:gold_ingot').processingTime(50)
	event.recipes.createCutting(Item.of('3x ae2:printed_engineering_processor'), 'minecraft:diamond').processingTime(50)
	event.recipes.createCutting(Item.of('3x ae2:printed_calculation_processor'), 'ae2:certus_quartz_crystal').processingTime(50)

	event.recipes.createSequencedAssembly([ // start the recipe
		Item.of('ae2:logic_processor').withChance(80.0), // have this item be an output with a certain chance
		Item.of('ae2:printed_logic_processor').withChance(10.0), // have this item be an output with a certain chance
		Item.of('minecraft:redstone').withChance(10.0) // have this item be an output with a certain chance
	], 'ae2:printed_logic_processor', [ // 'create:brass_ingot' is the input.
		// the transitional item set by "transitionalItem('create:incomplete_large_cogwheel')" is the item that will be used during the recipe as the item that the input is using to transition to the output.
		event.recipes.createDeploying('ae2:printed_logic_processor', ['ae2:printed_logic_processor', 'minecraft:redstone']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
		event.recipes.createDeploying('ae2:printed_logic_processor', ['ae2:printed_logic_processor', 'ae2:printed_silicon']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
		event.recipes.createPressing('ae2:printed_logic_processor', 'ae2:printed_logic_processor') // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
	]).transitionalItem('ae2:printed_logic_processor').loops(3) // set the transitional item and the loops (amount of repetitions)
	
	event.recipes.createSequencedAssembly([ // start the recipe
		Item.of('ae2:engineering_processor').withChance(80.0), // have this item be an output with a certain chance
		Item.of('ae2:printed_engineering_processor').withChance(10.0), // have this item be an output with a certain chance
		Item.of('minecraft:redstone').withChance(10.0) // have this item be an output with a certain chance
	], 'ae2:printed_engineering_processor', [ // 'create:brass_ingot' is the input.
		// the transitional item set by "transitionalItem('create:incomplete_large_cogwheel')" is the item that will be used during the recipe as the item that the input is using to transition to the output.
		event.recipes.createDeploying('ae2:printed_engineering_processor', ['ae2:printed_engineering_processor', 'minecraft:redstone']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
		event.recipes.createDeploying('ae2:printed_engineering_processor', ['ae2:printed_engineering_processor', 'ae2:printed_silicon']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
		event.recipes.createPressing('ae2:printed_engineering_processor', 'ae2:printed_engineering_processor') // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
	]).transitionalItem('ae2:printed_engineering_processor').loops(3) // set the transitional item and the loops (amount of repetitions)
	
	event.recipes.createSequencedAssembly([ // start the recipe
		Item.of('ae2:calculation_processor').withChance(80.0), // have this item be an output with a certain chance
		Item.of('ae2:printed_calculation_processor').withChance(10.0), // have this item be an output with a certain chance
		Item.of('minecraft:redstone').withChance(10.0) // have this item be an output with a certain chance
	], 'ae2:printed_calculation_processor', [ // 'create:brass_ingot' is the input.
		// the transitional item set by "transitionalItem('create:incomplete_large_cogwheel')" is the item that will be used during the recipe as the item that the input is using to transition to the output.
		event.recipes.createDeploying('ae2:printed_calculation_processor', ['ae2:printed_calculation_processor', 'minecraft:redstone']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
		event.recipes.createDeploying('ae2:printed_calculation_processor', ['ae2:printed_calculation_processor', 'ae2:printed_silicon']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
		event.recipes.createPressing('ae2:printed_calculation_processor', 'ae2:printed_calculation_processor') // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
	]).transitionalItem('ae2:printed_calculation_processor').loops(3) // set the transitional item and the loops (amount of repetitions)
})