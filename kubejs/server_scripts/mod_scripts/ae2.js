ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'ae2:silicon',
            'ae2:printed_silicon',
            'ae2:printed_engineering_processor',
            'ae2:printed_calculation_processor',
            'ae2:printed_logic_processor',
            'ae2:engineering_processor',
            'ae2:calculation_processor',
            'ae2:logic_processor'
        ]
    })




    //adds
    event.recipes.createCutting(Item.of('3x ae2:printed_silicon'), 'ae2:silicon').processingTime(50)
    event.recipes.createCutting(Item.of('3x ae2:printed_logic_processor'), 'minecraft:gold_ingot').processingTime(50)
    event.recipes.createCutting(Item.of('3x ae2:printed_engineering_processor'), 'minecraft:diamond').processingTime(50)
    event.recipes.createCutting(Item.of('3x ae2:printed_calculation_processor'), 'ae2:certus_quartz_crystal').processingTime(50)

    //silicon compacting from purpur
    event.recipes.createCompacting(Item.of('4x ae2:silicon').withChance(0.75), [
        Fluid.of('minecraft:water', 250),
        'minecraft:purpur_block'
    ]).heated()

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