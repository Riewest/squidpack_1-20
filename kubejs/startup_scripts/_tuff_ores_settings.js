const TARGET_RAW_ORE_PER_VEIN = 1000000;
const TARGET_ORE_BLOCKS_PER_VEIN = 7500;
const TARGET_RAW_ORE_PER_BLOCK = TARGET_RAW_ORE_PER_VEIN / TARGET_ORE_BLOCKS_PER_VEIN;
const PERCENTAGE_ABOVE = 10;
const PERCENTAGE_BELOW = 10;
global["TUFF_MAX_ORE_PER_BLOCK"] = TARGET_RAW_ORE_PER_BLOCK * (1 + PERCENTAGE_ABOVE / 100);
global["TUFF_MIN_ORE_PER_BLOCK"] = TARGET_RAW_ORE_PER_BLOCK * (1 - PERCENTAGE_BELOW / 100);

const HARDNESS_SCALAR = 3
global["TUFF_HARDNESS"] = HARDNESS_SCALAR * TARGET_RAW_ORE_PER_BLOCK

global['tuff_ores_settings'] = [
    {
        "item_name": "tuff_coal_ore",
        "display_name": "Tuff Coal Ore",
        "primary_drop": "minecraft:coal",
        "secondary_drop": "minecraft:diamond"
    },
    {
        "item_name": "tuff_diamond_ore",
        "display_name": "Tuff Diamond Ore",
        "primary_drop": "minecraft:diamond",
        "secondary_drop": "minecraft:lapis_lazuli"
    },
    {
        "item_name": "tuff_copper_ore",
        "display_name": "Tuff Copper Ore",
        "primary_drop": "minecraft:raw_copper",
        "secondary_drop": "minecraft:raw_gold"
    },
    {
        "item_name": "tuff_emerald_ore",
        "display_name": "Tuff Emerald Ore",
        "primary_drop": "minecraft:emerald",
        "secondary_drop": "minecraft:coal"
    },
    {
        "item_name": "tuff_gold_ore",
        "display_name": "Tuff Gold Ore",
        "primary_drop": "minecraft:raw_gold",
        "secondary_drop": "minecraft:raw_copper"
    },
    {
        "item_name": "tuff_iron_ore",
        "display_name": "Tuff Iron Ore",
        "primary_drop": "minecraft:raw_iron",
        "secondary_drop": "minecraft:redstone"
    },
    {
        "item_name": "tuff_lapis_ore",
        "display_name": "Tuff Lapis Ore",
        "primary_drop": "minecraft:lapis_lazuli",
        "secondary_drop": "minecraft:raw_iron"
    },
    {
        "item_name": "tuff_redstone_ore",
        "display_name": "Tuff Redstone Ore",
        "primary_drop": "minecraft:dirt",
        "secondary_drop": "minecraft:glowstone_dust"
    }
]