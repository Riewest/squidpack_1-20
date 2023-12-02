console.info('Loading KUBEJS BLocks...')

StartupEvents.registry("block", (event) => {
    event.create("tuff_coal") // Create a new block
    .displayName("Tuff Coal") // Set a custom name
    .material("stone") // Set a material (affects the sounds and some properties)
    .hardness(500.0) // Set hardness (affects mining time)
    .resistance(10.0) // Set resistance (to explosions, etc)
    // .tagBlock("my_custom_tag") // Tag the block with `#minecraft:my_custom_tag` (can have multiple tags)
    .requiresTool(true) // Requires a tool or it won't drop (see tags below)
    // .tagBlock("my_namespace:my_other_tag") // Tag the block with `#my_namespace:my_other_tag`
    .tagBlock("mineable/pickaxe") // or a pickaxe
    .tagBlock('minecraft:needs_diamond_tool') // the tool tier must be at least diamond
    .mapColor('terracotta_gray')
    .soundType("tuff")
    .textureAll("kubejs:block/tuff_coal_ore.png")
    .setLootTableJson(
        {
            "pools": [
                {
                    "rolls": {
                        "min": 32,
                        "max": 64
                    },
                    "entries": [
                        {
                            "type": "item",
                            "name": "minecraft:diamond",
                            "weight": 1
                        },
                        {
                            "type": "item",
                            "name": "minecraft:coal",
                            "weight": 63
                        }
                    ]
                }
            ]
        }
    )
})