
ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'toms_storage:ts.inventory_cable',
            'toms_storage:ts.inventory_cable_framed',
            'toms_storage:ts.inventory_cable_connector',
            'toms_storage:ts.inventory_cable_connector_filtered',
            'toms_storage:ts.inventory_cable_connector_framed',
            'toms_storage:ts.inventory_hopper_basic',
            'toms_storage:ts.adv_wireless_terminal'
        ]
    })
})