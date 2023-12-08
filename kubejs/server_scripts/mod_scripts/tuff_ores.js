ServerEvents.blockLootTables(event => {
    // Do a for loop here over all the ore types from list
    // event.addBlock('kubejs:tuff_coal_ore', table => {
    const tuff_ores = global.tuff_ores_settings
    for (const tuff_ore of tuff_ores) {
        event.addBlock('tuffores:' + tuff_ore.item_name, table => {
            table.addPool(pool => {
                pool.rolls = [global["TUFF_MIN_ORE_PER_BLOCK"], global["TUFF_MAX_ORE_PER_BLOCK"]]
                pool.addItem(tuff_ore.primary_drop, global["TUFF_MAX_ORE_PER_BLOCK"] - 1)
                if ("secondary_drop" in tuff_ore) {
                    pool.addItem(tuff_ore.secondary_drop, 1)
                }
            })

        })
    }
})

ServerEvents.recipes(event => {
    event.remove({
        output: [
            'tuffores:tuff_ores_module'
        ]
    })

    event.recipes.createCompacting('tuffores:tuff_ores_module', [
        '#forge:ores/coal',
        '#forge:ores/gold',
        '#forge:ores/iron',
        '#forge:ores/diamond',
        '#forge:ores/emerald',
        '#forge:ores/redstone',
        '#forge:ores/lapis',
        '#forge:ores/copper',
        'scannable:blank_module'
    ])

})