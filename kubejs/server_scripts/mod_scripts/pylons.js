ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'pylons:potion_filter',
            'pylons:harvester_pylon', 
            'pylons:expulsion_pylon', 
            'pylons:mob_filter', 
            'pylons:player_filter'
        ]
    })
})
