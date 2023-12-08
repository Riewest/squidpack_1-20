ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'mininggadgets:upgrade_battery_1',
            'mininggadgets:upgrade_battery_2',
            'mininggadgets:upgrade_battery_3',
            'mininggadgets:upgrade_fortune_3']
    })
})