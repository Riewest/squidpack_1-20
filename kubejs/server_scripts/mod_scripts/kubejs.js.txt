ServerEvents.recipes(event => {
    //Mechanical Crafting of added processor blocks crafting components
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
})