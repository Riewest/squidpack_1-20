ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'scannable:entity_module',
            'scannable:friendly_entity_module',
            'scannable:hostile_entity_module',
            'scannable:block_module',
            'scannable:common_ores_module',
            'scannable:rare_ores_module',
            'scannable:fluid_module',
            'scannable:chest_module',
            'scannable:scanner'
        ]
    })
    event.shaped(Item.of('scannable:scanner'), [
        'IMI',
        'BRB',
        'GQG'
    ], {
        I: 'minecraft:iron_ingot',
        M: 'scannable:blank_module',
        B: 'minecraft:iron_bars',
        R: 'minecraft:redstone',
        G: 'minecraft:gold_ingot',
        Q: 'minecraft:quartz'
    })
})