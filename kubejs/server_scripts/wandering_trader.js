MoreJSEvents.wandererTrades((event) => {
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "botania:diluted_pool").maxUses(1)
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "shrink:shrinking_device").maxUses(1)
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "sophisticatedbackpacks:gold_backpack").maxUses(1)
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "botania:spectrolus").maxUses(1)
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "minecraft:enchanted_golden_apple").maxUses(3)
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "minecraft:end_stone").maxUses(1)
    event.addTrade(2, TradeItem.of('minecraft:emerald', 20, 60), "minecraft:chorus_flower").maxUses(1)
})

MoreJSEvents.playerStartTrading((event) => {
        event.forEachOffers((o, i) => {
        if(o.getOutput().getId().match(/.*turtle.*/g)){
            o.setFirstInput(Item.of('minecraft:emerald',41))
            o.setMaxUses(1)
            o.setOutput(Item.of('computercraft:computer_normal',1))
        }
        });
});