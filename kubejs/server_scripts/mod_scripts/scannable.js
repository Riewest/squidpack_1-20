ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'scannable:rare_ores_module', 
            'scannable:block_module', 
            'scannable:common_ores_module'
        ]
    })
})