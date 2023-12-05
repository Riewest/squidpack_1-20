console.info('Loading Tuff Ores Blocks...');

StartupEvents.registry("block", (event) => {
    const tuff_ores = global.tuff_ores_settings
    for (const tuff_ore of tuff_ores) {
        event.create(tuff_ore.item_name) // Create a new block
            .displayName(tuff_ore.display_name) // Set a custom name
            .material("stone") // Set a material (affects the sounds and some properties)
            .hardness(global["TUFF_HARDNESS"]) // Set hardness (affects mining time)
            .resistance(10.0) // Set resistance (to explosions, etc)
            .tagBoth("minecraft:tuffores") // Tag the block with `#minecraft:my_custom_tag` (can have multiple tags)
            .requiresTool(true) // Requires a tool or it won't drop (see tags below)
            .tagBlock("mineable/pickaxe") // or a pickaxe
            .tagBlock('minecraft:needs_diamond_tool') // the tool tier must be at least diamond
            .mapColor('terracotta_gray')
            .soundType("tuff")
    }
});

// console.info('Loading Tuff Ores World Gen...');
// WorldgenEvents.add(event => {
//     // use the anchors helper from the event
//     const { anchors } = event
//     event.addOre(ore => {
//       ore.id = 'kubejs:tuff_coal_ore' // (optional, but recommended) custom id for the feature
//     //   ore.biomes = {
//     //     not: 'minecraft:savanna' // biome filter, see above (technically also optional)
//     //   }
  
//       // examples on how to use targets
//       ore.addTarget('#minecraft:stone_ore_replaceables', 'kubejs:tuff_coal_ore') // replace anything in the vanilla stone_ore_replaceables tag with Glowstone
//       ore.addTarget('minecraft:deepslate', 'kubejs:tuff_coal_ore')       // replace Deepslate with Nether Wart Blocks

//       ore.count(1)             // generate between 15 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
//         // .squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
//         .triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
//           anchors.aboveBottom(32),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
//           anchors.absolute(96)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
//         )								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32
  
//       // more, optional parameters (default values are shown here)
//       ore.size = 7500                         // max. vein size
//       ore.noSurface = 0.5                     // chance to discard if the ore would be exposed to air
//       ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
//       ore.chance = 25							            // if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
//     })
//   })
