ServerEvents.tags('worldgen/biome', event => {
    console.log("removing strongholds?")
    event.removeAll('minecraft:has_structure/stronghold')
  })